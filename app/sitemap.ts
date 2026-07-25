import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** 優先度は「思想 → 現場 → 参加」の導線設計に合わせる。 */
const routes: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.9 },
  { path: "/showa-mura", priority: 0.9 },
  { path: "/members", priority: 0.9 },
  { path: "/partners", priority: 0.9 },
  { path: "/future", priority: 0.7 },
  { path: "/experiments", priority: 0.7 },
  { path: "/riku", priority: 0.7 },
  { path: "/team", priority: 0.6 },
  { path: "/journal", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: path === "/journal" ? "weekly" : "monthly",
    priority,
  }));
}
