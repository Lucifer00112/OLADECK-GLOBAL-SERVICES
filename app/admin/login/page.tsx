"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, ShieldCheck, ShipWheel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { verifyOtpAction, verifyPasscodeAction } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"passcode" | "otp">("passcode");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handlePasscodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    startTransition(async () => {
      const res = await verifyPasscodeAction(password);
      if (res.ok) {
        setStep("otp");
        setMessage(res.message || "Passcode accepted. Enter verification code.");
      } else {
        setError(res.message || "Invalid admin passcode.");
      }
    });
  }

  function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    startTransition(async () => {
      const res = await verifyOtpAction(otpCode);
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.message || "Invalid verification code.");
      }
    });
  }

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-muted/40 py-16 px-4">
      <Card className="w-full max-w-md shadow-glow">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-navy text-white shadow-md">
            <ShipWheel className="h-6 w-6 text-gold" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Verification</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            {step === "passcode"
              ? "Step 1 of 2: Enter MG Enterprises Admin Passcode"
              : "Step 2 of 2: Enter 6-digit Verification Code"}
          </p>
        </CardHeader>

        <CardContent>
          {error ? (
            <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="mb-4 rounded-lg bg-emerald-500/10 p-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {message}
            </div>
          ) : null}

          {step === "passcode" ? (
            <form onSubmit={handlePasscodeSubmit} className="grid gap-4">
              <label className="grid gap-2 text-sm font-medium">
                Passcode
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter passcode (Default: admin123)"
                  required
                  autoFocus
                />
              </label>
              <Button type="submit" disabled={isPending} className="w-full">
                <KeyRound className="mr-2 h-4 w-4" />
                {isPending ? "Verifying Passcode..." : "Verify Passcode"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="grid gap-4">
              <label className="grid gap-2 text-sm font-medium">
                Verification Code (OTP)
                <Input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter 6-digit code (Demo: 654321)"
                  className="text-center text-lg tracking-widest font-mono"
                  required
                  autoFocus
                />
              </label>
              <Button type="submit" disabled={isPending} className="w-full">
                <ShieldCheck className="mr-2 h-4 w-4" />
                {isPending ? "Validating Code..." : "Authorize Admin Session"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setStep("passcode");
                  setError("");
                  setMessage("");
                }}
              >
                Back to Passcode
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
