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
      github: 'https://github.com/turginbay-dev/NaqUsta',
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
      kk: 'Django-based music platform',
      ru: 'Django-платформа для музыки',
      en: 'Django-based music platform',
    },
    stack: ['Django', 'Python', 'JavaScript', 'PostgreSQL'],
    links: {
      demo: 'https://qazsound.onrender.com',
      github: 'https://github.com/turginbay-dev/QazSound',
      caseStudy: '/files/QazSound_README.pdf',
    },
    description: {
      kk: 'QazSound - трек жариялау, YouTube негізіндегі аудио ағынды қауіпсіз пайдалану, favorites жүйесі және global player тәжірибесін бір өнімге жинайтын modern Django music platform. Жоба таза CRUD емес, контент жариялау, тыңдау, интеракция, әкімшілік аналитика және deploy-ready инфрақұрылымды бірге көрсететін толық web жүйе.',
      ru: 'QazSound это modern Django music platform, которая объединяет публикацию треков, безопасный YouTube-based streaming, favorites-систему и единый global player experience. Это не просто CRUD-проект, а цельная web-система с контент-паблишингом, прослушиванием, интеракциями, admin-аналитикой и deploy-ready инфраструктурой.',
      en: 'QazSound is a modern Django music platform that combines track publishing, safe YouTube-based audio streaming, favorites, and a persistent global player into one product. It goes beyond CRUD pages and demonstrates a cohesive web system with content publishing, listening flow, interaction logic, admin analytics, and deploy-ready infrastructure.',
    },
    highlights: {
      kk: [
        'Hybrid content model: local upload + YouTube streaming',
        'Global player with history және localStorage persistence',
        'AJAX likes/favorites synced across cards, detail, and player',
        'Jazzmin-based admin dashboard with analytics cards and charts',
        'Service / selector Django architecture with deploy-ready setup',
      ],
      ru: [
        'Hybrid content model: local upload + YouTube streaming',
        'Global player с history и localStorage persistence',
        'AJAX likes/favorites синхронизированы между cards, detail и player',
        'Jazzmin-based admin dashboard с analytics cards и charts',
        'Service / selector Django architecture и deploy-ready setup',
      ],
      en: [
        'Hybrid content model: local upload + YouTube streaming',
        'Global player with history and localStorage persistence',
        'AJAX likes/favorites synced across cards, detail, and player',
        'Jazzmin-based admin dashboard with analytics cards and charts',
        'Service / selector Django architecture with deploy-ready setup',
      ],
    },
    snapshot: [
      {
        label: {
          kk: 'Жасалу уақыты',
          ru: 'Срок разработки',
          en: 'Build Duration',
        },
        value: '~1 month',
      },
      {
        label: {
          kk: 'Негізгі платформа',
          ru: 'Основная платформа',
          en: 'Primary Platform',
        },
        value: 'Django web',
      },
      {
        label: {
          kk: 'Контент моделі',
          ru: 'Контент-модель',
          en: 'Content Model',
        },
        value: 'UPLOAD + YOUTUBE',
      },
      {
        label: {
          kk: 'Ойнату тәжірибесі',
          ru: 'Playback UX',
          en: 'Playback UX',
        },
        value: 'Global player + history',
      },
      {
        label: {
          kk: 'ДҚ және сақтау',
          ru: 'База и хранение',
          en: 'Data Layer',
        },
        value: 'SQLite dev / PostgreSQL-ready',
      },
      {
        label: {
          kk: 'Deploy негізі',
          ru: 'Deploy-основа',
          en: 'Deployment',
        },
        value: 'WhiteNoise + Gunicorn',
      },
    ],
    audience: {
      kk: [
        'Музыка авторлары: тректерді метадерекпен бірге жариялап, контентін ыңғайлы басқарғысы келетіндер.',
        'Тыңдармандар: modern card-based интерфейсте іздеу, тыңдау және favorites жинағысы келетіндер.',
        'Студенттер мен junior developer-лер: practical Django architecture, services/selectors және deploy-ready flow үйренгісі келетіндер.',
      ],
      ru: [
        'Музыкальные авторы: те, кому нужен простой publishing flow для треков и метаданных.',
        'Слушатели: пользователи, которым нужен modern card-based browsing, favorites и единый player experience.',
        'Студенты и junior developers: те, кто хочет изучать practical Django architecture, services/selectors и deploy-ready flow.',
      ],
      en: [
        'Music creators who want a simple publishing flow for tracks, metadata, and cover assets.',
        'Listeners who want modern card-based discovery, favorites, and a consistent player experience.',
        'Students and junior developers who want to study practical Django architecture, services/selectors, and deploy-ready workflows.',
      ],
    },
    problem: {
      kk: 'QazSound тек трек тізімін көрсету емес, толық music platform мәселесін шешеді: контент жариялау, тыңдарман discovery flow, favorites/likes интеракциясы, әкімшілік бақылау және production-ға жақын deployment configuration бір жүйеде болуы керек. Сонымен бірге upload арқылы жүктелген контент пен YouTube-тен алынатын аудио ағын бір listening workflow-да жұмыс істеуі тиіс.',
      ru: 'QazSound решает не задачу простого списка треков, а проблему полноценной music platform: публикация контента, discovery flow для слушателей, favorites/likes, admin oversight и production-like deployment configuration должны работать как единая система. При этом загруженные треки и YouTube-based аудио должны жить в одном listening workflow.',
      en: 'QazSound addresses the challenge of a complete music platform, not just a track list: content publishing, listener discovery, favorites/likes, admin oversight, and production-like deployment setup need to work as one coherent system. It also unifies uploaded tracks and YouTube-based audio in a single listening workflow.',
    },
    solution: {
      kk: 'QazSound бұл міндетті hybrid content model арқылы шешеді: автор local audio upload жасай алады немесе YouTube сілтемесінен metadata preview алып, stream URL-ді тек сұраныс кезінде resolve етеді. Жоба global player, AJAX likes, профиль/тіл баптауы, admin analytics, JSON API және modular Django architecture арқылы контент тұтыну мен басқаруды бір тұтас flow-ға біріктіреді.',
      ru: 'QazSound решает задачу через hybrid content model: автор может загрузить local audio или использовать YouTube link с metadata preview, а stream URL резолвится on demand. Проект объединяет global player, AJAX likes, profile/language settings, admin analytics, JSON API и modular Django architecture в один цельный flow потребления и управления контентом.',
      en: 'QazSound solves this with a hybrid content model: creators can upload local audio or use a YouTube link with metadata preview, while the stream URL is resolved on demand. The product combines a global player, AJAX likes, profile/language settings, admin analytics, JSON APIs, and modular Django architecture into one consistent content flow.',
    },
    featureGroups: {
      product: {
        kk: [
          'Track publishing workflow: UPLOAD немесе YOUTUBE source түрін таңдау.',
          'YouTube metadata preview: title, author, duration, thumbnail-ды автоматты толтыру.',
          'Favorites жүйесі және AJAX like/unlike behavior.',
          'Global player: play/pause, previous/next history, persistent state.',
          'Featured, Fresh uploads, Trending блоктары, search және genre filtering.',
          'Пайдаланушы профилі, аватар, тіл таңдауы және “my tracks” бөлімі.',
        ],
        ru: [
          'Track publishing workflow с выбором source type: UPLOAD или YOUTUBE.',
          'YouTube metadata preview с автозаполнением title, author, duration и thumbnail.',
          'Favorites-система и AJAX like/unlike behavior.',
          'Global player: play/pause, previous/next history и persistent state.',
          'Featured, Fresh uploads, Trending блоки, search и genre filtering.',
          'Пользовательский профиль, avatar, language settings и раздел “my tracks”.',
        ],
        en: [
          'Track publishing workflow with UPLOAD or YOUTUBE source selection.',
          'YouTube metadata preview with automatic title, author, duration, and thumbnail fill.',
          'Favorites system with AJAX like/unlike behavior.',
          'Global player with play/pause, previous/next history, and persistent state.',
          'Featured, Fresh uploads, Trending blocks, plus search and genre filtering.',
          'User profile, avatar, language preference, and “my tracks” management.',
        ],
      },
      engineering: {
        kk: [
          'Modular Django structure: config, tracks, users, interactions.',
          'Selectors reads үшін, services write/business logic үшін, forms validation үшін бөлінген.',
          'Domain-safe YouTube URL normalization, whitelist validation және yt-dlp on-demand stream resolve.',
          'JSON API endpoints: track list, track detail, YouTube metadata, stream resolve.',
          'WhiteNoise, Procfile, build.sh және DATABASE_URL арқылы deploy-ready foundation.',
          'CSRF, @login_required, ownership checks, media constraints және DB integrity guards.',
        ],
        ru: [
          'Modular Django structure: config, tracks, users, interactions.',
          'Selectors отделены для reads, services для write/business logic, forms для validation.',
          'Domain-safe YouTube URL normalization, whitelist validation и yt-dlp on-demand stream resolve.',
          'JSON API endpoints: track list, track detail, YouTube metadata, stream resolve.',
          'WhiteNoise, Procfile, build.sh и DATABASE_URL формируют deploy-ready foundation.',
          'CSRF, @login_required, ownership checks, media constraints и DB integrity guards.',
        ],
        en: [
          'Modular Django structure with config, tracks, users, and interactions apps.',
          'Selectors for reads, services for write/business logic, and forms for validation.',
          'Domain-safe YouTube URL normalization, whitelist validation, and yt-dlp on-demand stream resolution.',
          'JSON API endpoints for track list, track detail, YouTube metadata preview, and stream resolution.',
          'WhiteNoise, Procfile, build.sh, and DATABASE_URL support for a deploy-ready foundation.',
          'CSRF, @login_required, ownership checks, media constraints, and database integrity guards.',
        ],
      },
    },
    architectureNote: {
      kk: 'QazSound архитектурасы view-лерді жұқа ұстап, негізгі логиканы selectors, services және forms қабаттарына бөледі. Frontend жағында likes.js, player.js, forms.js, navigation.js және main.js арқылы page-shell, player state, metadata fetch және AJAX интеракциялар басқарылып, серверлік fallback-пен бірге жұмыс істейді.',
      ru: 'Архитектура QazSound держит views тонкими и выносит основную логику в selectors, services и forms. На frontend стороне likes.js, player.js, forms.js, navigation.js и main.js управляют page-shell, player state, metadata fetch и AJAX interaction logic вместе с безопасными server-side fallbacks.',
      en: 'QazSound keeps views lean by moving core logic into selectors, services, and forms. On the frontend, likes.js, player.js, forms.js, navigation.js, and main.js handle page-shell updates, player state, metadata fetch, and AJAX interactions while preserving safe server-side fallbacks.',
    },
    media: {
      cover: '/media/projects/qazsound/browser/01-browser-home.png',
      thumb: '/media/projects/qazsound/mobile/01-phone-home.png',
      poster: '/media/projects/qazsound/browser/03-browser-library.png',
      screenshots: [
        {
          src: '/media/projects/qazsound/browser/01-browser-home.png',
          title: {
            kk: 'Browser Home',
            ru: 'Browser Home',
            en: 'Browser Home',
          },
          group: {
            kk: 'MacBook / Browser',
            ru: 'MacBook / Browser',
            en: 'MacBook / Browser',
          },
          layout: 'desktop',
          fit: 'contain',
        },
        {
          src: '/media/projects/qazsound/browser/02-browser-publish.png',
          title: {
            kk: 'Browser Publish',
            ru: 'Browser Publish',
            en: 'Browser Publish',
          },
          group: {
            kk: 'MacBook / Browser',
            ru: 'MacBook / Browser',
            en: 'MacBook / Browser',
          },
          layout: 'desktop',
          fit: 'contain',
        },
        {
          src: '/media/projects/qazsound/browser/03-browser-library.png',
          title: {
            kk: 'Browser Library',
            ru: 'Browser Library',
            en: 'Browser Library',
          },
          group: {
            kk: 'MacBook / Browser',
            ru: 'MacBook / Browser',
            en: 'MacBook / Browser',
          },
          layout: 'desktop',
          fit: 'contain',
        },
        {
          src: '/media/projects/qazsound/browser/04-browser-profile.png',
          title: {
            kk: 'Browser Profile',
            ru: 'Browser Profile',
            en: 'Browser Profile',
          },
          group: {
            kk: 'MacBook / Browser',
            ru: 'MacBook / Browser',
            en: 'MacBook / Browser',
          },
          layout: 'desktop',
          fit: 'contain',
        },
        {
          src: '/media/projects/qazsound/browser/05-browser-admin-artists.png',
          title: {
            kk: 'Admin Artists',
            ru: 'Admin Artists',
            en: 'Admin Artists',
          },
          group: {
            kk: 'MacBook / Browser',
            ru: 'MacBook / Browser',
            en: 'MacBook / Browser',
          },
          layout: 'desktop',
          fit: 'contain',
        },
        {
          src: '/media/projects/qazsound/browser/06-browser-admin-tracks.png',
          title: {
            kk: 'Admin Tracks',
            ru: 'Admin Tracks',
            en: 'Admin Tracks',
          },
          group: {
            kk: 'MacBook / Browser',
            ru: 'MacBook / Browser',
            en: 'MacBook / Browser',
          },
          layout: 'desktop',
          fit: 'contain',
        },
        {
          src: '/media/projects/qazsound/browser/07-browser-admin-publish.png',
          title: {
            kk: 'Admin Publish',
            ru: 'Admin Publish',
            en: 'Admin Publish',
          },
          group: {
            kk: 'MacBook / Browser',
            ru: 'MacBook / Browser',
            en: 'MacBook / Browser',
          },
          layout: 'desktop',
          fit: 'contain',
        },
        {
          src: '/media/projects/qazsound/mobile/01-phone-home.png',
          title: {
            kk: 'Phone Home',
            ru: 'Phone Home',
            en: 'Phone Home',
          },
          group: {
            kk: 'Phone Browser',
            ru: 'Phone Browser',
            en: 'Phone Browser',
          },
          layout: 'mobile',
          fit: 'contain',
        },
        {
          src: '/media/projects/qazsound/mobile/02-phone-library.png',
          title: {
            kk: 'Phone Library',
            ru: 'Phone Library',
            en: 'Phone Library',
          },
          group: {
            kk: 'Phone Browser',
            ru: 'Phone Browser',
            en: 'Phone Browser',
          },
          layout: 'mobile',
          fit: 'contain',
        },
        {
          src: '/media/projects/qazsound/mobile/03-phone-track.png',
          title: {
            kk: 'Phone Track',
            ru: 'Phone Track',
            en: 'Phone Track',
          },
          group: {
            kk: 'Phone Browser',
            ru: 'Phone Browser',
            en: 'Phone Browser',
          },
          layout: 'mobile',
          fit: 'contain',
        },
        {
          src: '/media/projects/qazsound/mobile/04-phone-profile.png',
          title: {
            kk: 'Phone Profile',
            ru: 'Phone Profile',
            en: 'Phone Profile',
          },
          group: {
            kk: 'Phone Browser',
            ru: 'Phone Browser',
            en: 'Phone Browser',
          },
          layout: 'mobile',
          fit: 'contain',
        },
        {
          src: '/media/projects/qazsound/mobile/05-phone-featured.png',
          title: {
            kk: 'Phone Featured',
            ru: 'Phone Featured',
            en: 'Phone Featured',
          },
          group: {
            kk: 'Phone Browser',
            ru: 'Phone Browser',
            en: 'Phone Browser',
          },
          layout: 'mobile',
          fit: 'contain',
        },
      ],
      videos: [
        {
          src: '/media/projects/qazsound/videos/demo.mp4',
          poster: '/media/projects/qazsound/browser/03-browser-library.png',
          title: {
            kk: 'Толық demo preview',
            ru: 'Полный demo preview',
            en: 'Full demo preview',
          },
        },
        {
          src: '/media/projects/qazsound/videos/short-preview.mp4',
          poster: '/media/projects/qazsound/mobile/01-phone-home.png',
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
