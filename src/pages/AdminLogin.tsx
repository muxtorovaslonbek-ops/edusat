import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Agar allaqachon admin sifatida tizimga kirilgan bo'lsa, to'g'ridan-to'g'ri panelga o'tkazamiz
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user;
      if (!user) return;
      const { data: prof } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      if ((prof as any)?.role === "admin") navigate("/admin");
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (signInError) {
      setLoading(false);
      setError(
        signInError.message.includes("Invalid")
          ? "Email yoki parol noto'g'ri."
          : signInError.message
      );
      return;
    }

    const { data: sess } = await supabase.auth.getSession();
    const uid = sess.session?.user.id;
    const { data: prof } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", uid)
      .maybeSingle();

    setLoading(false);

    if ((prof as any)?.role !== "admin") {
      await supabase.auth.signOut();
      setError("Bu hisobda admin huquqi yo'q.");
      return;
    }

    toast.success("Admin panelga xush kelibsiz!");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-sm border-slate-800 bg-slate-900 text-slate-100">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
          </div>
          <CardTitle className="text-2xl">Admin kirish</CardTitle>
          <CardDescription className="text-slate-400">
            Faqat administratorlar uchun panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Login (email)</Label>
              <Input
                id="admin-email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@edusat.uz"
                className="bg-slate-950 border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Parol</Label>
              <Input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-slate-950 border-slate-700"
              />
            </div>
            {error && (
              <p className="rounded-xl border border-red-900 bg-red-950/60 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Tekshirilmoqda..." : "Kirish"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
