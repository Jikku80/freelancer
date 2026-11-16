"use client";
import Image from "next/image";
import { useRef } from "react";
import { waLink } from "../app/site";

const btn = "inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[15px] font-semibold transition-colors";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  function move(e: React.PointerEvent) {
    const r = root.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    root.current!.style.setProperty("--mx", `${x * 100}%`);
    root.current!.style.setProperty("--my", `${y * 100}%`);
    tilt.current!.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 14}deg) rotateX(${(0.5 - y) * 10}deg)`;
  }
  const chip = "absolute rounded-full bg-white px-4 py-2 text-sm font-bold text-ink shadow-xl";
  return (
    <section
      ref={root} onPointerMove={move} onPointerLeave={() => (tilt.current!.style.transform = "")}
      className="overflow-hidden text-white"
      style={{ background: "radial-gradient(520px circle at var(--mx,72%) var(--my,30%), rgba(247,181,0,.28), transparent 62%), #0e1736" }}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-12 md:grid-cols-[1.05fr_1fr] md:pb-28 md:pt-20">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/80">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber" /> Taking new projects
          </p>
          <h1 className="text-[2.8rem] font-extrabold leading-[1] sm:text-6xl lg:text-[4.6rem]">
            Tell me your business. I&apos;ll ship the software.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
            Baucha, freelance developer in Nepal. ERP, restaurants, hotels, travel and online shops in Next.js and Nest.js, with free Render hosting and a free .np domain.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#builder" className={`${btn} bg-amber text-ink hover:bg-[#ffc61f]`}>Design your project live</a>
            <a href={waLink()} className={`${btn} border border-white/30 hover:bg-white/10`}>Chat on WhatsApp</a>
          </div>
        </div>
        <div className="relative px-3">
          <div ref={tilt} style={{ transformStyle: "preserve-3d", transition: "transform .15s ease-out" }} className="settle relative">
            <Image
              src="/baucha.png" alt="Freelancer Baucha, a smiling developer in a navy hoodie, giving a thumbs up at his laptop"
              width={1312} height={1199} priority sizes="(min-width: 768px) 520px, 92vw"
              className="w-full rounded-[1.75rem] border-4 border-amber shadow-2xl"
            />
            <span className={`${chip} -left-3 top-8`} style={{ transform: "translateZ(70px) rotate(-6deg)" }}>Next.js</span>
            <span className={`${chip} -right-3 top-24`} style={{ transform: "translateZ(90px) rotate(5deg)" }}>Nest.js</span>
            <span className={`${chip} bottom-10 -left-2 bg-amber`} style={{ transform: "translateZ(80px) rotate(4deg)" }}>Free .np domain</span>
          </div>
        </div>
      </div>
    </section>
  );
}
