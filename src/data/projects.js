export const projects = [
  {
    id: 'naqusta',
    title: 'NaqUsta',
    type: {
      kk: 'Flutter service marketplace',
      ru: 'Flutter сервисный маркетплейс',
      en: 'Flutter service marketplace',
    },
    stack: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Firebase Storage'],
    links: {
      demo: '',
      github: 'https://github.com/TurginbayBekzat/NaqUsta',
      caseStudy: '/files/NaqUsta_README.pdf',
    },
    description: {
      kk: 'NaqUsta құрылыс, жөндеу және тұрмыстық сервиске арналған mobile-first маркетплейс. Жоба клиенттің құрылымдалған тапсырыс жариялау ағынын, шебердің coverage-aware ұсыныс беру логикасын және тапсырысты аяқтауға дейінгі толық lifecycle-ды бір жүйеге жинайды.',
      ru: 'NaqUsta это mobile-first маркетплейс для строительных, ремонтных и бытовых услуг. Проект объединяет структурированное создание заказов, coverage-aware механику откликов от мастеров и полный lifecycle заказа вплоть до завершения и отзыва.',
      en: 'NaqUsta is a mobile-first marketplace for construction, repair, and household services. It combines structured order creation, coverage-aware worker offers, and a full transactional lifecycle from request publishing to completion and review.',
    },
    highlights: {
      kk: [
        'Phone OTP auth және role-aware onboarding',
        'Leaf-only категория және kk/ru/en search index',
        'KATO негізіндегі location coverage filtering',
        'Offer -> accept -> IN_PROGRESS -> COMPLETED lifecycle',
        'Firestore rules және emulator-backed integration tests',
      ],
      ru: [
        'Phone OTP auth и role-aware onboarding',
        'Leaf-only категории и kk/ru/en search index',
        'KATO-ориентированная location coverage filtering',
        'Offer -> accept -> IN_PROGRESS -> COMPLETED lifecycle',
        'Firestore rules и emulator-backed integration tests',
      ],
      en: [
        'Phone OTP auth and role-aware onboarding',
        'Leaf-only categories with kk/ru/en search index',
        'KATO-based location coverage filtering',
        'Offer -> accept -> IN_PROGRESS -> COMPLETED lifecycle',
        'Firestore rules and emulator-backed integration tests',
      ],
    },
    snapshot: [
      {
        label: {
          kk: 'Даму уақыты',
          ru: 'Срок разработки',
          en: 'Development Duration',
        },
        value: '10 months (active)',
      },
      {
        label: {
          kk: 'Dart файлдары',
          ru: 'Dart-файлы',
          en: 'Dart Source Files',
        },
        value: '168',
      },
      {
        label: {
          kk: 'Жалпы файл саны',
          ru: 'Всего файлов',
          en: 'Total Repository Files',
        },
        value: '300+',
      },
      {
        label: {
          kk: 'Негізгі платформа',
          ru: 'Основная платформа',
          en: 'Primary Platform',
        },
        value: 'Flutter (mobile-first)',
      },
      {
        label: {
          kk: 'Бэкенд сервистері',
          ru: 'Backend-сервисы',
          en: 'Backend Services',
        },
        value: 'Firebase (Auth, Firestore, Storage)',
      },
      {
        label: {
          kk: 'Лицензия',
          ru: 'Лицензия',
          en: 'License',
        },
        value: 'MIT',
      },
    ],
    audience: {
      kk: [
        'Клиенттер: жұмысты тез орындауға сенімді маман іздейтін тапсырыс берушілер.',
        'Шеберлер: біліктілігіне сай нақты lead алып, тапсырысты мөлдір flow арқылы жүргізгісі келетін мамандар.',
      ],
      ru: [
        'Клиенты: пользователи, которым нужен надежный специалист для реальной задачи в короткий срок.',
        'Мастера: специалисты, которым важны качественные лиды и прозрачный order flow.',
      ],
      en: [
        'Clients: users who need a reliable specialist for a real task as quickly as possible.',
        'Workers: specialists who want qualified leads and a transparent order flow.',
      ],
    },
    problem: {
      kk: 'Нарықта шебер іздеу көбіне жүйесіз: профильдер шашыраңқы, категория мен локация нақты емес, тапсырыс күйі түсініксіз, ал клиент пен шебер арасындағы сенім нақты lifecycle-пен бекітілмейді.',
      ru: 'Поиск мастера в локальном сервисном рынке обычно фрагментирован: профили неполные, категории и локации указаны слабо, статус заказа неочевиден, а доверие между сторонами не поддерживается явным lifecycle.',
      en: 'Finding a trustworthy worker in local service markets is usually fragmented: profiles are inconsistent, categories and location data are weak, order state is ambiguous, and trust is not reinforced by an explicit lifecycle.',
    },
    solution: {
      kk: 'NaqUsta бұл мәселені role-based onboarding, leaf-level category validation, KATO location model, structured order creation, offer submission, chat context және completion-review циклі арқылы шешеді. Нәтижесінде платформа user speed пен data integrity арасындағы тепе-теңдікті ұстайды.',
      ru: 'NaqUsta решает эту задачу через role-based onboarding, leaf-level category validation, KATO location model, structured order creation, offer submission, chat context и completion-review цикл. В результате продукт держит баланс между скоростью для пользователя и целостностью данных.',
      en: 'NaqUsta solves this with role-based onboarding, leaf-level category validation, a KATO location model, structured order creation, offer submission, chat context, and a completion-review loop. The result is a product that balances user speed with strong data integrity.',
    },
    featureGroups: {
      product: {
        kk: [
          'Phone OTP арқылы кіру және AuthGate арқылы профиль/рөлді бағыттау.',
          'Клиент пен шеберге бөлек onboarding және навигация ағындары.',
          'kk/ru/en көптілді категория жүйесі және leaf-only picker.',
          'Құрылымдалған тапсырыс жариялау: title, category, budget, location, photos.',
          'Шебердің coverage mode бойынша ашық тапсырыстарды көруі және offer жіберуі.',
          'Екіжақты completion confirmation және review submission.',
        ],
        ru: [
          'Phone OTP вход и routing по профилю/роли через AuthGate.',
          'Раздельные onboarding и navigation flows для клиента и мастера.',
          'Мультиязычная система категорий kk/ru/en и leaf-only picker.',
          'Структурированное создание заказа: title, category, budget, location, photos.',
          'Просмотр открытых заказов по coverage mode и отправка offer от мастера.',
          'Двустороннее completion confirmation и review submission.',
        ],
        en: [
          'Phone OTP sign-in and role/profile routing through AuthGate.',
          'Separate onboarding and navigation flows for clients and workers.',
          'Multilingual kk/ru/en category system with a leaf-only picker.',
          'Structured order creation with title, category, budget, location, and photos.',
          'Coverage-aware open order feed and worker offer submission.',
          'Dual completion confirmation and review submission after delivery.',
        ],
      },
      engineering: {
        kk: [
          'Feature-driven architecture және service/repository separation.',
          'Firestore құжаттарына тікелей сәйкес келетін typed domain models.',
          'Order acceptance және offer update сияқты әрекеттер үшін transaction-based writes.',
          'Category және location деректеріне арналған кэш, индекс және нормализация.',
          'Offline overlay, loading overlay және error feedback арқылы тұрақты UX.',
          'Firebase Emulator Suite-пен critical flow integration tests.',
        ],
        ru: [
          'Feature-driven architecture и разделение service/repository слоев.',
          'Typed domain models, напрямую отражающие Firestore documents.',
          'Transaction-based writes для order acceptance и offer update.',
          'Кэш, индексы и нормализация для category и location datasets.',
          'Стабильный UX через offline overlay, loading overlay и error feedback.',
          'Critical flow integration tests на Firebase Emulator Suite.',
        ],
        en: [
          'Feature-driven architecture with clear service/repository separation.',
          'Typed domain models mapped directly to Firestore documents.',
          'Transaction-based writes for offer updates and order acceptance.',
          'Cached and indexed category/location datasets with normalized payloads.',
          'Reliable UX through offline overlays, loading overlays, and clear error feedback.',
          'Critical flow integration tests backed by Firebase Emulator Suite.',
        ],
      },
    },
    architectureNote: {
      kk: 'NaqUsta архитектурасы presentation, application, data, rules және test қабаттарын бөліп ұстайды. Бұл flow қауіпсіздігін, state transition дұрыстығын және кейін scale жасау мүмкіндігін арттырады.',
      ru: 'Архитектура NaqUsta разделяет presentation, application, data, rules и test слои. Это повышает безопасность flow, корректность state transitions и готовность к дальнейшему масштабированию.',
      en: 'NaqUsta separates presentation, application, data, rules, and test layers. That structure improves transactional safety, state-transition correctness, and long-term scalability.',
    },
    media: {
      cover: '/media/projects/naqusta/cover.webp',
      thumb: '/media/projects/naqusta/thumb.webp',
      poster: '/media/projects/naqusta/poster.webp',
      screenshots: [
        '/media/projects/naqusta/screenshots/01-home.webp',
        '/media/projects/naqusta/screenshots/02-login.webp',
        '/media/projects/naqusta/screenshots/03-role-selection.webp',
        '/media/projects/naqusta/screenshots/04-worker-profile.webp',
        '/media/projects/naqusta/screenshots/05-client-flow.webp',
        '/media/projects/naqusta/screenshots/06-chat.webp',
        '/media/projects/naqusta/screenshots/07-order-details.webp',
      ],
      videos: [
        {
          src: '/media/projects/naqusta/videos/demo.mp4',
          poster: '/media/projects/naqusta/poster.webp',
          title: {
            kk: 'Толық demo preview',
            ru: 'Полный demo preview',
            en: 'Full demo preview',
          },
        },
        {
          src: '/media/projects/naqusta/videos/short-preview.mp4',
          poster: '/media/projects/naqusta/thumb.webp',
          title: {
            kk: 'Қысқа preview',
            ru: 'Короткий preview',
            en: 'Short preview',
          },
        },
      ],
    },
  },
  {
    id: 'qazsound',
    title: 'QazSound',
    type: {
      kk: 'Music platform and content experience',
      ru: 'Музыкальная платформа и контент-опыт',
      en: 'Music platform and content experience',
    },
    stack: ['Django', 'PostgreSQL', 'JavaScript', 'Tailwind CSS'],
    links: {
      demo: '',
      github: '',
      caseStudy: '/files/qazsound-case-study.pdf',
    },
    description: {
      kk: 'QazSound музыка контентін, player interface-ті және админ басқаруды бір визуалды жүйеге жинайтын web жоба.',
      ru: 'QazSound собирает музыкальный контент, player interface и admin-часть в одну цельную web-систему.',
      en: 'QazSound brings together music content, player interface, and admin management into one cohesive web platform.',
    },
    highlights: {
      kk: ['Player flow', 'Track pages and content UI', 'Admin-side management'],
      ru: ['Player flow', 'Track pages и content UI', 'Admin-side management'],
      en: ['Player flow', 'Track pages and content UI', 'Admin-side management'],
    },
    media: {
      cover: '/media/projects/qazsound/cover.webp',
      thumb: '/media/projects/qazsound/thumb.webp',
      poster: '/media/projects/qazsound/poster.webp',
      screenshots: [
        '/media/projects/qazsound/screenshots/01-home.webp',
        '/media/projects/qazsound/screenshots/02-player.webp',
        '/media/projects/qazsound/screenshots/03-track-page.webp',
        '/media/projects/qazsound/screenshots/04-admin.webp',
        '/media/projects/qazsound/screenshots/05-mobile-view.webp',
      ],
      videos: [
        {
          src: '/media/projects/qazsound/videos/demo.mp4',
          poster: '/media/projects/qazsound/poster.webp',
          title: {
            kk: 'Толық demo preview',
            ru: 'Полный demo preview',
            en: 'Full demo preview',
          },
        },
        {
          src: '/media/projects/qazsound/videos/short-preview.mp4',
          poster: '/media/projects/qazsound/thumb.webp',
          title: {
            kk: 'Қысқа preview',
            ru: 'Короткий preview',
            en: 'Short preview',
          },
        },
      ],
    },
  },
];
