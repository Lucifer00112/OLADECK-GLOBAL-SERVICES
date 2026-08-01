"use client";

import { useEffect, useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, KeyRound, Lock, Mail, Phone, ShieldCheck, User, UserPlus } from "lucide-react";
import { AuthActionResult, signupAction } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialState: AuthActionResult = { ok: false, message: "" };

export default function CustomerSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "verify">("form");
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [state, formAction, isPending] = useActionState(signupAction, initialState);

  useEffect(() => {
    if (state.ok) {
      setStep("verify");
    }
  }, [state.ok]);

  function handleCompleteVerification(e: React.FormEvent) {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      setOtpError("Please enter the 6-digit verification code sent to your email.");
      return;
    }
    setOtpError("");
    setTimeout(() => {
      router.push("/portal");
      router.refresh();
    }, 600);
  }

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-muted/30 py-16 px-4">
      <Card className="w-full max-w-md shadow-lifted border-border">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-navy/5 p-1 shadow-sm">
            <img src="/logo.png" alt="OLADECK Logo" className="h-full w-full object-contain rounded-full" />
          </div>
          <CardTitle className="text-2xl font-bold text-navy">
            {step === "form" ? "Create Customer Account" : "Verify Email & Activate Account"}
          </CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            {step === "form"
              ? "Register to manage your vehicle imports, track clearance status, and access invoices"
              : "Enter the 6-digit activation code sent to your email address."}
          </p>
        </CardHeader>

        <CardContent>
          {step === "form" ? (
            <form action={formAction} className="grid gap-3.5">
              {state.message && !state.ok ? (
                <div className="rounded-lg bg-red-500/10 p-3 text-xs font-medium text-red-700 border border-red-500/20">
                  {state.message}
                </div>
              ) : null}

              <div className="grid gap-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-gold" /> Full Name
                </label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Chukwuma Adebayo"
                  required
                  autoFocus
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-gold" /> Phone Number (WhatsApp Enabled)
                </label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+234 800 000 0000"
                  required
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-gold" /> Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-gold" /> Password
                </label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Minimum 6 characters"
                  required
                />
              </div>

              <Button type="submit" disabled={isPending} className="mt-2 w-full bg-navy text-white hover:bg-navy/90 font-bold">
                {isPending ? "Sending Verification Code..." : "Create Account & Send Code"}
                <UserPlus className="ml-2 h-4 w-4" />
              </Button>

              <div className="mt-4 text-center text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-navy hover:underline inline-flex items-center gap-1">
                  Sign In <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleCompleteVerification} className="grid gap-4">
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 font-medium space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Account Created!
                </p>
                <p>A 6-digit activation code has been sent to your email. (Demo Code: <strong>592814</strong>)</p>
              </div>

              {otpError && (
                <div className="rounded-lg bg-red-50 text-red-700 border border-red-200 p-3 text-xs font-semibold">
                  {otpError}
                </div>
              )}

              <div className="grid gap-1.5">
                <label className="text-xs font-semibold text-navy">Enter 6-Digit Email Verification Code</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="e.g. 592814"
                    maxLength={6}
                    required
                    className="pl-9 h-11 text-sm font-mono tracking-widest text-center"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-11 bg-navy text-white hover:bg-navy/90 font-bold text-xs rounded-full">
                <ShieldCheck className="mr-1.5 h-4 w-4 text-gold" /> Verify &amp; Activate Account
              </Button>

              <button
                type="button"
                onClick={() => setStep("form")}
                className="text-center text-xs text-muted-foreground hover:text-navy underline pt-1"
              >
                Change account details
              </button>
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
