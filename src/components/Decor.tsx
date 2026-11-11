/** Decorative legal motifs: scales of justice and a 3D colonnade. All aria-hidden. */

export function Scales({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="32" cy="9" r="2.5" />
      <path d="M32 11.5V54M22 56h20M10 18h44" />
      <path d="M10 18 4 38M10 18l6 20M54 18l-6 20M54 18l6 20" />
      <path d="M2 38h16c0 5-3.6 8-8 8s-8-3-8-8zM46 38h16c0 5-3.6 8-8 8s-8-3-8-8z" />
    </svg>
  );
}

const side = [
  { x: "1%", w: "5rem", o: 0.5 },
  { x: "9%", w: "3.8rem", o: 0.34 },
  { x: "15.5%", w: "2.8rem", o: 0.22 },
];

/** Receding columns on both sides: pure CSS depth (perspective + rotateY + fade). */
export function Colonnade() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      {side.map((c) => (
        <span key={`l${c.x}`} className="col3d" style={{ left: c.x, width: c.w, opacity: c.o, ["--rot" as string]: "32deg" }} />
      ))}
      {side.map((c) => (
        <span key={`r${c.x}`} className="col3d" style={{ right: c.x, width: c.w, opacity: c.o, ["--rot" as string]: "-32deg" }} />
      ))}
    </div>
  );
}
