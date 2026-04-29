import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Mic,
  Settings2,
  Sparkles,
  PhoneOff,
  Phone,
  Volume2,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import tutorImg from "@/assets/ai-tutor.jpg";
import { supabase } from "@/integrations/supabase/client";

type VoiceTone = "warm" | "energetic" | "calm" | "playful";
type AgeGroup = "young" | "adult" | "mature";
type Msg = { role: "user" | "assistant"; content: string };

const TONE_LABEL: Record<VoiceTone, string> = {
  warm: "Iliq",
  energetic: "Energiyali",
  calm: "Xotirjam",
  playful: "Oʻyinqaroq",
};
const AGE_LABEL: Record<AgeGroup, string> = {
  young: "Yosh (~20)",
  adult: "Kattalar (~30)",
  mature: "Yetuk (~45)",
};

// Browser TTS voice tuning — pitch & rate per (age, tone)
const VOICE_PARAMS: Record<AgeGroup, Record<VoiceTone, { pitch: number; rate: number }>> = {
  young:  { warm: { pitch: 1.25, rate: 1.02 }, energetic: { pitch: 1.35, rate: 1.15 }, calm: { pitch: 1.15, rate: 0.92 }, playful: { pitch: 1.4, rate: 1.1 } },
  adult:  { warm: { pitch: 1.05, rate: 1.0 },  energetic: { pitch: 1.15, rate: 1.12 }, calm: { pitch: 0.98, rate: 0.92 }, playful: { pitch: 1.2, rate: 1.08 } },
  mature: { warm: { pitch: 0.92, rate: 0.95 }, energetic: { pitch: 1.0,  rate: 1.05 }, calm: { pitch: 0.88, rate: 0.88 }, playful: { pitch: 1.05, rate: 1.0 } },
};

const TONE_KEY = "edusat:speakingTone";
const AGE_KEY  = "edusat:speakingAge";

interface Props { userName?: string; }

export default function SpeakingTutor({ userName = "" }: Props) {
  const [tone, setTone] = useState<VoiceTone>(() => {
    try { return (localStorage.getItem(TONE_KEY) as VoiceTone) || "warm"; } catch { return "warm"; }
  });
  const [age, setAge] = useState<AgeGroup>(() => {
    try { return (localStorage.getItem(AGE_KEY) as AgeGroup) || "adult"; } catch { return "adult"; }
  });

  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);     // session running
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState<Msg[]>([]);
  const [partial, setPartial] = useState("");
  const [pulse, setPulse] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const recogRef = useRef<any>(null);
  const messagesRef = useRef<Msg[]>([]);
  const isActiveRef = useRef(false);
  const isSpeakingRef = useRef(false);

  useEffect(() => { try { localStorage.setItem(TONE_KEY, tone); } catch {} }, [tone]);
  useEffect(() => { try { localStorage.setItem(AGE_KEY, age); } catch {} }, [age]);
  useEffect(() => { messagesRef.current = transcript; }, [transcript]);
  useEffect(() => { isActiveRef.current = isActive; }, [isActive]);
  useEffect(() => { isSpeakingRef.current = isSpeaking; }, [isSpeaking]);

  // Load TTS voices
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  // Pick best English female voice
  const pickedVoice = useMemo(() => {
    if (!voices.length) return null;
    const en = voices.filter(v => v.lang?.toLowerCase().startsWith("en"));
    const list = en.length ? en : voices;
    const femaleHints = ["female", "samantha", "victoria", "karen", "moira", "tessa", "fiona", "google uk english female", "google us english", "zira", "hazel", "aria", "jenny", "emma", "ava", "susan"];
    for (const h of femaleHints) {
      const f = list.find(v => v.name.toLowerCase().includes(h));
      if (f) return f;
    }
    return list[0];
  }, [voices]);

  // Pulse animation while speaking
  useEffect(() => {
    if (!isActive) { setPulse(0); return; }
    let raf = 0;
    const tick = () => {
      const target = isSpeaking ? Math.random() * 0.7 + 0.3 : isListening ? 0.15 : 0.05;
      setPulse(p => p + (target - p) * 0.3);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isActive, isSpeaking, isListening]);

  const speak = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!("speechSynthesis" in window)) { resolve(); return; }
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      if (pickedVoice) utter.voice = pickedVoice;
      utter.lang = pickedVoice?.lang || "en-US";
      const params = VOICE_PARAMS[age][tone];
      utter.pitch = params.pitch;
      utter.rate = params.rate;
      utter.volume = 1;
      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => { setIsSpeaking(false); resolve(); };
      utter.onerror = () => { setIsSpeaking(false); resolve(); };
      window.speechSynthesis.speak(utter);
    });
  }, [pickedVoice, age, tone]);

  const startListening = useCallback(() => {
    const SpeechRecognition: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Brauzeringiz nutq tanishni qoʻllab-quvvatlamaydi. Chrome yoki Edge ishlating.");
      return;
    }
    if (recogRef.current) {
      try { recogRef.current.stop(); } catch {}
    }
    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.continuous = false;
    recog.interimResults = true;
    recog.maxAlternatives = 1;

    let finalText = "";
    recog.onstart = () => { setIsListening(true); setPartial(""); };
    recog.onresult = (e: any) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += t;
        else interim += t;
      }
      setPartial(interim || finalText);
    };
    recog.onerror = (e: any) => {
      console.warn("SR error:", e.error);
      setIsListening(false);
      if (e.error === "not-allowed") {
        setError("Mikrofonga ruxsat berilmadi. Brauzer sozlamalarini tekshiring.");
        setIsActive(false);
        isActiveRef.current = false;
      } else if (e.error === "no-speech") {
        // restart silently if still active
        if (isActiveRef.current && !isSpeakingRef.current) setTimeout(() => startListening(), 200);
      }
    };
    recog.onend = async () => {
      setIsListening(false);
      const text = finalText.trim();
      setPartial("");
      if (!text) {
        if (isActiveRef.current && !isSpeakingRef.current) setTimeout(() => startListening(), 300);
        return;
      }
      const userMsg: Msg = { role: "user", content: text };
      const newMessages = [...messagesRef.current, userMsg];
      setTranscript(newMessages);
      await sendToAI(newMessages);
    };
    recogRef.current = recog;
    try { recog.start(); } catch (err) { console.warn(err); }
  }, []);

  const sendToAI = useCallback(async (msgs: Msg[]) => {
    setIsThinking(true);
    try {
      const { data, error } = await supabase.functions.invoke("speaking-chat", {
        body: { messages: msgs, tone, age, userName },
      });
      setIsThinking(false);
      if (error) throw error;
      const reply: string = (data as any)?.reply || "";
      if (!reply) {
        if (isActiveRef.current) setTimeout(() => startListening(), 300);
        return;
      }
      const updated = [...msgs, { role: "assistant" as const, content: reply }];
      setTranscript(updated);
      await speak(reply);
      if (isActiveRef.current) setTimeout(() => startListening(), 250);
    } catch (e: any) {
      setIsThinking(false);
      console.error(e);
      setError("AI bilan bogʻlanishda xatolik. Qayta urinib koʻring.");
    }
  }, [tone, age, userName, speak, startListening]);

  const startSession = useCallback(async () => {
    setError(null);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setError("Mikrofonga ruxsat kerak.");
      return;
    }
    setIsActive(true);
    isActiveRef.current = true;
    setTranscript([]);
    messagesRef.current = [];
    // Greeting
    const greeting = `Hi ${userName || "there"}! I'm Emma, your English speaking partner. How are you doing today?`;
    const initial: Msg[] = [{ role: "assistant", content: greeting }];
    setTranscript(initial);
    messagesRef.current = initial;
    await speak(greeting);
    if (isActiveRef.current) startListening();
  }, [userName, speak, startListening]);

  const stopSession = useCallback(() => {
    setIsActive(false);
    isActiveRef.current = false;
    try { recogRef.current?.stop(); } catch {}
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsListening(false);
    setIsSpeaking(false);
    setIsThinking(false);
    setPartial("");
  }, []);

  useEffect(() => () => stopSession(), [stopSession]);

  const statusLabel = isThinking ? "Oʻylayapti…" : isSpeaking ? "Gapiryapti…" : isListening ? "Tinglayapti…" : isActive ? "Tayyor" : "Boshlash uchun bosing";

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI Speaking Practice
          </p>
          <h2 className="mt-3 text-3xl font-black text-foreground md:text-4xl">
            Emma bilan ingliz tilida gaplash
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Haqiqiy odam bilan suhbatlashayotganday — Emma sizni eshitadi, savol beradi va javob qaytaradi. Hech qanday sozlash kerak emas, shunchaki "Suhbatni boshlash" tugmasini bosing va mikrofonga gapiring.
          </p>
        </div>
        <button onClick={() => setShowSettings(true)} className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 text-sm font-bold text-foreground transition-all hover:bg-primary/10 hover:text-primary">
          <Settings2 className="h-4 w-4" /> Sozlamalar
        </button>
      </header>

      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-card to-card p-6 shadow-premium md:p-10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="absolute h-1 w-1 rounded-full bg-primary/60" style={{ top: `${(i * 37) % 100}%`, left: `${(i * 53) % 100}%`, animation: `float-up ${4 + (i % 5)}s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>

        <div className="relative grid gap-8 md:grid-cols-[auto,1fr] md:items-center">
          <div className="relative mx-auto">
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl transition-all duration-300" style={{ transform: `scale(${1 + pulse * 0.5})`, opacity: 0.4 + pulse * 0.6 }} />
            <div className={`absolute inset-0 rounded-full border-2 border-primary/40 transition-all duration-200 ${isActive ? "animate-pulse" : ""}`} style={{ transform: `scale(${1.1 + pulse * 0.15})` }} />
            <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-primary/60 shadow-premium md:h-64 md:w-64">
              <img src={tutorImg} alt="Emma — AI ingliz tili oʻqituvchisi" className="h-full w-full object-cover" width={512} height={512} />
              {isSpeaking && (
                <div className="absolute inset-x-0 bottom-0 flex h-16 items-end justify-center gap-1 bg-gradient-to-t from-primary/40 to-transparent pb-3">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className="w-1.5 rounded-full bg-white" style={{ height: `${20 + Math.abs(Math.sin((Date.now() / 200) + i)) * 30}px`, animation: `voice-bar 0.6s ease-in-out ${i * 0.08}s infinite alternate` }} />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-center">
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${isActive ? (isSpeaking ? "bg-primary/20 text-primary" : isListening ? "bg-rose-500/20 text-rose-600 dark:text-rose-400" : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400") : "bg-muted text-muted-foreground"}`}>
                <span className={`h-2 w-2 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"}`} />
                {statusLabel}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-border bg-background/60 p-4 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Hozirgi sozlama</p>
              <p className="mt-1 text-sm font-bold text-foreground">{AGE_LABEL[age]} • {TONE_LABEL[tone]}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Emma — ingliz tili suhbat sherigi</p>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {!isActive ? (
                <button onClick={startSession} className="premium-button inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-base font-black">
                  <Phone className="h-5 w-5" /> Suhbatni boshlash
                </button>
              ) : (
                <button onClick={stopSession} className="inline-flex items-center gap-2 rounded-2xl bg-destructive px-6 py-3 text-base font-black text-destructive-foreground transition-all hover:opacity-90">
                  <PhoneOff className="h-5 w-5" /> Tugatish
                </button>
              )}
            </div>

            {(transcript.length > 0 || partial) && (
              <div className="max-h-72 space-y-2 overflow-y-auto rounded-2xl border border-border bg-background/40 p-3">
                {transcript.map((m, i) => (
                  <div key={i} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                    {m.content}
                  </div>
                ))}
                {partial && (
                  <div className="ml-auto max-w-[85%] rounded-2xl bg-primary/40 px-3 py-2 text-sm text-primary-foreground italic">
                    {partial}…
                  </div>
                )}
                {isThinking && (
                  <div className="flex items-center gap-2 rounded-2xl bg-muted px-3 py-2 text-sm text-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Emma oʻylayapti…
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {[
          { icon: Mic, title: "Bemalol gapiring", text: "Xato qilishdan qoʻrqmang — Emma sabrli." },
          { icon: Volume2, title: "Tinglang", text: "Emmaning talaffuziga eʼtibor bering." },
          { icon: Sparkles, title: "Mavzular", text: "Sayohat, kino, kelajak — istalgan mavzu." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-4">
            <Icon className="h-5 w-5 text-primary" />
            <p className="mt-2 text-sm font-black text-foreground">{title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>

      {showSettings && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-xl" onClick={() => setShowSettings(false)}>
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-premium" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-foreground">Emma sozlamalari</h3>
              <button onClick={() => setShowSettings(false)} className="rounded-2xl p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Yosh</label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(AGE_LABEL) as AgeGroup[]).map((a) => (
                    <button key={a} onClick={() => setAge(a)} className={`rounded-2xl border px-3 py-2 text-sm font-bold transition-all ${age === a ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/60"}`}>
                      {AGE_LABEL[a]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Ovoz toni</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(TONE_LABEL) as VoiceTone[]).map((t) => (
                    <button key={t} onClick={() => setTone(t)} className={`rounded-2xl border px-3 py-2 text-sm font-bold transition-all ${tone === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/60"}`}>
                      {TONE_LABEL[t]}
                    </button>
                  ))}
                </div>
              </div>

              <p className="rounded-2xl bg-primary/10 p-3 text-xs text-foreground">
                💡 Eng yaxshi natija uchun <b>Chrome</b> yoki <b>Edge</b> brauzerini ishlating. Mikrofonga ruxsat bering va aniq, sekin gapiring.
              </p>
            </div>

            <button onClick={() => setShowSettings(false)} className="premium-button mt-6 w-full rounded-2xl py-3 font-black">
              Saqlash
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes voice-bar { from { transform: scaleY(0.4); } to { transform: scaleY(1); } }
        @keyframes float-up { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; } 50% { transform: translateY(-20px) scale(1.5); opacity: 1; } }
      `}</style>
    </section>
  );
}
