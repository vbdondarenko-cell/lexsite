"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function MobileNav({ links, phone }: { links: { href: string; label: string }[]; phone: { tel: string; display: string } }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button ref={btn} type="button" className="btn btn-line" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
        {open ? "Закрити" : "Меню"}
      </button>
      {open && (
        <nav id="mobile-menu" aria-label="Мобільна навігація" className="on-dark fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto bg-graphite text-ivory">
          <ul className="wrap py-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="serif block rule py-5 text-[2rem]" aria-current={pathname === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-8">
              <a href={`tel:${phone.tel}`} className="btn btn-solid w-full justify-center">Зателефонувати {phone.display}</a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
