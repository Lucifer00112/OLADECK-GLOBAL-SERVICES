"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters.")
});

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  phone: z.string().min(7, "Valid phone number is required."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters.")
});

export type AuthActionResult = {
  ok: boolean;
  message: string;
};

export async function loginAction(
  _prevState: AuthActionResult,
  formData: FormData
): Promise<AuthActionResult> {
  const payload = Object.fromEntries(formData.entries());
  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Invalid credentials."
    };
  }

  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password
    });

    if (error) {
      return {
        ok: false,
        message: error.message || "Could not sign in with provided credentials."
      };
    }

    return {
      ok: true,
      message: "Signed in successfully!"
    };
  }

  // Fallback demo auth cookie for development mode when Supabase is not connected
  const cookieStore = await cookies();
  cookieStore.set("oladeck-user-session", parsed.data.email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  });

  return {
    ok: true,
    message: "Signed in successfully!"
  };
}

export async function signupAction(
  _prevState: AuthActionResult,
  formData: FormData
): Promise<AuthActionResult> {
  const payload = Object.fromEntries(formData.entries());
  const parsed = signupSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Please complete all required fields."
    };
  }

  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        data: {
          full_name: parsed.data.fullName,
          phone: parsed.data.phone
        }
      }
    });

    if (error) {
      return {
        ok: false,
        message: error.message || "Account creation failed."
      };
    }

    return {
      ok: true,
      message: "Account created successfully! Check your email to confirm registration or sign in now."
    };
  }

  // Demo fallback session
  const cookieStore = await cookies();
  cookieStore.set("oladeck-user-session", parsed.data.email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  });

  return {
    ok: true,
    message: "Account created successfully! Welcome to OLADECK Global Services."
  };
}

export async function logoutAction(): Promise<AuthActionResult> {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    await supabase.auth.signOut();
  }

  const cookieStore = await cookies();
  cookieStore.delete("oladeck-user-session");

  return {
    ok: true,
    message: "Logged out."
  };
}
