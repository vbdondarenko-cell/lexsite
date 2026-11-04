# Розгортання

Будь-який Node.js ≥ 20 (перевірено на Node 24). Не залежить від Vercel.

```bash
SITE_URL=https://<адреса-staging> npm run build   # SITE_URL "вшивається" в sitemap/canonical під час збірки
npm start                                         # next start, порт 3000
```

## Змінні середовища (лише на сервері, не в git)
`SITE_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` — див. `.env.example`.
Без SMTP форма **чесно повертає помилку 503** (заявка не вважається доставленою).

## Обмеження поточної реалізації
- Rate limit — в пам'яті одного процесу. Для кількох інстансів потрібне спільне сховище.
- За reverse-proxy слід передавати `X-Forwarded-For` довіреним проксі.
- Редіректи зі старих якорів `/#services` тощо — на рівні проксі/клієнта (хеш не доходить до сервера).
- Деплой на `lex.ck.ua` — **лише з окремого дозволу замовника**.
