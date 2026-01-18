const DEFAULT_HERO_IMAGES = [
  {
    src: "assets/images/objects/rk-000002_01.jpg",
    alt: "Гостиная и панорамные окна",
  },
  {
    src: "assets/images/objects/rk-000002_02.jpg",
    alt: "Кухня и обеденная зона",
  },
  {
    src: "assets/images/objects/rk-000002_03.jpg",
    alt: "Спальня и зона отдыха",
  },
];

export { RENTKIT_PROPERTIES };

const DEFAULT_THUMBS = [
  "assets/images/objects_sm/rk-000002_01.webp",
  "assets/images/objects_sm/rk-000002_02.webp",
  "assets/images/objects_sm/rk-000002_03.webp",
];

const DEFAULT_GALLERY = [
  "assets/images/objects/rk-000002_01.jpg",
  "assets/images/objects/rk-000002_02.jpg",
  "assets/images/objects/rk-000002_03.jpg",
];

const DEFAULT_FEATURES = [
  "Вид на город",
  "Охраняемая территория",
  "Современный ремонт",
  "Подземный паркинг",
  "Свежий дом, новая инфраструктура",
];

const DEFAULT_HOST = {
  name: "Александра",
  role: "хозяйка",
  meta: "8 лет опыта, рейтинг 4.9, 52 отзыва",
  avatar: "assets/images/host/rk-000002_host.jpg",
};

const DEFAULT_REVIEWS_SUMMARY = {
  rating: 4.9,
  count: 52,
};

const DEFAULT_REVIEWS = [
  {
    author: "Мария",
    rating: 5,
    text: "Отличное место! Вид действительно потрясающий, квартира чистая и новая.",
    avatar: "assets/images/reviews/rk-000002_review_01.jpg",
  },
  {
    author: "Кирилл",
    rating: 4,
    text: "Очень понравилось расположение. До центра 10 минут пешком.",
    avatar: "assets/images/reviews/rk-000002_review_02.jpg",
  },
];

const DEFAULT_SIDEBAR_NOTES = ["Без комиссии", "Гарантия RentKit"];

const DEFAULT_PROPERTY_DETAILS = {
  locationNote: "Печерск",
  view: "город + закаты",
  description:
    "Современная студия с панорамными окнами и дизайнерским ремонтом. Апартаменты находятся в новом жилом комплексе с охраняемой территорией. Квартира полностью укомплектована техникой и мебелью.",
  features: DEFAULT_FEATURES,
  heroImages: DEFAULT_HERO_IMAGES,
  thumbs: DEFAULT_THUMBS,
  gallery: DEFAULT_GALLERY,
  host: DEFAULT_HOST,
  reviewsSummary: DEFAULT_REVIEWS_SUMMARY,
  reviews: DEFAULT_REVIEWS,
  sidebarNotes: DEFAULT_SIDEBAR_NOTES,
};

const RENTKIT_PROPERTIES = [
  {
    ...DEFAULT_PROPERTY_DETAILS,
    id: "rk-000001",
    title: "Студия с панорамой Днепра",
    city: "Киев",
    address: "ул. Садовая, 18",
    mapQuery: "Kyiv",
    locationNote: "Печерск",
    type: "studio",
    rooms: 1,
    area: 52,
    floor: 18,
    view: "Днепр и вечерние огни",
    description:
      "Светлая студия в новом ЖК с панорамными окнами и продуманной планировкой. В квартире есть полноценная кухонная зона, спальня отделена текстильной перегородкой, а техника подобрана под комфортное проживание.",
    features: [
      "Панорамные окна",
      "Теплый пол",
      "Смарт-замок",
      "Фильтр воды",
      "Скоростной Wi-Fi",
      "Пешком до метро 7 минут",
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000001_01.jpg",
        alt: "Гостиная с панорамными окнами",
      },
      {
        src: "assets/images/objects/rk-000001_02.jpg",
        alt: "Кухня с современной техникой",
      },
      {
        src: "assets/images/objects/rk-000001_03.jpg",
        alt: "Спальная зона студии",
      },
    ],
    thumbs: [
      "assets/images/objects_sm/rk-000001_01.webp",
      "assets/images/objects_sm/rk-000001_02.webp",
      "assets/images/objects_sm/rk-000001_03.webp",
    ],
    gallery: [
      "assets/images/objects/rk-000001_01.jpg",
      "assets/images/objects/rk-000001_02.jpg",
      "assets/images/objects/rk-000001_03.jpg",
      "assets/images/objects/rk-000001_04.jpg",
    ],
    host: {
      name: "Дарья",
      role: "хозяйка",
      meta: "5 лет опыта, рейтинг 4.8, 36 отзывов",
      avatar: "assets/images/host/rk-000001_host.jpg",
    },
    reviewsSummary: {
      rating: 4.8,
      count: 36,
    },
    reviews: [
      {
        author: "Алина",
        rating: 5,
        text: "Очень уютно и светло. Вид из окон просто топ!",
        avatar: "assets/images/reviews/rk-000001_review_01.jpg",
      },
      {
        author: "Егор",
        rating: 4,
        text: "Все новое, удобная кровать, приятный район.",
        avatar: "assets/images/reviews/rk-000001_review_02.jpg",
      },
    ],
    sidebarNotes: ["Без комиссии", "Можно с животными"],
    price: 24000,
    status: "available",
    isNew: true,
    isPremium: false,
    addedAt: "2025-01-12",
    bookedDates: ["2025-10-02", "2025-10-11", "2025-10-19"],
    images: {
      avif: "./assets/images/catalog_images/rk-000001_01.avif",
      webp: "./assets/images/catalog_images/rk-000001_01.webp",
      jpg: "./assets/images/catalog_images/rk-000001_01.jpg",
    },
  },
  {
    ...DEFAULT_PROPERTY_DETAILS,
    id: "rk-000002",
    title: "Квартира в стиле лофт у Контрактовой",
    city: "Киев",
    address: "ул. Константиновская, 7",
    mapQuery: "Kyiv",
    locationNote: "Подол",
    type: "apartment",
    rooms: 2,
    area: 72,
    floor: 5,
    view: "старый Подол и крыши",
    description:
      "Лофт-апартаменты рядом с Контрактовой площадью. Высокие потолки, кирпичная кладка и просторная кухня-гостиная делают пространство идеальным для пары или удаленной работы.",
    features: [
      "Высокие потолки",
      "Открытая кухня",
      "Посудомоечная машина",
      "Паркинг во дворе",
      "Пешком до набережной",
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000002_01.jpg",
        alt: "Гостиная в стиле лофт",
      },
      {
        src: "assets/images/objects/rk-000002_02.jpg",
        alt: "Кухня и обеденная зона",
      },
      {
        src: "assets/images/objects/rk-000002_03.jpg",
        alt: "Балкон с видом на город",
      },
    ],
    thumbs: [
      "assets/images/objects_sm/rk-000002_01.webp",
      "assets/images/objects_sm/rk-000002_02.webp",
      "assets/images/objects_sm/rk-000002_03.webp",
    ],
    gallery: [
      "assets/images/objects/rk-000002_01.jpg",
      "assets/images/objects/rk-000002_02.jpg",
      "assets/images/objects/rk-000002_03.jpg",
      "assets/images/objects/rk-000002_04.jpg",
      "assets/images/objects/rk-000002_05.jpg",
      "assets/images/objects/rk-000002_06.jpg",
    ],
    host: {
      name: "Максим",
      role: "хозяин",
      meta: "7 лет опыта, рейтинг 4.9, 68 отзывов",
      avatar: "assets/images/host/rk-000002_host.jpg",
    },
    reviewsSummary: {
      rating: 4.9,
      count: 68,
    },
    reviews: [
      {
        author: "Станислав",
        rating: 5,
        text: "Идеальное расположение, стильный интерьер и тишина.",
        avatar: "assets/images/reviews/rk-000002_review_01.jpg",
      },
      {
        author: "Кристина",
        rating: 5,
        text: "Отличное место для пары, все нужное рядом.",
        avatar: "assets/images/reviews/rk-000002_review_02.jpg",
      },
    ],
    sidebarNotes: ["Коммунальные включены", "Можно на короткий срок"],
    price: 32000,
    status: "busy",
    isNew: false,
    isPremium: false,
    addedAt: "2024-11-08",
    bookedDates: [
      "2025-10-05",
      "2025-10-06",
      "2025-10-21",
      "2025-11-02",
      "2025-11-14",
      "2025-12-01",
    ],
    images: {
      avif: "./assets/images/catalog_images/rk-000002_01.avif",
      webp: "./assets/images/catalog_images/rk-000002_01.webp",
      jpg: "./assets/images/catalog_images/rk-000002_01.jpg",
    },
  },
  {
    ...DEFAULT_PROPERTY_DETAILS,
    id: "rk-000003",
    title: "Дом у набережной в Оболони",
    city: "Киев",
    address: "ул. Приречная, 28",
    mapQuery: "Kyiv",
    locationNote: "Оболонь",
    type: "house",
    rooms: 4,
    area: 160,
    floor: 2,
    view: "набережная и зелень",
    description:
      "Уютный дом на тихой улице Оболони. Большая гостиная с камином, закрытый двор и терраса для отдыха делают этот вариант идеальным для семьи.",
    features: [
      "Закрытый двор",
      "Камин",
      "Сигнализация",
      "Гараж на 2 авто",
      "Гриль-зона",
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000003_01.jpg",
        alt: "Фасад дома и участок",
      },
      {
        src: "assets/images/objects/rk-000003_02.jpg",
        alt: "Гостиная с камином",
      },
      {
        src: "assets/images/objects/rk-000003_03.jpg",
        alt: "Терраса для отдыха",
      },
    ],
    thumbs: [
      "assets/images/objects_sm/rk-000003_01.webp",
      "assets/images/objects_sm/rk-000003_02.webp",
      "assets/images/objects_sm/rk-000003_03.webp",
    ],
    gallery: [
      "assets/images/objects/rk-000003_01.jpg",
      "assets/images/objects/rk-000003_02.jpg",
      "assets/images/objects/rk-000003_03.jpg",
    ],
    host: {
      name: "Олег",
      role: "хозяин",
      meta: "10 лет опыта, рейтинг 4.7, 24 отзыва",
      avatar: "assets/images/host/rk-000003_host.jpg",
    },
    reviewsSummary: {
      rating: 4.7,
      count: 24,
    },
    reviews: [
      {
        author: "Инна",
        rating: 5,
        text: "Отличный дом для семьи, двор ухоженный и тихий.",
        avatar: "assets/images/reviews/rk-000003_review_01.jpg",
      },
      {
        author: "Дмитрий",
        rating: 4,
        text: "Все соответствует фото, понравилась терраса.",
        avatar: "assets/images/reviews/rk-000003_review_02.jpg",
      },
    ],
    sidebarNotes: ["Можно с детьми", "Без комиссии"],
    price: 72000,
    status: "available",
    isNew: false,
    isPremium: true,
    addedAt: "2024-03-22",
    bookedDates: ["2025-10-09", "2025-10-10", "2025-11-06"],
    images: {
      avif: "./assets/images/catalog_images/rk-000003_01.avif",
      webp: "./assets/images/catalog_images/rk-000003_01.webp",
      jpg: "./assets/images/catalog_images/rk-000003_01.jpg",
    },
  },
  {
    ...DEFAULT_PROPERTY_DETAILS,
    id: "rk-000004",
    title: "Студия в историческом центре",
    city: "Львов",
    address: "пл. Рынок, 14",
    mapQuery: "Lviv",
    locationNote: "Исторический центр",
    type: "studio",
    rooms: 1,
    area: 40,
    floor: 3,
    view: "старый город",
    description:
      "Компактная студия в шаге от площади Рынок. Идеальна для тех, кто хочет жить в сердце Львова: рядом кофейни, музеи и пешие маршруты.",
    features: [
      "Исторический дом",
      "Высокие потолки",
      "Стиральная машина",
      "Теплый пол в ванной",
      "Кофемашина",
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000004_01.jpg",
        alt: "Светлая студия в центре",
      },
      {
        src: "assets/images/objects/rk-000004_02.jpg",
        alt: "Кухня-ниша",
      },
      {
        src: "assets/images/objects/rk-000004_03.jpg",
        alt: "Спальная зона с высоким окном",
      },
    ],
    thumbs: [
      "assets/images/objects_sm/rk-000004_01.webp",
      "assets/images/objects_sm/rk-000004_02.webp",
      "assets/images/objects_sm/rk-000004_03.webp",
    ],
    gallery: [
      "assets/images/objects/rk-000004_01.jpg",
      "assets/images/objects/rk-000004_02.jpg",
      "assets/images/objects/rk-000004_03.jpg",
    ],
    host: {
      name: "София",
      role: "хозяйка",
      meta: "4 года опыта, рейтинг 4.8, 19 отзывов",
      avatar: "assets/images/host/rk-000004_host.jpg",
    },
    reviewsSummary: {
      rating: 4.8,
      count: 19,
    },
    reviews: [
      {
        author: "Марина",
        rating: 5,
        text: "Очень атмосферно, в центре и при этом тихо.",
        avatar: "assets/images/reviews/rk-000004_review_01.jpg",
      },
      {
        author: "Роман",
        rating: 4,
        text: "Удобная студия, все необходимое есть.",
        avatar: "assets/images/reviews/rk-000004_review_02.jpg",
      },
    ],
    sidebarNotes: ["Без комиссии", "Только долгосрочно"],
    price: 19000,
    status: "busy",
    isNew: false,
    isPremium: false,
    addedAt: "2023-08-19",
    bookedDates: ["2025-10-14", "2025-10-22", "2025-11-20"],
    images: {
      avif: "./assets/images/catalog_images/rk-000004_01.avif",
      webp: "./assets/images/catalog_images/rk-000004_01.webp",
      jpg: "./assets/images/catalog_images/rk-000004_01.jpg",
    },
  },
  {
    ...DEFAULT_PROPERTY_DETAILS,
    id: "rk-000005",
    title: "Квартира у парка Высокий Замок",
    city: "Львов",
    address: "ул. Лысенко, 22",
    mapQuery: "Lviv",
    locationNote: "Высокий Замок",
    type: "apartment",
    rooms: 3,
    floor: 6,
    area: 84,
    view: "парк и холмы",
    description:
      "Просторная квартира с окнами на парк и удобной планировкой. Подходит для семьи: есть отдельная спальня, рабочее место и много места для хранения.",
    features: [
      "Окна на парк",
      "2 санузла",
      "Тихий двор",
      "Система хранения",
      "Домофон",
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000005_01.jpg",
        alt: "Гостиная с мягкой зоной",
      },
      {
        src: "assets/images/objects/rk-000005_02.jpg",
        alt: "Спальня с большим шкафом",
      },
      {
        src: "assets/images/objects/rk-000005_03.jpg",
        alt: "Кухня с техникой",
      },
    ],
    thumbs: [
      "assets/images/objects_sm/rk-000005_01.webp",
      "assets/images/objects_sm/rk-000005_02.webp",
      "assets/images/objects_sm/rk-000005_03.webp",
    ],
    gallery: [
      "assets/images/objects/rk-000005_01.jpg",
      "assets/images/objects/rk-000005_02.jpg",
      "assets/images/objects/rk-000005_03.jpg",
      "assets/images/objects/rk-000005_04.jpg",
    ],
    host: {
      name: "Ирина",
      role: "хозяйка",
      meta: "6 лет опыта, рейтинг 4.9, 41 отзыв",
      avatar: "assets/images/host/rk-000005_host.jpg",
    },
    reviewsSummary: {
      rating: 4.9,
      count: 41,
    },
    reviews: [
      {
        author: "Полина",
        rating: 5,
        text: "Очень тихое место, квартира просторная и чистая.",
        avatar: "assets/images/reviews/rk-000005_review_01.jpg",
      },
      {
        author: "Виктор",
        rating: 5,
        text: "Отличное расположение, парк буквально за окном.",
        avatar: "assets/images/reviews/rk-000005_review_02.jpg",
      },
    ],
    sidebarNotes: ["Можно с животными", "Без комиссии"],
    price: 36000,
    status: "available",
    isNew: true,
    isPremium: false,
    addedAt: "2025-06-02",
    bookedDates: ["2025-10-04", "2025-10-25", "2025-11-08"],
    images: {
      avif: "./assets/images/catalog_images/rk-000005_01.avif",
      webp: "./assets/images/catalog_images/rk-000005_01.webp",
      jpg: "./assets/images/catalog_images/rk-000005_01.jpg",
    },
  },
  {
    ...DEFAULT_PROPERTY_DETAILS,
    id: "rk-000006",
    title: "Семейный дом с садом",
    city: "Львов",
    address: "ул. Зеленая, 112",
    mapQuery: "Lviv",
    locationNote: "Зелёный район",
    type: "house",
    rooms: 4,
    floor: 2,
    area: 140,
    view: "сад и частный сектор",
    description:
      "Семейный дом в зеленом районе Львова с собственным садом. Тихое место, много света и удобный выезд в центр города.",
    features: [
      "Собственный сад",
      "Кладовая",
      "Солнечные панели",
      "Отдельная прачечная",
      "Рядом школа",
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000006_01.jpg",
        alt: "Дом и сад",
      },
      {
        src: "assets/images/objects/rk-000006_02.jpg",
        alt: "Гостиная с деревянной отделкой",
      },
      {
        src: "assets/images/objects/rk-000006_03.jpg",
        alt: "Летняя терраса",
      },
    ],
    thumbs: [
      "assets/images/objects_sm/rk-000006_01.webp",
      "assets/images/objects_sm/rk-000006_02.webp",
      "assets/images/objects_sm/rk-000006_03.webp",
    ],
    gallery: [
      "assets/images/objects/rk-000006_01.jpg",
      "assets/images/objects/rk-000006_02.jpg",
      "assets/images/objects/rk-000006_03.jpg",
      "assets/images/objects/rk-000006_04.jpg",
      "assets/images/objects/rk-000006_05.jpg",
    ],
    host: {
      name: "Павел",
      role: "хозяин",
      meta: "9 лет опыта, рейтинг 4.6, 33 отзыва",
      avatar: "assets/images/host/rk-000006_host.jpg",
    },
    reviewsSummary: {
      rating: 4.6,
      count: 33,
    },
    reviews: [
      {
        author: "Леся",
        rating: 5,
        text: "Очень тихо и зелено, дом теплый и уютный.",
        avatar: "assets/images/reviews/rk-000006_review_01.jpg",
      },
      {
        author: "Антон",
        rating: 4,
        text: "Хороший вариант для семьи, рядом школа и магазины.",
        avatar: "assets/images/reviews/rk-000006_review_02.jpg",
      },
    ],
    sidebarNotes: ["Коммунальные отдельно", "Можно с детьми"],
    price: 48000,
    status: "available",
    isNew: false,
    isPremium: false,
    addedAt: "2024-02-27",
    bookedDates: ["2025-10-07", "2025-11-10", "2025-12-05"],
    images: {
      avif: "./assets/images/catalog_images/rk-000006_01.avif",
      webp: "./assets/images/catalog_images/rk-000006_01.webp",
      jpg: "./assets/images/catalog_images/rk-000006_01.jpg",
    },
  },
  {
    ...DEFAULT_PROPERTY_DETAILS,
    id: "rk-000007",
    title: "Премиум апартаменты с камином",
    city: "Львов",
    address: "просп. Свободы, 30",
    mapQuery: "Lviv",
    locationNote: "Центральный квартал",
    type: "apartment",
    rooms: 4,
    area: 120,
    floor: 7,
    view: "центр города",
    description:
      "Премиум-апартаменты с дизайнерским ремонтом и камином. Панорамные окна, продуманное освещение и приватный лифт в паркинг.",
    features: [
      "Дизайнерская мебель",
      "Камин",
      "Панорамные окна",
      "Система умный дом",
      "Подземный паркинг",
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000007_01.jpg",
        alt: "Гостиная премиум класса",
      },
      {
        src: "assets/images/objects/rk-000007_02.jpg",
        alt: "Обеденная зона",
      },
      {
        src: "assets/images/objects/rk-000007_03.jpg",
        alt: "Мастер-спальня",
      },
    ],
    thumbs: [
      "assets/images/objects_sm/rk-000007_01.webp",
      "assets/images/objects_sm/rk-000007_02.webp",
      "assets/images/objects_sm/rk-000007_03.webp",
    ],
    gallery: [
      "assets/images/objects/rk-000007_01.jpg",
      "assets/images/objects/rk-000007_02.jpg",
      "assets/images/objects/rk-000007_03.jpg",
      "assets/images/objects/rk-000007_04.jpg",
      "assets/images/objects/rk-000007_05.jpg",
    ],
    host: {
      name: "Мария",
      role: "хозяйка",
      meta: "12 лет опыта, рейтинг 5.0, 87 отзывов",
      avatar: "assets/images/host/rk-000007_host.jpg",
    },
    reviewsSummary: {
      rating: 5.0,
      count: 87,
    },
    reviews: [
      {
        author: "Вадим",
        rating: 5,
        text: "Сервис на уровне, интерьер как в журнале.",
        avatar: "assets/images/reviews/rk-000007_review_01.jpg",
      },
      {
        author: "Юлия",
        rating: 5,
        text: "Очень комфортно, особенно понравился камин.",
        avatar: "assets/images/reviews/rk-000007_review_02.jpg",
      },
    ],
    sidebarNotes: ["Премиум сервис", "Без комиссии"],
    price: 82000,
    status: "busy",
    isNew: true,
    isPremium: true,
    addedAt: "2025-09-18",
    bookedDates: ["2025-10-22", "2025-11-12", "2025-12-18"],
    images: {
      avif: "./assets/images/catalog_images/rk-000007_01.avif",
      webp: "./assets/images/catalog_images/rk-000007_01.webp",
      jpg: "./assets/images/catalog_images/rk-000007_01.jpg",
    },
  },
  {
    ...DEFAULT_PROPERTY_DETAILS,
    id: "rk-000008",
    title: "Современный дом с бассейном",
    city: "Львов",
    address: "ул. Левандовская, 6",
    mapQuery: "Lviv",
    locationNote: "Тихая аллея",
    type: "house",
    rooms: 5,
    area: 220,
    floor: 2,
    view: "закрытый двор и бассейн",
    description:
      "Новый дом с бассейном и просторной гостиной. Участок закрыт, есть зона отдыха и место для парковки двух авто.",
    features: [
      "Бассейн",
      "Закрытая территория",
      "Гостевой санузел",
      "Гардеробная",
      "Система безопасности",
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000008_01.jpg",
        alt: "Современный фасад",
      },
      {
        src: "assets/images/objects/rk-000008_02.jpg",
        alt: "Зона бассейна",
      },
      {
        src: "assets/images/objects/rk-000008_03.jpg",
        alt: "Лаунж с панорамой",
      },
    ],
    thumbs: [
      "assets/images/objects_sm/rk-000008_01.webp",
      "assets/images/objects_sm/rk-000008_02.webp",
      "assets/images/objects_sm/rk-000008_03.webp",
    ],
    gallery: [
      "assets/images/objects/rk-000008_01.jpg",
      "assets/images/objects/rk-000008_02.jpg",
      "assets/images/objects/rk-000008_03.jpg",
    ],
    host: {
      name: "Артем",
      role: "хозяин",
      meta: "8 лет опыта, рейтинг 4.9, 29 отзывов",
      avatar: "assets/images/host/rk-000008_host.jpg",
    },
    reviewsSummary: {
      rating: 4.9,
      count: 29,
    },
    reviews: [
      {
        author: "Денис",
        rating: 5,
        text: "Бассейн и зона отдыха впечатляют, все новое.",
        avatar: "assets/images/reviews/rk-000008_review_01.jpg",
      },
      {
        author: "Ольга",
        rating: 4,
        text: "Очень комфортно, территория закрытая и тихая.",
        avatar: "assets/images/reviews/rk-000008_review_02.jpg",
      },
    ],
    sidebarNotes: ["Только долгосрочно", "Обслуживание бассейна включено"],
    price: 115000,
    status: "busy",
    isNew: false,
    isPremium: true,
    addedAt: "2024-06-11",
    bookedDates: ["2025-10-28", "2025-11-01", "2025-12-11"],
    images: {
      avif: "./assets/images/catalog_images/rk-000008_01.avif",
      webp: "./assets/images/catalog_images/rk-000008_01.webp",
      jpg: "./assets/images/catalog_images/rk-000008_01.jpg",
    },
  },
  {
    ...DEFAULT_PROPERTY_DETAILS,
    id: "rk-000009",
    title: "Апартаменты с видом на море",
    city: "Одесса",
    address: "ул. Генуэзская, 24",
    mapQuery: "Odesa",
    locationNote: "Аркадия",
    type: "apartment",
    rooms: 3,
    area: 98,
    floor: 12,
    view: "море и набережная",
    description:
      "Апартаменты в Аркадии с большой террасой и видом на море. В квартире три отдельные зоны: гостиная, спальня и рабочее место.",
    features: [
      "Панорама моря",
      "Терраса",
      "Кондиционеры",
      "Круглосуточная охрана",
      "Рядом пляж",
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000009_01.jpg",
        alt: "Гостиная с видом на море",
      },
      {
        src: "assets/images/objects/rk-000009_02.jpg",
        alt: "Терраса для завтраков",
      },
      {
        src: "assets/images/objects/rk-000009_03.jpg",
        alt: "Спальня с видом",
      },
    ],
    thumbs: [
      "assets/images/objects_sm/rk-000009_01.webp",
      "assets/images/objects_sm/rk-000009_02.webp",
      "assets/images/objects_sm/rk-000009_03.webp",
    ],
    gallery: [
      "assets/images/objects/rk-000009_01.jpg",
      "assets/images/objects/rk-000009_02.jpg",
      "assets/images/objects/rk-000009_03.jpg",
    ],
    host: {
      name: "Наталья",
      role: "хозяйка",
      meta: "7 лет опыта, рейтинг 4.8, 56 отзывов",
      avatar: "assets/images/host/rk-000009_host.jpg",
    },
    reviewsSummary: {
      rating: 4.8,
      count: 56,
    },
    reviews: [
      {
        author: "Сергей",
        rating: 5,
        text: "Вид на море отличный, до пляжа 5 минут.",
        avatar: "assets/images/reviews/rk-000009_review_01.jpg",
      },
      {
        author: "Елена",
        rating: 4,
        text: "Терраса супер, все как на фото.",
        avatar: "assets/images/reviews/rk-000009_review_02.jpg",
      },
    ],
    sidebarNotes: ["Премиум сервис", "Паркинг включен"],
    price: 68000,
    status: "busy",
    isNew: false,
    isPremium: true,
    addedAt: "2024-05-25",
    bookedDates: ["2025-10-19", "2025-11-04", "2025-12-22"],
    images: {
      avif: "./assets/images/catalog_images/rk-000009_01.avif",
      webp: "./assets/images/catalog_images/rk-000009_01.webp",
      jpg: "./assets/images/catalog_images/rk-000009_01.jpg",
    },
  },
  {
    ...DEFAULT_PROPERTY_DETAILS,
    id: "rk-000010",
    title: "Дом у моря с террасой",
    city: "Одесса",
    address: "Фонтанская дорога, 91",
    mapQuery: "Odesa",
    locationNote: "Приморский район",
    type: "house",
    rooms: 4,
    area: 180,
    floor: 2,
    view: "море и частный сектор",
    description:
      "Дом у моря на Фонтане с просторной террасой и отдельной кухней. Подходит для семьи или компании, есть собственный двор и гараж.",
    features: [
      "Собственный двор",
      "Летняя кухня",
      "Теплые полы",
      "Гараж",
      "10 минут до пляжа",
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000010_01.jpg",
        alt: "Фасад дома у моря",
      },
      {
        src: "assets/images/objects/rk-000010_02.jpg",
        alt: "Светлая кухня",
      },
      {
        src: "assets/images/objects/rk-000010_03.jpg",
        alt: "Терраса с зоной отдыха",
      },
    ],
    thumbs: [
      "assets/images/objects_sm/rk-000010_01.webp",
      "assets/images/objects_sm/rk-000010_02.webp",
      "assets/images/objects_sm/rk-000010_03.webp",
    ],
    gallery: [
      "assets/images/objects/rk-000010_01.jpg",
      "assets/images/objects/rk-000010_02.jpg",
      "assets/images/objects/rk-000010_03.jpg",
    ],
    host: {
      name: "Игорь",
      role: "хозяин",
      meta: "6 лет опыта, рейтинг 4.7, 22 отзыва",
      avatar: "assets/images/host/rk-000010_host.jpg",
    },
    reviewsSummary: {
      rating: 4.7,
      count: 22,
    },
    reviews: [
      {
        author: "Татьяна",
        rating: 5,
        text: "Терраса отличная, двор закрытый, рядом море.",
        avatar: "assets/images/reviews/rk-000010_review_01.jpg",
      },
      {
        author: "Андрей",
        rating: 4,
        text: "Дом просторный, подходит для семьи.",
        avatar: "assets/images/reviews/rk-000010_review_02.jpg",
      },
    ],
    sidebarNotes: ["Можно с животными", "Без комиссии"],
    price: 54000,
    status: "available",
    isNew: false,
    isPremium: false,
    addedAt: "2024-03-10",
    bookedDates: ["2025-10-16", "2025-11-22", "2025-12-09"],
    images: {
      avif: "./assets/images/catalog_images/rk-000010_01.avif",
      webp: "./assets/images/catalog_images/rk-000010_01.webp",
      jpg: "./assets/images/catalog_images/rk-000010_01.jpg",
    },
  },
];
