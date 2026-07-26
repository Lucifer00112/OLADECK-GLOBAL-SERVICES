"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Mail, Phone, Ship, User, UserPlus } from "lucide-react";
import { AuthActionResult, signupAction } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialState: AuthActionResult = { ok: false, message: "" };

export default function CustomerSignupPage() {
  const [state, formAction, isPending] = useActionState(signupAction, initialState);

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-muted/30 py-16 px-4">
      <Card className="w-full max-w-md shadow-lifted border-border">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white shadow-md">
            <Ship className="h-6 w-6 text-gold" />
          </div>
          <CardTitle className="text-2xl font-bold text-navy">Create Customer Account</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Register to manage your vehicle imports, track clearance status, and access invoices
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

          <form action={formAction} className="grid gap-3.5">
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
              {isPending ? "Creating Account..." : "Create Free Account"}
              <UserPlus className="ml-2 h-4 w-4" />
            </Button>

            <div className="mt-4 text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-navy hover:underline inline-flex items-center gap-1">
                Sign In <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
