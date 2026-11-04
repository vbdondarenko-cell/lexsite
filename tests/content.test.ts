import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { cases } from "@/content/cases";
import { services, servicesByCategory } from "@/content/services";
import { about, company, stats } from "@/content/site";
import { testimonials } from "@/content/testimonials";

// Snapshot of the legacy site's visible text (docs/legacy-original). Every migrated string must occur in it.
const norm = (s: string) => s.replace(/`n/g, " ").replace(/[ \s]+/g, " ").trim();
const legacy = norm(readFileSync("docs/legacy-original/visible-text-2026-11-04.txt", "utf8"));
const inLegacy = (s: string) => legacy.includes(norm(s));

describe("content completeness vs legacy site", () => {
  it("has the required counts", () => {
    expect(servicesByCategory("naselennyu")).toHaveLength(13);
    expect(servicesByCategory("biznesu")).toHaveLength(9);
    expect(cases).toHaveLength(6);
    expect(testimonials).toHaveLength(5);
  });

  it("every service title and action item is verbatim from the legacy text", () => {
    const missing = services.flatMap((s) => [s.title, ...s.items].filter((t) => !inLegacy(t)).map((t) => `${s.slug}: ${t}`));
    expect(missing).toEqual([]);
  });

  it("every case paragraph is verbatim from the legacy text", () => {
    const missing = cases.flatMap((c) =>
      [c.originalTitle ?? c.title, ...c.situation, ...(c.actionsLead ? [c.actionsLead] : []), ...c.actions, ...(c.resultText ?? [])]
        .filter((t) => !inLegacy(t))
        .map((t) => `${c.slug}: ${t}`),
    );
    expect(missing).toEqual([]);
  });

  it("every testimonial (text, name, date) is verbatim", () => {
    const missing = testimonials.flatMap((t) => [t.text, t.author, t.dateOriginal].filter((x) => !inLegacy(x)));
    expect(missing).toEqual([]);
  });

  it("company text, stats and contacts are verbatim", () => {
    const strings = [
      ...about.paragraphs, about.quote, about.abroad, about.closing,
      ...stats.flatMap((s) => [s.value, s.label]),
      company.phones[0]!.display, company.phones[1]!.display,
      company.phones[0]!.person, company.phones[1]!.person, company.address,
    ];
    expect(strings.filter((s) => !inLegacy(s))).toEqual([]);
  });

  it("slugs are unique per category", () => {
    const keys = services.map((s) => `${s.category}/${s.slug}`);
    expect(new Set(keys).size).toBe(keys.length);
    expect(new Set(cases.map((c) => c.slug)).size).toBe(cases.length);
  });
});
