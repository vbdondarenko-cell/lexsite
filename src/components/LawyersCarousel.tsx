import { useCallback, useEffect, useRef, useState } from "react";

export type LawyerProfile = {
  name: string;
  shortName: string;
  role: string;
  photo: string;
  photoAlt: string;
  avatarFocus: string;
  facts: { value: string; label: string }[];
  paragraphs: string[];
  certificate?: string;
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function LawyersCarousel({ lawyers, city }: { lawyers: LawyerProfile[]; city: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const last = lawyers.length - 1;

  const go = useCallback((index: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(last, index));
    el.scrollTo({ left: next * el.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    setActive(next);
  }, [last]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(Math.round(el.scrollLeft / Math.max(1, el.clientWidth))));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
  };

  return (
    <div role="region" aria-roledescription="карусель" aria-label="Адвокати" onKeyDown={onKeyDown} className="mt-10">
      <div className="flex items-center justify-between gap-4">
        <div role="tablist" aria-label="Вибір адвоката" className="flex flex-wrap gap-3">
          {lawyers.map((l, i) => (
            <button
              key={l.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => go(i)}
              className={`group flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-5 text-left transition-colors ${i === active ? "border-sun bg-white/10" : "border-white/20 hover:border-brass"}`}
            >
              <img src={l.photo} alt="" width={44} height={44} loading="lazy" className="h-11 w-11 rounded-full object-cover" style={{ objectPosition: l.avatarFocus }} />
              <span className="text-sm font-semibold">{l.shortName}</span>
            </button>
          ))}
        </div>
        <div className="hidden gap-2 sm:flex">
          <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Попередній адвокат" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-xl transition-colors hover:border-sun hover:text-sun disabled:opacity-30 disabled:hover:border-white/25 disabled:hover:text-inherit">‹</button>
          <button type="button" onClick={() => go(active + 1)} disabled={active === last} aria-label="Наступний адвокат" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-xl transition-colors hover:border-sun hover:text-sun disabled:opacity-30 disabled:hover:border-white/25 disabled:hover:text-inherit">›</button>
        </div>
      </div>

      <div ref={track} className="no-scrollbar mt-8 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain" tabIndex={0} aria-live="polite">
        {lawyers.map((l, i) => (
          <article key={l.name} role="group" aria-roledescription="слайд" aria-label={`${i + 1} з ${lawyers.length}: ${l.name}`} className="w-full shrink-0 snap-start">
            <div className="grid gap-8 sm:grid-cols-[minmax(0,15rem)_1fr] lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-12">
              <figure className="mx-auto w-full max-w-[15rem] sm:mx-0 lg:max-w-[19rem]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-brass/30 bg-slate">
                  <img src={l.photo} alt={l.photoAlt} loading={i === 0 ? "eager" : "lazy"} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "50% 15%" }} />
                </div>
              </figure>
              <div className="min-w-0">
                <p className="kicker">{l.role} · {city}</p>
                <h3 className="serif mt-2 text-[length:var(--text-h2)]">{l.name}</h3>
                <dl className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                  {l.facts.map((f) => (
                    <div key={f.value + f.label} className="tile p-3 sm:p-4">
                      <dt className="serif text-[length:var(--text-h3)] text-brass">{f.value}</dt>
                      <dd className="mt-1 text-xs leading-snug text-mist">{f.label}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 space-y-3 text-sm leading-relaxed text-mist sm:text-base">
                  {l.paragraphs.map((p) => (<p key={p}>{p}</p>))}
                </div>
                {l.certificate && (
                  <p className="mt-6 border-l-2 border-brass pl-4 text-xs leading-relaxed text-mist">{l.certificate}</p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 sm:hidden" aria-hidden>
        {lawyers.map((l, i) => (
          <span key={l.name} className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-sun" : "w-3 bg-white/30"}`} />
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-mist sm:hidden">Свайпайте вліво чи вправо, щоб переглянути інших адвокатів</p>
    </div>
  );
}
