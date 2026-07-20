import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// auth_date shu vaqtdan eski bo'lsa, so'rov rad etiladi (soniyalarda)
const MAX_AUTH_AGE_SECONDS = 300;

type TelegramUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function toHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Telegram Login Widget hujjatiga muvofiq: secret_key = SHA256(bot_token)
async function getSecretKey(botToken: string): Promise<ArrayBuffer> {
  const data = new TextEncoder().encode(botToken);
  return await crypto.subtle.digest("SHA-256", data);
}

async function verifyTelegramHash(user: TelegramUser, botToken: string): Promise<boolean> {
  const { hash, ...rest } = user;
  const checkString = Object.keys(rest)
    .filter((k) => (rest as Record<string, unknown>)[k] !== undefined && (rest as Record<string, unknown>)[k] !== null)
    .sort()
    .map((k) => `${k}=${(rest as Record<string, unknown>)[k]}`)
    .join("\n");

  const secretKeyBytes = await getSecretKey(botToken);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    secretKeyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(checkString));
  const computedHash = toHex(signature);
  return computedHash === hash;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    if (!BOT_TOKEN) {
      console.error("TELEGRAM_BOT_TOKEN is not configured");
      return jsonResponse({ error: "Server sozlanmagan" }, 500);
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      console.error("Supabase service credentials are not configured");
      return jsonResponse({ error: "Server sozlanmagan" }, 500);
    }

    const body = (await req.json()) as TelegramUser;

    if (!body || typeof body.id !== "number" || typeof body.hash !== "string" || typeof body.auth_date !== "number") {
      return jsonResponse({ error: "Noto'g'ri so'rov" }, 400);
    }

    // 1. Hash orqali ma'lumot haqiqatan ham Telegramdan kelganini tekshiramiz
    const isValid = await verifyTelegramHash(body, BOT_TOKEN);
    if (!isValid) {
      return jsonResponse({ error: "Telegram tasdiqlash muvaffaqiyatsiz (hash mos emas)" }, 401);
    }

    // 2. So'rov eskirmaganini tekshiramiz (replay hujumidan himoya)
    const nowSeconds = Math.floor(Date.now() / 1000);
    if (nowSeconds - body.auth_date > MAX_AUTH_AGE_SECONDS) {
      return jsonResponse({ error: "Telegram so'rovi muddati o'tgan, qayta urinib ko'ring" }, 401);
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Har bir Telegram foydalanuvchisi uchun barqaror, ichki (login uchun ishlatilmaydigan) email
    const syntheticEmail = `tg${body.id}@telegram.edusat.local`;
    const displayName = [body.first_name, body.last_name].filter(Boolean).join(" ") || body.username || `Telegram ${body.id}`;

    // 3. Foydalanuvchi mavjudligini tekshiramiz, bo'lmasa yaratamiz
    const { data: existing, error: listErr } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 1,
      // @ts-ignore - filter by email supported by GoTrue admin API
      email: syntheticEmail,
    });

    let userId: string | null = null;
    if (!listErr && existing?.users?.length) {
      userId = existing.users[0].id;
    } else {
      const { data: created, error: createErr } = await admin.auth.admin.createUser({
        email: syntheticEmail,
        email_confirm: true,
        user_metadata: {
          display_name: displayName,
          avatar_url: body.photo_url ?? null,
          telegram_id: body.id,
          telegram_username: body.username ?? null,
          provider: "telegram",
        },
      });
      if (createErr || !created?.user) {
        console.error("createUser error:", createErr);
        return jsonResponse({ error: "Foydalanuvchi yaratishda xatolik" }, 500);
      }
      userId = created.user.id;
    }

    // 4. Profilni yangilaymiz (ism/avatar Telegramdagi kabi bo'lishi uchun)
    await admin
      .from("profiles")
      .update({ display_name: displayName, avatar_url: body.photo_url ?? null })
      .eq("id", userId);

    // 5. Frontendda supabase.auth.verifyOtp({ email, token, type: "magiclink" })
    //    orqali sessiya ochish uchun bir martalik token generatsiya qilamiz
    const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email: syntheticEmail,
    });
    if (linkErr || !linkData) {
      console.error("generateLink error:", linkErr);
      return jsonResponse({ error: "Kirish tokenini yaratishda xatolik" }, 500);
    }

    const token = linkData.properties?.hashed_token;
    if (!token) {
      return jsonResponse({ error: "Kirish tokenini yaratishda xatolik" }, 500);
    }

    return jsonResponse({ email: syntheticEmail, token });
  } catch (e) {
    console.error("telegram-auth error:", e);
    return jsonResponse({ error: "Ichki server xatosi" }, 500);
  }
});
