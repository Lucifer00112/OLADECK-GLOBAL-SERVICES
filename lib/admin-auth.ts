import { cookies } from "next/headers";
import crypto from "node:crypto";

const ADMIN_COOKIE = "mg-admin-session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

function adminUsername() {
  return process.env.ADMIN_USERNAME?.trim() || "Crude124@";
}

function adminPassword() {
  return process.env.ADMIN_DASHBOARD_PASSWORD?.trim() || "654321";
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

export async function verifyAdminCredentials(username: string, password: string) {
  const expectedUser = adminUsername();
  const expectedPass = adminPassword();

  if (username.trim() !== expectedUser || password !== expectedPass) {
    return { ok: false, message: "Incorrect username or password." };
  }

  // Create admin session cookie
  const issuedAt = Date.now();
  const sessionPayload = `admin:${issuedAt}`;
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE, `${sessionPayload}.${sign(sessionPayload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_SECONDS,
    path: "/admin"
  });

  return { ok: true, message: "Access granted." };
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
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
