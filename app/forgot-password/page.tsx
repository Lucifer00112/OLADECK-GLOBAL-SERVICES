"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, KeyRound, Lock, Mail, ShieldCheck } from "lucide-react";
import { AuthActionResult, forgotPasswordAction, verifyResetOtpAction } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialResult: AuthActionResult = { ok: false, message: "" };

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [requestState, requestFormAction, isRequestPending] = useActionState(forgotPasswordAction, initialResult);
  const [verifyState, verifyFormAction, isVerifyPending] = useActionState(verifyResetOtpAction, initialResult);

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-muted/30 py-16 px-4">
      <Card className="w-full max-w-md shadow-lifted border-border">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-navy/5 p-1 shadow-sm">
            <img src="/logo.png" alt="OLADECK Logo" className="h-full w-full object-contain rounded-full" />
          </div>
          <CardTitle className="text-2xl font-bold text-navy">
            {step === "request" ? "Reset Your Password" : "Enter Verification Code"}
          </CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            {step === "request"
              ? "Enter your email address and we will send a 6-digit verification code."
              : "Check your email for the 6-digit code to set a new password."}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === "request" ? (
            <form action={requestFormAction} className="space-y-4" onSubmit={() => setStep("verify")}>
              {requestState.message ? (
                <div
                  className={`rounded-lg p-3 text-xs font-semibold ${
                    requestState.ok ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {requestState.message}
                </div>
              ) : null}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-navy">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="pl-9 h-11 text-sm"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isRequestPending}
                className="w-full h-11 rounded-full bg-navy text-xs font-bold text-white hover:bg-navy/90"
              >
                {isRequestPending ? "Sending Code..." : "Send Verification Code"}
              </Button>
            </form>
          ) : (
            <form action={verifyFormAction} className="space-y-4">
              {verifyState.message ? (
                <div
                  className={`rounded-lg p-3 text-xs font-semibold ${
                    verifyState.ok ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {verifyState.message}
                </div>
              ) : null}

              {requestState.message && (
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-xs text-blue-800 font-medium">
                  {requestState.message}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-navy">6-Digit Verification Code</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="code"
                    type="text"
                    placeholder="e.g. 482910"
                    maxLength={6}
                    required
                    className="pl-9 h-11 text-sm font-mono tracking-widest text-center"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-navy">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="newPassword"
                    type="password"
                    placeholder="Enter at least 6 characters"
                    required
                    className="pl-9 h-11 text-sm"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isVerifyPending}
                className="w-full h-11 rounded-full bg-navy text-xs font-bold text-white hover:bg-navy/90"
              >
                {isVerifyPending ? "Resetting Password..." : "Set New Password & Sign In"}
              </Button>

              <button
                type="button"
                onClick={() => setStep("request")}
                className="w-full text-center text-xs text-muted-foreground hover:text-navy underline pt-2"
              >
                Didn&apos;t receive code? Resend code
              </button>
            </form>
          )}

          <div className="pt-4 border-t text-center text-xs">
            <Link href="/login" className="inline-flex items-center gap-1 font-semibold text-gold hover:underline">
              <ArrowLeft className="h-3 w-3" /> Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
