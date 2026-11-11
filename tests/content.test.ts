import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { businessCategories, populationCategories } from "@/content/categories";
import { services, servicesByCategory } from "@/content/services";
import { about, company, stats } from "@/content/site";

// Snapshot of the legacy site's visible text (docs/legacy-original). Every migrated string must occur in it.
const norm = (s: string) => s.replace(/`n/g, " ").replace(/[ \s]+/g, " ").trim();
const legacy = norm(readFileSync("docs/legacy-original/visible-text-2026-11-04.txt", "utf8"));
const inLegacy = (s: string) => legacy.includes(norm(s));

describe("content completeness vs legacy site", () => {
  it("has the required counts", () => {
    expect(servicesByCategory("naselennyu")).toHaveLength(13);
    expect(servicesByCategory("biznesu")).toHaveLength(9);
    // The one-page site shows every legacy category, each with an explanation.
    expect(populationCategories).toHaveLength(13);
    expect(businessCategories).toHaveLength(9);
    for (const c of [...populationCategories, ...businessCategories]) expect(c.description.length).toBeGreaterThan(10);
  });

  it("every service title and action item is verbatim from the legacy text", () => {
    const missing = services.flatMap((s) => [s.title, ...s.items].filter((t) => !inLegacy(t)).map((t) => `${s.slug}: ${t}`));
    expect(missing).toEqual([]);
  });

  it("company text, stats and contacts are verbatim", () => {
    const strings = [
      ...about.paragraphs, about.quote, about.abroad, about.closing,
      ...stats.flatMap((s) => [s.value, s.label]),
      // phones[0] is the new main number from the client; the legacy numbers follow it.
      company.phones[1]!.display, company.phones[2]!.display,
      company.phones[1]!.person, company.phones[2]!.person,
    ];
    expect(strings.filter((s) => !inLegacy(s))).toEqual([]);
  });

  it("contacts updated by the client on 2026-11-11 are in place", () => {
    expect(company.phones[0]!.tel).toBe("+380934880595");
    expect(company.address).toBe("18006, м. Черкаси, бул. Шевченка, 389, оф. 22");
    expect(company.hours.map((h) => h.time)).toEqual(["10:00 - 19:00", "11:00 - 15:00"]);
  });

  it("slugs are unique per category", () => {
    const keys = services.map((s) => `${s.category}/${s.slug}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
