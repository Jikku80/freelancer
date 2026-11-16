"use client";
import { useState } from "react";
import { waLink } from "../app/site";

const COLONIES = [
  { n: "Signal Outpost", x: 16, y: 70 }, { n: "Custom Forge", x: 33, y: 38 }, { n: "ERP Citadel", x: 50, y: 66 },
  { n: "Harvest Kitchen", x: 66, y: 34 }, { n: "Orbit Hotel", x: 82, y: 62 }, { n: "Trail Port", x: 24, y: 18 }, { n: "Bazaar Dome", x: 74, y: 12 },
];

export default function Surface({ items }: { items: { name: string; text: string }[] }) {
  const [i, setI] = useState(2);
  const it = items[i], col = COLONIES[i];
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="panel relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]" role="group" aria-label="Planet map">
        <svg viewBox="0 0 100 62" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <path d="M0 40 L12 30 L24 42 L38 24 L52 44 L66 28 L80 42 L100 26 V62 H0Z" fill="#1d1033" />
          <path d="M0 52 L16 44 L30 54 L48 40 L64 54 L82 42 L100 52 V62 H0Z" fill="#2c1647" />
          <path d="M0 58 L22 52 L44 59 L70 51 L100 58 V62 H0Z" fill="#3b1d5c" />
        </svg>
        {COLONIES.map((c, k) => (
          <button key={c.n} onClick={() => setI(k)} aria-pressed={k === i} aria-label={c.n}
            className="absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
            <span className={`absolute h-6 w-6 rounded-full ${k === i ? "animate-ping bg-amber/60" : "bg-amber/20"}`} />
            <span className={`relative h-3.5 w-3.5 rounded-full border-2 ${k === i ? "border-white bg-amber" : "border-amber bg-space"}`} />
            <span className={`pointer-events-none absolute top-9 hidden whitespace-nowrap text-[11px] font-semibold sm:block ${k === i ? "text-white" : "text-mist"}`}>{c.n}</span>
          </button>
        ))}
      </div>
      <div className="panel p-7" aria-live="polite">
        <div key={i} className="win-in">
          <p className="font-mono text-xs text-amber">Colony {i + 1} of {items.length}: {col.n}</p>
          <h3 className="mt-3 text-2xl font-bold">{it.name}</h3>
          <p className="mt-3 leading-relaxed text-mist">{it.text}</p>
          <p className="mt-4 text-sm text-white/70">Fuel cost varies by mission: price depends on your application.</p>
          <a href={waLink(`Hi Baucha, I'd like to build: ${it.name}. Please send me a quote.`)} className="mt-6 inline-flex rounded-full bg-amber px-6 py-3 font-semibold text-space hover:bg-[#ffc61f]">Request this colony</a>
        </div>
        <div className="mt-6 flex gap-1.5 sm:hidden" aria-hidden>{items.map((_, k) => <span key={k} className={`h-1.5 flex-1 rounded ${k === i ? "bg-amber" : "bg-white/15"}`} />)}</div>
      </div>
    </div>
  );
}
