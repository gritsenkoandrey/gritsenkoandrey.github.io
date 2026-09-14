(function () {
  var STRINGS = {
    en: {
      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.experience': 'Experience',
      'nav.games': 'Games',
      'nav.projects': 'Projects',
      'nav.play': 'Play',
      'nav.education': 'Education',
      'nav.contact': 'Contact',

      'hero.eyebrow': 'Senior Unity Developer',
      'hero.title': "Hi, I'm Andrey Gritsenko",
      'hero.lead': '5+ years of commercial mobile game development and 10+ years building high‑load IT systems. I design gameplay mechanics, architecture, analytics &amp; monetization services, and UI/UX for hit mobile games played by hundreds of millions of people.',
      'hero.cta.projects': 'View Projects',
      'hero.cta.contact': 'Get in Touch',
      'hero.cta.resume': '↓ Download CV',
      'hero.stat1': 'combined installs across shipped titles',
      'hero.stat2': 'IAP revenue in 30 days post‑launch (Zombie Apocalypse)',
      'hero.stat3': 'place in 3 categories — Game Jam 2025, 200 teams',
      'hero.stat4': 'years building production &amp; high‑load systems',

      'skills.title': 'Skills',
      'skills.sub': 'The stack I ship production games with.',
      'skills.card1': 'Languages &amp; Platforms',
      'skills.card2': 'Architecture &amp; Patterns',
      'skills.card3': 'Dev Tools &amp; Libraries',
      'skills.card4': 'AI &amp; Automation',
      'skills.card5': 'Performance &amp; Graphics',
      'skills.card6': 'Monetization &amp; Analytics',
      'skills.card7': 'Backend, CI/CD &amp; DevOps',
      'skills.card8': 'Collaboration',

      'exp.title': 'Experience',
      'exp.sub': 'Where the numbers above came from.',

      'role1.title': 'Senior Unity C# Developer',
      'role1.date': 'Apr 2021 — Present',
      'role1.company': 'Freeplay LLC (AIBY Group) — international game studio, 2B+ downloads worldwide, ~500 employees, top‑10 mobile publisher',
      'role1.bullet1': 'Built gameplay mechanics, architecture, analytics &amp; monetization services and UI/UX for hit titles totaling <strong>366M installs</strong>, including Fidget Toys Trading (210M), Snake Run Race (120M) and Zombie Apocalypse (25M) — the latter reaching <strong>$500K revenue in its first 30 days</strong> from IAP.',
      'role1.bullet2': 'Designed ECS‑based architecture (Entities, Morpeh, DOTS) combined with MV‑patterns (MVC/MVP/MVVM) to improve scalability and stability under growing load; used Job System + Burst for compute, Addressables for load times, and Zenject/VContainer for DI.',
      'role1.bullet3': 'Built a 7‑stage procedural level generator (Python) for a puzzle title, giving design an unlimited, tunable stream of levels — content production sped up 10×.',
      'role1.bullet4': 'Implemented scalable game AI (FSM, Behaviour Tree, Utility AI) across multiple systems, improving realism while keeping behaviour logic easy to extend.',
      'role1.bullet5': 'Built custom Unity editor tooling (IMGUI + UI Toolkit) so artists and designers could author content independently — content creation 2× faster.',
      'role1.bullet6': 'Contributed to an internal analytics/ads SDK standardizing GameAnalytics, AppMetrica, AppsFlyer, Firebase, IronSource, AppLovin, Appodeal and Facebook SDK integration — new‑project bootstrap time cut by 50%.',
      'role1.bullet7': 'Wrote and profiled custom HLSL/Shader Graph shaders; used Unity Profiler, Frame Debugger and RenderDoc to cut overdraw and draw calls, reducing frame time without losing visual quality.',
      'role1.bullet8': 'Shipped a GDPR‑compliant CMP consent form that became a company‑wide standard across all game products.',
      'role1.bullet9': 'Designed a cloud backend for social features (leaderboards, clans, chat, saves, auth) on PlayFab CBS, Azure Functions and .NET — became a corporate standard and lifted retention by 25%.',
      'role1.bullet10': 'Built a Figma batch‑export tool (Unity Editor tool + local Figma plugin via Plugin API) that renders every level in one pass and lays screenshots out on a canvas with difficulty/time labels — doubling as a smoke test that catches broken configs before they reach a build.',

      'role2.title': 'Unity C# Developer',
      'role2.date': 'Nov 2019 — Jan 2021',
      'role2.company': "GeekBrains (VK Group) — Russia's largest online IT‑education platform",
      'role2.bullet1': 'Designed reference architecture templates (MVC, MVP, MVVM, ECS) for student projects — a layered structure, unified code style and a working example per pattern — cutting time‑to‑first‑playable‑build by 25%.',
      'role2.bullet2': 'Built interactive learning projects for iOS/Android covering UNet multiplayer, URP, DOTween, Addressables, ScriptableObjects and native plugins — each a complete mini‑game with its architecture explained, not an isolated snippet.',
      'role2.bullet3': 'Mentored 10+ students with weekly code reviews covering SOLID, OOP and Git‑flow on their own projects, several of which became publishable portfolio pieces.',

      'role3.title': 'Data Analyst',
      'role3.date': 'Jul 2010 — Apr 2021',
      'role3.company': 'Federal Customs Service — large government agency, high‑load distributed IT infrastructure, ~2000 employees',
      'role3.bullet1': 'Optimized SQL queries and Oracle Database configuration for high‑load departmental services — rewrote heavy queries and rebuilt indexes/execution plans, cutting average response time by 20%.',
      'role3.bullet2': 'Built an analytics system on CronosPro with Lua scripting logic, rolled out to 8 regional divisions, replacing manual cross‑department data reconciliation.',
      'role3.bullet3': 'Ensured database resilience via monitoring, replication and backup policy — 99.9% uptime for critical systems with no data loss on recovery.',

      'role4.title': 'Game Jam 2025 🏆',
      'role4.date': 'Mar 2025',
      'role4.company': 'Team of 4, competing against 200 teams',
      'role4.bullet1': 'Our game won <strong>1st place in 3 categories</strong>, including "Best Game". I worked on game design and mechanics, gameplay logic, shaders and UI/UX.',

      'games.title': 'Shipped Games',
      'games.sub': 'Live titles from my time at Freeplay — ratings and install counts pulled straight from the stores.',
      'games.card1.genre': 'Casual · Freeplay LLC',
      'games.card1.reviews': '611K reviews',
      'games.card1.installs': '100M+ installs',
      'games.card2.genre': 'Runner · Freeplay LLC',
      'games.card2.reviews': '160K reviews',
      'games.card2.installs': '50M+ installs',
      'games.card3.genre': 'Shooter · Freeplay LLC',
      'games.card3.reviews': '817K reviews',
      'games.card3.installs': '10M+ installs',
      'games.card4.genre': 'Puzzle · Freeplay LLC',
      'games.card4.reviews': '28.5K reviews',
      'games.card4.installs': '1M+ installs',
      'games.card5.genre': 'Idle · Freeplay LLC',
      'games.card5.reviews': '23.4K reviews',
      'games.card5.installs': '1M+ installs',
      'games.card6.genre': 'Tower Defense · Freeplay LLC',
      'games.card6.reviews': '18.4K reviews',
      'games.card6.installs': '5M+ installs',
      'games.indie.title': 'Independent Projects',
      'games.indie.sub': 'Solo prototypes, published separately from Freeplay.',
      'games.indie1.meta': '★ 4.7 · 451 ratings · iOS',
      'games.indie2.meta': '★ 5.0 · New · iOS',
      'games.view': 'View →',

      'projects.title': 'Open‑Source Projects',
      'projects.sub': 'A selection from my GitHub — architecture, tooling and multiplayer.',
      'projects.more': 'See all repositories on GitHub →',
      'proj.link': 'View on GitHub →',

      'proj1.desc': 'A top‑down shooter built with Addressables, VContainer, UniTask, UniRx, Cinemachine, DOTween, NavMesh and URP.',
      'proj2.desc': 'A real‑time multiplayer shooter split into two repos — Unity client and an authoritative Colyseus server.',
      'proj2.client': 'Client →',
      'proj2.server': 'Server →',
      'proj3.desc': 'A mobile match‑3 game built on an ECS + dependency‑injection architecture.',
      'proj4.desc': 'A standalone chess rules &amp; move‑validation library, decoupled from any rendering layer. MIT licensed.',
      'proj5.desc': 'A UI Toolkit–based PlayerPrefs editor and viewer for the Unity Editor — a real production tool, not a demo.',
      'proj6.desc': 'A simple, reliable backend for game apps: authentication, authorization and game‑progress persistence.',

      'play.eyebrow': '🎮 A quick break',
      'play.title': "I Build Games — Here's One",
      'play.sub': 'A tiny Pong, made with plain Canvas &amp; JS, no engine, no dependencies. Move your mouse or finger over the board — first to 3 wins.',

      'game.hint': 'Mouse / touch to move · Arrow keys also work',
      'game.restart': 'Restart',
      'game.start': '▶ Start Game',
      'game.resume': '▶ Resume Game',
      'game.win': 'You win! 🎉',
      'game.lose': 'AI wins — rematch?',
      'game.replayHint': 'Click the board or press Restart to play again',

      'edu.title': 'Education &amp; Courses',
      'edu.card1.title': 'Education',
      'edu.card1.school': '<strong>Moscow Financial and Industrial Academy</strong><br>Bachelor\'s Degree, Management',
      'edu.card1.lang': 'English — B2',
      'edu.card2.title': 'Courses',
      'course1': 'Unity Game Development: ECS Approach to Gameplay',
      'course2': 'Masterclass: Addressables for Distributed Game Resources',
      'course3': 'Masterclass: Artificial Intelligence in Games',
      'course4': 'Master the Fundamentals of Game Development with Unity',
      'course5': 'Architecture Unity Games',
      'course6': 'Unity Developer Program',

      'contact.title': "Let's build something.",
      'contact.sub': 'Open to Senior Unity roles and interesting collaborations.',

      'footer.pre': '© ',
      'footer.post': ' Andrey Gritsenko. Built with plain HTML/CSS/JS, hosted on GitHub Pages.'
    },

    ru: {
      'nav.about': 'Обо мне',
      'nav.skills': 'Навыки',
      'nav.experience': 'Опыт',
      'nav.games': 'Игры',
      'nav.projects': 'Проекты',
      'nav.play': 'Игра',
      'nav.education': 'Образование',
      'nav.contact': 'Контакты',

      'hero.eyebrow': 'Senior Unity-разработчик',
      'hero.title': 'Привет, я Андрей Гриценко',
      'hero.lead': '5+ лет коммерческой разработки мобильных игр и 10+ лет опыта в создании высоконагруженных IT-систем. Я проектирую игровую механику, архитектуру, аналитические и монетизационные сервисы, а также UI/UX для хитовых мобильных игр с аудиторией в сотни миллионов игроков.',
      'hero.cta.projects': 'Смотреть проекты',
      'hero.cta.contact': 'Связаться',
      'hero.cta.resume': '↓ Скачать резюме',
      'hero.stat1': 'суммарно установок в выпущенных играх',
      'hero.stat2': 'выручка от покупок за 30 дней после релиза (Zombie Apocalypse)',
      'hero.stat3': 'место в 3 номинациях — Game Jam 2025, 200 команд',
      'hero.stat4': 'лет опыта в промышленной разработке и высоконагруженных системах',

      'skills.title': 'Навыки',
      'skills.sub': 'Стек, на котором я выпускаю игры в продакшн.',
      'skills.card1': 'Языки и платформы',
      'skills.card2': 'Архитектура и паттерны',
      'skills.card3': 'Инструменты и библиотеки',
      'skills.card4': 'ИИ и автоматизация',
      'skills.card5': 'Производительность и графика',
      'skills.card6': 'Монетизация и аналитика',
      'skills.card7': 'Backend, CI/CD и DevOps',
      'skills.card8': 'Командная работа',

      'exp.title': 'Опыт',
      'exp.sub': 'Откуда взялись цифры выше.',

      'role1.title': 'Senior Unity C#-разработчик',
      'role1.date': 'Апрель 2021 — настоящее время',
      'role1.company': 'Freeplay LLC (AIBY Group) — международная геймдев-студия, 2 млрд+ загрузок по всему миру, ~500 сотрудников, входит в топ-10 мобильных издателей',
      'role1.bullet1': 'Разрабатывал игровые механики, архитектуру, аналитические и монетизационные сервисы, а также UI/UX для хитовых игр студии с суммарной аудиторией <strong>366 млн установок</strong>, включая Fidget Toys Trading (210 млн), Snake Run Race (120 млн) и Zombie Apocalypse (25 млн) — последняя принесла <strong>$500K выручки за первые 30 дней</strong> благодаря внутриигровым покупкам.',
      'role1.bullet2': 'Проектировал архитектуру на основе ECS (Entities, Morpeh, DOTS) в сочетании с MV-паттернами (MVC/MVP/MVVM), повышая масштабируемость и стабильность при росте нагрузки; использовал Job System + Burst для вычислений, Addressables для ускорения загрузки и Zenject/VContainer для DI.',
      'role1.bullet3': 'Разработал процедурный генератор уровней (Python, конвейер из 7 этапов) для puzzle-проекта — геймдизайн получил неограниченный, настраиваемый поток уровней, что ускорило производство контента в 10 раз.',
      'role1.bullet4': 'Реализовал масштабируемый игровой ИИ (FSM, Behaviour Tree, Utility AI) для разных игровых систем, повысив реалистичность и упростив расширение логики поведения.',
      'role1.bullet5': 'Создал кастомные редакторские инструменты в Unity (IMGUI + UI Toolkit), позволившие художникам и геймдизайнерам работать с контентом самостоятельно — скорость создания контента выросла в 2 раза.',
      'role1.bullet6': 'Участвовал в разработке внутреннего SDK для аналитики и рекламы, стандартизировав интеграцию GameAnalytics, AppMetrica, AppsFlyer, Firebase, IronSource, AppLovin, Appodeal и Facebook SDK — время запуска новых проектов сократилось на 50%.',
      'role1.bullet7': 'Писал и профилировал кастомные шейдеры на HLSL/Shader Graph; с помощью Unity Profiler, Frame Debugger и RenderDoc сокращал overdraw и draw calls, уменьшая время рендеринга кадра без потери качества.',
      'role1.bullet8': 'Внедрил CMP-форму согласия, соответствующую GDPR, которая стала корпоративным стандартом для всех игровых продуктов студии.',
      'role1.bullet9': 'Спроектировал облачный бэкенд для социальных механик (лидерборды, кланы, чат, сохранения, авторизация) на PlayFab CBS, Azure Functions и .NET — решение стало корпоративным стандартом и повысило удержание игроков на 25%.',
      'role1.bullet10': 'Создал инструмент пакетной выгрузки в Figma (Unity Editor tool + локальный Figma-плагин на Plugin API): одной командой рендерит скриншоты всех уровней и раскладывает их на канвасе с подписями сложности и времени — заодно служит smoke-тестом, отсеивающим битые конфиги до попадания в билд.',

      'role2.title': 'Unity C#-разработчик',
      'role2.date': 'Ноябрь 2019 — январь 2021',
      'role2.company': 'GeekBrains (VK Group) — крупнейшая российская онлайн-платформа IT-образования',
      'role2.bullet1': 'Разработал эталонные архитектурные шаблоны (MVC, MVP, MVVM, ECS) для учебных проектов — слоистая структура, единый код-стайл и рабочий пример на каждый паттерн — сократив время до первого играбельного билда на 25%.',
      'role2.bullet2': 'Разработал интерактивные обучающие проекты для iOS/Android: мультиплеер на UNet, URP, DOTween, Addressables, ScriptableObjects и нативные плагины — каждый пример представлял собой законченную мини-игру с разбором архитектуры, а не изолированный сниппет.',
      'role2.bullet3': 'Менторил 10+ студентов, проводя еженедельные код-ревью по SOLID, ООП и Git-flow на их собственных проектах — несколько работ дошли до публикуемого состояния и вошли в портфолио.',

      'role3.title': 'Аналитик данных',
      'role3.date': 'Июль 2010 — апрель 2021',
      'role3.company': 'Федеральная таможенная служба — крупная государственная организация с высоконагруженной распределённой IT-инфраструктурой, ~2000 сотрудников',
      'role3.bullet1': 'Оптимизировал SQL-запросы и конфигурацию Oracle Database для высоконагруженных ведомственных сервисов — переписал тяжёлые запросы и пересобрал индексы/планы выполнения, снизив среднее время отклика на 20%.',
      'role3.bullet2': 'Разработал аналитическую систему на CronosPro со скриптовой логикой на Lua, внедрённую в 8 региональных подразделениях взамен ручной сверки данных между отделами.',
      'role3.bullet3': 'Обеспечил отказоустойчивость баз данных за счёт мониторинга, репликации и регламента резервного копирования — 99,9% аптайма критичных систем и восстановление без потери данных.',

      'role4.title': 'Game Jam 2025 🏆',
      'role4.date': 'Март 2025',
      'role4.company': 'Команда из 4 человек, среди 200 команд-участниц',
      'role4.bullet1': 'Наша игра заняла <strong>1-е место в 3 номинациях</strong>, включая «Лучшая игра». Я занимался геймдизайном и механиками, игровой логикой, шейдерами и UI/UX.',

      'games.title': 'Выпущенные игры',
      'games.sub': 'Игры, которые я делал в Freeplay — рейтинги и установки взяты прямо со страниц в сторах.',
      'games.card1.genre': 'Казуальная игра · Freeplay LLC',
      'games.card1.reviews': '611K отзывов',
      'games.card1.installs': '100M+ установок',
      'games.card2.genre': 'Раннер · Freeplay LLC',
      'games.card2.reviews': '160K отзывов',
      'games.card2.installs': '50M+ установок',
      'games.card3.genre': 'Шутер · Freeplay LLC',
      'games.card3.reviews': '817K отзывов',
      'games.card3.installs': '10M+ установок',
      'games.card4.genre': 'Головоломка · Freeplay LLC',
      'games.card4.reviews': '28.5K отзывов',
      'games.card4.installs': '1M+ установок',
      'games.card5.genre': 'Идл-кликер · Freeplay LLC',
      'games.card5.reviews': '23.4K отзывов',
      'games.card5.installs': '1M+ установок',
      'games.card6.genre': 'Тауэр-дефенс · Freeplay LLC',
      'games.card6.reviews': '18.4K отзывов',
      'games.card6.installs': '5M+ установок',
      'games.indie.title': 'Независимые проекты',
      'games.indie.sub': 'Сольные прототипы, опубликованы отдельно от Freeplay.',
      'games.indie1.meta': '★ 4.7 · 451 оценка · iOS',
      'games.indie2.meta': '★ 5.0 · Новинка · iOS',
      'games.view': 'Открыть →',

      'projects.title': 'Open-Source проекты',
      'projects.sub': 'Подборка с моего GitHub — архитектура, инструменты и мультиплеер.',
      'projects.more': 'Все репозитории на GitHub →',
      'proj.link': 'Открыть на GitHub →',

      'proj1.desc': 'Шутер с видом сверху на Addressables, VContainer, UniTask, UniRx, Cinemachine, DOTween, NavMesh и URP.',
      'proj2.desc': 'Мультиплеерный шутер в реальном времени, разбитый на два репозитория — клиент на Unity и авторитетный сервер на Colyseus.',
      'proj2.client': 'Клиент →',
      'proj2.server': 'Сервер →',
      'proj3.desc': 'Мобильная match-3 игра на архитектуре ECS + dependency injection.',
      'proj4.desc': 'Самостоятельная библиотека шахматных правил и валидации ходов, не привязанная к слою рендеринга. Лицензия MIT.',
      'proj5.desc': 'Редактор и просмотрщик PlayerPrefs для Unity Editor на UI Toolkit — реальный продакшн-инструмент, а не демо.',
      'proj6.desc': 'Простой и надёжный бэкенд для игровых приложений: аутентификация, авторизация и сохранение прогресса.',

      'play.eyebrow': '🎮 Небольшой перерыв',
      'play.title': 'Я делаю игры — вот одна из них',
      'play.sub': 'Мини-понг на чистом Canvas и JS, без движка и зависимостей. Двигайте мышью или пальцем над полем — до 3 очков.',

      'game.hint': 'Мышь / тач для движения · Стрелки тоже работают',
      'game.restart': 'Заново',
      'game.start': '▶ Начать игру',
      'game.resume': '▶ Продолжить игру',
      'game.win': 'Вы победили! 🎉',
      'game.lose': 'Победа бота — реванш?',
      'game.replayHint': 'Кликните по полю или нажмите «Заново», чтобы сыграть ещё раз',

      'edu.title': 'Образование и курсы',
      'edu.card1.title': 'Образование',
      'edu.card1.school': '<strong>Московская финансово-промышленная академия</strong><br>Бакалавр, Менеджмент',
      'edu.card1.lang': 'Английский — B2',
      'edu.card2.title': 'Курсы',
      'course1': 'Unity Game Development: ECS-подход к геймплею',
      'course2': 'Мастер-класс: Addressables для распределённых игровых ресурсов',
      'course3': 'Мастер-класс: Искусственный интеллект в играх',
      'course4': 'Основы разработки игр на Unity',
      'course5': 'Архитектура игр на Unity',
      'course6': 'Unity Developer Program',

      'contact.title': 'Давайте сделаем что-то вместе.',
      'contact.sub': 'Открыт к позициям Senior Unity-разработчика и интересным проектам.',

      'footer.pre': '© ',
      'footer.post': ' Андрей Гриценко. Сделано на чистом HTML/CSS/JS, хостинг — GitHub Pages.'
    }
  };

  var current = 'en';
  try {
    var saved = localStorage.getItem('site-lang');
    if (saved === 'en' || saved === 'ru') current = saved;
  } catch (e) {}

  var RESUME_FILES = {
    en: { href: 'assets/andrey-gritsenko-resume-en.pdf', name: 'Andrey Gritsenko Senior Unity Developer (ENG).pdf' },
    ru: { href: 'assets/andrey-gritsenko-resume-ru.pdf', name: 'Andrey Gritsenko Senior Unity Developer (RUS).pdf' }
  };

  function t(key) {
    var dict = STRINGS[current] || STRINGS.en;
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    return STRINGS.en[key] || '';
  }

  function apply(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      if (val) el.innerHTML = val;
    }
    document.documentElement.lang = current;

    var resumeLink = document.getElementById('resumeLink');
    if (resumeLink) {
      var rf = RESUME_FILES[current] || RESUME_FILES.en;
      resumeLink.setAttribute('href', rf.href);
      resumeLink.setAttribute('download', rf.name);
    }

    var btns = document.querySelectorAll('.lang-btn');
    for (var j = 0; j < btns.length; j++) {
      var active = btns[j].getAttribute('data-lang') === current;
      btns[j].classList.toggle('is-active', active);
      btns[j].setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'ru') return;
    current = lang;
    try { localStorage.setItem('site-lang', lang); } catch (e) {}
    apply();
    document.dispatchEvent(new CustomEvent('i18nchange', { detail: { lang: lang } }));
  }

  window.i18n = {
    t: t,
    apply: apply,
    setLang: setLang,
    getLang: function () { return current; }
  };

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    apply();
    var btns = document.querySelectorAll('.lang-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        setLang(this.getAttribute('data-lang'));
      });
    }
  });
})();
