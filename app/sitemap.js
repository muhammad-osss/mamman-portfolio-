import { projects } from "@/lib/data";

export default function sitemap() {
  const base = "https://mammanportfolio.example.com";
  const routes = ["", "#work", "#about", "#services", "#experience", "#contact"].map(
    (path) => ({
      url: `${base}/${path}`,
      lastModified: new Date(),
    })
  );

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...projectRoutes];
}
