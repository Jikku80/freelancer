// Edit these once — used across the page, SEO metadata and JSON-LD.
export const site = {
  name: "Freelancer Baucha",
  tagline: "Work Smart • Freelance Better",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://freelancerbaucha.com.np",
  whatsapp: "9779740871495", // country code + number, no "+"
  location: "Nepal",
};
export const waLink = (msg = "Hi Baucha, I'd like to build a project.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
