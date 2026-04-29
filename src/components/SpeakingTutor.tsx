import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useConversation } from "@elevenlabs/react";
import {
  Mic,
  MicOff,
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

type VoiceTone = "warm" | "energetic" | "calm" | "playful";
type AgeGroup = "young" | "adult" | "mature";

const VOICE_LIBRARY: Record<AgeGroup, Record<VoiceTone, { id: string; name: string }>> = {
  young: {
    warm:      { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah — yosh va iliq" },
    energetic: { id: "Xb7hH8MSUJpSbSDYk0k2", name: "Alice — yosh va shoʻx" },
    calm:      { id: "pFZP5JQG7iQjIQuC4Bku", name: "Lily — yosh va xotirjam" },
    playful:   { id: "Xb7hH8MSUJpSbSDYk0k2", name: "Alice — yosh va oʻyinqaroq" },
  },
  adult: {
    warm:      { id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura — kattalar, iliq" },
    energetic: { id: "XrExE9yKIg1WjnnlVkGX", name: "Matilda — kattalar, energiyali" },
    calm:      { id: "cgSgspJ2msm6clMCkdW9", name: "Jessica — kattalar, xotirjam" },
    playful:   { id: "XrExE9yKIg1WjnnlVkGX", name: "Matilda — kattalar, oʻyinqaroq" },
  },
  mature: {
    warm:      { id: "SAhdygBsjizE9aIj39dz", name: "Mrs Claus — yetuk, iliq" },
    energetic: { id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura — yetuk, energiyali" },
    calm:      { id: "cgSgspJ2msm6clMCkdW9", name: "Jessica — yetuk, xotirjam" },
    playful:   { id: "SAhdygBsjizE9aIj39dz", name: "Mrs Claus — yetuk, oʻyinqaroq" },
  },
};

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

const TONE_PROMPT: Record<VoiceTone, string> = {
  warm: "Speak in a warm, friendly, encouraging tone like a supportive friend.",
  energetic: "Speak with high energy, enthusiasm and excitement, like a motivational coach.",
  calm: "Speak in a calm, soft, patient tone like a gentle mentor.",
  playful: "Speak in a playful, cheerful, lighthearted tone with a bit of humor.",
};

const AGE_PROMPT: Record<AgeGroup, string> = {
  young: "You sound like a 20-year-old university student — modern, casual and relatable.",
  adult: "You sound like a 30-year-old experienced English teacher — confident and clear.",
  mature: "You sound like a 45-year-old senior tutor — wise, articulate and patient.",
};

const buildSystemPrompt = (tone: VoiceTone, age: AgeGroup, userName: string) => `
You are Emma, a friendly AI English speaking tutor for the EduSAT Academy app.
${AGE_PROMPT[age]} ${TONE_PROMPT[tone]}

GOAL: Help the learner practice ENGLISH speaking through a natural, free-flowing conversation.

RULES:
- Always respond in ENGLISH only, even if the learner uses another language.
- Keep replies short (1-3 sentences) so the learner can talk more than you.
- After your reply, almost always ask ONE follow-up question to keep the dialogue going.
- Greet the learner by name at the very start. Their name is "${userName || "friend"}".
- Listen carefully to what they actually said and react to it — never ignore their answer.
- Gently correct major grammar/pronunciation mistakes, but only when truly needed.
- Never break character. Never mention you are an AI, an LLM, or ElevenLabs.
- Never read out long lists or use markdown — this is a SPOKEN conversation.

Start the very first turn by warmly greeting the learner by name and asking how their day is going.
`.trim();

interface SpeakingTutorProps {
  userName?: string;
}

const STORAGE_KEY = "edusat:speakingAgentId";
const TONE_KEY = "edusat:speakingTone";
const AGE_KEY = "edusat:speakingAge";

export default function SpeakingTutor({ userName = "" }: SpeakingTutorProps) {
  const [agentId, setAgentId] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || ""; } catch { return ""; }
  });
  const [tone, setTone] = useState<VoiceTone>(() => {
    try { return (localStorage.getItem(TONE_KEY) as VoiceTone) || "warm"; } catch { return "warm"; }
  });
  const [age, setAge] = useState<AgeGroup>(() => {
    try { return (localStorage.getItem(AGE_KEY) as AgeGroup) || "adult"; } catch { return "adult"; }
  });

  const [showSettings, setShowSettings] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<Array<{ role: "user" | "agent"; text: string }>>([]);
  const [pulse, setPulse] = useState(0);

  const conversation = useConversation({
    onConnect: () => { setError(null); },
    onDisconnect: () => { setIsConnecting(false); },
    onMessage: (message: any) => {
      // ElevenLabs sends different shapes; normalize
      const source = message?.source || message?.role || message?.type;
      const text = message?.message || message?.text || message?.content;
      if (!text) return;
      if (source === "user" || source === "user_transcript") {
        setTranscript((prev) => [...prev, { role: "user", text }]);
      } else if (source === "ai" || source === "agent" || source === "assistant" || source === "agent_response") {
        setTranscript((prev) => [...prev, { role: "agent", text }]);
      }
    },
    onError: (err: any) => {
      console.error("Conversation error:", err);
      setError(typeof err === "string" ? err : err?.message || "Ulanishda xatolik. Agent ID toʻgʻri ekanini tekshiring.");
      setIsConnecting(false);
    },
  });

  const status = conversation.status;
  const isConnected = status === "connected";
  const isSpeaking = conversation.isSpeaking;

  // Persist preferences
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, agentId); } catch {} }, [agentId]);
  useEffect(() => { try { localStorage.setItem(TONE_KEY, tone); } catch {} }, [tone]);
  useEffect(() => { try { localStorage.setItem(AGE_KEY, age); } catch {} }, [age]);

  // Animate the avatar pulse based on whether tutor is speaking
  useEffect(() => {
    if (!isConnected) { setPulse(0); return; }
    let raf = 0;
    const tick = () => {
      const target = isSpeaking ? Math.random() * 0.7 + 0.3 : 0.05;
      setPulse((p) => p + (target - p) * 0.3);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isConnected, isSpeaking]);

  const selectedVoice = useMemo(() => VOICE_LIBRARY[age][tone], [age, tone]);

  const startConversation = useCallback(async () => {
    if (!agentId.trim()) {
      setShowHowTo(true);
      setError("Iltimos, avval ElevenLabs Agent ID kiriting.");
      return;
    }
    setError(null);
    setIsConnecting(true);
    setTranscript([]);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: agentId.trim(),
        connectionType: "webrtc",
        overrides: {
          agent: {
            prompt: { prompt: buildSystemPrompt(tone, age, userName) },
            firstMessage: `Hi ${userName || "there"}! I'm Emma, your English speaking partner. How are you today?`,
            language: "en",
          },
          tts: { voiceId: selectedVoice.id },
        } as any,
      });
    } catch (err: any) {
      console.error("Failed to start conversation:", err);
      setError(
        err?.message?.includes("Permission") || err?.name === "NotAllowedError"
          ? "Mikrofonga ruxsat berilmadi. Brauzer sozlamalarida ruxsat bering."
          : "Ulanib boʻlmadi. Agent ID toʻgʻri va Public ekanini tekshiring."
      );
      setIsConnecting(false);
    }
  }, [agentId, conversation, tone, age, userName, selectedVoice.id]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

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
            Haqiqiy odam bilan suhbatlashayotganday — Emma sizni eshitadi, savol beradi va javob qaytaradi. Mikrofonga gapiring, tabiiy suhbat boshlanadi.
          </p>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 text-sm font-bold text-foreground transition-all hover:bg-primary/10 hover:text-primary"
        >
          <Settings2 className="h-4 w-4" /> Sozlamalar
        </button>
      </header>

      {/* Main stage */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-card to-card p-6 shadow-premium md:p-10">
        {/* Animated background stars */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary/60"
              style={{
                top: `${(i * 37) % 100}%`,
                left: `${(i * 53) % 100}%`,
                animation: `float-up ${4 + (i % 5)}s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="relative grid gap-8 md:grid-cols-[auto,1fr] md:items-center">
          {/* Avatar */}
          <div className="relative mx-auto">
            {/* Outer pulse ring */}
            <div
              className="absolute inset-0 rounded-full bg-primary/30 blur-2xl transition-all duration-300"
              style={{
                transform: `scale(${1 + pulse * 0.5})`,
                opacity: 0.4 + pulse * 0.6,
              }}
            />
            {/* Mid ring */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-primary/40 transition-all duration-200 ${
                isConnected ? "animate-pulse" : ""
              }`}
              style={{ transform: `scale(${1.1 + pulse * 0.15})` }}
            />
            {/* Avatar image */}
            <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-primary/60 shadow-premium md:h-64 md:w-64">
              <img
                src={tutorImg}
                alt="Emma — AI ingliz tili oʻqituvchisi"
                className="h-full w-full object-cover"
                width={512}
                height={512}
              />
              {/* Speaking overlay */}
              {isSpeaking && (
                <div className="absolute inset-x-0 bottom-0 flex h-16 items-end justify-center gap-1 bg-gradient-to-t from-primary/40 to-transparent pb-3">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 rounded-full bg-white"
                      style={{
                        height: `${20 + Math.abs(Math.sin((Date.now() / 200) + i)) * 30}px`,
                        animation: `voice-bar 0.6s ease-in-out ${i * 0.08}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Status badge */}
            <div className="mt-4 flex justify-center">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
                  isConnected
                    ? isSpeaking
                      ? "bg-primary/20 text-primary"
                      : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${isConnected ? "bg-emerald-500" : "bg-muted-foreground"} ${isConnected ? "animate-pulse" : ""}`} />
                {isConnected ? (isSpeaking ? "Gapiryapti…" : "Tinglayapti…") : "Tayyor"}
              </span>
            </div>
          </div>

          {/* Right side: controls + transcript */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-border bg-background/60 p-4 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Hozirgi sozlama</p>
              <p className="mt-1 text-sm font-bold text-foreground">
                {AGE_LABEL[age]} • {TONE_LABEL[tone]}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{selectedVoice.name}</p>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {!isConnected ? (
                <button
                  onClick={startConversation}
                  disabled={isConnecting}
                  className="premium-button inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-base font-black disabled:opacity-60"
                >
                  {isConnecting ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /> Ulanmoqda…</>
                  ) : (
                    <><Phone className="h-5 w-5" /> Suhbatni boshlash</>
                  )}
                </button>
              ) : (
                <button
                  onClick={stopConversation}
                  className="inline-flex items-center gap-2 rounded-2xl bg-destructive px-6 py-3 text-base font-black text-destructive-foreground transition-all hover:opacity-90"
                >
                  <PhoneOff className="h-5 w-5" /> Tugatish
                </button>
              )}
              {!agentId && (
                <button
                  onClick={() => setShowHowTo(true)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-bold text-foreground transition-all hover:bg-primary/10 hover:text-primary"
                >
                  Qanday sozlash?
                </button>
              )}
            </div>

            {/* Transcript */}
            {transcript.length > 0 && (
              <div className="max-h-72 space-y-2 overflow-y-auto rounded-2xl border border-border bg-background/40 p-3">
                {transcript.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                      m.role === "user"
                        ? "ml-auto bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tip cards */}
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

      {/* Settings modal */}
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
                    <button
                      key={a}
                      onClick={() => setAge(a)}
                      className={`rounded-2xl border px-3 py-2 text-sm font-bold transition-all ${
                        age === a ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/60"
                      }`}
                    >
                      {AGE_LABEL[a]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Ovoz toni</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(TONE_LABEL) as VoiceTone[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`rounded-2xl border px-3 py-2 text-sm font-bold transition-all ${
                        tone === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/60"
                      }`}
                    >
                      {TONE_LABEL[t]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">ElevenLabs Agent ID</label>
                <input
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  placeholder="masalan: agent_01jxxxxxxxxxxxxxxx"
                  className="input-premium h-12 w-full rounded-2xl px-4 text-foreground placeholder:text-muted-foreground"
                />
                <button onClick={() => setShowHowTo(true)} className="mt-2 text-xs font-bold text-primary hover:underline">
                  Agent ID ni qayerdan olish?
                </button>
              </div>
            </div>

            <button onClick={() => setShowSettings(false)} className="premium-button mt-6 w-full rounded-2xl py-3 font-black">
              Saqlash
            </button>
          </div>
        </div>
      )}

      {/* How-to modal */}
      {showHowTo && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-xl" onClick={() => setShowHowTo(false)}>
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-premium" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-foreground">Agent ID ni qanday olish</h3>
              <button onClick={() => setShowHowTo(false)} className="rounded-2xl p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ol className="mt-4 space-y-3 text-sm text-foreground">
              <li><span className="mr-2 font-black text-primary">1.</span><a href="https://elevenlabs.io" target="_blank" rel="noreferrer" className="font-bold text-primary underline">elevenlabs.io</a> saytida bepul roʻyxatdan oʻting.</li>
              <li><span className="mr-2 font-black text-primary">2.</span> Chap menyudan <b>Agents</b> &gt; <b>Create Agent</b> tanlang.</li>
              <li><span className="mr-2 font-black text-primary">3.</span> Sozlamalarda <b>Authentication</b> &gt; <b>Allow public access</b> ni yoqing.</li>
              <li><span className="mr-2 font-black text-primary">4.</span> Agent sahifasida <b>Agent ID</b> ni nusxa oling.</li>
              <li><span className="mr-2 font-black text-primary">5.</span> Bu yerga, sozlamalar oynasidagi maydonga joylashtiring.</li>
            </ol>
            <p className="mt-4 rounded-2xl bg-primary/10 p-3 text-xs text-foreground">
              💡 Bepul tarifda har oy ~10 daqiqa suhbat bepul. Sozlamadagi yosh va ovoz toni har bir suhbat boshida avtomatik qoʻllaniladi.
            </p>
            <button onClick={() => setShowHowTo(false)} className="premium-button mt-6 w-full rounded-2xl py-3 font-black">
              Tushundim
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes voice-bar {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50%      { transform: translateY(-20px) scale(1.5); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
