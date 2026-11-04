// Source: https://lex.ck.ua/ (snapshot 2026-11-04). Texts are verbatim; do not edit without client approval.
// See docs/CONTENT_APPROVAL.md for flagged language issues.

export type ServiceCategory = "naselennyu" | "biznesu";

export interface Service {
  slug: string;
  category: ServiceCategory;
  /** Position on the legacy site */
  order: number;
  title: string;
  /** Verbatim list of legal actions (leading "- " removed). May be empty if the source lists none. */
  items: string[];
}

export const categoryLabels: Record<ServiceCategory, string> = {
  naselennyu: "Послуги для населення",
  biznesu: "Послуги для бізнесу",
};

const consult = "надання юридичних консультацій;";
const strategy = "розробка стратегії захисту;";
const prejudicial = "досудове врегулювання спору;";
const docs = "підготовка процесуальних документів;";
const evidence = "підготовка доказової бази;";
const witnesses = "підготовка та опитування свідків;";
const court = "представництво та захист законних прав і інтересів у суді;";
const other = "інші дії, пов’язані з підготовкою та веденням справи.";

export const services: Service[] = [
  {
    slug: "kryminalni-spravy", category: "naselennyu", order: 1, title: "Кримінальні справи",
    items: [
      consult,
      "представництво та захист законних прав і інтересів у органах досудового розслідування;",
      strategy, docs,
      "підготовка юридичних висновків;", "збирання доказів;", witnesses, court, other,
    ],
  },
  {
    slug: "tsyvilni-spravy", category: "naselennyu", order: 2, title: "Цивільні справи",
    items: [consult, strategy, prejudicial, docs, evidence, witnesses, court, other],
  },
  {
    slug: "administratyvni-spravy", category: "naselennyu", order: 3, title: "Адміністративні справи",
    items: [
      consult, strategy, prejudicial, docs, evidence, witnesses,
      "оскарження рішень, постанов, дій або бездіяльності державних органів та уповноважених осіб у вищих інстанціях;",
      "оскарження рішень, постанов, дій або бездіяльності державних органів та уповноважених осіб у судових інстанціях;",
      court, other,
    ],
  },
  {
    slug: "simeini-spory", category: "naselennyu", order: 4, title: "Сімейні спори",
    items: [consult, strategy, prejudicial, docs, evidence, witnesses, court, other],
  },
  {
    slug: "trudovi-spory", category: "naselennyu", order: 5, title: "Трудові спори",
    items: [
      consult, strategy, "досудове врегулювання спору з роботодавцем;", docs, evidence,
      "підготовка необхідних скарг до контролюючих органів;",
      "представництво та захист законних прав і інтересів у контролюючих органах;",
      court, other,
    ],
  },
  {
    slug: "spory-z-bankamy-ta-mfo", category: "naselennyu", order: 6, title: "Спори з банками та МФО",
    items: [consult, strategy, prejudicial, docs, "підготовка доказової бази, розрахунків, експертиз;", court, other],
  },
  {
    slug: "mihratsiini-pytannia", category: "naselennyu", order: 7, title: "Міграційні питання",
    items: [
      consult, docs,
      "представництво інтересів у Державній міграційній службі, Державній прикордонній службі, службі зайнятості та інших органах;",
      "допомога в отриманні довідок, дозволів тощо для набуття постійного права проживання на території України або отримання громадянства України;",
      other,
    ],
  },
  {
    slug: "vykonannia-rishen", category: "naselennyu", order: 8, title: "Виконання рішень",
    items: [
      consult, "надання допомоги у пошуку майна;", docs,
      "допомога під час проведення переговорів із боржником / кредитором;",
      "підготовка юридичних висновків та довідок;",
      "сприяння у проведенні арештів майна, грошових коштів, організації аукціонів;",
      "захист прав та інтересів у органах Державної виконавчої служби;",
      "оскарження рішень, постанов, дій чи бездіяльності органів Державної виконавчої служби та їх посадових осіб у Міністерстві юстиції України;",
      "оскарження рішень, постанов, дій чи бездіяльності органів Державної виконавчої служби та їх посадових осіб у суді;",
      court, other,
    ],
  },
  {
    slug: "yevropeiskyi-sud-z-prav-liudyny", category: "naselennyu", order: 9, title: "Європейський суд із прав людини",
    items: [consult, docs, evidence, court, other],
  },
  {
    slug: "spadkovi-spory", category: "naselennyu", order: 10, title: "Спадкові спори",
    items: [
      consult, strategy, "допомога в оформленні спадщини;", "досудове врегулювання спору із зацікавленими особами;",
      "підготовка юридичних висновків та довідок;", docs, evidence, witnesses, court, other,
    ],
  },
  {
    slug: "suprovid-uhod-u-notariusa", category: "naselennyu", order: 11, title: "Супровід угод у нотаріуса",
    items: [consult, docs, "оцінка ризиків;", "інші дії, пов’язані з підготовкою та супроводом угод у нотаріуса."],
  },
  {
    slug: "mobilizatsiia-zakhyst-vid-ttsk-ta-sp", category: "naselennyu", order: 12, title: "Мобілізація, захист від ТЦК та СП",
    items: [
      consult, docs, "представництво інтересів в органах ТЦК та СП, Міністерства оборони;",
      "допомога у отриманні відстрочки, знятті з військового обліку тощо;", other,
    ],
  },
  {
    slug: "inshi-poslugy", category: "naselennyu", order: 13, title: "Інші послуги",
    items: ["допомога у купівлі бізнесу, майна тощо;", "допомога у захисті інвестицій;", "інші послуги"],
  },

  // ---------- Business ----------
  {
    slug: "abonentskyi-suprovid", category: "biznesu", order: 1,
    title: "Абонентський супровід юридичних осіб та фізичних осіб – підприємців",
    items: [
      "комплексний юридичний супровід діяльності підприємства;",
      "усне та письмове консультування щодо діяльності підприємства, супровід ділових переговорів, надання юридичної оцінки;",
      "юридичний захист законних прав і інтересів під час проведення перевірок контролюючими органами;",
      "захист законних прав і інтересів суб’єктів господарської діяльності та їх посадових осіб у органах досудового розслідування та судах;",
      "отримання необхідних ліцензій, патентів та інших дозвільних документів;",
      "представництво та захист законних прав і інтересів у державних органах;",
      "складання та/або перевірка господарських договорів і зовнішньоекономічних контрактів;",
      "підготовка та аналіз процесуальних документів: листів, заяв, довідок, повідомлень, позовів тощо;",
      "підготовка тендерної документації;",
      "забезпечення зовнішньоекономічної діяльності.",
      "розробка внутрішніх юридичних документів: статутних документів, трудових договорів, посадових інструкцій, наказів, положень тощо;",
      "представництво та захист законних прав і інтересів на загальних зборах акціонерів, засновників, в інших органах управління підприємств та організацій;",
      "вирішення трудових спорів;",
      court,
      "представництво та захист законних прав і інтересів в органах Державної виконавчої служби;",
      "інші дії, пов’язані з юридичним супроводом.",
    ],
  },
  {
    slug: "spory-z-derzhavnymy-orhanamy", category: "biznesu", order: 2, title: "Спори з державними органами",
    items: [
      "юридичний супровід під час проведення перевірок державними органами, організаціями, підприємствами;",
      "оскарження незаконних дій та рішень державних органів, організацій, підприємств;",
      "захист господарської діяльності в державних органах;",
      "підготовка процесуальних документів для державних органів;",
      "експертиза юридично значущих документів;",
      "підготовка юридичних довідок та висновків;",
      "вирішення спорів з державними органами у досудовому порядку;",
      "захист та представництво законних прав і інтересів у суді та інше.",
    ],
  },
  {
    slug: "kryminalni-spravy-hospodarska-diialnist", category: "biznesu", order: 3,
    title: "Кримінальні справи, пов’язані з господарською діяльністю",
    items: [
      "консультування;",
      "представництво та захист законних прав і інтересів в органах досудового розслідування;",
      strategy, docs, "підготовка юридичних висновків;", "збирання доказів;", witnesses,
      "представництво та захист законних прав і інтересів у суді.",
      other,
    ],
  },
  {
    slug: "reiestratsiia-ta-likvidatsiia", category: "biznesu", order: 4,
    title: "Реєстрація та ліквідація суб’єктів підприємницької діяльності",
    items: [
      "підготовка статутних документів;",
      "проведення державної реєстрації/ліквідації в державних органах;",
      "супровід процедури банкрутства підприємств;",
      "реєстрація знаків для товарів та послуг;",
      "реєстрація представництв і філій;",
      "реєстрація іноземних компаній;",
      "реєстрація іноземних інвестицій;",
      "реєстрація змін до статутних документів та зміна організаційно-правової форми тощо.",
    ],
  },
  {
    slug: "litsenzii-ta-dozvilni-dokumenty", category: "biznesu", order: 5,
    title: "Отримання ліцензій та дозвільних документів",
    items: [
      "підготовка необхідних процесуальних документів для державних органів;",
      "консультування щодо необхідних умов;",
      "проведення реєстрації в державних органах;",
      "оскарження негативних рішень щодо отримання ліцензій та/або дозвільних документів тощо.",
    ],
  },
  {
    slug: "mizhnarodnyi-komertsiinyi-arbitrazh", category: "biznesu", order: 6,
    title: "Вирішення спорів у міжнародному комерційному арбітражі",
    items: [
      docs, evidence, "розробка стратегії ведення справи;", "підготовка юридичних висновків та довідок;",
      "захист законних прав і інтересів у міжнародному арбітражному суді.",
    ],
  },
  {
    slug: "dohovirni-vidnosyny", category: "biznesu", order: 7, title: "Договірні відносини",
    items: ["розробка комерційних договорів, договорів господарської діяльності підприємств та інших процесуальних документів."],
  },
  // Legacy site lists this heading with NO sub-items. Nothing is invented here (see CONTENT_APPROVAL.md).
  { slug: "trudovi-spory", category: "biznesu", order: 8, title: "Трудові спори", items: [] },
  {
    slug: "pretenziino-pozovna-diialnist", category: "biznesu", order: 9, title: "Претензійно-позовна діяльність",
    items: [
      "консультування;",
      "представництво та захист законних прав і інтересів в органах досудового розслідування;",
      strategy, docs, "підготовка юридичних висновків;", "збирання доказів;", witnesses, court, other,
    ],
  },
];

export const servicesByCategory = (c: ServiceCategory) =>
  services.filter((s) => s.category === c).sort((a, b) => a.order - b.order);

export const getService = (c: ServiceCategory, slug: string) =>
  services.find((s) => s.category === c && s.slug === slug);

/** Related = neighbouring services in the same category (no invented editorial claims). */
export const relatedServices = (s: Service, n = 3) => {
  const list = servicesByCategory(s.category);
  const i = list.findIndex((x) => x.slug === s.slug);
  const out: Service[] = [];
  for (let k = 1; out.length < Math.min(n, list.length - 1); k++) {
    const cand = list[(i + k) % list.length];
    if (cand) out.push(cand);
  }
  return out;
};
