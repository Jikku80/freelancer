"use client";
import { useEffect, useRef, useState } from "react";
import { waLink } from "../app/site";

const LINKS = [["Colonies", "#surface"], ["Launchpad", "#hosting"], ["Flight plan", "#process"], ["Briefings", "#faq"]];

export default function Cosmos() {
  const cv = useRef<HTMLCanvasElement>(null);
  const alt = useRef<HTMLSpanElement>(null);
  const stage = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const [toast, setToast] = useState({ s: "", on: false });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const seen = new Set<string>();
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const s = (e.target as HTMLElement).dataset.checkpoint!;
      if (!e.isIntersecting || seen.has(s)) return;
      seen.add(s); setToast({ s: "Checkpoint: " + s, on: true });
      clearTimeout(timer); timer = setTimeout(() => setToast((t) => ({ ...t, on: false })), 2600);
    }), { threshold: 0.4 });
    document.querySelectorAll("[data-checkpoint]").forEach((el) => io.observe(el));
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const c = cv.current!, g = c.getContext("2d")!;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, px = 0, tx = 0, ty = 0, mx = 0, my = 0;
    const spr = document.createElement("canvas"); spr.width = spr.height = 64;
    const sg = spr.getContext("2d")!, gr = sg.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, "rgba(255,244,200,1)"); gr.addColorStop(0.25, "rgba(247,181,0,.55)"); gr.addColorStop(1, "rgba(247,181,0,0)");
    sg.fillStyle = gr; sg.fillRect(0, 0, 64, 64);
    const F = Array.from({ length: innerWidth < 700 ? 34 : 60 }, () => ({ x: Math.random(), y: Math.random(), vx: 0, vy: 0, ph: Math.random() * 6.28, r: 5 + Math.random() * 9 }));
    const size = () => { const d = devicePixelRatio || 1; w = innerWidth; h = innerHeight; c.width = w * d; c.height = h * d; g.setTransform(d, 0, 0, d, 0, 0); };
    size(); mx = tx = w * 0.7; my = ty = h * 0.4;
    const move = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; px = e.clientX / w - 0.5; };
    addEventListener("resize", size); addEventListener("pointermove", move);
    const DEPTH = [[-0.5, 1], [-1, 1.6], [0.8, 1], [1.5, 1.8], [2, 1.2]];
    const tick = (t: number) => {
      const p = Math.min(1, scrollY / Math.max(1, document.documentElement.scrollHeight - h));
      document.documentElement.style.setProperty("--p", String(p));
      alt.current!.textContent = Math.round(p * 1240).toLocaleString("en-US") + " m";
      stage.current!.textContent = p < 0.12 ? "Cave mouth" : p < 0.3 ? "Glow caverns" : p < 0.75 ? "Crystal hall" : "Deep camp";
      bar.current!.style.width = `${p * 100}%`;
      tx += (mx - tx) * 0.08; ty += (my - ty) * 0.08;
      layers.current.forEach((el, i) => {
        if (!el) return;
        const [fx, fy] = DEPTH[i];
        el.style.transform = `translate3d(${calm ? 0 : -px * 40 * fx}px, ${-p * 70 * fy * (i > 1 ? 1.4 : 0.4)}px, 0)`;
      });
      g.clearRect(0, 0, w, h);
      g.globalCompositeOperation = "lighter";
      const tg = g.createRadialGradient(tx, ty, 0, tx, ty, 300);
      tg.addColorStop(0, "rgba(247,181,0,.2)"); tg.addColorStop(1, "rgba(247,181,0,0)");
      g.fillStyle = tg; g.fillRect(tx - 300, ty - 300, 600, 600);
      for (const f of F) {
        const X = f.x * w, Y = f.y * h, dx = tx - X, dy = ty - Y, d = Math.hypot(dx, dy) || 1;
        if (!calm) {
          if (d < 260) { f.vx += (dx / d) * 0.00002; f.vy += (dy / d) * 0.00002; }
          f.vx = (f.vx + Math.sin(t * 0.0004 + f.ph) * 0.000004) * 0.995; f.vy = (f.vy + Math.cos(t * 0.00035 + f.ph) * 0.000004) * 0.995;
          f.x = (f.x + f.vx + 1) % 1; f.y = (f.y + f.vy + 1) % 1;
        }
        const near = d < 260 ? 1 - d / 260 : 0;
        g.globalAlpha = 0.35 + 0.35 * Math.sin(t * 0.002 + f.ph) ** 2 + near * 0.3;
        const r = f.r * (1 + near * 0.8);
        g.drawImage(spr, X - r, Y - r, r * 2, r * 2);
      }
      g.globalAlpha = 1; g.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("pointermove", move); };
  }, []);

  const setL = (i: number) => (el: HTMLDivElement | null) => { layers.current[i] = el; };
  const top = "M0 0H1000V40L960 90 930 40 890 130 850 50 800 20 760 110 720 40 670 150 630 50 580 30 540 100 490 40 440 170 400 60 350 30 300 120 260 40 210 90 160 30 110 140 60 50 0 80Z";
  const bot = "M0 200V120L60 150 120 90 190 140 260 70 340 130 420 100 500 150 580 80 660 140 740 90 820 150 900 100 1000 130V200Z";
  const strip = (i: number, d: string, fill: string, pos: string, hgt: string) => (
    <div ref={setL(i)} className={`absolute -inset-x-[6%] ${pos}`} style={{ height: hgt, willChange: "transform" }}>
      <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="h-full w-full"><path d={d} fill={fill} /></svg>
    </div>
  );
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 115%, #3a1a5e 0%, #12092a 50%, #05060f 100%)" }}>
        <canvas ref={cv} className="absolute inset-0 h-full w-full" />
        {strip(0, top, "#1a0f33", "top-0", "26vh")}
        {strip(1, top, "#0a0716", "-top-6", "20vh")}
        {strip(2, bot, "#1f1140", "bottom-0", "24vh")}
        {strip(3, bot, "#0a0716", "-bottom-4", "17vh")}
        <div ref={setL(4)} className="absolute inset-x-0 bottom-0 h-40">
          <svg viewBox="0 0 120 100" className="glow absolute bottom-0 left-2 w-[24vw] min-w-28 max-w-56" style={{ filter: "drop-shadow(0 0 16px #f7b500)" }}>
            <polygon points="10,100 28,20 44,100" fill="#f7b500" /><polygon points="40,100 62,0 82,100" fill="#ffd34d" /><polygon points="76,100 92,40 108,100" fill="#d99a00" />
          </svg>
          <svg viewBox="0 0 100 100" className="glow absolute bottom-0 right-3 w-[18vw] min-w-24 max-w-44" style={{ filter: "drop-shadow(0 0 16px #f7b500)", animationDelay: "1.4s" }}>
            <polygon points="8,100 30,30 50,100" fill="#ffd34d" /><polygon points="46,100 70,10 92,100" fill="#f7b500" />
          </svg>
        </div>
      </div>
      <nav className="nav" aria-label="Main">
        <a href="#top" className="logo font-display text-[15px] font-bold italic leading-none">Freelancer Baucha</a>
        <ul className="ml-auto hidden items-center gap-6 text-sm font-medium md:flex">
          {LINKS.map(([l, h]) => <li key={h}><a href={h}>{l}</a></li>)}
        </ul>
        <p className="ml-auto text-right text-[11px] leading-tight md:ml-0 md:min-w-24" aria-hidden style={{ color: "#aab2d5" }}>
          <span ref={stage} className="hidden sm:inline">Cave mouth</span><br className="hidden sm:inline" />
          <span ref={alt} className="font-mono" style={{ color: "#f7b500" }}>0 m</span>
        </p>
        <a href={waLink()} className="cta hidden sm:inline-block">Start a project</a>
        <details className="md:hidden">
          <summary aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-full" style={{ border: "1px solid rgba(247,181,0,.5)", color: "#fff" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </summary>
          <div className="nav-menu">
            {LINKS.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
            <a href={waLink()} className="cta mt-2 text-center">Start a project</a>
          </div>
        </details>
        <div ref={bar} className="absolute bottom-0 left-8 h-[2px] w-0 max-w-[calc(100%-4rem)] rounded bg-[#f7b500]" />
      </nav>
      <div role="status" className={`toast ${toast.on ? "on" : ""}`}>{toast.s || "\u00a0"}</div>
    </>
  );
}
