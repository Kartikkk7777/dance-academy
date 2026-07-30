export default function sitemap() {
  const baseUrl = "https://shivangikamkalakendra.com";

  // Note: /admin is explicitly excluded from sitemap and blocked in robots.txt
  const routes = [
    "",
    "/about",
    "/programs",
    "/instructors",
    "/timetable",
    "/gallery",
    "/events",
    "/contact",
    "/privacy-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes];
}
