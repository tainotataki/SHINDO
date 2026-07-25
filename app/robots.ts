import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Vercel のプレビュー環境は本番と別ドメインなので、
  // 誤って検索結果に出ないよう全面的に拒否する。
  const isProduction = process.env.VERCEL_ENV === "production" || !process.env.VERCEL_ENV;

  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
