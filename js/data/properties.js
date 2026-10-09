const DEFAULT_HERO_IMAGES = [
  {
    src: "assets/images/objects/rk-000002_01.jpg",
    alt: {
      en: "Living room and panoramic windows",
      uk: "Вітальня та панорамні вікна",
      ru: "Гостиная и панорамные окна",
    },
  },
  {
    src: "assets/images/objects/rk-000002_02.jpg",
    alt: {
      en: "Kitchen and dining area",
      uk: "Кухня та обідня зона",
      ru: "Кухня и обеденная зона",
    },
  },
  {
    src: "assets/images/objects/rk-000002_03.jpg",
    alt: {
      en: "Bedroom and lounge area",
      uk: "Спальня та зона відпочинку",
      ru: "Спальня и зона отдыха",
    },
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
  { en: "City view", uk: "Вид на місто", ru: "Вид на город" },
  {
    en: "Guarded grounds",
    uk: "Охоронювана територія",
    ru: "Охраняемая территория",
  },
  { en: "Modern renovation", uk: "Сучасний ремонт", ru: "Современный ремонт" },
  {
    en: "Underground parking",
    uk: "Підземний паркінг",
    ru: "Подземный паркинг",
  },
  {
    en: "New building, new infrastructure",
    uk: "Новий будинок, нова інфраструктура",
    ru: "Свежий дом, новая инфраструктура",
  },
];

const DEFAULT_HOST = {
  name: { en: "Oleksandra", uk: "Олександра", ru: "Александра" },
  role: { en: "host", uk: "власниця", ru: "хозяйка" },
  meta: {
    en: "8 years of experience, rating 4.9, 52 reviews",
    uk: "8 років досвіду, рейтинг 4.9, 52 відгуки",
    ru: "8 лет опыта, рейтинг 4.9, 52 отзыва",
  },
  avatar: "assets/images/host/rk-000002_host.jpg",
};

const DEFAULT_REVIEWS_SUMMARY = {
  rating: 4.9,
  count: 52,
};

const DEFAULT_REVIEWS = [
  {
    author: { en: "Maria", uk: "Марія", ru: "Мария" },
    rating: 5,
    text: {
      en: "Great place! The view is truly stunning, and the apartment is clean and new.",
      uk: "Чудове місце! Вид справді неймовірний, квартира чиста й нова.",
      ru: "Отличное место! Вид действительно потрясающий, квартира чистая и новая.",
    },
    avatar: "assets/images/reviews/rk-000002_review_01.jpg",
  },
  {
    author: { en: "Kyrylo", uk: "Кирило", ru: "Кирилл" },
    rating: 4,
    text: {
      en: "Loved the location. The center is a 10-minute walk away.",
      uk: "Дуже сподобалося розташування. До центру 10 хвилин пішки.",
      ru: "Очень понравилось расположение. До центра 10 минут пешком.",
    },
    avatar: "assets/images/reviews/rk-000002_review_02.jpg",
  },
];

const DEFAULT_SIDEBAR_NOTES = [
  { en: "No commission", uk: "Без комісії", ru: "Без комиссии" },
  { en: "RentKit guarantee", uk: "Гарантія RentKit", ru: "Гарантия RentKit" },
];

const DEFAULT_PROPERTY_DETAILS = {
  locationNote: { en: "Pechersk", uk: "Печерськ", ru: "Печерск" },
  view: {
    en: "city + sunsets",
    uk: "місто + заходи сонця",
    ru: "город + закаты",
  },
  description: {
    en: "A modern studio with panoramic windows and a designer renovation. The apartment is in a new residential complex with guarded grounds and is fully equipped with appliances and furniture.",
    uk: "Сучасна студія з панорамними вікнами та дизайнерським ремонтом. Апартаменти розташовані в новому житловому комплексі з охоронюваною територією. Квартира повністю укомплектована технікою й меблями.",
    ru: "Современная студия с панорамными окнами и дизайнерским ремонтом. Апартаменты находятся в новом жилом комплексе с охраняемой территорией. Квартира полностью укомплектована техникой и мебелью.",
  },
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
    title: {
      en: "Studio with a Dnipro panorama",
      uk: "Студія з панорамою Дніпра",
      ru: "Студия с панорамой Днепра",
    },
    city: "kyiv",
    address: {
      en: "18 Sadova St",
      uk: "вул. Садова, 18",
      ru: "ул. Садовая, 18",
    },
    mapQuery: "Kyiv",
    locationNote: { en: "Pechersk", uk: "Печерськ", ru: "Печерск" },
    type: "studio",
    rooms: 1,
    area: 52,
    floor: 18,
    view: {
      en: "the Dnipro and evening lights",
      uk: "Дніпро та вечірні вогні",
      ru: "Днепр и вечерние огни",
    },
    description: {
      en: "A bright studio in a new residential complex with panoramic windows and a well-thought-out layout. It has a full kitchen area, the bedroom is separated by a textile partition, and the appliances are chosen for comfortable living.",
      uk: "Світла студія в новому ЖК з панорамними вікнами та продуманим плануванням. У квартирі є повноцінна кухонна зона, спальню відокремлено текстильною перегородкою, а техніку дібрано для комфортного проживання.",
      ru: "Светлая студия в новом ЖК с панорамными окнами и продуманной планировкой. В квартире есть полноценная кухонная зона, спальня отделена текстильной перегородкой, а техника подобрана под комфортное проживание.",
    },
    features: [
      { en: "Panoramic windows", uk: "Панорамні вікна", ru: "Панорамные окна" },
      { en: "Underfloor heating", uk: "Тепла підлога", ru: "Теплый пол" },
      { en: "Smart lock", uk: "Смарт-замок", ru: "Смарт-замок" },
      { en: "Water filter", uk: "Фільтр для води", ru: "Фильтр воды" },
      {
        en: "High-speed Wi-Fi",
        uk: "Швидкісний Wi-Fi",
        ru: "Скоростной Wi-Fi",
      },
      {
        en: "7-minute walk to the metro",
        uk: "7 хвилин пішки до метро",
        ru: "Пешком до метро 7 минут",
      },
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000001_01.jpg",
        alt: {
          en: "Living room with panoramic windows",
          uk: "Вітальня з панорамними вікнами",
          ru: "Гостиная с панорамными окнами",
        },
      },
      {
        src: "assets/images/objects/rk-000001_02.jpg",
        alt: {
          en: "Kitchen with modern appliances",
          uk: "Кухня із сучасною технікою",
          ru: "Кухня с современной техникой",
        },
      },
      {
        src: "assets/images/objects/rk-000001_03.jpg",
        alt: {
          en: "Studio sleeping area",
          uk: "Спальна зона студії",
          ru: "Спальная зона студии",
        },
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
      name: { en: "Daria", uk: "Дар'я", ru: "Дарья" },
      role: { en: "host", uk: "власниця", ru: "хозяйка" },
      meta: {
        en: "5 years of experience, rating 4.8, 36 reviews",
        uk: "5 років досвіду, рейтинг 4.8, 36 відгуків",
        ru: "5 лет опыта, рейтинг 4.8, 36 отзывов",
      },
      avatar: "assets/images/host/rk-000001_host.jpg",
    },
    reviewsSummary: {
      rating: 4.8,
      count: 36,
    },
    reviews: [
      {
        author: { en: "Alina", uk: "Аліна", ru: "Алина" },
        rating: 5,
        text: {
          en: "Very cozy and bright. The view from the windows is simply the best!",
          uk: "Дуже затишно й світло. Вид з вікон просто топ!",
          ru: "Очень уютно и светло. Вид из окон просто топ!",
        },
        avatar: "assets/images/reviews/rk-000001_review_01.jpg",
      },
      {
        author: { en: "Yehor", uk: "Єгор", ru: "Егор" },
        rating: 4,
        text: {
          en: "Everything is new, the bed is comfortable, and the neighborhood is pleasant.",
          uk: "Усе нове, зручне ліжко, приємний район.",
          ru: "Все новое, удобная кровать, приятный район.",
        },
        avatar: "assets/images/reviews/rk-000001_review_02.jpg",
      },
    ],
    sidebarNotes: [
      { en: "No commission", uk: "Без комісії", ru: "Без комиссии" },
      { en: "Pets allowed", uk: "Можна з тваринами", ru: "Можно с животными" },
    ],
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
    title: {
      en: "Loft apartment near Kontraktova Square",
      uk: "Квартира в стилі лофт біля Контрактової",
      ru: "Квартира в стиле лофт у Контрактовой",
    },
    city: "kyiv",
    address: {
      en: "7 Kostiantynivska St",
      uk: "вул. Костянтинівська, 7",
      ru: "ул. Константиновская, 7",
    },
    mapQuery: "Kyiv",
    locationNote: { en: "Podil", uk: "Поділ", ru: "Подол" },
    type: "apartment",
    rooms: 2,
    area: 72,
    floor: 5,
    view: {
      en: "old Podil and rooftops",
      uk: "старий Поділ і дахи",
      ru: "старый Подол и крыши",
    },
    description: {
      en: "Loft apartment next to Kontraktova Square. High ceilings, exposed brick and a spacious kitchen-living room make it ideal for a couple or remote work.",
      uk: "Лофт-апартаменти поруч із Контрактовою площею. Високі стелі, цегляна кладка та простора кухня-вітальня роблять простір ідеальним для пари або віддаленої роботи.",
      ru: "Лофт-апартаменты рядом с Контрактовой площадью. Высокие потолки, кирпичная кладка и просторная кухня-гостиная делают пространство идеальным для пары или удаленной работы.",
    },
    features: [
      { en: "High ceilings", uk: "Високі стелі", ru: "Высокие потолки" },
      { en: "Open kitchen", uk: "Відкрита кухня", ru: "Открытая кухня" },
      {
        en: "Dishwasher",
        uk: "Посудомийна машина",
        ru: "Посудомоечная машина",
      },
      {
        en: "Courtyard parking",
        uk: "Паркінг у дворі",
        ru: "Паркинг во дворе",
      },
      {
        en: "Walking distance to the embankment",
        uk: "Пішки до набережної",
        ru: "Пешком до набережной",
      },
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000002_01.jpg",
        alt: {
          en: "Loft-style living room",
          uk: "Вітальня в стилі лофт",
          ru: "Гостиная в стиле лофт",
        },
      },
      {
        src: "assets/images/objects/rk-000002_02.jpg",
        alt: {
          en: "Kitchen and dining area",
          uk: "Кухня та обідня зона",
          ru: "Кухня и обеденная зона",
        },
      },
      {
        src: "assets/images/objects/rk-000002_03.jpg",
        alt: {
          en: "Balcony with a city view",
          uk: "Балкон з видом на місто",
          ru: "Балкон с видом на город",
        },
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
      name: { en: "Maksym", uk: "Максим", ru: "Максим" },
      role: { en: "host", uk: "власник", ru: "хозяин" },
      meta: {
        en: "7 years of experience, rating 4.9, 68 reviews",
        uk: "7 років досвіду, рейтинг 4.9, 68 відгуків",
        ru: "7 лет опыта, рейтинг 4.9, 68 отзывов",
      },
      avatar: "assets/images/host/rk-000002_host.jpg",
    },
    reviewsSummary: {
      rating: 4.9,
      count: 68,
    },
    reviews: [
      {
        author: { en: "Stanislav", uk: "Станіслав", ru: "Станислав" },
        rating: 5,
        text: {
          en: "Perfect location, stylish interior and peace and quiet.",
          uk: "Ідеальне розташування, стильний інтер'єр і тиша.",
          ru: "Идеальное расположение, стильный интерьер и тишина.",
        },
        avatar: "assets/images/reviews/rk-000002_review_01.jpg",
      },
      {
        author: { en: "Khrystyna", uk: "Христина", ru: "Кристина" },
        rating: 5,
        text: {
          en: "A great place for a couple, with everything you need nearby.",
          uk: "Чудове місце для пари, усе потрібне поруч.",
          ru: "Отличное место для пары, все нужное рядом.",
        },
        avatar: "assets/images/reviews/rk-000002_review_02.jpg",
      },
    ],
    sidebarNotes: [
      {
        en: "Utilities included",
        uk: "Комунальні включено",
        ru: "Коммунальные включены",
      },
      {
        en: "Short-term stays allowed",
        uk: "Можна на короткий термін",
        ru: "Можно на короткий срок",
      },
    ],
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
    title: {
      en: "House by the embankment in Obolon",
      uk: "Будинок біля набережної на Оболоні",
      ru: "Дом у набережной в Оболони",
    },
    city: "kyiv",
    address: {
      en: "28 Pryrichna St",
      uk: "вул. Прирічна, 28",
      ru: "ул. Приречная, 28",
    },
    mapQuery: "Kyiv",
    locationNote: { en: "Obolon", uk: "Оболонь", ru: "Оболонь" },
    type: "house",
    rooms: 4,
    area: 160,
    floor: 2,
    view: {
      en: "embankment and greenery",
      uk: "набережна й зелень",
      ru: "набережная и зелень",
    },
    description: {
      en: "A cozy house on a quiet street in Obolon. A large living room with a fireplace, a private courtyard and a terrace make it ideal for a family.",
      uk: "Затишний будинок на тихій вулиці Оболоні. Велика вітальня з каміном, закритий двір і тераса для відпочинку роблять цей варіант ідеальним для сім'ї.",
      ru: "Уютный дом на тихой улице Оболони. Большая гостиная с камином, закрытый двор и терраса для отдыха делают этот вариант идеальным для семьи.",
    },
    features: [
      { en: "Private courtyard", uk: "Закритий двір", ru: "Закрытый двор" },
      { en: "Fireplace", uk: "Камін", ru: "Камин" },
      { en: "Alarm system", uk: "Сигналізація", ru: "Сигнализация" },
      { en: "Garage for 2 cars", uk: "Гараж на 2 авто", ru: "Гараж на 2 авто" },
      { en: "Barbecue area", uk: "Гриль-зона", ru: "Гриль-зона" },
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000003_01.jpg",
        alt: {
          en: "House facade and plot",
          uk: "Фасад будинку та ділянка",
          ru: "Фасад дома и участок",
        },
      },
      {
        src: "assets/images/objects/rk-000003_02.jpg",
        alt: {
          en: "Living room with a fireplace",
          uk: "Вітальня з каміном",
          ru: "Гостиная с камином",
        },
      },
      {
        src: "assets/images/objects/rk-000003_03.jpg",
        alt: {
          en: "Lounge terrace",
          uk: "Тераса для відпочинку",
          ru: "Терраса для отдыха",
        },
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
      name: { en: "Oleh", uk: "Олег", ru: "Олег" },
      role: { en: "host", uk: "власник", ru: "хозяин" },
      meta: {
        en: "10 years of experience, rating 4.7, 24 reviews",
        uk: "10 років досвіду, рейтинг 4.7, 24 відгуки",
        ru: "10 лет опыта, рейтинг 4.7, 24 отзыва",
      },
      avatar: "assets/images/host/rk-000003_host.jpg",
    },
    reviewsSummary: {
      rating: 4.7,
      count: 24,
    },
    reviews: [
      {
        author: { en: "Inna", uk: "Інна", ru: "Инна" },
        rating: 5,
        text: {
          en: "A great house for a family; the courtyard is well kept and quiet.",
          uk: "Чудовий будинок для сім'ї, двір доглянутий і тихий.",
          ru: "Отличный дом для семьи, двор ухоженный и тихий.",
        },
        avatar: "assets/images/reviews/rk-000003_review_01.jpg",
      },
      {
        author: { en: "Dmytro", uk: "Дмитро", ru: "Дмитрий" },
        rating: 4,
        text: {
          en: "Everything matches the photos; we loved the terrace.",
          uk: "Усе відповідає фото, сподобалася тераса.",
          ru: "Все соответствует фото, понравилась терраса.",
        },
        avatar: "assets/images/reviews/rk-000003_review_02.jpg",
      },
    ],
    sidebarNotes: [
      { en: "Children welcome", uk: "Можна з дітьми", ru: "Можно с детьми" },
      { en: "No commission", uk: "Без комісії", ru: "Без комиссии" },
    ],
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
    title: {
      en: "Studio in the historic center",
      uk: "Студія в історичному центрі",
      ru: "Студия в историческом центре",
    },
    city: "lviv",
    address: {
      en: "14 Rynok Square",
      uk: "пл. Ринок, 14",
      ru: "пл. Рынок, 14",
    },
    mapQuery: "Lviv",
    locationNote: {
      en: "Historic center",
      uk: "Історичний центр",
      ru: "Исторический центр",
    },
    type: "studio",
    rooms: 1,
    area: 40,
    floor: 3,
    view: { en: "old town", uk: "старе місто", ru: "старый город" },
    description: {
      en: "A compact studio a step away from Rynok Square. Ideal for anyone who wants to live in the heart of Lviv, with cafés, museums and walking routes nearby.",
      uk: "Компактна студія за крок від площі Ринок. Ідеальна для тих, хто хоче жити в серці Львова: поруч кав'ярні, музеї та пішохідні маршрути.",
      ru: "Компактная студия в шаге от площади Рынок. Идеальна для тех, кто хочет жить в сердце Львова: рядом кофейни, музеи и пешие маршруты.",
    },
    features: [
      {
        en: "Historic building",
        uk: "Історичний будинок",
        ru: "Исторический дом",
      },
      { en: "High ceilings", uk: "Високі стелі", ru: "Высокие потолки" },
      { en: "Washing machine", uk: "Пральна машина", ru: "Стиральная машина" },
      {
        en: "Heated bathroom floor",
        uk: "Тепла підлога у ванній",
        ru: "Теплый пол в ванной",
      },
      { en: "Coffee machine", uk: "Кавомашина", ru: "Кофемашина" },
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000004_01.jpg",
        alt: {
          en: "Bright studio in the center",
          uk: "Світла студія в центрі",
          ru: "Светлая студия в центре",
        },
      },
      {
        src: "assets/images/objects/rk-000004_02.jpg",
        alt: { en: "Kitchenette", uk: "Кухня-ніша", ru: "Кухня-ниша" },
      },
      {
        src: "assets/images/objects/rk-000004_03.jpg",
        alt: {
          en: "Sleeping area with a tall window",
          uk: "Спальна зона з високим вікном",
          ru: "Спальная зона с высоким окном",
        },
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
      name: { en: "Sofiia", uk: "Софія", ru: "София" },
      role: { en: "host", uk: "власниця", ru: "хозяйка" },
      meta: {
        en: "4 years of experience, rating 4.8, 19 reviews",
        uk: "4 роки досвіду, рейтинг 4.8, 19 відгуків",
        ru: "4 года опыта, рейтинг 4.8, 19 отзывов",
      },
      avatar: "assets/images/host/rk-000004_host.jpg",
    },
    reviewsSummary: {
      rating: 4.8,
      count: 19,
    },
    reviews: [
      {
        author: { en: "Maryna", uk: "Марина", ru: "Марина" },
        rating: 5,
        text: {
          en: "Very atmospheric — right in the center, yet quiet.",
          uk: "Дуже атмосферно, у центрі й водночас тихо.",
          ru: "Очень атмосферно, в центре и при этом тихо.",
        },
        avatar: "assets/images/reviews/rk-000004_review_01.jpg",
      },
      {
        author: { en: "Roman", uk: "Роман", ru: "Роман" },
        rating: 4,
        text: {
          en: "A convenient studio with everything you need.",
          uk: "Зручна студія, є все необхідне.",
          ru: "Удобная студия, все необходимое есть.",
        },
        avatar: "assets/images/reviews/rk-000004_review_02.jpg",
      },
    ],
    sidebarNotes: [
      { en: "No commission", uk: "Без комісії", ru: "Без комиссии" },
      {
        en: "Long-term only",
        uk: "Лише довгостроково",
        ru: "Только долгосрочно",
      },
    ],
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
    title: {
      en: "Apartment by High Castle Park",
      uk: "Квартира біля парку Високий Замок",
      ru: "Квартира у парка Высокий Замок",
    },
    city: "lviv",
    address: {
      en: "22 Lysenka St",
      uk: "вул. Лисенка, 22",
      ru: "ул. Лысенко, 22",
    },
    mapQuery: "Lviv",
    locationNote: {
      en: "High Castle",
      uk: "Високий Замок",
      ru: "Высокий Замок",
    },
    type: "apartment",
    rooms: 3,
    floor: 6,
    area: 84,
    view: { en: "park and hills", uk: "парк і пагорби", ru: "парк и холмы" },
    description: {
      en: "A spacious apartment overlooking the park with a convenient layout. Suitable for a family, with a separate bedroom, a workspace and plenty of storage.",
      uk: "Простора квартира з вікнами на парк і зручним плануванням. Підходить для сім'ї: є окрема спальня, робоче місце й багато місця для зберігання.",
      ru: "Просторная квартира с окнами на парк и удобной планировкой. Подходит для семьи: есть отдельная спальня, рабочее место и много места для хранения.",
    },
    features: [
      { en: "Park-facing windows", uk: "Вікна на парк", ru: "Окна на парк" },
      { en: "2 bathrooms", uk: "2 санвузли", ru: "2 санузла" },
      { en: "Quiet courtyard", uk: "Тихий двір", ru: "Тихий двор" },
      {
        en: "Storage system",
        uk: "Система зберігання",
        ru: "Система хранения",
      },
      { en: "Intercom", uk: "Домофон", ru: "Домофон" },
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000005_01.jpg",
        alt: {
          en: "Living room with a lounge area",
          uk: "Вітальня з м'якою зоною",
          ru: "Гостиная с мягкой зоной",
        },
      },
      {
        src: "assets/images/objects/rk-000005_02.jpg",
        alt: {
          en: "Bedroom with a large wardrobe",
          uk: "Спальня з великою шафою",
          ru: "Спальня с большим шкафом",
        },
      },
      {
        src: "assets/images/objects/rk-000005_03.jpg",
        alt: {
          en: "Kitchen with appliances",
          uk: "Кухня з технікою",
          ru: "Кухня с техникой",
        },
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
      name: { en: "Iryna", uk: "Ірина", ru: "Ирина" },
      role: { en: "host", uk: "власниця", ru: "хозяйка" },
      meta: {
        en: "6 years of experience, rating 4.9, 41 reviews",
        uk: "6 років досвіду, рейтинг 4.9, 41 відгук",
        ru: "6 лет опыта, рейтинг 4.9, 41 отзыв",
      },
      avatar: "assets/images/host/rk-000005_host.jpg",
    },
    reviewsSummary: {
      rating: 4.9,
      count: 41,
    },
    reviews: [
      {
        author: { en: "Polina", uk: "Поліна", ru: "Полина" },
        rating: 5,
        text: {
          en: "A very quiet place; the apartment is spacious and clean.",
          uk: "Дуже тихе місце, квартира простора й чиста.",
          ru: "Очень тихое место, квартира просторная и чистая.",
        },
        avatar: "assets/images/reviews/rk-000005_review_01.jpg",
      },
      {
        author: { en: "Viktor", uk: "Віктор", ru: "Виктор" },
        rating: 5,
        text: {
          en: "Great location — the park is literally outside the window.",
          uk: "Чудове розташування, парк буквально за вікном.",
          ru: "Отличное расположение, парк буквально за окном.",
        },
        avatar: "assets/images/reviews/rk-000005_review_02.jpg",
      },
    ],
    sidebarNotes: [
      { en: "Pets allowed", uk: "Можна з тваринами", ru: "Можно с животными" },
      { en: "No commission", uk: "Без комісії", ru: "Без комиссии" },
    ],
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
    title: {
      en: "Family house with a garden",
      uk: "Сімейний будинок із садом",
      ru: "Семейный дом с садом",
    },
    city: "lviv",
    address: {
      en: "112 Zelena St",
      uk: "вул. Зелена, 112",
      ru: "ул. Зеленая, 112",
    },
    mapQuery: "Lviv",
    locationNote: {
      en: "Green district",
      uk: "Зелений район",
      ru: "Зелёный район",
    },
    type: "house",
    rooms: 4,
    floor: 2,
    area: 140,
    view: {
      en: "garden and private houses",
      uk: "сад і приватний сектор",
      ru: "сад и частный сектор",
    },
    description: {
      en: "A family house with its own garden in a green district of Lviv. A quiet place with plenty of light and easy access to the city center.",
      uk: "Сімейний будинок у зеленому районі Львова з власним садом. Тихе місце, багато світла та зручний виїзд до центру міста.",
      ru: "Семейный дом в зеленом районе Львова с собственным садом. Тихое место, много света и удобный выезд в центр города.",
    },
    features: [
      { en: "Private garden", uk: "Власний сад", ru: "Собственный сад" },
      { en: "Storage room", uk: "Комора", ru: "Кладовая" },
      { en: "Solar panels", uk: "Сонячні панелі", ru: "Солнечные панели" },
      {
        en: "Separate laundry room",
        uk: "Окрема пральня",
        ru: "Отдельная прачечная",
      },
      { en: "School nearby", uk: "Поруч школа", ru: "Рядом школа" },
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000006_01.jpg",
        alt: { en: "House and garden", uk: "Будинок і сад", ru: "Дом и сад" },
      },
      {
        src: "assets/images/objects/rk-000006_02.jpg",
        alt: {
          en: "Living room with wood finishes",
          uk: "Вітальня з дерев'яним оздобленням",
          ru: "Гостиная с деревянной отделкой",
        },
      },
      {
        src: "assets/images/objects/rk-000006_03.jpg",
        alt: { en: "Summer terrace", uk: "Літня тераса", ru: "Летняя терраса" },
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
      name: { en: "Pavlo", uk: "Павло", ru: "Павел" },
      role: { en: "host", uk: "власник", ru: "хозяин" },
      meta: {
        en: "9 years of experience, rating 4.6, 33 reviews",
        uk: "9 років досвіду, рейтинг 4.6, 33 відгуки",
        ru: "9 лет опыта, рейтинг 4.6, 33 отзыва",
      },
      avatar: "assets/images/host/rk-000006_host.jpg",
    },
    reviewsSummary: {
      rating: 4.6,
      count: 33,
    },
    reviews: [
      {
        author: { en: "Lesia", uk: "Леся", ru: "Леся" },
        rating: 5,
        text: {
          en: "Very quiet and green; the house is warm and cozy.",
          uk: "Дуже тихо й зелено, будинок теплий і затишний.",
          ru: "Очень тихо и зелено, дом теплый и уютный.",
        },
        avatar: "assets/images/reviews/rk-000006_review_01.jpg",
      },
      {
        author: { en: "Anton", uk: "Антон", ru: "Антон" },
        rating: 4,
        text: {
          en: "A good option for a family, with a school and shops nearby.",
          uk: "Гарний варіант для сім'ї, поруч школа й магазини.",
          ru: "Хороший вариант для семьи, рядом школа и магазины.",
        },
        avatar: "assets/images/reviews/rk-000006_review_02.jpg",
      },
    ],
    sidebarNotes: [
      {
        en: "Utilities not included",
        uk: "Комунальні окремо",
        ru: "Коммунальные отдельно",
      },
      { en: "Children welcome", uk: "Можна з дітьми", ru: "Можно с детьми" },
    ],
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
    title: {
      en: "Premium apartment with a fireplace",
      uk: "Преміум-апартаменти з каміном",
      ru: "Премиум апартаменты с камином",
    },
    city: "lviv",
    address: {
      en: "30 Svobody Ave",
      uk: "просп. Свободи, 30",
      ru: "просп. Свободы, 30",
    },
    mapQuery: "Lviv",
    locationNote: {
      en: "Central quarter",
      uk: "Центральний квартал",
      ru: "Центральный квартал",
    },
    type: "apartment",
    rooms: 4,
    area: 120,
    floor: 7,
    view: { en: "city center", uk: "центр міста", ru: "центр города" },
    description: {
      en: "A premium apartment with a designer renovation and a fireplace. Panoramic windows, carefully planned lighting and a private elevator to the parking garage.",
      uk: "Преміум-апартаменти з дизайнерським ремонтом і каміном. Панорамні вікна, продумане освітлення та приватний ліфт до паркінгу.",
      ru: "Премиум-апартаменты с дизайнерским ремонтом и камином. Панорамные окна, продуманное освещение и приватный лифт в паркинг.",
    },
    features: [
      {
        en: "Designer furniture",
        uk: "Дизайнерські меблі",
        ru: "Дизайнерская мебель",
      },
      { en: "Fireplace", uk: "Камін", ru: "Камин" },
      { en: "Panoramic windows", uk: "Панорамні вікна", ru: "Панорамные окна" },
      {
        en: "Smart home system",
        uk: "Система «розумний дім»",
        ru: "Система умный дом",
      },
      {
        en: "Underground parking",
        uk: "Підземний паркінг",
        ru: "Подземный паркинг",
      },
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000007_01.jpg",
        alt: {
          en: "Premium living room",
          uk: "Вітальня преміум-класу",
          ru: "Гостиная премиум класса",
        },
      },
      {
        src: "assets/images/objects/rk-000007_02.jpg",
        alt: { en: "Dining area", uk: "Обідня зона", ru: "Обеденная зона" },
      },
      {
        src: "assets/images/objects/rk-000007_03.jpg",
        alt: {
          en: "Master bedroom",
          uk: "Майстер-спальня",
          ru: "Мастер-спальня",
        },
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
      name: { en: "Maria", uk: "Марія", ru: "Мария" },
      role: { en: "host", uk: "власниця", ru: "хозяйка" },
      meta: {
        en: "12 years of experience, rating 5.0, 87 reviews",
        uk: "12 років досвіду, рейтинг 5.0, 87 відгуків",
        ru: "12 лет опыта, рейтинг 5.0, 87 отзывов",
      },
      avatar: "assets/images/host/rk-000007_host.jpg",
    },
    reviewsSummary: {
      rating: 5.0,
      count: 87,
    },
    reviews: [
      {
        author: { en: "Vadym", uk: "Вадим", ru: "Вадим" },
        rating: 5,
        text: {
          en: "Top-notch service, and the interior looks like it's out of a magazine.",
          uk: "Сервіс на рівні, інтер'єр як у журналі.",
          ru: "Сервис на уровне, интерьер как в журнале.",
        },
        avatar: "assets/images/reviews/rk-000007_review_01.jpg",
      },
      {
        author: { en: "Yuliia", uk: "Юлія", ru: "Юлия" },
        rating: 5,
        text: {
          en: "Very comfortable; we especially loved the fireplace.",
          uk: "Дуже комфортно, особливо сподобався камін.",
          ru: "Очень комфортно, особенно понравился камин.",
        },
        avatar: "assets/images/reviews/rk-000007_review_02.jpg",
      },
    ],
    sidebarNotes: [
      { en: "Premium service", uk: "Преміум-сервіс", ru: "Премиум сервис" },
      { en: "No commission", uk: "Без комісії", ru: "Без комиссии" },
    ],
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
    title: {
      en: "Modern house with a pool",
      uk: "Сучасний будинок з басейном",
      ru: "Современный дом с бассейном",
    },
    city: "lviv",
    address: {
      en: "6 Levandivska St",
      uk: "вул. Левандівська, 6",
      ru: "ул. Левандовская, 6",
    },
    mapQuery: "Lviv",
    locationNote: { en: "Quiet alley", uk: "Тиха алея", ru: "Тихая аллея" },
    type: "house",
    rooms: 5,
    area: 220,
    floor: 2,
    view: {
      en: "private courtyard and pool",
      uk: "закритий двір і басейн",
      ru: "закрытый двор и бассейн",
    },
    description: {
      en: "A new house with a pool and a spacious living room. The plot is fenced, with a lounge area and parking for two cars.",
      uk: "Новий будинок з басейном і просторою вітальнею. Ділянка закрита, є зона відпочинку та місце для паркування двох авто.",
      ru: "Новый дом с бассейном и просторной гостиной. Участок закрыт, есть зона отдыха и место для парковки двух авто.",
    },
    features: [
      { en: "Swimming pool", uk: "Басейн", ru: "Бассейн" },
      {
        en: "Gated grounds",
        uk: "Закрита територія",
        ru: "Закрытая территория",
      },
      {
        en: "Guest bathroom",
        uk: "Гостьовий санвузол",
        ru: "Гостевой санузел",
      },
      { en: "Walk-in closet", uk: "Гардеробна", ru: "Гардеробная" },
      {
        en: "Security system",
        uk: "Система безпеки",
        ru: "Система безопасности",
      },
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000008_01.jpg",
        alt: {
          en: "Modern facade",
          uk: "Сучасний фасад",
          ru: "Современный фасад",
        },
      },
      {
        src: "assets/images/objects/rk-000008_02.jpg",
        alt: { en: "Pool area", uk: "Зона басейну", ru: "Зона бассейна" },
      },
      {
        src: "assets/images/objects/rk-000008_03.jpg",
        alt: {
          en: "Lounge with a panoramic view",
          uk: "Лаунж з панорамою",
          ru: "Лаунж с панорамой",
        },
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
      name: { en: "Artem", uk: "Артем", ru: "Артем" },
      role: { en: "host", uk: "власник", ru: "хозяин" },
      meta: {
        en: "8 years of experience, rating 4.9, 29 reviews",
        uk: "8 років досвіду, рейтинг 4.9, 29 відгуків",
        ru: "8 лет опыта, рейтинг 4.9, 29 отзывов",
      },
      avatar: "assets/images/host/rk-000008_host.jpg",
    },
    reviewsSummary: {
      rating: 4.9,
      count: 29,
    },
    reviews: [
      {
        author: { en: "Denys", uk: "Денис", ru: "Денис" },
        rating: 5,
        text: {
          en: "The pool and lounge area are impressive, and everything is new.",
          uk: "Басейн і зона відпочинку вражають, усе нове.",
          ru: "Бассейн и зона отдыха впечатляют, все новое.",
        },
        avatar: "assets/images/reviews/rk-000008_review_01.jpg",
      },
      {
        author: { en: "Olha", uk: "Ольга", ru: "Ольга" },
        rating: 4,
        text: {
          en: "Very comfortable; the grounds are gated and quiet.",
          uk: "Дуже комфортно, територія закрита й тиха.",
          ru: "Очень комфортно, территория закрытая и тихая.",
        },
        avatar: "assets/images/reviews/rk-000008_review_02.jpg",
      },
    ],
    sidebarNotes: [
      {
        en: "Long-term only",
        uk: "Лише довгостроково",
        ru: "Только долгосрочно",
      },
      {
        en: "Pool maintenance included",
        uk: "Обслуговування басейну включено",
        ru: "Обслуживание бассейна включено",
      },
    ],
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
    title: {
      en: "Apartment with a sea view",
      uk: "Апартаменти з видом на море",
      ru: "Апартаменты с видом на море",
    },
    city: "odesa",
    address: {
      en: "24 Henuezka St",
      uk: "вул. Генуезька, 24",
      ru: "ул. Генуэзская, 24",
    },
    mapQuery: "Odesa",
    locationNote: { en: "Arcadia", uk: "Аркадія", ru: "Аркадия" },
    type: "apartment",
    rooms: 3,
    area: 98,
    floor: 12,
    view: {
      en: "sea and embankment",
      uk: "море й набережна",
      ru: "море и набережная",
    },
    description: {
      en: "An apartment in Arcadia with a large terrace and a sea view. It has three separate zones: a living room, a bedroom and a workspace.",
      uk: "Апартаменти в Аркадії з великою терасою та видом на море. У квартирі три окремі зони: вітальня, спальня й робоче місце.",
      ru: "Апартаменты в Аркадии с большой террасой и видом на море. В квартире три отдельные зоны: гостиная, спальня и рабочее место.",
    },
    features: [
      { en: "Sea panorama", uk: "Панорама моря", ru: "Панорама моря" },
      { en: "Terrace", uk: "Тераса", ru: "Терраса" },
      { en: "Air conditioning", uk: "Кондиціонери", ru: "Кондиционеры" },
      {
        en: "24/7 security",
        uk: "Цілодобова охорона",
        ru: "Круглосуточная охрана",
      },
      { en: "Beach nearby", uk: "Поруч пляж", ru: "Рядом пляж" },
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000009_01.jpg",
        alt: {
          en: "Living room with a sea view",
          uk: "Вітальня з видом на море",
          ru: "Гостиная с видом на море",
        },
      },
      {
        src: "assets/images/objects/rk-000009_02.jpg",
        alt: {
          en: "Breakfast terrace",
          uk: "Тераса для сніданків",
          ru: "Терраса для завтраков",
        },
      },
      {
        src: "assets/images/objects/rk-000009_03.jpg",
        alt: {
          en: "Bedroom with a view",
          uk: "Спальня з видом",
          ru: "Спальня с видом",
        },
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
      name: { en: "Nataliia", uk: "Наталія", ru: "Наталья" },
      role: { en: "host", uk: "власниця", ru: "хозяйка" },
      meta: {
        en: "7 years of experience, rating 4.8, 56 reviews",
        uk: "7 років досвіду, рейтинг 4.8, 56 відгуків",
        ru: "7 лет опыта, рейтинг 4.8, 56 отзывов",
      },
      avatar: "assets/images/host/rk-000009_host.jpg",
    },
    reviewsSummary: {
      rating: 4.8,
      count: 56,
    },
    reviews: [
      {
        author: { en: "Serhii", uk: "Сергій", ru: "Сергей" },
        rating: 5,
        text: {
          en: "Great sea view, and the beach is 5 minutes away.",
          uk: "Вид на море чудовий, до пляжу 5 хвилин.",
          ru: "Вид на море отличный, до пляжа 5 минут.",
        },
        avatar: "assets/images/reviews/rk-000009_review_01.jpg",
      },
      {
        author: { en: "Olena", uk: "Олена", ru: "Елена" },
        rating: 4,
        text: {
          en: "The terrace is great, and everything is just like in the photos.",
          uk: "Тераса супер, усе як на фото.",
          ru: "Терраса супер, все как на фото.",
        },
        avatar: "assets/images/reviews/rk-000009_review_02.jpg",
      },
    ],
    sidebarNotes: [
      { en: "Premium service", uk: "Преміум-сервіс", ru: "Премиум сервис" },
      { en: "Parking included", uk: "Паркінг включено", ru: "Паркинг включен" },
    ],
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
    title: {
      en: "Seaside house with a terrace",
      uk: "Будинок біля моря з терасою",
      ru: "Дом у моря с террасой",
    },
    city: "odesa",
    address: {
      en: "91 Fontanska Rd",
      uk: "Фонтанська дорога, 91",
      ru: "Фонтанская дорога, 91",
    },
    mapQuery: "Odesa",
    locationNote: {
      en: "Prymorskyi district",
      uk: "Приморський район",
      ru: "Приморский район",
    },
    type: "house",
    rooms: 4,
    area: 180,
    floor: 2,
    view: {
      en: "sea and private houses",
      uk: "море й приватний сектор",
      ru: "море и частный сектор",
    },
    description: {
      en: "A seaside house in Fontan with a spacious terrace and a separate kitchen. Suitable for a family or a group, with its own courtyard and garage.",
      uk: "Будинок біля моря на Фонтані з просторою терасою та окремою кухнею. Підходить для сім'ї або компанії, є власний двір і гараж.",
      ru: "Дом у моря на Фонтане с просторной террасой и отдельной кухней. Подходит для семьи или компании, есть собственный двор и гараж.",
    },
    features: [
      { en: "Private yard", uk: "Власний двір", ru: "Собственный двор" },
      { en: "Summer kitchen", uk: "Літня кухня", ru: "Летняя кухня" },
      { en: "Underfloor heating", uk: "Теплі підлоги", ru: "Теплые полы" },
      { en: "Garage", uk: "Гараж", ru: "Гараж" },
      {
        en: "10 minutes to the beach",
        uk: "10 хвилин до пляжу",
        ru: "10 минут до пляжа",
      },
    ],
    heroImages: [
      {
        src: "assets/images/objects/rk-000010_01.jpg",
        alt: {
          en: "Seaside house facade",
          uk: "Фасад будинку біля моря",
          ru: "Фасад дома у моря",
        },
      },
      {
        src: "assets/images/objects/rk-000010_02.jpg",
        alt: { en: "Bright kitchen", uk: "Світла кухня", ru: "Светлая кухня" },
      },
      {
        src: "assets/images/objects/rk-000010_03.jpg",
        alt: {
          en: "Terrace with a lounge area",
          uk: "Тераса із зоною відпочинку",
          ru: "Терраса с зоной отдыха",
        },
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
      name: { en: "Ihor", uk: "Ігор", ru: "Игорь" },
      role: { en: "host", uk: "власник", ru: "хозяин" },
      meta: {
        en: "6 years of experience, rating 4.7, 22 reviews",
        uk: "6 років досвіду, рейтинг 4.7, 22 відгуки",
        ru: "6 лет опыта, рейтинг 4.7, 22 отзыва",
      },
      avatar: "assets/images/host/rk-000010_host.jpg",
    },
    reviewsSummary: {
      rating: 4.7,
      count: 22,
    },
    reviews: [
      {
        author: { en: "Tetiana", uk: "Тетяна", ru: "Татьяна" },
        rating: 5,
        text: {
          en: "Excellent terrace, a private courtyard, and the sea is close by.",
          uk: "Тераса чудова, двір закритий, поруч море.",
          ru: "Терраса отличная, двор закрытый, рядом море.",
        },
        avatar: "assets/images/reviews/rk-000010_review_01.jpg",
      },
      {
        author: { en: "Andrii", uk: "Андрій", ru: "Андрей" },
        rating: 4,
        text: {
          en: "The house is spacious and suits a family.",
          uk: "Будинок просторий, підходить для сім'ї.",
          ru: "Дом просторный, подходит для семьи.",
        },
        avatar: "assets/images/reviews/rk-000010_review_02.jpg",
      },
    ],
    sidebarNotes: [
      { en: "Pets allowed", uk: "Можна з тваринами", ru: "Можно с животными" },
      { en: "No commission", uk: "Без комісії", ru: "Без комиссии" },
    ],
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
