"use client";
import { useEffect, useState } from "react";

// Client-only so the current date never blocks prerendering (Cache Components).
export default function Year() {
  const [y, setY] = useState(2026);
  useEffect(() => setY(new Date().getFullYear()), []);
  return <>{y}</>;
}
