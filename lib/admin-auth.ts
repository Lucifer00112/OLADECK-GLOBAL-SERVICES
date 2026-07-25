import { cookies } from "next/headers";
import crypto from "node:crypto";

const ADMIN_COOKIE = "mg-admin-session";
const OTP_COOKIE = "mg-admin-otp-pending";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

// Default fallback passcode for local dev / testing if env variable is unset
const DEFAULT_PASSCODE = "admin123";
// Default fallback OTP code for testing
export const DEMO_OTP_CODE = "654321";

function adminPassword() {
  return process.env.ADMIN_DASHBOARD_PASSWORD?.trim() || DEFAULT_PASSCODE;
}

function sessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "mg-enterprises-local-admin-secret-key-2026"
  );
}

function sign(payload: string) {
  return crypto.createHmac("sha256", sessionSecret()).update(payload).digest("hex");
}

export function isAdminPasswordConfigured() {
  return Boolean(process.env.ADMIN_DASHBOARD_PASSWORD?.trim());
}

export async function verifyPasscodeAndRequestOtp(password: string) {
  const configuredPassword = adminPassword();
  if (password !== configuredPassword) {
    return { ok: false, message: "Incorrect admin passcode." };
  }

  // Create temporary OTP cookie valid for 10 minutes
  const cookieStore = await cookies();
  const expiresAt = Date.now() + 10 * 60 * 1000;
  const payload = `otp_pending:${expiresAt}`;

  cookieStore.set(OTP_COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 600,
    path: "/admin"
  });

  return {
    ok: true,
    message: `Passcode verified. Verification code sent! (Demo OTP code: ${DEMO_OTP_CODE})`
  };
}

export async function verifyOtpAndCreateSession(otpCode: string) {
  const cookieStore = await cookies();
  const otpPendingCookie = cookieStore.get(OTP_COOKIE)?.value;

  if (!otpPendingCookie) {
    return { ok: false, message: "Passcode verification expired. Please start over." };
  }

  const [payload, signature] = otpPendingCookie.split(".");
  if (!payload || !signature || signature !== sign(payload)) {
    return { ok: false, message: "Invalid session attempt." };
  }

  // Check OTP (accept demo OTP code or custom OTP env)
  const expectedOtp = process.env.ADMIN_OTP_CODE?.trim() || DEMO_OTP_CODE;
  if (otpCode.trim() !== expectedOtp) {
    return { ok: false, message: "Incorrect verification code. Please check and try again." };
  }

  // Clean up pending OTP cookie
  cookieStore.delete(OTP_COOKIE);

  // Create full admin session cookie
  const issuedAt = Date.now();
  const sessionPayload = `admin:${issuedAt}`;

  cookieStore.set(ADMIN_COOKIE, `${sessionPayload}.${sign(sessionPayload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_SECONDS,
    path: "/admin"
  });

  return { ok: true, message: "Admin access granted." };
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  cookieStore.delete(OTP_COOKIE);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!value) return false;

  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;

  const [role, issuedAtText] = payload.split(":");
  const issuedAt = Number(issuedAtText);
  const expected = sign(payload);
  const isExpired = Number.isNaN(issuedAt) || Date.now() - issuedAt > SESSION_TTL_SECONDS * 1000;

  if (role !== "admin" || isExpired || signature.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
