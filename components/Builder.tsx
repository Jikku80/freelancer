"use client";
import { useState } from "react";
import { waLink } from "../app/site";

const TYPES = [
  { id: "erp", label: "ERP", base: 5 }, { id: "restaurant", label: "Restaurant", base: 4 },
  { id: "hotel", label: "Hotel", base: 4 }, { id: "travel", label: "Travel", base: 3 },
  { id: "shop", label: "E-commerce", base: 3 }, { id: "site", label: "Website", base: 1 },
  { id: "custom", label: "Something else", base: 3 },
];
const FEATS: [string, number][] = [
  ["Admin dashboard", 1], ["Online payments", 2], ["Login & roles", 1],
  ["Reports & charts", 2], ["Multi-branch", 2], ["SMS & email alerts", 1],
];

function Screen({ id }: { id: string }) {
  const cell = "rounded-md";
  if (id === "restaurant" || id === "hotel") {
    const n = id === "hotel" ? 18 : 12;
    return (
      <div className={`grid gap-2 ${id === "hotel" ? "grid-cols-6" : "grid-cols-4"}`}>
        {Array.from({ length: n }, (_, i) => (
          <div key={i} className={`${cell} grid h-12 place-items-center text-xs font-bold ${i % 3 === 0 ? "bg-amber text-ink" : i % 5 === 0 ? "bg-white/40 text-ink" : "bg-white/10 text-white/60"}`}>
            {id === "hotel" ? 101 + i : `T${i + 1}`}
          </div>
        ))}
      </div>
    );
  }
  if (id === "shop")
    return (
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={`${cell} bg-white/10 p-2`}>
            <div className={`${cell} h-14 ${i % 2 ? "bg-amber/80" : "bg-white/30"}`} />
            <div className="mt-2 h-2 w-3/4 rounded bg-white/40" /><div className="mt-1.5 h-2 w-1/3 rounded bg-amber" />
          </div>
        ))}
      </div>
    );
  if (id === "travel")
    return (
      <svg viewBox="0 0 300 130" className="h-36 w-full" aria-hidden>
        <path d="M20 100 C80 20 130 120 180 60 S260 30 285 40" fill="none" stroke="#f7b500" strokeWidth="3" strokeDasharray="6 6" />
        {[[20, 100, "Kathmandu"], [180, 60, "Pokhara"], [285, 40, "Chitwan"]].map(([x, y, l]) => (
          <g key={String(l)}><circle cx={Number(x)} cy={Number(y)} r="7" fill="#fff" /><text x={Number(x)} y={Number(y) + 22} fontSize="11" fill="#fff" textAnchor="middle">{String(l)}</text></g>
        ))}
      </svg>
    );
  if (id === "erp")
    return (
      <div>
        <div className="flex h-24 items-end gap-2">
          {[40, 65, 50, 85, 70, 95, 60, 80].map((h, i) => <div key={i} className={`flex-1 rounded-t ${i % 3 === 1 ? "bg-amber" : "bg-white/30"}`} style={{ height: `${h}%` }} />)}
        </div>
        {[0, 1, 2].map((i) => <div key={i} className="mt-2 flex gap-2"><div className="h-3 flex-1 rounded bg-white/15" /><div className="h-3 w-12 rounded bg-white/30" /></div>)}
      </div>
    );
  if (id === "site")
    return (
      <div><div className="h-20 rounded-md bg-amber/90 p-3"><div className="h-3 w-2/3 rounded bg-ink/70" /><div className="mt-2 h-3 w-1/3 rounded bg-ink/40" /></div>
        <div className="mt-2 grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="h-16 rounded-md bg-white/15" />)}</div></div>
    );
  return (
    <div className="grid grid-cols-3 gap-2">
      {[3, 2, 1].map((c, i) => (
        <div key={i} className="rounded-md bg-white/10 p-2">
          {Array.from({ length: c }, (_, j) => <div key={j} className={`mb-2 h-9 rounded ${j === 0 && i === 1 ? "bg-amber" : "bg-white/25"}`} />)}
        </div>
      ))}
    </div>
  );
}

export default function Builder() {
  const [type, setType] = useState(TYPES[1]);
  const [feats, setFeats] = useState<string[]>(["Admin dashboard"]);
  const score = type.base + FEATS.filter(([f]) => feats.includes(f)).reduce((a, [, p]) => a + p, 0);
  const level = score <= 3 ? "Starter" : score <= 7 ? "Standard" : score <= 11 ? "Advanced" : "Enterprise";
  const msg = `Hi Baucha, I want a ${type.label} project with: ${feats.join(", ") || "basic features"}. Looks like a ${level} build. Please send me a quote.`;
  const toggle = (f: string) => setFeats((p) => (p.includes(f) ? p.filter((x) => x !== f) : [...p, f]));
  const on = "bg-ink text-white border-ink", off = "bg-white border-line hover:border-ink";
  return (
    <section id="builder" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <h2 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">Don&apos;t describe it. Build it right here.</h2>
      <p className="mt-4 max-w-xl text-ink-soft">Pick what you need. The preview changes, the build size updates, and your brief is ready to send. Final charges depend on your application.</p>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="mb-3 font-semibold" id="t">What are you building?</p>
          <div role="group" aria-labelledby="t" className="flex flex-wrap gap-2">
            {TYPES.map((t) => <button key={t.id} aria-pressed={t.id === type.id} onClick={() => setType(t)} className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${t.id === type.id ? on : off}`}>{t.label}</button>)}
          </div>
          <p className="mb-3 mt-8 font-semibold" id="f">What should it do?</p>
          <div role="group" aria-labelledby="f" className="flex flex-wrap gap-2">
            {FEATS.map(([f]) => <button key={f} aria-pressed={feats.includes(f)} onClick={() => toggle(f)} className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${feats.includes(f) ? "border-amber bg-amber text-ink" : off}`}>{f}</button>)}
          </div>
          <div className="mt-8" role="status">
            <div className="flex justify-between text-sm font-semibold"><span>Build size</span><span>{level}</span></div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-amber transition-all duration-500" style={{ width: `${Math.min(100, (score / 14) * 100)}%` }} /></div>
          </div>
          <a href={waLink(msg)} className="mt-8 inline-flex rounded-full bg-ink px-6 py-3.5 font-semibold text-white hover:bg-[#1c2a5c]">Send this brief to Baucha</a>
        </div>
        <div className="rounded-2xl bg-ink p-3 shadow-2xl sm:p-4">
          <div className="mb-3 flex items-center gap-2">
            {[0, 1, 2].map((i) => <span key={i} className="h-3 w-3 rounded-full bg-white/25" />)}
            <span className="ml-2 flex-1 truncate rounded-full bg-white/10 px-4 py-1 text-xs text-white/70">yourbusiness.com.np</span>
          </div>
          <div key={type.id} className="win-in min-h-60 rounded-xl bg-[#17224a] p-4 text-white"><Screen id={type.id} /></div>
          <div className="mt-3 flex min-h-8 flex-wrap gap-2">
            {feats.map((f) => <span key={f} className="win-in rounded-full bg-amber px-3 py-1 text-xs font-bold text-ink">{f}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
