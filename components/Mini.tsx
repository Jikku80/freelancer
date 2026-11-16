export default function Mini({ id, acc }: { id: string; acc: string }) {
  if (id === "restaurant" || id === "hotel") {
    const hotel = id === "hotel", n = hotel ? 12 : 8;
    return (
      <div className={`grid gap-2 ${hotel ? "grid-cols-6" : "grid-cols-4"}`}>
        {Array.from({ length: n }, (_, i) => (
          <div key={i} className={`grid h-10 place-items-center rounded-lg text-xs font-bold ${i % 3 === 0 ? acc : i % 5 === 0 ? "m3" : "m1"}`}>{hotel ? 101 + i : `T${i + 1}`}</div>
        ))}
      </div>
    );
  }
  if (id === "shop")
    return (
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="m1 rounded-lg p-2"><div className={`h-14 rounded-md ${i % 2 ? acc : "m2"}`} /><div className="m3 mt-2 h-2 w-3/4 rounded" /><div className={`${acc} mt-1.5 h-2 w-1/3 rounded`} /></div>
        ))}
      </div>
    );
  if (id === "travel")
    return (
      <svg viewBox="0 0 300 120" className="h-32 w-full" aria-hidden>
        <path d="M20 95 C80 15 130 115 180 55 S260 25 285 35" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="6 7" opacity=".6" />
        {[[20, 95, "Kathmandu"], [180, 55, "Pokhara"], [285, 35, "Lumbini"]].map(([x, y, l]) => (
          <g key={String(l)}><circle cx={Number(x)} cy={Number(y)} r="8" fill="#f7b500" stroke="#0b1230" strokeWidth="2" /><text x={Number(x)} y={Number(y) + 24} fontSize="11" fontWeight="700" fill="currentColor" textAnchor="middle">{String(l)}</text></g>
        ))}
      </svg>
    );
  if (id === "erp")
    return (
      <div>
        <div className="flex h-24 items-end gap-2">{[40, 65, 50, 85, 70, 95, 60, 80, 55, 90].map((h, i) => <div key={i} className={`flex-1 rounded-t ${i % 3 === 1 ? acc : "m2"}`} style={{ height: `${h}%` }} />)}</div>
        {[0, 1].map((i) => <div key={i} className="mt-2 flex gap-2"><div className="m1 h-3 flex-1 rounded" /><div className="m3 h-3 w-14 rounded" /></div>)}
      </div>
    );
  if (id === "site")
    return (
      <div><div className="mD h-16 rounded-lg p-3"><div className="mA h-2.5 w-2/3 rounded" /><div className="m2 mt-2 h-2.5 w-1/3 rounded" /></div>
        <div className="mt-2 grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="m1 h-12 rounded-lg" />)}</div></div>
    );
  return (
    <div className="grid grid-cols-3 gap-2">
      {[3, 2, 1].map((c, i) => <div key={i} className="m1 rounded-lg p-2">{Array.from({ length: c }, (_, j) => <div key={j} className={`mb-2 h-8 rounded ${j === 0 && i === 1 ? "mD" : "m2"}`} />)}</div>)}
    </div>
  );
}
