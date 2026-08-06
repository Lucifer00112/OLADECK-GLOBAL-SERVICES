"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, KeyRound, Mail, ShieldAlert, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const isLockout = searchParams.get("reason")?.includes("lockout");

  const [step, setStep] = useState<"request" | "verify" | "reset" | "success">("request");
  const [email, setEmail] = useState("biona4real@gmail.com");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  function handleRequestCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsPending(true);

    setTimeout(() => {
      setIsPending(false);
      setStep("verify");
      setMessage("A 6-digit security verification code has been dispatched to your email address!");
    }, 800);
  }

  function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (otpCode.length < 6) {
      setError("Please enter a valid 6-digit verification code.");
      return;
    }

    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      setStep("reset");
      setMessage("Code verified successfully! Please choose a new password.");
    }, 800);
  }

  function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please check and try again.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      setStep("success");
      setMessage("Your password has been reset successfully! You can now log in.");
    }, 800);
  }

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-muted/30 py-16 px-4">
      <Card className="w-full max-w-md shadow-lifted border-border">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-navy/5 p-1 shadow-sm">
            <img src="/logo.png" alt="OLADECK Logo" className="h-full w-full object-contain rounded-full" />
          </div>
          <CardTitle className="text-2xl font-bold text-navy">Account Security &amp; Verification</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            {step === "request" && "Enter your email to receive a 6-digit security verification code"}
            {step === "verify" && "Enter the 6-digit verification code sent to your email"}
            {step === "reset" && "Set a new password for your account"}
            {step === "success" && "Password reset complete"}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {isLockout && step === "request" && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs font-bold text-red-700 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 shrink-0 text-red-600" />
              <span>Security Lockout Triggered: 5 failed login attempts were detected. Please verify your email to unlock your account.</span>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs font-medium text-red-600">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs font-medium text-emerald-700">
              {message}
            </div>
          )}

          {/* STEP 1: Request Email */}
          {step === "request" && (
            <form onSubmit={handleRequestCode} className="grid gap-4">
              <div className="grid gap-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-gold" /> Registered Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  autoFocus
                />
              </div>

              <Button type="submit" disabled={isPending} className="w-full bg-navy text-white hover:bg-navy/90 font-bold">
                {isPending ? "Sending Verification Code..." : "Send 6-Digit Verification Code"}
              </Button>
            </form>
          )}

          {/* STEP 2: Verify 6-Digit Code */}
          {step === "verify" && (
            <form onSubmit={handleVerifyCode} className="grid gap-4">
              <div className="grid gap-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold" /> 6-Digit Verification Code (OTP)
                </label>
                <Input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter 6-digit code (e.g. 654321)"
                  className="text-center text-lg font-mono tracking-widest"
                  required
                  autoFocus
                />
              </div>

              <Button type="submit" disabled={isPending} className="w-full bg-navy text-white hover:bg-navy/90 font-bold">
                {isPending ? "Verifying Code..." : "Verify Code & Continue"}
              </Button>

              <button
                type="button"
                onClick={() => setStep("request")}
                className="text-xs text-muted-foreground hover:text-navy text-center"
              >
                ← Back to email request
              </button>
            </form>
          )}

          {/* STEP 3: Enter New Password */}
          {step === "reset" && (
            <form onSubmit={handleResetPassword} className="grid gap-4">
              <div className="grid gap-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <KeyRound className="h-3.5 w-3.5 text-gold" /> New Password
                </label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <KeyRound className="h-3.5 w-3.5 text-gold" /> Confirm New Password
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  required
                />
              </div>

              <Button type="submit" disabled={isPending} className="w-full bg-navy text-white hover:bg-navy/90 font-bold">
                {isPending ? "Updating Password..." : "Update Password & Reset Lock"}
              </Button>
            </form>
          )}

          {/* STEP 4: Success */}
          {step === "success" && (
            <div className="text-center space-y-4 py-3">
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-xs text-muted-foreground">Your account has been unlocked and your password updated successfully.</p>
              <Link href="/login" className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-navy text-white text-xs font-bold py-2.5 hover:bg-navy/90 transition">
                Sign In Now →
              </Link>
            </div>
          )}

          <div className="pt-2 text-center">
            <Link href="/login" className="text-xs text-muted-foreground hover:text-navy inline-flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
