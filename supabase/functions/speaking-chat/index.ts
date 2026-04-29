import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const buildSystemPrompt = (tone: string, age: string, userName: string) => {
  const toneMap: Record<string, string> = {
    warm: "Speak in a warm, friendly, encouraging tone like a supportive friend.",
    energetic: "Speak with high energy, enthusiasm and excitement.",
    calm: "Speak in a calm, soft, patient tone like a gentle mentor.",
    playful: "Speak in a playful, cheerful, lighthearted tone with a bit of humor.",
  };
  const ageMap: Record<string, string> = {
    young: "You sound like a 20-year-old university student — modern, casual and relatable.",
    adult: "You sound like a 30-year-old experienced English teacher — confident and clear.",
    mature: "You sound like a 45-year-old senior tutor — wise, articulate and patient.",
  };
  return `You are Emma, a friendly AI English speaking tutor for the EduSAT Academy app.
${ageMap[age] || ageMap.adult} ${toneMap[tone] || toneMap.warm}

GOAL: Help the learner practice ENGLISH speaking through a natural, free-flowing voice conversation.

RULES:
- Always reply in ENGLISH only, even if the learner uses another language.
- Keep replies SHORT — 1-2 sentences max — so the learner talks more than you.
- After each reply, ask ONE follow-up question to keep the dialogue going.
- The learner's name is "${userName || "friend"}". Greet them by name on the FIRST turn only.
- Listen carefully and react to what they actually said.
- Gently correct major grammar mistakes only when truly needed.
- Never mention you are an AI or a language model. Never break character.
- No markdown, no lists — this is SPOKEN conversation. Plain natural sentences only.`;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, tone = "warm", age = "adult", userName = "" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: buildSystemPrompt(tone, age, userName) },
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
  } catch (e) {
    console.error("speaking-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Nomaʼlum xatolik" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
