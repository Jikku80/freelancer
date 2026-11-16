"use client";
import { useEffect, useRef, useState } from "react";

const SCRIPT = "$ git push render main\n→ Building with Next.js + Nest.js\n✓ Deployed on Render · hosting NPR 0\n$ connect yourbusiness.com.np\n✓ Live · domain NPR 0";

export default function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(SCRIPT.length);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let i = 0;
      const t = setInterval(() => { setN(++i); if (i >= SCRIPT.length) clearInterval(t); }, 38);
    }, { threshold: 0.5 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} aria-label="Deploy preview" className="rounded-2xl bg-black/40 p-5 font-mono text-sm leading-7 ring-1 ring-white/10 sm:text-base">
      {SCRIPT.slice(0, n).split("\n").map((l, i) => (
        <div key={i} className={l.startsWith("✓") ? "text-amber" : l.startsWith("$") ? "text-white" : "text-white/60"}>{l}</div>
      ))}
      <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-amber" />
    </div>
  );
}
