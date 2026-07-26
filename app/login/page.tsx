"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, LogIn, Mail, Ship } from "lucide-react";
import { AuthActionResult, loginAction } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialState: AuthActionResult = { ok: false, message: "" };

export default function CustomerLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-muted/30 py-16 px-4">
      <Card className="w-full max-w-md shadow-lifted border-border">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white shadow-md">
            <Ship className="h-6 w-6 text-gold" />
          </div>
          <CardTitle className="text-2xl font-bold text-navy">Customer Sign In</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Sign in to track your vehicle shipments, invoices, and clearing updates
          </p>
        </CardHeader>

        <CardContent>
          {state.message ? (
            <div
              className={`mb-4 rounded-lg p-3 text-xs font-medium ${
                state.ok
                  ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                  : "bg-red-500/10 text-red-700 border border-red-500/20"
              }`}
            >
              {state.message}
            </div>
          ) : null}

          <form action={formAction} className="grid gap-4">
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-gold" /> Email Address
              </label>
              <Input
                type="email"
                name="email"
                placeholder="name@example.com"
                required
                autoFocus
              />
            </div>

            <div className="grid gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-gold" /> Password
                </label>
                <a href="/contact" className="text-[11px] font-medium text-navy hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" disabled={isPending} className="mt-2 w-full bg-navy text-white hover:bg-navy/90 font-bold">
              {isPending ? "Signing In..." : "Sign In to Account"}
              <LogIn className="ml-2 h-4 w-4" />
            </Button>

            <div className="mt-4 text-center text-xs text-muted-foreground">
              Don&apos;t have an account yet?{" "}
              <Link href="/signup" className="font-bold text-navy hover:underline inline-flex items-center gap-1">
                Create Account <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
