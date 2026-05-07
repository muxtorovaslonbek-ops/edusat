import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, Camera, ShieldCheck, X, CheckCircle2, XCircle, Clock, Headphones } from "lucide-react";

type Question = { subject: string; question: string; answer: string; options?: string[] };
type Status = "setup" | "running" | "finished" | "disqualified";

interface Props {
  testTitle: string;
  questions: Question[];
  onClose: () => void;
  onComplete?: (score: number, total: number, valid: boolean) => void;
  /** total exam time in seconds. If omitted — no time limit. */
  durationSec?: number;
  /** if true, too-many-wrong-answers also marks the result invalid */
  flagSpamMistakes?: boolean;
  /** if true, headphones are allowed (e.g. IELTS / Multi-level listening) */
  allowHeadphones?: boolean;
}

const MAX_WARNINGS = 3;
const PHONE_RECT_MIN_AREA = 0.018;
const PHONE_RECT_MAX_AREA = 0.28;

// Load TF + coco-ssd from CDN once
let detectorPromise: Promise<any> | null = null;
function loadDetector(): Promise<any> {
  if (detectorPromise) return detectorPromise;
  detectorPromise = new Promise((resolve, reject) => {
    const loadScript = (src: string) => new Promise<void>((res, rej) => {
      if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
      const s = document.createElement("script");
      s.src = src; s.async = true; s.onload = () => res(); s.onerror = () => rej(new Error("script "+src));
      document.head.appendChild(s);
    });
    (async () => {
      try {
        await loadScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js");
        await loadScript("https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js");
        const cocoSsd = (window as any).cocoSsd;
        const model = await cocoSsd.load({ base: "lite_mobilenet_v2" });
        resolve(model);
      } catch (e) { detectorPromise = null; reject(e); }
    })();
  });
  return detectorPromise;
}

function looksLikePhoneInFrame(video: HTMLVideoElement): boolean {
  const canvas = document.createElement("canvas");
  const width = 160;
  const height = 120;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return false;
  ctx.drawImage(video, 0, 0, width, height);
  const { data } = ctx.getImageData(0, 0, width, height);
  const visited = new Uint8Array(width * height);
  const isStrongEdge = (x: number, y: number) => {
    const i = (y * width + x) * 4;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const rn = r / Math.max(1, r + g + b);
    const gn = g / Math.max(1, r + g + b);
    const skinLike = r > 85 && g > 45 && b > 25 && rn > 0.34 && gn > 0.22 && rn - gn > 0.04;
    if (skinLike) return false;
    const right = Math.min(width - 1, x + 2);
    const down = Math.min(height - 1, y + 2);
    const ri = (y * width + right) * 4;
    const di = (down * width + x) * 4;
    const lumRight = 0.299 * data[ri] + 0.587 * data[ri + 1] + 0.114 * data[ri + 2];
    const lumDown = 0.299 * data[di] + 0.587 * data[di + 1] + 0.114 * data[di + 2];
    return Math.abs(lum - lumRight) + Math.abs(lum - lumDown) > 95;
  };

  for (let y = 8; y < height - 8; y += 2) {
    for (let x = 8; x < width - 8; x += 2) {
      const start = y * width + x;
      if (visited[start] || !isStrongEdge(x, y)) continue;
      let minX = x, maxX = x, minY = y, maxY = y, count = 0;
      const stack = [[x, y]];
      visited[start] = 1;
      while (stack.length && count < 2600) {
        const [cx, cy] = stack.pop()!;
        count++;
        minX = Math.min(minX, cx); maxX = Math.max(maxX, cx);
        minY = Math.min(minY, cy); maxY = Math.max(maxY, cy);
        for (const [nx, ny] of [[cx + 2, cy], [cx - 2, cy], [cx, cy + 2], [cx, cy - 2]]) {
          if (nx < 4 || ny < 4 || nx >= width - 4 || ny >= height - 4) continue;
          const n = ny * width + nx;
          if (!visited[n] && isStrongEdge(nx, ny)) { visited[n] = 1; stack.push([nx, ny]); }
        }
      }
      const boxW = maxX - minX + 1;
      const boxH = maxY - minY + 1;
      const areaRatio = (boxW * boxH) / (width * height);
      const aspect = Math.max(boxW / Math.max(1, boxH), boxH / Math.max(1, boxW));
      const density = count / Math.max(1, boxW * boxH);
      if (areaRatio >= PHONE_RECT_MIN_AREA && areaRatio <= PHONE_RECT_MAX_AREA && aspect >= 1.35 && aspect <= 3.4 && density >= 0.08) {
        return true;
      }
    }
  }
  return false;
}

export default function ProctoredExam({ testTitle, questions, onClose, onComplete, durationSec, flagSpamMistakes, allowHeadphones }: Props) {
  const [status, setStatus] = useState<Status>("setup");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string>("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [tabWarnings, setTabWarnings] = useState(0);
  const [deviceWarnings, setDeviceWarnings] = useState(0);
  const [lastWarning, setLastWarning] = useState<string>("");
  const [disqualifyReason, setDisqualifyReason] = useState<string>("");
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [initialAudioCount, setInitialAudioCount] = useState<number>(0);
  const [headphonesDetected, setHeadphonesDetected] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(durationSec || 0);
  const [spamFlag, setSpamFlag] = useState(false);
  const [aiStatus, setAiStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [detectedObject, setDetectedObject] = useState<string>("");
  const [voiceLevel, setVoiceLevel] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const statusRef = useRef<Status>("setup");
  const lastObjectWarnRef = useRef<number>(0);
  const lastFaceWarnRef = useRef<number>(0);
  const lastVoiceWarnRef = useRef<number>(0);

  useEffect(() => { statusRef.current = status; }, [status]);

  const score = questions.filter((q, i) => (answers[i] || "").trim().toLowerCase() === q.answer.trim().toLowerCase()).length;
  const wrongCount = questions.filter((q, i) => (answers[i] || "").trim() && (answers[i] || "").trim().toLowerCase() !== q.answer.trim().toLowerCase()).length;

  const stopCamera = useCallback(() => {
    if (stream) { stream.getTracks().forEach(t => t.stop()); setStream(null); }
    if (micStream) { micStream.getTracks().forEach(t => t.stop()); setMicStream(null); }
  }, [stream, micStream]);

  const checkHeadphones = useCallback((devs: MediaDeviceInfo[]) => {
    const kw = ["headphone", "headset", "earphone", "earbud", "airpod", "bluetooth", "наушник", "гарнитур", "kulaklık", "이어폰", "헤드폰", "耳机", "naushnik"];
    const found = devs.some(d => {
      const n = (d.label || "").toLowerCase();
      return kw.some(k => n.includes(k));
    });
    setHeadphonesDetected(found);
    return found;
  }, []);

  const requestCamera = useCallback(async () => {
    setCameraError("");
    try {
      // Ask for BOTH camera and mic so device labels become available (for headphone detection)
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 320, height: 240 }, audio: true });
      // Split tracks: keep video for surveillance, keep audio separately for voice monitoring
      const videoOnly = new MediaStream(s.getVideoTracks());
      const audioOnly = new MediaStream(s.getAudioTracks());
      setStream(videoOnly);
      setMicStream(audioOnly);
      if (videoRef.current) { videoRef.current.srcObject = videoOnly; }

      // Pre-load AI model so the test cannot start before surveillance is ready
      setAiStatus("loading");
      loadDetector().then(() => setAiStatus("ready")).catch(() => setAiStatus("error"));

      // Check device labels for headphones immediately
      try {
        const all = await navigator.mediaDevices.enumerateDevices();
        const audio = all.filter(d => d.kind === "audioinput" || d.kind === "audiooutput");
        setAudioDevices(audio);
        setInitialAudioCount(audio.length);
        if (checkHeadphones(audio) && !allowHeadphones) {
          setCameraError("⚠️ Naushnik / headset aniqlandi. Iltimos, ularni uzing va qaytadan kameraga ruxsat bering.");
        }
      } catch {}
    } catch (e: any) {
      setCameraError("Kamera va mikrofonga ruxsat berilmadi. Test boshlash uchun ikkalasini ham yoqing.");
    }
  }, [checkHeadphones]);

  const disqualify = useCallback((reason: string) => {
    setDisqualifyReason(reason);
    setStatus("disqualified");
    onComplete?.(score, questions.length, false);
  }, [score, questions.length, onComplete]);

  const addTabWarning = useCallback(() => {
    if (statusRef.current !== "running") return;
    setTabWarnings(w => {
      const next = w + 1;
      const msg = `⚠️ Ogohlantirish ${next}/${MAX_WARNINGS}: Siz test oynasidan chiqdingiz!`;
      setLastWarning(msg);
      if (next >= MAX_WARNINGS) {
        setTimeout(() => disqualify("Siz test jarayonida bir necha bor oynadan chiqib ketdingiz. Bu qoidalar buzilishidir."), 0);
      }
      return next;
    });
  }, [disqualify]);

  const addDeviceWarning = useCallback((reason: string) => {
    if (statusRef.current !== "running") return;
    setDeviceWarnings(w => {
      const next = w + 1;
      const msg = `⚠️ Ogohlantirish ${next}/${MAX_WARNINGS}: ${reason}`;
      setLastWarning(msg);
      if (next >= MAX_WARNINGS) {
        setTimeout(() => disqualify("Siz test jarayonida ortiqcha qurilma yoki telefondan foydalandingiz. Bu qoidalar buzilishidir."), 0);
      }
      return next;
    });
  }, [disqualify]);

  // Tab/visibility/blur watch
  useEffect(() => {
    if (status !== "running") return;
    const onVis = () => { if (document.hidden) addTabWarning(); };
    const onBlur = () => { addTabWarning(); };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("blur", onBlur);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("blur", onBlur);
    };
  }, [status, addTabWarning]);

  // Camera off detection (extra device usage)
  useEffect(() => {
    if (status !== "running" || !stream) return;
    const track = stream.getVideoTracks()[0];
    if (!track) return;
    const onEnded = () => addDeviceWarning("Kamera o'chirildi yoki boshqa qurilma kameraga kirdi.");
    track.addEventListener("ended", onEnded);
    return () => track.removeEventListener("ended", onEnded);
  }, [status, stream, addDeviceWarning]);

  // Detect copy/paste & devtools-like keyboard shortcuts (extra device usage proxy)
  useEffect(() => {
    if (status !== "running") return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && (k === "c" || k === "v" || k === "t" || k === "n" || k === "p")) {
        e.preventDefault();
        addDeviceWarning("Tashqi qurilma yoki taqiqlangan tugmalardan foydalanish aniqlandi.");
      }
      if (e.key === "F12") { e.preventDefault(); addDeviceWarning("Ishlab chiquvchi vositalarini ochish urinishi aniqlandi."); }
    };
    const onContext = (e: MouseEvent) => { e.preventDefault(); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("contextmenu", onContext);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("contextmenu", onContext);
    };
  }, [status, addDeviceWarning]);

  // Watch for new audio devices being plugged in (headphones/phone/etc)
  useEffect(() => {
    if (!navigator.mediaDevices?.enumerateDevices) return;
    const refresh = async () => {
      try {
        const all = await navigator.mediaDevices.enumerateDevices();
        const audio = all.filter(d => d.kind === "audioinput" || d.kind === "audiooutput");
        setAudioDevices(audio);
        return audio;
      } catch { return []; }
    };
    const handler = async () => {
      const list = await refresh();
      const hp = checkHeadphones(list);
      if (statusRef.current !== "running") return;
      if (hp && !allowHeadphones) {
        addDeviceWarning("Naushnik / headset aniqlandi! Ularni darhol uzing.");
      } else if (list.length > initialAudioCount && !allowHeadphones) {
        addDeviceWarning("Yangi audio qurilma (telefon / bluetooth) ulanishi aniqlandi.");
      } else if (list.length < initialAudioCount) {
        addDeviceWarning("Audio qurilma o'chirildi yoki uzildi.");
      }
    };
    navigator.mediaDevices.addEventListener?.("devicechange", handler);
    return () => navigator.mediaDevices.removeEventListener?.("devicechange", handler);
  }, [initialAudioCount, addDeviceWarning, checkHeadphones, allowHeadphones]);

  // === Voice / ambient-sound monitoring via mic: detect talking or asking for hints ===
  useEffect(() => {
    if (status !== "running" || !micStream) return;
    let cancelled = false;
    let raf = 0;
    let audioCtx: AudioContext | null = null;
    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const src = audioCtx.createMediaStreamSource(micStream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;
      src.connect(analyser);
      const buf = new Uint8Array(analyser.frequencyBinCount);
      let loudFrames = 0;
      const tick = () => {
        if (cancelled) return;
        analyser.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) {
          const v = (buf[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / buf.length);
        setVoiceLevel(rms);
        if (rms > 0.12) loudFrames++;
        else loudFrames = Math.max(0, loudFrames - 1);
        const now = Date.now();
        if (loudFrames > 25 && now - lastVoiceWarnRef.current > 6000) {
          lastVoiceWarnRef.current = now;
          loudFrames = 0;
          addDeviceWarning("Ovoz aniqlandi! Test paytida gaplashish yoki birovdan so'rash taqiqlanadi.");
        }
        raf = requestAnimationFrame(tick);
      };
      tick();
    } catch {}
    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      if (audioCtx) audioCtx.close().catch(() => {});
    };
  }, [status, micStream, addDeviceWarning]);

  // === AI camera surveillance: detect phones/headphones/extra people in webcam frame ===
  useEffect(() => {
    if (status !== "running" || !stream || !videoRef.current) return;
    let cancelled = false;
    let timer: number | null = null;
    let shapeTimer: number | null = null;
    let model: any = null;

    const FORBIDDEN_CLASSES: Record<string, string> = {
      "cell phone": "Telefon kamerada aniqlandi!",
      "remote": "Masofaviy boshqaruv qurilmasi aniqlandi!",
      "laptop": "Boshqa kompyuter/laptop kamerada aniqlandi!",
      "tv": "Ekran/TV kamerada aniqlandi!",
      "book": "Kitob/qo'lyozma kamerada aniqlandi!",
      "keyboard": "Qo'shimcha klaviatura aniqlandi!",
      "mouse": "Qo'shimcha sichqoncha aniqlandi!",
    };
    // coco-ssd doesn't have "headphones" class; we still detect phones, extra people, books, screens.

    const warnPhone = (source: "shape" | "model") => {
      const now = Date.now();
      if (now - lastObjectWarnRef.current <= 5000) return;
      lastObjectWarnRef.current = now;
      setDetectedObject("telefon");
      addDeviceWarning(source === "shape" ? "Telefon kamerada ko'rindi!" : "Telefon kamerada aniqlandi!");
    };

    const shapeTick = () => {
      if (cancelled || statusRef.current !== "running") return;
      const v = videoRef.current;
      if (v && v.readyState >= 2 && v.videoWidth > 0 && looksLikePhoneInFrame(v)) warnPhone("shape");
      shapeTimer = window.setTimeout(shapeTick, 1200);
    };

    setAiStatus("loading");
    shapeTick();
    loadDetector().then((m) => {
      if (cancelled) return;
      model = m;
      setAiStatus("ready");
      const tick = async () => {
        if (cancelled || statusRef.current !== "running") return;
        const v = videoRef.current;
        if (v && v.readyState >= 2 && v.videoWidth > 0) {
          try {
            const preds = await model.detect(v, 12, 0.35);
            const now = Date.now();
            // Multiple people
            const persons = preds.filter((p: any) => p.class === "person");
            if (persons.length > 1 && now - lastFaceWarnRef.current > 6000) {
              lastFaceWarnRef.current = now;
              addDeviceWarning("Kadrda bir nechta odam aniqlandi!");
            } else if (persons.length === 0 && now - lastFaceWarnRef.current > 8000) {
              lastFaceWarnRef.current = now;
              addDeviceWarning("Foydalanuvchi kameradan ko'rinmayapti!");
            }
            // Forbidden objects
            const forbidden = preds.find((p: any) => FORBIDDEN_CLASSES[p.class]);
            if (forbidden) {
              if (forbidden.class === "cell phone") {
                warnPhone("model");
              } else if (now - lastObjectWarnRef.current > 5000) {
                lastObjectWarnRef.current = now;
                setDetectedObject(forbidden.class);
                addDeviceWarning(FORBIDDEN_CLASSES[forbidden.class]);
                }
            }
          } catch { /* ignore frame errors */ }
        }
        timer = window.setTimeout(tick, 1500);
      };
      tick();
    }).catch(() => { if (!cancelled) setAiStatus("error"); });

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      if (shapeTimer) window.clearTimeout(shapeTimer);
    };
  }, [status, stream, addDeviceWarning]);


  // Auto-clear warning toast
  useEffect(() => {
    if (!lastWarning) return;
    const t = setTimeout(() => setLastWarning(""), 4000);
    return () => clearTimeout(t);
  }, [lastWarning]);

  // Cleanup on unmount
  useEffect(() => () => { stopCamera(); }, [stopCamera]);

  const startExam = useCallback(() => {
    if (!stream) { setCameraError("Avval kamera va mikrofonni yoqing."); return; }
    if (aiStatus !== "ready") { setCameraError("AI nazorat tizimi hali tayyor emas. Iltimos, kuting…"); return; }
    if (headphonesDetected) { setCameraError("Naushnik aniqlandi. Iltimos, ularni uzib qaytadan urinib ko'ring."); return; }
    setCameraError("");
    setStatus("running");
    setAnswers({});
    setTabWarnings(0);
    setDeviceWarnings(0);
    setDisqualifyReason("");
    setSpamFlag(false);
    if (durationSec) setTimeLeft(durationSec);
  }, [stream, durationSec, aiStatus, headphonesDetected]);

  // Countdown timer
  useEffect(() => {
    if (status !== "running" || !durationSec) return;
    const i = window.setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(i);
          setTimeout(() => finishExamRef.current?.(), 0);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(i);
  }, [status, durationSec]);

  const finishExamRef = useRef<() => void>();
  const finishExam = useCallback(() => {
    setStatus("finished");
    // Spam detection: too many wrong answers (>60% wrong of answered)
    const answered = Object.values(answers).filter(v => (v || "").trim()).length;
    const spam = flagSpamMistakes && answered >= 5 && wrongCount / Math.max(1, answered) >= 0.6;
    setSpamFlag(spam);
    onComplete?.(score, questions.length, !spam);
    stopCamera();
  }, [score, questions.length, onComplete, stopCamera, answers, wrongCount, flagSpamMistakes]);
  useEffect(() => { finishExamRef.current = finishExam; }, [finishExam]);

  const handleClose = useCallback(() => {
    stopCamera();
    onClose();
  }, [stopCamera, onClose]);

  const ratio = score / questions.length;
  const levelLabel = ratio >= 0.9 ? "A+ • Mukammal" : ratio >= 0.7 ? "A • Yuqori" : ratio >= 0.5 ? "B • O'rta" : ratio >= 0.3 ? "C • Boshlang'ich" : "Boshlang'ich darajadan past";
  const fmtTime = (s: number) => `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/90 p-2 backdrop-blur-xl md:p-4">
      <div className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-3xl border border-border bg-card p-4 shadow-premium md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> Nazorat ostidagi imtihon
            </p>
            <h2 className="mt-2 text-2xl font-black text-foreground md:text-3xl">{testTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Halol natija uchun kamera nazorati ostida o'tkaziladi.</p>
          </div>
          <div className="flex items-center gap-2">
            {durationSec && status === "running" && (
              <span className={`inline-flex items-center gap-1 rounded-2xl border px-3 py-2 text-sm font-black ${timeLeft < 600 ? "border-destructive/60 bg-destructive/10 text-destructive" : "border-primary/40 bg-primary/10 text-primary"}`}>
                <Clock className="h-4 w-4" /> {fmtTime(timeLeft)}
              </span>
            )}
            <button onClick={handleClose} className="rounded-2xl border border-border bg-card p-2 text-foreground hover:bg-primary/10 hover:text-primary">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Camera + warnings panel */}
        <div className="mt-4 grid gap-4 md:grid-cols-[240px,1fr]">
          <div className="rounded-2xl border border-border bg-background/60 p-3">
            <p className="mb-2 inline-flex items-center gap-1 text-xs font-black text-foreground"><Camera className="h-3.5 w-3.5" /> Kamera nazorati</p>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black">
              <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
              {!stream && (
                <div className="absolute inset-0 grid place-items-center text-center text-xs text-white/70 p-2">
                  Kamera o'chirilgan
                </div>
              )}
              {status === "running" && (
                <span className="absolute top-1 left-1 inline-flex items-center gap-1 rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-black text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> REC
                </span>
              )}
            </div>
            {status === "running" && (
              <div className="mt-2 space-y-1 text-[11px] font-bold">
                <p className="flex justify-between"><span>Oynadan chiqish:</span><span className={tabWarnings > 0 ? "text-destructive" : "text-muted-foreground"}>{tabWarnings}/{MAX_WARNINGS}</span></p>
                <p className="flex justify-between"><span>Qurilma ishlatish:</span><span className={deviceWarnings > 0 ? "text-destructive" : "text-muted-foreground"}>{deviceWarnings}/{MAX_WARNINGS}</span></p>
                <p className="flex justify-between"><span><Headphones className="inline h-3 w-3" /> Audio qurilmalar:</span><span className={headphonesDetected ? "text-destructive" : "text-muted-foreground"}>{audioDevices.length}{headphonesDetected ? " ⚠️" : ""}</span></p>
                <p className="flex justify-between"><span>🎤 Ovoz darajasi:</span><span className={voiceLevel > 0.12 ? "text-destructive" : "text-muted-foreground"}>{Math.round(voiceLevel * 100)}%</span></p>
                <p className="flex justify-between"><span>🤖 AI nazorat:</span><span className={aiStatus === "ready" ? "text-primary" : aiStatus === "error" ? "text-destructive" : "text-muted-foreground"}>{aiStatus === "ready" ? "Faol" : aiStatus === "loading" ? "Yuklanmoqda…" : aiStatus === "error" ? "Xato" : "—"}</span></p>
                {detectedObject && <p className="rounded-lg bg-destructive/10 px-2 py-1 text-center text-destructive">⚠️ {detectedObject}</p>}
              </div>
            )}
            {status === "setup" && stream && (
              <div className="mt-2 space-y-1 text-[11px] font-bold">
                <p className="flex justify-between"><span>🤖 AI nazorat:</span><span className={aiStatus === "ready" ? "text-primary" : aiStatus === "error" ? "text-destructive" : "text-muted-foreground"}>{aiStatus === "ready" ? "Tayyor ✓" : aiStatus === "loading" ? "Yuklanmoqda…" : aiStatus === "error" ? "Xato" : "—"}</span></p>
                <p className="flex justify-between"><span><Headphones className="inline h-3 w-3" /> Naushnik:</span><span className={headphonesDetected ? "text-destructive" : "text-primary"}>{headphonesDetected ? "Aniqlandi ⚠️" : "Yo'q ✓"}</span></p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {status === "setup" && (
              <>
                <div className="rounded-2xl border border-border bg-background/60 p-4 text-sm text-foreground">
                  <p className="font-black mb-2">📋 Imtihon qoidalari:</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Test davomida <b>kamera va mikrofon yoqilgan</b> bo'lishi shart.</li>
                    <li><b>Naushnik / headset</b> taqilgan bo'lsa, test boshlanmaydi.</li>
                    <li>Brauzer oynasidan <b>chiqish taqiqlanadi</b> (3 ogohlantirishdan keyin diskvalifikatsiya).</li>
                    <li>Telefon, kalkulyator yoki boshqa <b>qurilmalardan foydalanish taqiqlanadi</b>.</li>
                    <li><b>Gaplashish, birovdan so'rash</b> — mikrofon orqali aniqlanadi.</li>
                    <li>Ko'chirib olish (copy/paste), yangi tab ochish — taqiqlanadi.</li>
                    <li>Qoida buzgan foydalanuvchining natijasi <b>bekor qilinadi</b>.</li>
                  </ul>
                </div>
                {cameraError && (
                  <div className="flex items-start gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertTriangle className="h-4 w-4 mt-0.5" /> <span>{cameraError}</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {!stream ? (
                    <button onClick={requestCamera} className="premium-button inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-black">
                      <Camera className="h-4 w-4" /> Kamera va mikrofonni yoqish
                    </button>
                  ) : (
                    <button
                      onClick={startExam}
                      disabled={aiStatus !== "ready" || headphonesDetected}
                      className="premium-button inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      {aiStatus !== "ready" ? "AI nazorat tayyorlanmoqda…" : headphonesDetected ? "Naushnikni uzing" : "Imtihonni boshlash"}
                    </button>
                  )}
                </div>
              </>
            )}

            {status === "running" && (
              <div className="space-y-3">
                {lastWarning && (
                  <div className="flex items-start gap-2 rounded-2xl border border-amber-500/60 bg-amber-500/15 p-3 text-sm font-bold text-amber-700 dark:text-amber-300">
                    <AlertTriangle className="h-4 w-4 mt-0.5" /> <span>{lastWarning}</span>
                  </div>
                )}
                <p className="text-sm font-bold text-foreground">Savollarga javob bering. Tugatgach <b>"Yakunlash"</b> tugmasini bosing.</p>
              </div>
            )}
          </div>
        </div>

        {/* Questions */}
        {status === "running" && (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {questions.map((q, i) => (
              <div key={i} className="rounded-2xl border border-border bg-background/60 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-primary">{q.subject}</p>
                <p className="mt-1 font-bold text-foreground">{i + 1}. {q.question}</p>
                {q.options && q.options.length ? (
                  <div className="mt-2 grid gap-2">
                    {q.options.map((opt) => {
                      const sel = answers[i] === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setAnswers({ ...answers, [i]: opt })}
                          className={`text-left rounded-xl border px-3 py-2 text-sm font-bold transition-all ${sel ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/60"}`}
                        >{opt}</button>
                      );
                    })}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={answers[i] || ""}
                    onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
                    placeholder="Javobingizni yozing..."
                    onPaste={(e) => { e.preventDefault(); addDeviceWarning("Javobni nusxalab qo'yish urinishi aniqlandi."); }}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-bold text-foreground outline-none focus:border-primary"
                  />
                )}
              </div>
            ))}
            <div className="md:col-span-2 flex justify-end">
              <button onClick={finishExam} className="premium-button rounded-2xl px-6 py-3 font-black">
                Imtihonni yakunlash
              </button>
            </div>
          </div>
        )}

        {/* Finished — valid */}
        {status === "finished" && !spamFlag && (
          <div className="mt-6 rounded-3xl border border-primary/40 bg-primary/10 p-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <p className="mt-3 text-2xl font-black text-foreground">Tabriklaymiz! Test halol yakunlandi.</p>
            <p className="mt-2 text-lg font-black text-primary">Sizning natijangiz: {score}/{questions.length} ({Math.round(ratio * 100)}%)</p>
            <p className="mt-1 text-base font-bold text-foreground">Darajangiz: {levelLabel}</p>
            <button onClick={handleClose} className="mt-5 inline-flex rounded-2xl border border-border bg-card px-5 py-2 font-black text-foreground hover:bg-primary/10">Yopish</button>
          </div>
        )}

        {/* Finished — flagged as spam (too many wrong answers) */}
        {status === "finished" && spamFlag && (
          <div className="mt-6 rounded-3xl border border-amber-500/50 bg-amber-500/10 p-6 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-amber-500" />
            <p className="mt-3 text-xl font-black text-amber-700 dark:text-amber-400">Bu sizning haqiqiy bahoyingiz emas</p>
            <p className="mt-3 text-base font-bold text-foreground">
              Test davomida juda ko'p o'xshash xatolar aniqlandi. Siz qurilmalardan foydalanib yoki javoblarni tasodifiy belgilab bu natijaga erishdingiz.
              Haqiqiy milliy sertifikat imtihonida bu natijaga erisha olmaysiz.
            </p>
            <p className="mt-3 text-sm font-bold text-muted-foreground">Belgilangan ball: {score}/{questions.length} — <span className="text-amber-700 dark:text-amber-400">hisobga olinmaydi</span></p>
            <button onClick={handleClose} className="mt-5 inline-flex rounded-2xl border border-border bg-card px-5 py-2 font-black text-foreground hover:bg-primary/10">Yopish</button>
          </div>
        )}

        {/* Disqualified */}
        {status === "disqualified" && (
          <div className="mt-6 rounded-3xl border border-destructive/50 bg-destructive/10 p-6 text-center">
            <XCircle className="mx-auto h-12 w-12 text-destructive" />
            <p className="mt-3 text-xl font-black text-destructive">Test bekor qilindi</p>
            <p className="mt-3 text-base font-bold text-foreground">
              Siz test jarayonida halol ishtirok etmadingiz va qurilmalardan foydalandingiz.
              Bu sizning haqiqiy natijangiz emas. Haqiqiy milliy sertifikat imtihonida bu natijaga erisha olmaysiz.
            </p>
            <p className="mt-2 text-sm text-muted-foreground italic">{disqualifyReason}</p>
            <p className="mt-3 text-sm font-bold text-muted-foreground">Belgilangan ball: {score}/{questions.length} — <span className="text-destructive">hisobga olinmaydi</span></p>
            <button onClick={handleClose} className="mt-5 inline-flex rounded-2xl border border-border bg-card px-5 py-2 font-black text-foreground hover:bg-primary/10">Yopish</button>
          </div>
        )}
      </div>
    </div>
  );
}
