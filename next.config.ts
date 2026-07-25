import type { NextConfig } from "next";

/**
 * セキュリティヘッダー。
 * vercel.json ではなくここに置く。ローカルの `next start` でも同じ挙動になり、
 * 「本番だけ違った」という事故を防げるため。
 */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    /*
     * まずは Report-Only で運用する。いきなり強制すると、
     * 気づかないうちにフォームや画像が壊れて公開されてしまう。
     * 違反レポートが落ち着いたら Content-Security-Policy に切り替える。
     *
     * next/font はビルド時に自self-host するため font-src に外部は不要。
     * 'unsafe-inline' は Next.js のインラインスクリプト（JSON-LD 含む）用。
     */
    key: "Content-Security-Policy-Report-Only",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  images: {
    // 写真差し替え後に効く。AVIF/WebP を優先して LCP を軽くする。
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
