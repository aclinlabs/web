import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Basic in-memory brute-force protection for the admin login endpoint.
// Effective for a single-instance deployment (this app's Railway setup).
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; reset: number }>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function pruneExpired(now: number) {
  if (attempts.size < 5000) return;
  for (const [key, entry] of attempts) {
    if (now > entry.reset) attempts.delete(key);
  }
}

export function proxy(request: NextRequest) {
  const ip = getClientIp(request);
  const now = Date.now();
  pruneExpired(now);

  const entry = attempts.get(ip);
  if (!entry || now > entry.reset) {
    attempts.set(ip, { count: 1, reset: now + WINDOW_MS });
  } else {
    entry.count += 1;
    if (entry.count > MAX_ATTEMPTS) {
      return NextResponse.json(
        { error: "Demasiados intentos. Intenta de nuevo en un minuto." },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/auth/callback/credentials",
};
