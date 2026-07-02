import { useState } from "react";
import { useLocation } from "wouter";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");
  const [lihat, setLihat] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await api.auth.login(password);
      api.auth.saveToken(token);
      setLocation("/admin");
    } catch (err) {
      setError("Password salah. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-lg border border-border p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-serif text-foreground">Panel Admin</h1>
            <p className="text-muted-foreground text-sm">KKN Kolaboratif 018 — Desa Grenden</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="password">Password Admin</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={lihat ? "text" : "password"}
                  placeholder="Masukkan password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="input-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setLihat(!lihat)}
                  tabIndex={-1}
                >
                  {lihat ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2" data-testid="text-error">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading} data-testid="button-login">
              {loading ? "Memverifikasi..." : "Masuk"}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Password default: <code className="bg-muted px-1 py-0.5 rounded">grenden2025</code>
          </p>
        </div>
      </div>
    </div>
  );
}
