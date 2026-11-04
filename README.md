# LEX — Premium Legal Experience 2027

Сайт адвокатської компанії LEX (Черкаси). Розробка: BONSI Studios. Дизайн-концепція: **Quiet Authority**.

Стек: Next.js (App Router) · TypeScript strict · Tailwind CSS 4 · Zod · Vitest · Playwright. Не прив'язаний до Vercel (Node.js `next start`).

## Локальний запуск

```bash
npm install
cp .env.example .env.local   # заповніть SMTP_* та LEAD_TO_EMAIL, щоб форма реально доставляла заявки
npm run dev                  # http://localhost:3000
```

## Перевірки

```bash
npm run typecheck
npm test                     # включно з перевіркою повноти контенту відносно оригіналу lex.ck.ua
npm run build
```

## Документація

| Файл | Зміст |
|---|---|
| `docs/LEGACY_AUDIT.md` | Аудит чинного lex.ck.ua |
| `docs/CONTENT_INVENTORY.md` | Інвентаризація контенту |
| `docs/CONTENT_MIGRATION.md` | Карта перенесення: джерело → маршрут → статус |
| `docs/CONTENT_APPROVAL.md` | **Питання до замовника**: помилки, непідтверджене, потребує погодження |
| `docs/DESIGN_TOKENS.md` | Токени та специфікація для Figma |
| `docs/DEPLOYMENT.md` | Розгортання, змінні середовища |
| `docs/legacy-original/` | Незмінені знімки оригінальних даних (HTML, текст, robots, sitemap) |

Чинний домен lex.ck.ua **не змінюється**. Деплой на нього — лише з окремого дозволу.
