import Image from "next/image";
import { site, waLink } from "./site";
import Flags from "../components/Flags";
import Mini from "../components/Mini";
import Year from "../components/Year";
import Terminal from "../components/Terminal";

const services = [
  { name: "Static & business websites", text: "Fast, SEO-ready sites for shops, agencies, clinics and personal brands. Built to load quickly on mobile data." },
  { name: "Custom web apps", text: "Dashboards, portals, booking tools and internal software shaped around how your business actually works." },
  { name: "ERP systems", text: "Inventory, billing, HR, accounts and reports in one place, with role-based access for your team." },
  { name: "Restaurant management", text: "Table orders, kitchen display, billing, menu and stock control, so service stays smooth at peak hours." },
  { name: "Hotel management", text: "Room booking, check-in and check-out, housekeeping, invoices and occupancy reports." },
  { name: "Travel & tour platforms", text: "Package listings, enquiries, online booking, itineraries and agent panels for trekking and tour companies." },
  { name: "E-commerce stores", text: "Product catalogue, cart, orders and admin panel, with payment options that fit your customers." },
];

const steps = [
  { t: "Tell me what you need", d: "Share your idea on WhatsApp or a quick call. I ask the right questions and write down the scope." },
  { t: "Get a fixed quote", d: "You receive a clear price and timeline based on the features you need. No surprises later." },
  { t: "Build and review", d: "I build in stages and show you working progress, so you can give feedback early." },
  { t: "Launch and support", d: "I set up hosting and your .np domain, go live with you, and stay available after launch." },
];

const faqs = [
  { q: "How much does a project cost?", a: "Pricing depends on the application. A simple business website costs far less than a hotel or ERP system. Tell me what you want to build and I will send a fixed quote, usually within a day." },
  { q: "Is hosting really free?", a: "To get you started, yes. I deploy your project on a free host like Render at no charge from me. Free plans can sleep when idle, so for a busy business I can host it on a VPS instead. VPS prices vary with the server size and provider, and I will quote it clearly first." },
  { q: "Do I get a .np domain?", a: "Yes. I help you get a .np domain and connect it to your site, with no domain setup charge from me." },
  { q: "Which technologies do you use?", a: "Next.js for fast, search-friendly front ends and Nest.js for secure, well-structured back ends and APIs." },
  { q: "Can you build something custom that isn't listed?", a: "Yes. If it can run in a browser, I can build it. Send me the idea and we will scope it together." },
  { q: "Will my site work on phones?", a: "Every project is built mobile-first and tested on small screens, because most of your visitors will be on one." },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: "Freelance Next.js and Nest.js developer building custom web apps, ERP, restaurant, hotel, travel and e-commerce systems in Nepal.",
    url: site.url,
    image: `${site.url}/baucha.png`,
    areaServed: "Nepal",
    slogan: site.tagline,
    knowsAbout: ["Next.js", "Nest.js", "Web development", "ERP", "E-commerce"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web development services",
      itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.text } })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

const NAV = [["Work", "#work"], ["Hosting", "#hosting"], ["Route", "#route"], ["FAQ", "#faq"]];
// [index in services, mini-UI id, grid span, tone, accent]
const TILES: [number, string, string, string, string][] = [
  [2, "erp", "sm:col-span-2 lg:col-span-4", "t-cobalt", "mA"], [0, "site", "", "t-amber", "mD"],
  [3, "restaurant", "lg:col-span-2", "t-white", "mA"], [4, "hotel", "lg:col-span-2", "t-sand", "mD"], [5, "travel", "lg:col-span-2", "t-white", "mD"],
  [6, "shop", "sm:col-span-2 lg:col-span-3", "t-cobalt", "mA"], [1, "custom", "sm:col-span-2 lg:col-span-3", "t-amber", "mD"],
];
const CAMPS = [["Base camp", "0 m"], ["Camp one", "1,800 m"], ["Camp two", "3,600 m"], ["Summit", "5,364 m"]];
const LIFT = ["lg:mt-24", "lg:mt-16", "lg:mt-8", "lg:mt-0"];
const amber = "bg-[#f7b500] text-[#0b1230] hover:bg-[#ffc61f]";
const btn = "inline-flex items-center justify-center rounded-full px-7 py-4 text-[15px] font-bold transition-colors";
const h2 = "font-display text-4xl font-extrabold leading-[1] sm:text-6xl";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1230]/90 backdrop-blur">
        <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <a href="#top" className="font-display text-lg font-extrabold italic leading-none text-white">Freelancer <span className="text-[#f7b500]">Baucha</span></a>
          <ul className="hidden items-center gap-8 text-[15px] font-medium text-[#9aa6cf] md:flex">
            {NAV.map(([l, h]) => <li key={h}><a className="hover:text-white" href={h}>{l}</a></li>)}
            <li><a className={`${btn} ${amber} !px-5 !py-2.5`} href="#contact">Start a project</a></li>
          </ul>
          <details className="md:hidden">
            <summary aria-label="Open menu" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </summary>
            <div className="absolute right-5 top-full mt-2 w-60 rounded-2xl border border-white/15 bg-[#121c47] p-2 text-[15px] font-medium text-white shadow-2xl">
              {[...NAV, ["Start a project", "#contact"]].map(([l, h]) => <a key={h} href={h} className="block rounded-xl px-4 py-3 hover:bg-white/10">{l}</a>)}
            </div>
          </details>
        </nav>
      </header>

      <main id="top">
        {/* HERO: Himalayan dusk */}
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg,#0b1230 0%,#15215a 60%,#3a2f6b 100%)" }}>
          <Flags />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-48 pt-28 md:grid-cols-[1.1fr_.9fr] md:pb-60 md:pt-32">
            <div>
              <h1 className="text-[2.8rem] font-extrabold leading-[.98] sm:text-6xl lg:text-[5rem]">I build the web apps that run your business.</h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#b4bde0]">
                Baucha, freelance developer in Nepal. Websites, ERP, restaurant, hotel, travel and e-commerce systems in Next.js and Nest.js, with free hosting and a free .np domain.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={waLink()} className={`${btn} ${amber}`}>Chat on WhatsApp</a>
                <a href="#work" className={`${btn} border border-white/30 hover:bg-white/10`}>See what I build</a>
              </div>
              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#9aa6cf]">
                {["Next.js + Nest.js", "Free hosting to start", "Free .np domain"].map((t) => <li key={t}><span className="text-[#f7b500]">✓</span> {t}</li>)}
              </ul>
            </div>
            <div className="relative mx-auto w-full max-w-sm md:max-w-none">
              <div aria-hidden className="absolute -right-8 -top-4 aspect-square h-[88%] rounded-full" style={{ background: "radial-gradient(circle,#ffc61f 0%,#f7b500 42%,rgba(247,181,0,0) 70%)" }} />
              <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] border-[5px] border-[#f7b500] bg-[#15215a] shadow-[0_30px_80px_rgba(0,0,0,.5)]">
                <Image src="/baucha.png" alt="Freelancer Baucha, a smiling developer in a navy hoodie, giving a thumbs up at his laptop" fill priority sizes="(min-width:768px) 460px, 90vw" className="object-cover object-[46%_30%]" />
              </div>
              <div className="absolute -bottom-8 -left-4 z-20 h-32 w-32 md:-left-10 md:h-40 md:w-40" aria-hidden>
                <svg viewBox="0 0 200 200" className="orbit h-full w-full">
                  <circle cx="100" cy="100" r="99" fill="#f7b500" />
                  <path id="ring" d="M100 100 m-72 0 a72 72 0 1 1 144 0 a72 72 0 1 1 -144 0" fill="none" />
                  <text fontSize="17" fontWeight="800" fill="#0b1230"><textPath href="#ring" textLength="440" lengthAdjust="spacing">FREE HOSTING • FREE .NP DOMAIN • </textPath></text>
                </svg>
                <span className="font-display absolute inset-0 grid place-items-center text-xl font-extrabold text-[#0b1230] md:text-2xl">NPR 0</span>
              </div>
            </div>
          </div>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-40 w-full md:h-60" aria-hidden>
            <path fill="#1b2a63" d="M0 220 120 160 220 200 360 110 470 190 590 130 720 210 860 90 980 180 1100 140 1230 200 1340 150 1440 190V320H0Z" />
            <path fill="#121c47" d="M0 270 150 210 260 250 420 170 560 250 700 200 860 265 1010 190 1160 255 1300 205 1440 250V320H0Z" />
            <path fill="#0b1230" d="M0 300 200 262 380 295 600 255 820 297 1050 262 1250 296 1440 270V320H0Z" />
          </svg>
        </section>

        {/* WORK: bento */}
        <section id="work" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
            <h2 className={h2}>Seven kinds of software. One freelancer.</h2>
            <p className="text-lg leading-relaxed text-[#9aa6cf]">If it runs in a browser, I can build it. Charges vary by application, so tap a tile, tell me your idea and get a fixed quote.</p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {TILES.map(([i, id, span, tone, acc]) => (
              <li key={id} className={`reveal ${span}`}>
                <a href={waLink(`Hi Baucha, I'd like to build: ${services[i].name}. Please send me a quote.`)} className={`tile flex h-full flex-col rounded-[1.75rem] p-7 ${tone}`}>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-extrabold leading-tight">{services[i].name}</h3>
                    <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0b1230] text-lg text-white">↗</span>
                  </div>
                  <p className="mt-2 max-w-md leading-relaxed opacity-80">{services[i].text}</p>
                  <div className="mt-auto pt-6"><Mini id={id} acc={acc} /></div>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* HOSTING */}
        <section id="hosting" className="mx-auto max-w-6xl px-5 pb-20 md:pb-28">
          <div className="reveal grid items-center gap-10 rounded-[2rem] border border-white/10 bg-[#121c47] p-8 sm:p-12 md:grid-cols-2 md:p-16">
            <div>
              <h2 className={h2}>Start on free hosting. Grow onto a VPS.</h2>
              <p className="mt-5 leading-relaxed text-[#9aa6cf]">To get you online for free, I deploy your app on a free host like Render and help you get a .np domain. When your business needs always-on speed, I can host it on a VPS instead. VPS prices vary with the server and provider, and I&apos;ll quote it clearly before you decide.</p>
            </div>
            <Terminal />
          </div>
        </section>

        {/* ROUTE */}
        <section id="route" className="mx-auto max-w-6xl px-5 pb-20 md:pb-28">
          <h2 className={`${h2} max-w-2xl`}>Every project is a climb. I carry the gear.</h2>
          <ol className="mt-12 grid gap-4 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} className={`reveal rounded-[1.5rem] p-6 ${LIFT[i]} ${i === 3 ? "bg-[#f7b500] text-[#0b1230]" : "border border-white/10 bg-white/[0.04]"}`}>
                <p className="font-mono text-xs font-bold opacity-70">{CAMPS[i][0]} · {CAMPS[i][1]}</p>
                <h3 className="font-display mt-3 text-xl font-extrabold leading-tight">{s.t}</h3>
                <p className={`mt-2 leading-relaxed ${i === 3 ? "opacity-80" : "text-[#9aa6cf]"}`}>{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto grid max-w-6xl gap-10 px-5 pb-24 md:grid-cols-[.8fr_1.2fr] md:pb-32">
          <h2 className={`${h2} md:sticky md:top-28 md:self-start`}>Questions people ask first</h2>
          <div className="border-t border-white/15">
            {faqs.map((f) => (
              <details key={f.q} className="border-b border-white/15 py-5">
                <summary className="flex items-center justify-between gap-6 text-lg font-semibold">
                  {f.q}
                  <span className="plus grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f7b500] text-xl leading-none text-[#0b1230] transition-transform" aria-hidden>+</span>
                </summary>
                <p className="mt-3 max-w-xl leading-relaxed text-[#9aa6cf]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative overflow-hidden bg-[#f7b500] text-[#0b1230]">
          <div className="mx-auto max-w-4xl px-5 pb-52 pt-20 text-center md:pt-28">
            <h2 className="font-display text-5xl font-extrabold leading-[.95] sm:text-7xl">Let&apos;s plant your flag.</h2>
            <p className="mx-auto mt-5 max-w-lg text-lg font-medium opacity-80">Tell me what you want to build. I reply with questions and a fixed quote.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={waLink()} className={`${btn} bg-[#0b1230] text-white hover:bg-[#1c2a5c]`}>Chat on WhatsApp</a>
              <a href="tel:+9779717530487" className={`${btn} border-2 border-[#0b1230] hover:bg-[#0b1230]/10`}>Call 9717530487</a>
            </div>
          </div>
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-36 w-full md:h-48" aria-hidden>
            <path fill="#0b1230" d="M0 130 140 60 250 110 400 20 540 120 690 50 840 130 990 40 1130 110 1290 60 1440 120V200H0Z" />
          </svg>
        </section>
      </main>
      <footer className="bg-[#0b1230]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-[#9aa6cf] sm:flex-row sm:justify-between">
          <p><span className="font-display font-bold text-white">{site.name}</span> · {site.tagline}</p>
          <p>© <Year /> {site.name}. Built with Next.js.</p>
        </div>
      </footer>
    </>
  );
}
