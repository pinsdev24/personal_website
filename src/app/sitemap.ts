import type { MetadataRoute } from "next";
import { profile } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/work"].map((path) => ({ url: `${profile.siteUrl}${path}` }));
}
