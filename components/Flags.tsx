const COLORS = ["#2f6bff", "#ffffff", "#e63946", "#2ea66a", "#f7b500"];
export default function Flags() {
  const N = 22;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 overflow-hidden">
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-20 w-full">
        <path d="M0 8Q600 88 1200 8" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      {Array.from({ length: N }, (_, i) => {
        const t = (i + 0.5) / N;
        return <span key={i} className="flag" style={{ left: `${t * 100}%`, top: `${8 + 160 * t * (1 - t)}px`, background: COLORS[i % 5], animationDelay: `${(i % 7) * 0.25}s` }} />;
      })}
    </div>
  );
}
