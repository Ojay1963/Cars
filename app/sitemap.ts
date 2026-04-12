import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/inventory", "/about", "/contact", "/sell", "/login", "/register"];

  return routes.map((route) => ({
    url: `https://ojaymotors.example.com${route}`,
    lastModified: new Date()
  }));
}
