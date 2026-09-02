/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// -----------------------------------------------------------------------
// Security headers — ported 1:1 from the Django project's settings.py +
// pages/middleware.py. The one header that can't live here is
// Content-Security-Policy, because it needs a fresh per-request nonce for
// inline scripts; that one is set in middleware.ts instead (see the
// documented Next.js CSP-with-nonce pattern).
// -----------------------------------------------------------------------
const PERMISSIONS_POLICY = [
  "accelerometer=()",
  "camera=()",
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "payment=()",
  "usb=()",
  "interest-cohort=()", // blocks Google FLoC/Topics ad tracking
].join(", ");

async function headers() {
  const baseHeaders = [
    // Defense-in-depth alongside CSP's frame-ancestors 'none' (set in middleware).
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "Permissions-Policy", value: PERMISSIONS_POLICY },
  ];

  if (isProd) {
    // Mirrors settings.py: SECURE_HSTS_SECONDS=31536000 with subdomains + preload,
    // only ever sent in production (never in local dev, which is usually plain HTTP).
    baseHeaders.push({
      key: "Strict-Transport-Security",
      value: "max-age=31536000; includeSubDomains; preload",
    });
  }

  return [
    {
      source: "/:path*",
      headers: baseHeaders,
    },
  ];
}

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // don't advertise "X-Powered-By: Next.js"
  headers,
};

export default nextConfig;
