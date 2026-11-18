"use client";

import { useState } from "react";
import type { Category } from "@/content/categories";

/** Desktop: details on hover/focus (CSS). Touch: tap the tile to expand/collapse. */
export function CategoryTile({ index, category }: { index: number; category: Category }) {
  const [open, setOpen] = useState(false);
  return (
    <li
      tabIndex={0}
      data-open={open}
      onClick={() => setOpen((o) => !o)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((o) => !o);
        }
      }}
      className="tile tile-cat relative cursor-pointer p-5 sm:p-6"
    >
      <span className="kicker">§ {String(index + 1).padStart(2, "0")}</span>
      <p className="serif mt-3 pr-6 text-[length:var(--text-h3)]">{category.title}</p>
      <span aria-hidden className="tile-plus">{open ? "−" : "+"}</span>
      <p className="tile-static mt-3 text-[0.95rem] leading-relaxed text-mist">{category.description}</p>
      <div className="tile-more">
        <p className="serif text-lg">{category.title}</p>
        <p className="mt-2 text-[0.95rem] leading-relaxed">{category.description}</p>
      </div>
    </li>
  );
}
