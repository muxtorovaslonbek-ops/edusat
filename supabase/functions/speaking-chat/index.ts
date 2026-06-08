import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LANG_NAME: Record<string, string> = {
  en: "English",
  ru: "Russian",
  ko: "Korean",
  de: "German",
  fr: "French",
  tr: "Turkish",
  zh: "Mandarin Chinese",
  uz: "Uzbek",
};

const buildSystemPrompt = (
  tone: string,
  age: string,
  gender: string,
  lang: string,
  userName: string,
  tutorName: string,
) => {
  const toneMap: Record<string, string> = {
    warm: "Speak in a warm, friendly, encouraging tone like a supportive friend.",
    energetic: "Speak with high energy, enthusiasm and excitement.",
    calm: "Speak in a calm, soft, patient tone like a gentle mentor.",
    playful: "Speak in a playful, cheerful, lighthearted tone with a bit of humor.",
  };
  const ageMap: Record<string, string> = {
    young: "You sound like a 20-year-old university student — modern, casual and relatable.",
    adult: "You sound like a 30-year-old experienced language teacher — confident and clear.",
    mature: "You sound like a 45-year-old senior tutor — wise, articulate and patient.",
  };
  const language = LANG_NAME[lang] || "English";
  const genderDesc = gender === "male" ? "a male tutor" : "a female tutor";

  return `You are ${tutorName}, ${genderDesc} — a friendly AI ${language} speaking tutor for the EduSAT Academy app.
${ageMap[age] || ageMap.adult} ${toneMap[tone] || toneMap.warm}

GOAL: Help the learner practice ${language} speaking through a natural, free-flowing voice conversation.

RULES:
- Always reply in ${language} ONLY, even if the learner uses another language. Never switch to Uzbek or English (unless the target language is English).
- Keep replies SHORT — 1-2 sentences max — so the learner talks more than you.
- After each reply, ask ONE simple follow-up question to keep the dialogue going.
- The learner's name is "${userName || "friend"}". Greet them by name on the FIRST turn only.
- If the learner seems silent or confused, gently rephrase or simplify your last question.
- Listen carefully and react to what they actually said.
- Use simple, common vocabulary suitable for a learner.
- Gently correct major grammar mistakes only when truly needed.
- Never mention you are an AI or a language model. Never break character.
- No markdown, no lists, no emojis — this is SPOKEN conversation. Plain natural sentences only.`;
};

const ALLOWED_TUTOR_NAMES = new Set(["Emma", "Adam", "Anna", "Ivan", "Sophia", "Liam", "Mia", "Noah"]);

function sanitizeName(s: unknown, max = 50): string {
  if (typeof s !== "string") return "";
  return s.replace(/[`"'\\\n\r\t\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function sanitizeMessages(input: unknown): { role: "user" | "assistant"; content: string }[] {
  if (!Array.isArray(input)) return [];
  const out: { role: "user" | "assistant"; content: string }[] = [];
  for (const m of input.slice(0, 50)) {
    if (!m || typeof m !== "object") continue;
    const role = (m as any).role;
    const content = (m as any).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") continue;
    out.push({ role, content: content.slice(0, 4000) });
  }
  return out;
}

async function handleChat(payload: any, apiKey: string) {
  const messages = sanitizeMessages(payload?.messages);
  const tone = typeof payload?.tone === "string" ? payload.tone : "warm";
  const age = typeof payload?.age === "string" ? payload.age : "adult";
  const gender = typeof payload?.gender === "string" ? payload.gender : "female";
  const lang = typeof payload?.lang === "string" ? payload.lang : "en";
  const userName = sanitizeName(payload?.userName) || "friend";
  const rawTutor = sanitizeName(payload?.tutorName);
  const tutorName = ALLOWED_TUTOR_NAMES.has(rawTutor) ? rawTutor : "Emma";

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: buildSystemPrompt(tone, age, gender, lang, userName, tutorName) },
        ...messages,
      ],
    }),
  });


  if (!response.ok) {
    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "Soʻrovlar limiti oshib ketdi, biroz kuting." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "AI kreditlari tugadi." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const t = await response.text();
    console.error("AI gateway error:", response.status, t);
    return new Response(JSON.stringify({ error: "AI xatolik" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content ?? "";
  return new Response(JSON.stringify({ reply }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function handleTranslate(payload: any, apiKey: string) {
  const rawText = typeof payload?.text === "string" ? payload.text : "";
  const text = rawText.slice(0, 2048);
  const rawFrom = typeof payload?.from === "string" ? payload.from : "auto";
  const rawTo = typeof payload?.to === "string" ? payload.to : "uz";
  const from = (rawFrom === "auto" || LANG_NAME[rawFrom]) ? rawFrom : "auto";
  const to = LANG_NAME[rawTo] ? rawTo : "uz";
  const fromName = from === "auto" ? "the source language (auto-detect)" : LANG_NAME[from];
  const toName = LANG_NAME[to];

  const sys = `You are a precise translator. Translate from ${fromName} to ${toName}.
Return ONLY the translation as plain text — no quotes, no explanations, no labels, no original text.
If it is a single word, give the most common meaning, optionally followed by 1-2 alternative meanings separated by " / ".`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: sys },
        { role: "user", content: text },
      ],
    }),
  });

  if (!response.ok) {
    const t = await response.text();
    console.error("translate error:", response.status, t);
    return new Response(JSON.stringify({ error: "Tarjima xatosi" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const data = await response.json();
  const translation = (data?.choices?.[0]?.message?.content ?? "").trim();
  return new Response(JSON.stringify({ translation }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const token = authHeader.replace("Bearer ", "");
    const supa = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
    );
    const { data: userData, error: userErr } = await supa.auth.getUser(token);
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const payload = await req.json();
    const action = payload?.action || "chat";

    if (action === "translate") return await handleTranslate(payload, LOVABLE_API_KEY);
    return await handleChat(payload, LOVABLE_API_KEY);
  } catch (e) {
    console.error("speaking-chat error:", e);
    return new Response(JSON.stringify({ error: "Ichki server xatosi" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
