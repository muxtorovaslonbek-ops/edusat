import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type ProfileRow = {
  id: string;
  email: string | null;
  display_name: string | null;
  role: string;
  created_at: string;
};

export default function Admin() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, display_name, role, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Foydalanuvchilarni yuklashda xatolik", { description: error.message });
    } else {
      setUsers((data as ProfileRow[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changeRole = async (userId: string, newRole: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);

    if (error) {
      toast.error("Rolni o'zgartirishda xatolik", { description: error.message });
    } else {
      toast.success("Rol yangilandi");
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin panel</h1>
            <p className="text-muted-foreground text-sm">Foydalanuvchilarni boshqarish</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              Bosh sahifa
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                await signOut();
                navigate("/auth");
              }}
            >
              Chiqish
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Foydalanuvchilar ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Yuklanmoqda...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ism</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Ro'yxatdan o'tgan sana</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead className="text-right">Amal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>{u.display_name ?? "—"}</TableCell>
                      <TableCell>{u.email ?? "—"}</TableCell>
                      <TableCell>
                        {new Date(u.created_at).toLocaleDateString("uz-UZ")}
                      </TableCell>
                      <TableCell>
                        <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                          {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Select
                          value={u.role}
                          onValueChange={(value) => changeRole(u.id, value)}
                        >
                          <SelectTrigger className="w-32 ml-auto">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">user</SelectItem>
                            <SelectItem value="admin">admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
