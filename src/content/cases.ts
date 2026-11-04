// Source: https://lex.ck.ua/#cases (snapshot 2026-11-04). Verbatim text, split into editorial sections.
// `resultText` is filled ONLY where the source states an outcome; otherwise null (nothing is invented).
// Publication of every case requires client approval (see docs/CONTENT_APPROVAL.md).

import type { ServiceCategory } from "./services";

export interface CaseStudy {
  slug: string;
  /** Title as requested in the project brief */
  title: string;
  /** Title exactly as on the legacy site, when it differs */
  originalTitle?: string;
  situation: string[];
  /** Lead-in sentence for the list of actions, verbatim */
  actionsLead?: string;
  actions: string[];
  /** Verbatim paragraph(s) with outcome, or null if the source states none */
  resultText: string[] | null;
  practice: { category: ServiceCategory; slug: string };
}

export const cases: CaseStudy[] = [
  {
    slug: "usynovlennia-dytyny-druzhyny",
    title: "Усиновлення дитини дружини від першого шлюбу",
    situation: [
      "Клієнт звернувся до нас із питанням усиновлення неповнолітньої дитини своєї дружини від першого шлюбу.",
    ],
    actionsLead: "Після детального аналізу наданих документів нашими адвокатами було:",
    actions: [
      "зібрано необхідний пакет документів;",
      "проведено комунікацію з біологічним батьком дитини;",
      "підготовлено та подано заяву про усиновлення до районного суду;",
      "забезпечено участь у судових засіданнях.",
    ],
    resultText: ["Рішенням суду клієнт успішно усиновив дитину та був внесений до відомостей ДРАЦС як батько."],
    practice: { category: "naselennyu", slug: "simeini-spory" },
  },
  {
    slug: "zaborhovanist-viiskovosluzhbovtsia-pered-mfo",
    title: "Заборгованість військовослужбовця перед МФО",
    originalTitle: "Справа про заборгованість військовослужбовець перед МФО",
    situation: [
      "Клієнт, військовослужбовець, звернувся до нас через проблеми із заборгованістю за кредитними договорами, оформленими в мікрофінансових організаціях, на стадії судового процесу.",
    ],
    actions: [
      "Ми провели детальний аналіз матеріалів справи, розглянуто подану позовну заяву з додатками та підготовлено обґрунтований відзив на позов. Крім того, представлено інтереси клієнта в суді.",
    ],
    resultText: [
      "Результат: суд частково задовольнив позов – стягнуто лише тіло кредиту, а стягнення відсотків, пені та штрафів відмовлено.",
    ],
    practice: { category: "naselennyu", slug: "spory-z-bankamy-ta-mfo" },
  },
  {
    slug: "podatkovi-pytannia-blohery-onlyfans",
    title: "Податкові питання для фізичних осіб: захист блогерів OnlyFans",
    situation: [
      "Командою наших фахівців розроблено ефективну стратегію захисту інтересів осіб, які здійснюють діяльність на платформі OnlyFans.",
      "На практиці дії податкових органів часто суперечать нормам чинного законодавства, адже твердження про ухилення від сплати податків ґрунтуються переважно на похідних доказах, які не підтверджують факту умисного порушення податкових зобов’язань.",
    ],
    actions: [
      "Ми знаємо, як захистити ваші права та інтереси у випадках притягнення до відповідальності за ухилення від сплати податків і зборів, а також у ситуаціях, пов’язаних із можливим обвинуваченням за ст. 301 КК України (розповсюдження матеріалів порнографічного характеру).",
    ],
    // Source gives no outcome of a specific case — it is a general description of the practice.
    resultText: null,
    practice: { category: "naselennyu", slug: "kryminalni-spravy" },
  },
  {
    slug: "vidshkoduvannia-shkody-zalyttia-kvartyry",
    title: "Відшкодування шкоди через залиття квартири",
    situation: [
      "Клієнт звернувся до нас з питанням відшкодування шкоди, завданої внаслідок залиття його квартири.",
    ],
    actions: [
      "Ми зібрали повний пакет необхідних документів, проведено комунікацію зі стороною відповідача та отримано експертний висновок. Також була підготовлена позовна заява до суду, і адвокат представляв інтереси клієнта під час судового процесу.",
    ],
    resultText: [
      "Результат: районний суд задовольнив позов у повному обсязі – з відповідача стягнуто нанесені матеріальні збитки та витрати на правничу допомогу.",
    ],
    practice: { category: "naselennyu", slug: "tsyvilni-spravy" },
  },
  {
    slug: "oformlennia-vidstrochky-vid-mobilizatsii",
    title: "Оформлення відстрочки від мобілізації",
    situation: [
      "До нашої компанії звернувся клієнт, військовозобов’язаний, з питанням оформлення відстрочки від мобілізації.",
    ],
    actions: [
      "Адвокатами проведено ретельний аналіз наданих документів, підготовлено необхідні заяви та запити.",
    ],
    resultText: ["Завдяки професійній роботі адвокатів клієнт успішно отримав відстрочку від мобілізації."],
    practice: { category: "naselennyu", slug: "mobilizatsiia-zakhyst-vid-ttsk-ta-sp" },
  },
  {
    slug: "stiahnennia-zaborhovanosti-za-dohovorom-postavky",
    title: "Стягнення заборгованості за договором поставки",
    situation: [
      "Юридична особа (ТОВ) звернулася до нашої компанії з питанням стягнення заборгованості за договором поставки.",
    ],
    actions: [
      "Адвокатами було проведено детальний аналіз наданих документів та підготовлена претензія. Після закінчення строку на її розгляд була подана позовна заява до суду. Адвокати брали активну участь у судових засіданнях, представляючи інтереси клієнта.",
    ],
    resultText: [
      "Результат: господарський суд задовольнив позов у повному обсязі – з відповідача стягнуто суму заборгованості разом зі штрафними санкціями та витрати на правничу допомогу.",
    ],
    practice: { category: "biznesu", slug: "pretenziino-pozovna-diialnist" },
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
