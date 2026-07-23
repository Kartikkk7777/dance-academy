export default function sitemap() {
  const baseUrl = "https://shivangikamkalakendra.com";

  const routes = [
    "",
    "/about",
    "/programs",
    "/instructors",
    "/timetable",
    "/gallery",
    "/testimonials",
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
