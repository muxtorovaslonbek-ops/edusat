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
  Languages,
  RefreshCw,
} from "lucide-react";
import femaleImg from "@/assets/ai-tutor.jpg";
import maleImg from "@/assets/ai-tutor-male.jpg";
import { supabase } from "@/integrations/supabase/client";

type VoiceTone = "warm" | "energetic" | "calm" | "playful";
type AgeGroup = "young" | "adult" | "mature";
type Gender = "female" | "male";
type LangCode = "en" | "ru" | "ko" | "de" | "fr" | "tr" | "zh";
type Msg = { role: "user" | "assistant"; content: string };

const SPEED_MIN = 0.1;
const SPEED_MAX = 2.0;
const speedLabel = (s: number) => `${s.toFixed(1)}x ${s < 0.6 ? "🐢" : s < 1.1 ? "🚶" : s < 1.6 ? "⚡" : "🚀"}`;

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

const LANGS: { code: LangCode; label: string; flag: string; bcp: string; tutorF: string; tutorM: string }[] = [
  { code: "en", label: "Ingliz tili",  flag: "🇬🇧", bcp: "en-US", tutorF: "Emma",   tutorM: "Adam"   },
  { code: "ru", label: "Rus tili",     flag: "🇷🇺", bcp: "ru-RU", tutorF: "Anna",   tutorM: "Ivan"   },
  { code: "ko", label: "Koreys tili",  flag: "🇰🇷", bcp: "ko-KR", tutorF: "Jiwoo",  tutorM: "Minho"  },
  { code: "de", label: "Nemis tili",   flag: "🇩🇪", bcp: "de-DE", tutorF: "Lena",   tutorM: "Max"    },
  { code: "fr", label: "Fransuz tili", flag: "🇫🇷", bcp: "fr-FR", tutorF: "Chloé",  tutorM: "Louis"  },
  { code: "tr", label: "Turk tili",    flag: "🇹🇷", bcp: "tr-TR", tutorF: "Elif",   tutorM: "Mehmet" },
  { code: "zh", label: "Xitoy tili",   flag: "🇨🇳", bcp: "zh-CN", tutorF: "Mei",    tutorM: "Wei"    },
];

const VOICE_PARAMS: Record<AgeGroup, Record<VoiceTone, { pitch: number; rate: number }>> = {
  young:  { warm: { pitch: 1.2, rate: 1.0 },  energetic: { pitch: 1.3, rate: 1.12 }, calm: { pitch: 1.1, rate: 0.9 }, playful: { pitch: 1.35, rate: 1.08 } },
  adult:  { warm: { pitch: 1.0, rate: 0.98 }, energetic: { pitch: 1.1, rate: 1.08 }, calm: { pitch: 0.95, rate: 0.9 }, playful: { pitch: 1.15, rate: 1.05 } },
  mature: { warm: { pitch: 0.9, rate: 0.93 }, energetic: { pitch: 1.0, rate: 1.02 }, calm: { pitch: 0.85, rate: 0.88 }, playful: { pitch: 1.0, rate: 0.98 } },
};

const TONE_KEY = "edusat:speakingTone";
const AGE_KEY  = "edusat:speakingAge";
const GENDER_KEY = "edusat:speakingGender";
const LANG_KEY = "edusat:speakingLang";
const SPEED_KEY = "edusat:speakingSpeed";

interface Props { userName?: string; }

export default function SpeakingTutor({ userName = "" }: Props) {
  const [tone, setTone] = useState<VoiceTone>(() => { try { return (localStorage.getItem(TONE_KEY) as VoiceTone) || "warm"; } catch { return "warm"; } });
  const [age, setAge] = useState<AgeGroup>(() => { try { return (localStorage.getItem(AGE_KEY) as AgeGroup) || "adult"; } catch { return "adult"; } });
  const [gender, setGender] = useState<Gender>(() => { try { return (localStorage.getItem(GENDER_KEY) as Gender) || "female"; } catch { return "female"; } });
  const [lang, setLang] = useState<LangCode>(() => { try { return (localStorage.getItem(LANG_KEY) as LangCode) || "en"; } catch { return "en"; } });
  const [speed, setSpeed] = useState<number>(() => { try { const v = parseFloat(localStorage.getItem(SPEED_KEY) || ""); return isFinite(v) && v >= SPEED_MIN && v <= SPEED_MAX ? v : 1.0; } catch { return 1.0; } });

  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState<Msg[]>([]);
  const [partial, setPartial] = useState("");
  const [pulse, setPulse] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Translator state
  const [translateText, setTranslateText] = useState("");
  const [translateResult, setTranslateResult] = useState("");
  const [translating, setTranslating] = useState(false);
  const [translateFrom, setTranslateFrom] = useState<LangCode | "uz" | "auto">("auto");
  const [translateTo, setTranslateTo] = useState<LangCode | "uz">("uz");
  const [popoverWord, setPopoverWord] = useState<{ word: string; translation: string; loading: boolean } | null>(null);

  const recogRef = useRef<any>(null);
  const messagesRef = useRef<Msg[]>([]);
  const isActiveRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const lastAssistantRef = useRef<string>("");
  const silenceCountRef = useRef(0);
  const restartTimerRef = useRef<number | null>(null);

  const langInfo = useMemo(() => LANGS.find(l => l.code === lang) || LANGS[0], [lang]);
  const tutorName = gender === "female" ? langInfo.tutorF : langInfo.tutorM;
  const tutorImg = gender === "female" ? femaleImg : maleImg;

  useEffect(() => { try { localStorage.setItem(TONE_KEY, tone); } catch {} }, [tone]);
  useEffect(() => { try { localStorage.setItem(AGE_KEY, age); } catch {} }, [age]);
  useEffect(() => { try { localStorage.setItem(GENDER_KEY, gender); } catch {} }, [gender]);
  useEffect(() => { try { localStorage.setItem(LANG_KEY, lang); } catch {} }, [lang]);
  useEffect(() => { try { localStorage.setItem(SPEED_KEY, String(speed)); } catch {} }, [speed]);
  useEffect(() => { messagesRef.current = transcript; }, [transcript]);
  useEffect(() => { isActiveRef.current = isActive; }, [isActive]);
  useEffect(() => { isSpeakingRef.current = isSpeaking; }, [isSpeaking]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) setVoices(v);
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    // Some browsers need polling before voices are exposed
    const id = window.setInterval(() => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) { setVoices(v); window.clearInterval(id); }
    }, 250);
    window.setTimeout(() => window.clearInterval(id), 5000);
    return () => { window.speechSynthesis.onvoiceschanged = null; window.clearInterval(id); };
  }, []);


  const voicePick = useMemo(() => {
    if (!voices.length) return { voice: null as SpeechSynthesisVoice | null, confident: false };
    const prefix = langInfo.bcp.split("-")[0].toLowerCase();
    const matching = voices.filter(v => v.lang?.toLowerCase().startsWith(prefix));
    const list = matching.length ? matching : voices;

    const femaleHints = ["female", "woman", "girl", "samantha", "victoria", "karen", "moira", "tessa", "fiona", "zira", "hazel", "aria", "jenny", "emma", "ava", "susan", "katja", "marie", "amélie", "amelie", "yelda", "tingting", "milena", "elena", "sofia", "isabella", "lisa", "nora", "anna", "chloé", "chloe", "lena", "elif", "mei", "jiwoo", "yuna", "natasha", "irina"];
    const maleHints = ["male", " man", "boy", "daniel", "alex", "fred", "tom", "david", "mark", "george", "ivan", "minho", "max ", "louis", "mehmet", "wei", "yunyang", "diego", "jorge", "paul", "james", "matthew", "guy", "yuri", "pavel", "boris", "adam", "ethan", "arthur", "oleg", "kyle", "aaron"];

    const hasAny = (name: string, hints: string[]) => hints.some(h => name.includes(h));
    const isMale = gender === "male";
    const wanted = isMale ? maleHints : femaleHints;
    const opposite = isMale ? femaleHints : maleHints;

    // 1) STRICT match wanted gender
    for (const v of list) {
      const n = (v.name || "").toLowerCase();
      if (hasAny(n, wanted) && !hasAny(n, opposite)) return { voice: v, confident: true };
    }
    // 2) Any voice in lang that is NOT clearly opposite gender
    const safe = list.find(v => !hasAny((v.name || "").toLowerCase(), opposite));
    if (safe) return { voice: safe, confident: false };
    // 3) Fallback: just pick first in-language voice and rely on heavy pitch shift
    if (list[0]) return { voice: list[0], confident: false };
    return { voice: null as SpeechSynthesisVoice | null, confident: false };
  }, [voices, langInfo, gender]);

  const pickedVoice = voicePick.voice;
  const voiceConfident = voicePick.confident;

  const buildUtter = useCallback((text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    if (pickedVoice) utter.voice = pickedVoice;
    utter.lang = pickedVoice?.lang || langInfo.bcp;
    const params = VOICE_PARAMS[age][tone];
    let pitch = params.pitch;
    // Only nudge pitch when the picked voice doesn't clearly match the requested gender —
    // heavy shifts make TTS sound robotic/distorted.
    if (gender === "male") {
      pitch = voiceConfident ? params.pitch : Math.max(0.4, params.pitch - 0.5);
    } else {
      pitch = voiceConfident ? params.pitch : Math.min(1.8, params.pitch + 0.4);
    }
    utter.pitch = Math.max(0.1, Math.min(2, pitch));
    utter.rate = Math.min(2, Math.max(0.1, params.rate * speed));
    utter.volume = 1;
    return utter;
  }, [pickedVoice, voiceConfident, age, tone, gender, langInfo, speed]);


  // Preview voice when settings change
  const previewVoice = useCallback(() => {
    if (!("speechSynthesis" in window)) return;
    if (isActive) return;
    window.speechSynthesis.cancel();
    const samples: Record<LangCode, string> = {
      en: "Hello, this is how I sound.",
      ru: "Привет, вот так я звучу.",
      ko: "안녕하세요, 제 목소리예요.",
      de: "Hallo, so klinge ich.",
      fr: "Bonjour, voici ma voix.",
      tr: "Merhaba, sesim böyle.",
      zh: "你好,这就是我的声音。",
    };
    window.speechSynthesis.speak(buildUtter(samples[lang]));
  }, [buildUtter, lang, isActive]);

  // Pulse animation
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
      try { window.speechSynthesis.cancel(); } catch {}
      // Chrome needs a microtask break after cancel() before speak() fires reliably
      setTimeout(() => {
        const utter = buildUtter(text);
        let resolved = false;
        const done = () => { if (resolved) return; resolved = true; setIsSpeaking(false); resolve(); };
        utter.onstart = () => setIsSpeaking(true);
        utter.onend = done;
        utter.onerror = done;
        try { window.speechSynthesis.speak(utter); } catch { done(); }
      }, 60);
    });
  }, [buildUtter]);


  const stopRecog = useCallback(() => {
    if (recogRef.current) {
      try { recogRef.current.onend = null; recogRef.current.onerror = null; recogRef.current.stop(); } catch {}
      recogRef.current = null;
    }
  }, []);

  const sendToAI = useCallback(async (msgs: Msg[]) => {
    setIsThinking(true);
    try {
      const { data, error } = await supabase.functions.invoke("speaking-chat", {
        body: { action: "chat", messages: msgs, tone, age, gender, lang, userName, tutorName },
      });
      setIsThinking(false);
      if (error) throw error;
      const reply: string = (data as any)?.reply || "";
      if (!reply) {
        if (isActiveRef.current) scheduleListen(300);
        return;
      }
      lastAssistantRef.current = reply;
      const updated = [...msgs, { role: "assistant" as const, content: reply }];
      setTranscript(updated);
      await speak(reply);
      if (isActiveRef.current) scheduleListen(250);
    } catch (e: any) {
      setIsThinking(false);
      console.error(e);
      setError("AI bilan bogʻlanishda xatolik. Qayta urinib koʻring.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tone, age, gender, lang, userName, tutorName, speak]);

  const startListening = useCallback(() => {
    const SpeechRecognition: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Brauzeringiz nutq tanishni qoʻllab-quvvatlamaydi. Chrome yoki Edge ishlating.");
      return;
    }
    if (!isActiveRef.current || isSpeakingRef.current) return;
    stopRecog();

    const recog = new SpeechRecognition();
    recog.lang = langInfo.bcp;
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
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setError("Mikrofonga ruxsat berilmadi. Brauzer sozlamalarini tekshiring.");
        setIsActive(false);
        isActiveRef.current = false;
      }
      // other errors: let onend handle restart
    };
    recog.onend = async () => {
      setIsListening(false);
      const text = finalText.trim();
      setPartial("");
      if (!text) {
        // user said nothing — just keep listening silently, do NOT repeat the question
        if (!isActiveRef.current || isSpeakingRef.current) return;
        scheduleListen(400);
        return;
      }
      const userMsg: Msg = { role: "user", content: text };
      const newMessages = [...messagesRef.current, userMsg];
      setTranscript(newMessages);
      await sendToAI(newMessages);
    };
    recogRef.current = recog;
    try { recog.start(); } catch (err) { console.warn(err); scheduleListen(500); }
  }, [langInfo, stopRecog, speak, sendToAI]);

  const scheduleListen = useCallback((delay: number) => {
    if (restartTimerRef.current) window.clearTimeout(restartTimerRef.current);
    restartTimerRef.current = window.setTimeout(() => {
      if (isActiveRef.current && !isSpeakingRef.current) startListening();
    }, delay);
  }, [startListening]);

  const startSession = useCallback(async () => {
    setError(null);
    try { await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch { setError("Mikrofonga ruxsat kerak."); return; }

    setIsActive(true);
    isActiveRef.current = true;
    setTranscript([]);
    messagesRef.current = [];
    silenceCountRef.current = 0;

    // Localized greeting in target language
    const greetings: Record<LangCode, string> = {
      en: `Hi ${userName || "there"}! I'm ${tutorName}, your ${langInfo.label.toLowerCase()} speaking partner. How are you today?`,
      ru: `Привет, ${userName || "друг"}! Меня зовут ${tutorName}, я твой собеседник по русскому языку. Как у тебя дела?`,
      ko: `안녕하세요, ${userName || "친구"}! 저는 ${tutorName}이에요. 오늘 기분이 어떠세요?`,
      de: `Hallo ${userName || "Freund"}! Ich bin ${tutorName}, dein Deutsch-Sprachpartner. Wie geht es dir heute?`,
      fr: `Salut ${userName || "ami"} ! Je suis ${tutorName}, ton partenaire de français. Comment vas-tu aujourd'hui ?`,
      tr: `Merhaba ${userName || "arkadaş"}! Ben ${tutorName}, Türkçe konuşma partnerinim. Bugün nasılsın?`,
      zh: `你好 ${userName || "朋友"}!我是 ${tutorName},你的中文聊天伙伴。你今天好吗?`,
    };
    const greeting = greetings[lang];
    lastAssistantRef.current = greeting;
    const initial: Msg[] = [{ role: "assistant", content: greeting }];
    setTranscript(initial);
    messagesRef.current = initial;
    await speak(greeting);
    if (isActiveRef.current) scheduleListen(300);
  }, [userName, tutorName, langInfo, lang, speak, scheduleListen]);

  const stopSession = useCallback(() => {
    setIsActive(false);
    isActiveRef.current = false;
    if (restartTimerRef.current) { window.clearTimeout(restartTimerRef.current); restartTimerRef.current = null; }
    stopRecog();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsListening(false);
    setIsSpeaking(false);
    setIsThinking(false);
    setPartial("");
  }, [stopRecog]);

  const repeatLast = useCallback(async () => {
    if (!lastAssistantRef.current) return;
    stopRecog();
    await speak(lastAssistantRef.current);
    if (isActiveRef.current) scheduleListen(250);
  }, [stopRecog, speak, scheduleListen]);

  useEffect(() => () => stopSession(), [stopSession]);

  // Translator
  const translate = useCallback(async (text: string, from: string = lang, to: string = "uz") => {
    const t = text.trim();
    if (!t) return "";
    const { data, error } = await supabase.functions.invoke("speaking-chat", {
      body: { action: "translate", text: t, from, to },
    });
    if (error) throw error;
    return ((data as any)?.translation as string) || "";
  }, [lang]);

  const handleTranslateClick = useCallback(async () => {
    if (!translateText.trim()) return;
    if (translateFrom === translateTo) {
      setTranslateResult("Manba va maqsad til bir xil — boshqasini tanlang");
      return;
    }
    setTranslating(true);
    setTranslateResult("");
    try {
      const t = await translate(translateText, translateFrom, translateTo);
      setTranslateResult(t || "Tarjima topilmadi");
    } catch (e) {
      console.error(e);
      setTranslateResult("Tarjima xatosi — qayta urinib ko'ring");
    } finally { setTranslating(false); }
  }, [translateText, translate, translateFrom, translateTo]);

  const handleWordClick = useCallback(async (word: string) => {
    const clean = word.replace(/[.,!?;:"()\[\]{}]/g, "").trim();
    if (!clean) return;
    setPopoverWord({ word: clean, translation: "", loading: true });
    try {
      const t = await translate(clean, lang, "uz");
      setPopoverWord({ word: clean, translation: t, loading: false });
    } catch {
      setPopoverWord({ word: clean, translation: "Xatolik", loading: false });
    }
  }, [translate, lang]);

  const renderClickable = (text: string) => {
    const parts = text.split(/(\s+)/);
    return parts.map((p, i) => {
      if (/^\s+$/.test(p)) return <span key={i}>{p}</span>;
      return (
        <button
          key={i}
          onClick={() => handleWordClick(p)}
          className="hover:underline decoration-dotted underline-offset-2 hover:text-primary transition-colors"
          title="Tarjima qilish uchun bosing"
        >{p}</button>
      );
    });
  };

  const statusLabel = isThinking ? "Oʻylayapti…" : isSpeaking ? "Gapiryapti…" : isListening ? "Tinglayapti…" : isActive ? "Tayyor" : "Boshlash uchun bosing";

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI Speaking Practice
          </p>
          <h2 className="mt-3 text-3xl font-black text-foreground md:text-4xl">
            {tutorName} bilan {langInfo.label.toLowerCase()}da gaplash
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Haqiqiy odam bilan suhbatlashayotganday — {tutorName} sizni eshitadi, savol beradi va javob qaytaradi. Til, jins, ovoz, yoshni o'zingiz tanlang.
          </p>
        </div>
        <button onClick={() => setShowSettings(true)} className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 text-sm font-bold text-foreground transition-all hover:bg-primary/10 hover:text-primary">
          <Settings2 className="h-4 w-4" /> Sozlamalar
        </button>
      </header>

      {/* Quick language picker */}
      <div className="flex flex-wrap gap-2">
        {LANGS.map(l => (
          <button
            key={l.code}
            onClick={() => { if (isActive) stopSession(); setLang(l.code); }}
            className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-bold transition-all ${lang === l.code ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/60"}`}
          >
            <span className="text-base">{l.flag}</span> {l.label}
          </button>
        ))}
      </div>

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
              <img src={tutorImg} alt={`${tutorName} — AI ${langInfo.label} oʻqituvchisi`} className="h-full w-full object-cover" width={512} height={512} />
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
              <p className="mt-1 text-sm font-bold text-foreground">{langInfo.flag} {langInfo.label} • {gender === "female" ? "👩 Ayol" : "👨 Erkak"} • {AGE_LABEL[age]} • {TONE_LABEL[tone]} • {speedLabel(speed)}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{tutorName} — sizning shaxsiy suhbat sherigingiz</p>
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
                <>
                  <button onClick={stopSession} className="inline-flex items-center gap-2 rounded-2xl bg-destructive px-6 py-3 text-base font-black text-destructive-foreground transition-all hover:opacity-90">
                    <PhoneOff className="h-5 w-5" /> Tugatish
                  </button>
                  <button onClick={repeatLast} className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-5 py-3 text-sm font-black text-foreground transition-all hover:bg-primary/10 hover:text-primary" title="Oxirgi savolni qayta eshiting">
                    <RefreshCw className="h-4 w-4" /> Qaytarish
                  </button>
                </>
              )}
            </div>

            {(transcript.length > 0 || partial) && (
              <div className="max-h-72 space-y-2 overflow-y-auto rounded-2xl border border-border bg-background/40 p-3">
                {transcript.map((m, i) => (
                  <div key={i} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                    {m.role === "assistant" ? renderClickable(m.content) : m.content}
                  </div>
                ))}
                {partial && (
                  <div className="ml-auto max-w-[85%] rounded-2xl bg-primary/40 px-3 py-2 text-sm text-primary-foreground italic">
                    {partial}…
                  </div>
                )}
                {isThinking && (
                  <div className="flex items-center gap-2 rounded-2xl bg-muted px-3 py-2 text-sm text-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> {tutorName} oʻylayapti…
                  </div>
                )}
                <p className="pt-1 text-center text-[10px] text-muted-foreground">💡 Bilmagan so'zingizni bosing — uzbekcha tarjima chiqadi</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Translator */}
      <div className="rounded-3xl border border-border bg-card p-5 shadow-premium">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Languages className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-black text-foreground">Tarjimon</h3>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {translateFrom === "auto" ? "🌐 Avto-aniqlash" : translateFrom === "uz" ? "🇺🇿 O'zbek" : `${LANGS.find(l => l.code === translateFrom)?.flag} ${LANGS.find(l => l.code === translateFrom)?.label}`}
            <span className="mx-1">→</span>
            {translateTo === "uz" ? "🇺🇿 O'zbek" : `${LANGS.find(l => l.code === translateTo)?.flag} ${LANGS.find(l => l.code === translateTo)?.label}`}
          </span>
        </div>

        <div className="mb-3 grid gap-2 md:grid-cols-[1fr,auto,1fr] md:items-center">
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Qaysi tildan</label>
            <select
              value={translateFrom}
              onChange={(e) => setTranslateFrom(e.target.value as any)}
              className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm font-bold text-foreground outline-none focus:border-primary"
            >
              <option value="auto">🌐 Avto-aniqlash</option>
              <option value="uz">🇺🇿 O'zbek</option>
              {LANGS.map(l => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
            </select>
          </div>
          <button
            type="button"
            onClick={() => {
              if (translateFrom === "auto") return;
              const f = translateFrom; const t = translateTo;
              setTranslateFrom(t as any); setTranslateTo(f as any);
              setTranslateResult("");
            }}
            className="hidden md:inline-flex h-10 mt-5 items-center justify-center rounded-2xl border border-border bg-card px-3 text-foreground hover:bg-primary/10 hover:text-primary"
            title="Tillarni almashtirish"
          >
            ⇄
          </button>
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Qaysi tilga</label>
            <select
              value={translateTo}
              onChange={(e) => setTranslateTo(e.target.value as any)}
              className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm font-bold text-foreground outline-none focus:border-primary"
            >
              <option value="uz">🇺🇿 O'zbek</option>
              {LANGS.map(l => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
            </select>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <textarea
              value={translateText}
              onChange={(e) => setTranslateText(e.target.value)}
              placeholder="Tarjima qilmoqchi bo'lgan so'z yoki gapni yozing..."
              rows={4}
              className="w-full resize-none rounded-2xl border border-border bg-background p-3 text-sm text-foreground outline-none focus:border-primary"
            />
            <button
              onClick={handleTranslateClick}
              disabled={translating || !translateText.trim()}
              className="premium-button mt-2 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-black disabled:opacity-50"
            >
              {translating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
              Tarjima qilish
            </button>
          </div>
          <div className="rounded-2xl border border-border bg-background/60 p-3 text-sm text-foreground min-h-[120px] whitespace-pre-wrap">
            {translating ? <span className="text-muted-foreground">Tarjima qilinmoqda…</span> : (translateResult || <span className="text-muted-foreground">Natija bu yerda chiqadi</span>)}
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {[
          { icon: Mic, title: "Bemalol gapiring", text: "Xato qilishdan qoʻrqmang — sabrli o'qituvchi." },
          { icon: Volume2, title: "Tinglang", text: "Tabiiy talaffuzga eʼtibor bering." },
          { icon: Sparkles, title: "Mavzular", text: "Sayohat, kino, kelajak — istalgan mavzu." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-4">
            <Icon className="h-5 w-5 text-primary" />
            <p className="mt-2 text-sm font-black text-foreground">{title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>

      {/* Word translation popover */}
      {popoverWord && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-xl" onClick={() => setPopoverWord(null)}>
          <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-premium" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{langInfo.flag} {langInfo.label}</p>
              <button onClick={() => setPopoverWord(null)} className="rounded-xl p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary"><X className="h-4 w-4" /></button>
            </div>
            <p className="mt-2 text-2xl font-black text-foreground">{popoverWord.word}</p>
            <div className="mt-4 rounded-2xl bg-primary/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">🇺🇿 O'zbekcha</p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {popoverWord.loading ? <Loader2 className="h-5 w-5 animate-spin" /> : popoverWord.translation}
              </p>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-xl" onClick={() => setShowSettings(false)}>
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-premium max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-foreground">{tutorName} sozlamalari</h3>
              <button onClick={() => setShowSettings(false)} className="rounded-2xl p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Til</label>
                <div className="grid grid-cols-2 gap-2">
                  {LANGS.map(l => (
                    <button key={l.code} onClick={() => { if (isActive) stopSession(); setLang(l.code); }} className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-bold transition-all ${lang === l.code ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/60"}`}>
                      <span>{l.flag}</span> {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span>Jins</span>
                  <button type="button" onClick={previewVoice} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary hover:bg-primary/20">▶ Ovozni eshitish</button>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["female", "male"] as Gender[]).map(g => (
                    <button key={g} onClick={() => { if (isActive) stopSession(); setGender(g); setTimeout(previewVoice, 50); }} className={`rounded-2xl border px-3 py-2 text-sm font-bold transition-all ${gender === g ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/60"}`}>
                      {g === "female" ? "👩 Ayol" : "👨 Erkak"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Yosh</label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(AGE_LABEL) as AgeGroup[]).map((a) => (
                    <button key={a} onClick={() => { setAge(a); setTimeout(previewVoice, 50); }} className={`rounded-2xl border px-3 py-2 text-sm font-bold transition-all ${age === a ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/60"}`}>
                      {AGE_LABEL[a]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Ovoz toni</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(TONE_LABEL) as VoiceTone[]).map((t) => (
                    <button key={t} onClick={() => { setTone(t); setTimeout(previewVoice, 50); }} className={`rounded-2xl border px-3 py-2 text-sm font-bold transition-all ${tone === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/60"}`}>
                      {TONE_LABEL[t]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span>Gapirish tezligi</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-black text-primary">{speedLabel(speed)}</span>
                </label>
                <input
                  type="range"
                  min={SPEED_MIN}
                  max={SPEED_MAX}
                  step={0.1}
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  onMouseUp={() => setTimeout(previewVoice, 30)}
                  onTouchEnd={() => setTimeout(previewVoice, 30)}
                  className="w-full accent-primary"
                />
                <div className="mt-1 flex justify-between text-[10px] font-bold text-muted-foreground">
                  <span>0.1x 🐢</span><span>1.0x</span><span>2.0x 🚀</span>
                </div>
              </div>

              <p className="rounded-2xl bg-primary/10 p-3 text-xs text-foreground">
                💡 Eng yaxshi natija uchun <b>Chrome</b> yoki <b>Edge</b> brauzerini ishlating. Mikrofonga ruxsat bering va aniq, sekin gapiring. Til o'zgarganda suhbat qaytadan boshlanadi. Erkak ovozi mavjud bo'lmasa, tizim past pitch bilan taqlid qiladi.
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
