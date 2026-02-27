/**
 * Расширенные данные бассейнов (источник: Markopolis).
 * Используется для pool-product.html и детальных карточек.
 * Формат совместим с маппингом на window.POOLS_DATA и pool-product.html.
 */
window.MARKOPOLIS_POOLS = [
  {
    id: "pool-3x15-round",
    markopolisUrl: "https://www.markopolis.ru/pools/pool-round-3x15",
    title: "Бассейн круглый 3×1,5 м",
    dims: { shape: "round", diameter_m: 3, depth_m: 1.5 },
    material: {
      base: "Полипропилен",
      notes: [
        "Не выцветает со временем",
        "Устойчив к УФ и перепадам температур",
        "Температурный диапазон эксплуатации до −40 °C (по описанию на сайте)",
      ],
    },
    delivery: {
      notes: [
        "Поставляется как готовая чаша",
        "Возможна комплектация закладными (скиммер, форсунки, донный слив, подсветка)",
      ],
    },
    warranty: { years: 15, serviceLifeYears: 30 },
    prices: {
      bowl_from_rub: null,
      equipment_from_rub: null,
    },
    contentBlocksForOurCard: {
      about:
        "Чаша из пищевого полипропилена — долговечное решение для частного дома. Материал устойчив к УФ и перепадам температур, гладкие стенки упрощают уход.",
      features: [
        { title: "Монтаж", text: "Подбор основания: плита/котлован, учитываем грунт и доступ техники." },
        { title: "Доставка", text: "Привозим готовую чашу; закладные и подключение — под проект." },
        { title: "Подсветка", text: "Подводная подсветка и закладные — на этапе сборки чаши." },
        { title: "Уход за водой", text: "Подбираем фильтрацию/дозирование под объём и режим использования." },
      ],
    },
  },

  {
    id: "pool-2x3",
    markopolisUrl: "https://www.markopolis.ru/pools/pool-2x3",
    title: "Бассейн 2×3 м",
    dims: { shape: "rect", width_m: 2, length_m: 3, depth_m: 1.5 },
    material: {
      base: "Полипропилен",
      notes: ["Не выцветает", "Устойчив к УФ", "До −40 °C (по описанию)"],
    },
    delivery: {
      notes: [
        "Готовая чаша",
        "Закладные: скиммер, форсунки, донный слив, подсветка (по комплектации)",
      ],
    },
    warranty: { years: 15, serviceLifeYears: 30 },
    prices: {
      bowl_from_rub: 56800,
      equipment_from_rub: 79500,
    },
    contentBlocksForOurCard: {
      about:
        "Компактная чаша 2×3 м для небольших участков. Полипропилен не боится влаги, УФ и сезонных перепадов температур; гладкая поверхность проще в уборке.",
      features: [
        { title: "Основание", text: "Варианты: плита / заглубление в грунт. Подберём решение под ваш участок." },
        { title: "Инженерия", text: "Закладные под скиммер/форсунки/слив, трассы и узлы обслуживания." },
        { title: "Оборудование", text: "Подберём фильтрацию и насос под объём воды, режим и бюджет." },
        { title: "Гарантия", text: "Гарантия на чашу — 15 лет (по описанию у поставщика)." },
      ],
    },
  },

  {
    id: "pool-2x4",
    markopolisUrl: "https://www.markopolis.ru/pools/pool-2x4",
    title: "Бассейн 2×4 м",
    dims: { shape: "rect", width_m: 2, length_m: 4, depth_m: 1.5 },
    material: {
      base: "Полипропилен",
      notes: ["Не выцветает", "Устойчив к УФ", "До −40 °C (по описанию)"],
    },
    warranty: { years: 15, serviceLifeYears: 30 },
    prices: {
      bowl_from_rub: 70400,
      equipment_from_rub: 79500,
    },
    contentBlocksForOurCard: {
      about:
        "Формат 2×4 м — комфортнее для плавания, при этом остаётся компактным для участка. Полипропиленовая чаша не выцветает и проста в уходе.",
      features: [
        { title: "Монтаж", text: "Подготовка основания и установка чаши с учётом грунта и рельефа." },
        { title: "Доставка", text: "Доставим чашу и при необходимости выполним подключение «под ключ»." },
        { title: "Комфорт", text: "Подсветка, закладные и опции — под ваш сценарий использования." },
        { title: "Вода", text: "Фильтрация и дозирование — под объём и частоту использования." },
      ],
    },
  },

  {
    id: "pool-2x5",
    markopolisUrl: "https://www.markopolis.ru/pools/pool-2x5",
    title: "Бассейн 2×5 м",
    dims: { shape: "rect", width_m: 2, length_m: 5, depth_m: 1.5 },
    material: {
      base: "Полипропилен",
      notes: ["Не выцветает", "Устойчив к УФ", "До −40 °C (по описанию)"],
    },
    warranty: { years: 15, serviceLifeYears: 30 },
    prices: {
      bowl_from_rub: 83900,
      equipment_from_rub: 97900,
    },
    contentBlocksForOurCard: {
      about:
        "2×5 м — хороший баланс между компактностью и длиной для плавания. Чаша из полипропилена рассчитана на круглогодичную эксплуатацию и химию для воды.",
      features: [
        { title: "Под ключ", text: "Монтаж чаши + подключение оборудования и пусконаладка." },
        { title: "Закладные", text: "Скиммер/форсунки/слив/подсветка — закладываем на этапе проекта." },
        { title: "Эксплуатация", text: "Гладкие стенки быстрее очищаются, обслуживание проще." },
        { title: "Гарантия", text: "Гарантия на чашу — 15 лет (по данным поставщика)." },
      ],
    },
  },

  {
    id: "pool-2x6",
    markopolisUrl: "https://www.markopolis.ru/pools/pool-2x6",
    title: "Бассейн 2×6 м",
    dims: { shape: "rect", width_m: 2, length_m: 6, depth_m: 1.5 },
    material: { base: "Полипропилен", notes: ["УФ-стойкость", "Не выцветает", "До −40 °C (по описанию)"] },
    warranty: { years: 15, serviceLifeYears: 30 },
    prices: {
      bowl_from_rub: null,
      equipment_from_rub: null,
    },
    contentBlocksForOurCard: {
      about:
        "2×6 м — вытянутый формат для комфортного плавания. Полипропиленовая чаша долговечна, не выцветает и проста в обслуживании.",
      features: [
        { title: "Подбор комплекта", text: "Фильтрация/насос/обвязка под объём и гидравлику." },
        { title: "Монтаж", text: "Основание и установка с учётом грунта и коммуникаций." },
        { title: "Опции", text: "Подсветка, закладные, лестница/ступени — по проекту." },
        { title: "Гарантия", text: "15 лет на чашу (по данным поставщика)." },
      ],
    },
  },

  {
    id: "pool-25x4",
    markopolisUrl: "https://www.markopolis.ru/pools/pool-25x4",
    title: "Бассейн 2,5×4 м",
    dims: { shape: "rect", width_m: 2.5, length_m: 4, depth_m: 1.5 },
    material: { base: "Полипропилен", notes: ["УФ-стойкость", "Не выцветает", "До −40 °C (по описанию)"] },
    warranty: { years: 15, serviceLifeYears: 30 },
    prices: {
      bowl_from_rub: 76500,
      equipment_from_rub: 79500,
    },
    contentBlocksForOurCard: {
      about:
        "2,5×4 м — больше места по ширине для отдыха и игр. Полипропилен устойчив к химии и сезонной эксплуатации.",
      features: [
        { title: "Комфорт", text: "Ширина 2,5 м удобна для семейного использования." },
        { title: "Инженерия", text: "Закладные и трассы — на этапе проекта, чтобы всё работало с первого запуска." },
        { title: "Оборудование", text: "Подбираем комплект под объём, бюджет и сценарий (дети/СПА/плавание)." },
        { title: "Гарантия", text: "15 лет на чашу (по данным поставщика)." },
      ],
    },
  },

  {
    id: "pool-25x5",
    markopolisUrl: "https://www.markopolis.ru/pools/pool-25x5",
    title: "Бассейн 2,5×5 м",
    dims: { shape: "rect", width_m: 2.5, length_m: 5, depth_m: 1.5 },
    material: { base: "Полипропилен", notes: ["УФ-стойкость", "Не выцветает", "До −40 °C (по описанию)"] },
    warranty: { years: 15, serviceLifeYears: 30 },
    prices: {
      bowl_from_rub: null,
      equipment_from_rub: null,
    },
    contentBlocksForOurCard: {
      about:
        "2,5×5 м — универсальный формат для частного дома: и поплавать, и комфортно отдыхать. Чаша из полипропилена рассчитана на сезонную эксплуатацию и химию.",
      features: [
        { title: "Монтаж", text: "Подбор основания и установка под ваш участок." },
        { title: "Опции", text: "Подсветка, ступени/лавки, закладные — заложим в проект." },
        { title: "Вода", text: "Фильтрация/дозирование — под объём и нагрузку." },
        { title: "Гарантия", text: "15 лет на чашу (по данным поставщика)." },
      ],
    },
  },

  {
    id: "pool-25x6",
    markopolisUrl: "https://www.markopolis.ru/pools/pool-25x6",
    title: "Бассейн 2,5×6 м",
    dims: { shape: "rect", width_m: 2.5, length_m: 6, depth_m: 1.5 },
    material: { base: "Полипропилен", notes: ["УФ-стойкость", "Не выцветает", "До −40 °C (по описанию)"] },
    warranty: { years: 15, serviceLifeYears: 30 },
    prices: {
      bowl_from_rub: 103500,
      equipment_from_rub: 97900,
    },
    contentBlocksForOurCard: {
      about:
        "2,5×6 м — длиннее и шире стандартных форматов, удобно для плавания и активного отдыха. Полипропиленовая чаша долговечна и проста в уходе.",
      features: [
        { title: "Плавание", text: "Длина 6 м — комфортнее для тренировок и активного использования." },
        { title: "Комплектация", text: "Подберём фильтрацию и обвязку без перегруза по бюджету." },
        { title: "Опции", text: "Подсветка и закладные — чтобы бассейн был «как на картинке», но работал надёжно." },
        { title: "Гарантия", text: "15 лет на чашу (по данным поставщика)." },
      ],
    },
  },

  {
    id: "pool-3x4",
    markopolisUrl: "https://www.markopolis.ru/pools/pool-3x4",
    title: "Бассейн 3×4 м",
    dims: { shape: "rect", width_m: 3, length_m: 4, depth_m: 1.5 },
    material: { base: "Полипропилен", notes: ["УФ-стойкость", "Не выцветает", "До −40 °C (по описанию)"] },
    warranty: { years: 15, serviceLifeYears: 30 },
    prices: { bowl_from_rub: null, equipment_from_rub: null },
    contentBlocksForOurCard: {
      about:
        "3×4 м — широкая семейная чаша, комфортна для игр и отдыха. Полипропилен устойчив к химии и сезонной эксплуатации.",
      features: [
        { title: "Семейный формат", text: "Ширина 3 м даёт больше комфорта в воде." },
        { title: "Проектирование", text: "Учитываем грунт, коммуникации и место под обслуживание." },
        { title: "Оборудование", text: "Подбор комплекта под объём и сценарии использования." },
        { title: "Гарантия", text: "15 лет на чашу (по данным поставщика)." },
      ],
    },
  },

  {
    id: "pool-3x5",
    markopolisUrl: "https://www.markopolis.ru/pools/pool-3x5",
    title: "Бассейн 3×5 м",
    dims: { shape: "rect", width_m: 3, length_m: 5, depth_m: 1.5 },
    material: { base: "Полипропилен", notes: ["УФ-стойкость", "Не выцветает", "До −40 °C (по описанию)"] },
    warranty: { years: 15, serviceLifeYears: 30 },
    prices: { bowl_from_rub: null, equipment_from_rub: null },
    contentBlocksForOurCard: {
      about:
        "3×5 м — популярная семейная классика: достаточно места для отдыха и плавания. Полипропиленовая чаша не выцветает и проста в уходе.",
      features: [
        { title: "Баланс", text: "Комфортный размер без избыточных затрат на обслуживание." },
        { title: "Монтаж", text: "Основание и установка чаши с учётом участка." },
        { title: "Инженерия", text: "Закладные и трассы — под ваш сценарий." },
        { title: "Гарантия", text: "15 лет на чашу (по данным поставщика)." },
      ],
    },
  },

  {
    id: "pool-3x6",
    markopolisUrl: "https://www.markopolis.ru/pools/pool-3x6",
    title: "Бассейн 3×6 м",
    dims: { shape: "rect", width_m: 3, length_m: 6, depth_m: 1.5 },
    material: { base: "Полипропилен", notes: ["УФ-стойкость", "Не выцветает", "До −40 °C (по описанию)"] },
    warranty: { years: 15, serviceLifeYears: 30 },
    prices: {
      bowl_from_rub: 122000,
      equipment_from_rub: 103000,
    },
    contentBlocksForOurCard: {
      about:
        "3×6 м — один из самых удобных форматов для частного дома: можно и поплавать, и отдыхать. Чаша из полипропилена рассчитана на многолетнюю эксплуатацию.",
      features: [
        { title: "Плавание", text: "Длина 6 м подходит для активного использования." },
        { title: "Под ключ", text: "Монтаж чаши, установка оборудования, пусконаладка." },
        { title: "Комплектация", text: "Фильтрация и обвязка под гидравлику и бюджет." },
        { title: "Гарантия", text: "15 лет на чашу (по данным поставщика)." },
      ],
    },
  },

  {
    id: "pool-3x7",
    markopolisUrl: "https://www.markopolis.ru/pools/pool-3x7",
    title: "Бассейн 3×7 м",
    dims: { shape: "rect", width_m: 3, length_m: 7, depth_m: 1.5 },
    material: { base: "Полипропилен", notes: ["УФ-стойкость", "Не выцветает", "До −40 °C (по описанию)"] },
    warranty: { years: 15, serviceLifeYears: 30 },
    prices: { bowl_from_rub: null, equipment_from_rub: null },
    contentBlocksForOurCard: {
      about:
        "3×7 м — «почти спортивный» формат для плавания и активного отдыха. Полипропиленовая чаша не выцветает, устойчива к химии и перепадам температур.",
      features: [
        { title: "Плавание", text: "Длина 7 м — комфортнее для тренировок." },
        { title: "Инженерия", text: "Закладные и обслуживание — продумываем заранее." },
        { title: "Оборудование", text: "Комплект под объём и режим эксплуатации." },
        { title: "Гарантия", text: "15 лет на чашу (по данным поставщика)." },
      ],
    },
  },

  {
    id: "pool-3x8",
    markopolisUrl: "https://www.markopolis.ru/pools/pool-3x8",
    title: "Бассейн 3×8 м",
    dims: { shape: "rect", width_m: 3, length_m: 8, depth_m: 1.5 },
    material: { base: "Полипропилен", notes: ["УФ-стойкость", "Не выцветает", "До −40 °C (по описанию)"] },
    warranty: { years: 15, serviceLifeYears: 30 },
    prices: { bowl_from_rub: null, equipment_from_rub: null },
    contentBlocksForOurCard: {
      about:
        "3×8 м — для тех, кто хочет больше пространства и длины для плавания. Чаша из полипропилена рассчитана на многолетнюю эксплуатацию и простое обслуживание.",
      features: [
        { title: "Большой объём", text: "Требует корректного подбора фильтрации и гидравлики." },
        { title: "Монтаж", text: "Подготовка основания и установка с учётом участка." },
        { title: "Опции", text: "Подсветка/аттракционы/автоматика — по желанию." },
        { title: "Гарантия", text: "15 лет на чашу (по данным поставщика)." },
      ],
    },
  },

  {
    id: "pool-3x9",
    markopolisUrl: "https://www.markopolis.ru/pools/pool-3x9",
    title: "Бассейн 3×9 м",
    dims: { shape: "rect", width_m: 3, length_m: 9, depth_m: 1.5 },
    material: { base: "Полипропилен", notes: ["УФ-стойкость", "Не выцветает", "До −40 °C (по описанию)"] },
    warranty: { years: 15, serviceLifeYears: 30 },
    prices: { bowl_from_rub: null, equipment_from_rub: null },
    contentBlocksForOurCard: {
      about:
        "3×9 м — максимально комфортный формат для плавания. Полипропиленовая чаша долговечна, устойчива к химии и сезонным перепадам.",
      features: [
        { title: "Плавание", text: "Длина 9 м — почти «дорожка»." },
        { title: "Система", text: "Оборудование подбирается строго под объём и гидравлику." },
        { title: "Комфорт", text: "Подсветка и закладные — на этапе проектирования." },
        { title: "Гарантия", text: "15 лет на чашу (по данным поставщика)." },
      ],
    },
  },

  {
    id: "pool-4x8",
    markopolisUrl: "https://www.markopolis.ru/pools/pool-4x8",
    title: "Бассейн 4×8 м",
    dims: { shape: "rect", width_m: 4, length_m: 8, depth_m: 1.5 },
    material: { base: "Полипропилен", notes: ["УФ-стойкость", "Не выцветает", "До −40 °C (по описанию)"] },
    warranty: { years: 15, serviceLifeYears: 30 },
    prices: { bowl_from_rub: null, equipment_from_rub: null },
    contentBlocksForOurCard: {
      about:
        "4×8 м — премиальный семейный формат с большим зеркалом воды. Требует грамотного проекта инженерии и подбора оборудования.",
      features: [
        { title: "Пространство", text: "Ширина 4 м — комфорт для семьи и гостей." },
        { title: "Оборудование", text: "Подбор фильтрации/насоса/обвязки под большой объём." },
        { title: "Монтаж", text: "Учитываем технику, грунты и коммуникации на участке." },
        { title: "Гарантия", text: "15 лет на чашу (по данным поставщика)." },
      ],
    },
  },
];
