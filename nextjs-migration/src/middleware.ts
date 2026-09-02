import { NextRequest, NextResponse } from "next/server";
import { LANGS, DEFAULT_LANG } from "@/lib/i18n";

/**
 * Two jobs, both ported from the Django project:
 *
 * 1) Language-prefix redirect. Django's `i18n_patterns(..., prefix_default_
 *    language=True)` + LocaleMiddleware means every real page lives under
 *    /ar/... or /fr/..., and a request without a language prefix gets
 *    redirected to the negotiated one (Accept-Language), defaulting to
 *    Arabic — settings.LANGUAGE_CODE = "ar". We reproduce that exactly here,
 *    since Next's [lang] segment can't itself "catch" the unprefixed root.
 *
 * 2) Content-Security-Policy with a per-request nonce. Django's
 *    SecurityHeadersMiddleware (pages/middleware.py) could set a single
 *    static CSP string because the site never had inline scripts. Next.js
 *    needs a couple of small inline bootstrap scripts to hydrate the page,
 *    so we use Next's documented nonce + 'strict-dynamic' pattern instead
 *    of relaxing script-src to 'unsafe-inline'.
 */

function negotiateLang(acceptLanguage: string | null): (typeof LANGS)[number] {
  if (!acceptLanguage) return DEFAULT_LANG;
  const tags = acceptLanguage.split(",").map((part) => part.split(";")[0].trim().toLowerCase());
  for (const tag of tags) {
    if (tag.startsWith("fr")) return "fr";
    if (tag.startsWith("ar")) return "ar";
  }
  return DEFAULT_LANG;
}

function hasLangPrefix(pathname: string): boolean {
  return LANGS.some((lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- 1) language-prefix redirect -----------------------------------
  if (!hasLangPrefix(pathname)) {
    const lang = negotiateLang(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
    return applySecurityHeaders(NextResponse.redirect(url));
  }

  // --- 2) CSP nonce ----------------------------------------------------
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  return applySecurityHeaders(response, nonce);
}

function applySecurityHeaders(response: NextResponse, nonce?: string) {
  const scriptSrc = nonce ? `'self' 'nonce-${nonce}' 'strict-dynamic'` : "'self'";

  const csp = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    // Inline style="" attributes are used throughout the templates (ported
    // 1:1 from the Django markup), so style-src needs 'unsafe-inline' the
    // same way the original project accepted — see pages/middleware.py's
    // comment. No nonce here: nonces and 'unsafe-inline' can't be combined
    // for style-src (browsers that understand nonces ignore 'unsafe-inline'
    // entirely once a nonce is present), and inline style attributes can't
    // carry a nonce the way <script>/<style> tags can.
    "style-src 'self' 'unsafe-inline'",
    // Google Fonts is no longer an external dependency: Cairo/Inter are
    // bundled and self-hosted via next/font (see app/[lang]/layout.tsx).
    "font-src 'self'",
    "img-src 'self' data:",
    "media-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    /*
     * Run on everything except:
     * - /_next/* (Next.js internals)
     * - /images/*, /video/* (public static assets)
     * - files with an extension at the root (favicon.ico, robots.txt, etc.)
     */
    "/((?!_next|images/|video/|favicon.ico|robots.txt|sitemap.xml|.*\\.[\\w]+$).*)",
  ],
};
