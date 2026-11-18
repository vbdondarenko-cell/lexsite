"use client";

import { useState } from "react";
import type { Category } from "@/content/categories";

type Group = { id: string; label: string; list: Category[] };

/** Compact picker: tabs (population / business) + chips; the description of the chosen case shows in one panel. */
export function CategoryExplorer({ groups }: { groups: Group[] }) {
  const [gi, setGi] = useState(0);
  const [ci, setCi] = useState(0);
  const group = groups[gi]!;
  const current = group.list[ci] ?? group.list[0]!;

  return (
    <div className="mt-8">
      <div role="tablist" aria-label="Категорії справ" className="flex gap-2 border-b border-[#cdd6e6]">
        {groups.map((g, i) => (
          <button
            key={g.id}
            role="tab"
            id={`tab-${g.id}`}
            aria-selected={i === gi}
            aria-controls="cat-panel"
            type="button"
            onClick={() => { setGi(i); setCi(0); }}
            className={`-mb-px min-h-11 border-b-2 px-4 text-sm font-semibold uppercase tracking-wide transition-colors ${i === gi ? "border-brass-deep text-brass-deep" : "border-transparent text-[#4b5563] hover:text-brass-deep"}`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label={group.label}>
        {group.list.map((c, i) => (
          <li key={c.title}>
            <button
              type="button"
              aria-pressed={i === ci}
              onClick={() => setCi(i)}
              onMouseEnter={() => setCi(i)}
              className={`min-h-10 rounded-full border px-4 py-1.5 text-[0.95rem] transition-colors ${i === ci ? "border-brass-deep bg-brass-deep text-white" : "border-[#cdd6e6] bg-white text-graphite hover:border-brass-deep"}`}
            >
              {c.title}
            </button>
          </li>
        ))}
      </ul>

      <div id="cat-panel" role="tabpanel" aria-labelledby={`tab-${group.id}`} aria-live="polite" className="mt-5 rounded-lg border border-[#cdd6e6] border-l-4 border-l-brass-deep bg-white p-5 sm:p-6">
        <p className="serif text-[length:var(--text-h3)]">{current.title}</p>
        <p className="mt-2 max-w-3xl text-base leading-relaxed text-mist">{current.description}</p>
        <a href="#zvorotnij-zvyazok" className="btn btn-solid mt-5">Безкоштовна консультація</a>
      </div>
    </div>
  );
}
