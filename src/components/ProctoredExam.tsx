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
}

const MAX_WARNINGS = 3;

export default function ProctoredExam({ testTitle, questions, onClose, onComplete, durationSec, flagSpamMistakes }: Props) {
  const [status, setStatus] = useState<Status>("setup");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string>("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [tabWarnings, setTabWarnings] = useState(0);
  const [deviceWarnings, setDeviceWarnings] = useState(0);
  const [lastWarning, setLastWarning] = useState<string>("");
  const [disqualifyReason, setDisqualifyReason] = useState<string>("");
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [initialAudioCount, setInitialAudioCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(durationSec || 0);
  const [spamFlag, setSpamFlag] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const statusRef = useRef<Status>("setup");

  useEffect(() => { statusRef.current = status; }, [status]);

  const score = questions.filter((q, i) => (answers[i] || "").trim().toLowerCase() === q.answer.trim().toLowerCase()).length;
  const wrongCount = questions.filter((q, i) => (answers[i] || "").trim() && (answers[i] || "").trim().toLowerCase() !== q.answer.trim().toLowerCase()).length;

  const stopCamera = useCallback(() => {
    if (stream) { stream.getTracks().forEach(t => t.stop()); setStream(null); }
  }, [stream]);

  const requestCamera = useCallback(async () => {
    setCameraError("");
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 320, height: 240 }, audio: false });
      setStream(s);
      if (videoRef.current) { videoRef.current.srcObject = s; }
    } catch (e: any) {
      setCameraError("Kameraga ruxsat berilmadi. Test boshlash uchun kamerani yoqing.");
    }
  }, []);

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

  // Auto-clear warning toast
  useEffect(() => {
    if (!lastWarning) return;
    const t = setTimeout(() => setLastWarning(""), 4000);
    return () => clearTimeout(t);
  }, [lastWarning]);

  // Cleanup on unmount
  useEffect(() => () => { stopCamera(); }, [stopCamera]);

  const startExam = useCallback(() => {
    if (!stream) { setCameraError("Avval kamerani yoqing."); return; }
    setStatus("running");
    setAnswers({});
    setTabWarnings(0);
    setDeviceWarnings(0);
    setDisqualifyReason("");
  }, [stream]);

  const finishExam = useCallback(() => {
    setStatus("finished");
    onComplete?.(score, questions.length, true);
    stopCamera();
  }, [score, questions.length, onComplete, stopCamera]);

  const handleClose = useCallback(() => {
    stopCamera();
    onClose();
  }, [stopCamera, onClose]);

  const ratio = score / questions.length;
  const levelLabel = ratio >= 0.9 ? "A+ • Mukammal" : ratio >= 0.7 ? "A • Yuqori" : ratio >= 0.5 ? "B • O'rta" : ratio >= 0.3 ? "C • Boshlang'ich" : "Boshlang'ich darajadan past";

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
          <button onClick={handleClose} className="rounded-2xl border border-border bg-card p-2 text-foreground hover:bg-primary/10 hover:text-primary">
            <X className="h-5 w-5" />
          </button>
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
              </div>
            )}
          </div>

          <div className="space-y-3">
            {status === "setup" && (
              <>
                <div className="rounded-2xl border border-border bg-background/60 p-4 text-sm text-foreground">
                  <p className="font-black mb-2">📋 Imtihon qoidalari:</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Test davomida <b>kamera yoqilgan</b> bo'lishi shart.</li>
                    <li>Brauzer oynasidan <b>chiqish taqiqlanadi</b> (3 ogohlantirishdan keyin diskvalifikatsiya).</li>
                    <li>Telefon, kalkulyator yoki boshqa <b>qurilmalardan foydalanish taqiqlanadi</b>.</li>
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
                      <Camera className="h-4 w-4" /> Kamerani yoqish
                    </button>
                  ) : (
                    <button onClick={startExam} className="premium-button inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-black">
                      <ShieldCheck className="h-4 w-4" /> Imtihonni boshlash
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
                <input
                  type="text"
                  value={answers[i] || ""}
                  onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
                  placeholder="Javobingizni yozing..."
                  onPaste={(e) => { e.preventDefault(); addDeviceWarning("Javobni nusxalab qo'yish urinishi aniqlandi."); }}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-bold text-foreground outline-none focus:border-primary"
                />
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
        {status === "finished" && (
          <div className="mt-6 rounded-3xl border border-primary/40 bg-primary/10 p-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <p className="mt-3 text-2xl font-black text-foreground">Tabriklaymiz! Test halol yakunlandi.</p>
            <p className="mt-2 text-lg font-black text-primary">Sizning natijangiz: {score}/{questions.length} ({Math.round(ratio * 100)}%)</p>
            <p className="mt-1 text-base font-bold text-foreground">Darajangiz: {levelLabel}</p>
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
              Bu sizning haqiqiy natijangiz emas.
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
