# LEX — Quiet Authority: токени та специфікація для Figma

> Статус Figma: **файл у Figma НЕ створено** (на момент написання). Цей документ — Figma-ready специфікація; джерело істини в коді — `src/app/globals.css`.

## Кольори
| Токен | HEX | Роль |
|---|---|---|
Палітра: синя та біла (за побажанням замовника). Назви токенів збережено з початкової системи.

| Токен | HEX | Роль |
|---|---|---|
| graphite | #0A1F44 | глибокий синій: темні поверхні, основний текст |
| slate | #1E3A6E | вторинні темні поверхні, лінії на темному |
| ivory | #FFFFFF | основний фон (білий) |
| brass | #7FB2FF | світло-синій акцент (на темному) |
| brass-deep | #1D4ED8 | насичений синій акцент для тексту на білому |
| ivory-deep | #EAF1FC | блідо-блакитний, окремі секції |
| mist | #B4C4E0 | другорядний текст на темному |
| white | #FFFFFF | — |

Контраст (обчислено за формулою WCAG 2.x): ivory↔graphite 16.25:1; mist на graphite 9.22:1; brass на graphite 7.52:1; brass-deep на ivory 6.70:1; brass-deep на ivory-deep 5.90:1; graphite на ivory-deep 14.30:1. Реальний аудит у браузері ще не проведено.

## Типографіка
- Заголовки: **Cormorant Garamond** 500 (кирилиця), tracking −0.01em, line-height 1.04.
- Текст: **Inter** (кирилиця), 17px/1.65.
- Шкала (fluid): display 44→100px · h1 36→72 · h2 28→48 · h3 20→26 · kicker 12px caps +0.22em.

## Сітка й ритм
12 колонок, max 1408px, gutter fluid 20→64px. Секції: вертикальні відступи 96/128px (mobile/desktop). Контрольні ширини: 1440, 1024, 768, 390, 360.

## Компоненти (реалізовані в коді)
Buttons (solid/line, light/dark) · Header + MobileNav · Footer · Service index row · Case article · Testimonial · ConsultationForm (idle/submitting/validation error/server error) · 404 · Error · Success (`/dyakuiemo`).

## Motion
Єдина анімація — `reveal` (0.9s, ease-out, translateY 14px) для hero; hover-зсув рядків 0.3s. `prefers-reduced-motion: reduce` вимикає всі анімації й transition.
