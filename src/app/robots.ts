import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/guest", "/login"],
    },
    sitemap: "https://tanviandsahil.com/sitemap.xml",
  };
}
