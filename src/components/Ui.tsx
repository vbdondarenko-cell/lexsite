import Link from "next/link";
import type { Service } from "@/content/services";

export function PageHero({ kicker, title, lead }: { kicker?: string; title: string; lead?: string }) {
  return (
    <section className="on-dark bg-graphite text-ivory">
      <div className="wrap py-24 lg:py-36">
        {kicker && <p className="kicker reveal mb-8">{kicker}</p>}
        <h1 className="serif reveal max-w-[18ch] text-[length:var(--text-h1)]">{title}</h1>
        {lead && <p className="reveal mt-8 max-w-2xl text-lg text-mist">{lead}</p>}
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Хлібні крихти" className="wrap pt-8 text-sm">
      <ol className="flex flex-wrap gap-2 text-slate">
        {items.map((it, i) => (
          <li key={it.label} className="flex gap-2">
            {it.href ? <Link href={it.href} className="underline underline-offset-4">{it.label}</Link> : <span aria-current="page">{it.label}</span>}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ServiceIndex({ list, base, dark = false }: { list: Service[]; base: string; dark?: boolean }) {
  return (
    <ol className={dark ? "on-dark" : ""}>
      {list.map((s) => (
        <li key={s.slug}>
          <Link href={`${base}/${s.slug}`} className="row-link">
            <span className="kicker">{String(s.order).padStart(2, "0")}</span>
            <span className="serif text-[length:var(--text-h3)]">{s.title}</span>
            <span aria-hidden>→</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
