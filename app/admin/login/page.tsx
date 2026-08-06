"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogIn, ShieldAlert, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verifyAdminCredentialsAction } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [failedCount, setFailedCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const res = await verifyAdminCredentialsAction(username, password);
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const nextFailed = failedCount + 1;
        setFailedCount(nextFailed);
        if (nextFailed >= 5) {
          setError("5 Failed attempts reached! Redirecting to email verification & password reset...");
          setTimeout(() => {
            router.push("/forgot-password?reason=admin_lockout");
          }, 1500);
        } else {
          setError(`${res.message || "Invalid credentials."} (Attempt ${nextFailed}/5)`);
        }
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070C18] px-4">
      <div className="w-full max-w-sm">
        {/* Logo & Branding */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <img src="/logo.png" alt="OLADECK Logo" className="h-12 w-12 object-contain rounded-xl" />
          </div>
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-amber-500 mb-1">OLADECK Global Services</p>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Operations Console</h1>
            <p className="text-xs text-slate-500 mt-1">Restricted access. Authorized personnel only.</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-7 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-xs text-red-400 font-semibold">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  autoFocus
                  autoComplete="username"
                  className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:border-amber-500/60 focus-visible:ring-amber-500/20 rounded-xl h-11"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:border-amber-500/60 focus-visible:ring-amber-500/20 rounded-xl h-11"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending || !username || !password || failedCount >= 5}
              className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-slate-950/30 border-t-slate-950 animate-spin" />
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </span>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          © 2026 OLADECK Global Services · Secure Admin Portal
        </p>
      </div>
    </div>
  );
}
