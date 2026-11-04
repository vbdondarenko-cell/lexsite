# LEX — Quiet Authority: токени та специфікація для Figma

> Статус Figma: **файл у Figma НЕ створено** (на момент написання). Цей документ — Figma-ready специфікація; джерело істини в коді — `src/app/globals.css`.

## Кольори
| Токен | HEX | Роль |
|---|---|---|
| graphite | #15191C | темні поверхні, основний текст |
| slate | #30353A | вторинні темні поверхні, лінії на темному |
| ivory | #F3F0E9 | основний фон |
| brass | #A58D66 | акцент (на темному), обмежено |
| brass-deep | #6F5D3E | похідний від brass для тексту на ivory (контраст) |
| ivory-deep | #E8E3D8 | похідний, окремі секції |
| mist | #B9BCBD | другорядний текст на темному |
| white | #FFFFFF | — |

Контраст (обчислено за формулою WCAG 2.x): ivory↔graphite 15.54:1; mist на graphite 9.25:1; brass на graphite 5.56:1; brass-deep на ivory 5.57:1; brass-deep на ivory-deep 4.96:1 (нижче 4.5 для великого/малого тексту не опускається); graphite на ivory-deep 13.82:1. Brass (#A58D66) на ivory — лише декоративно (2.79:1, **не для тексту**). Реальний аудит у браузері ще не проведено.

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
