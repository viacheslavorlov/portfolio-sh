/* ═══════════════ данные — единый источник правды (страницы, grep и cat читают это) ═══════════════ */

export type Status = 'prod' | 'oss' | 'wip';

export interface Project {
  id: string;
  name: string;
  st: Status;
  short: string;
  year: string;
  tag: string;
  desc: string;
  stack: string;
  role: string;
  impact: string;
}

export const ABOUT = {
  tag: 'кто я — без лишней воды',
  fm: [
    ['роль', 'fullstack-разработчик'],
    ['локация', 'Великий Новгород · удаленно · на месте работодателя'],
    ['опыт', '4 года 4 месяца · 2023 → настоящее время'],
    ['занятость', 'полная · частичная · проектная работа'],
    ['ожидания', 'от 170 000 ₽'],
    ['статус', 'доступен для найма'],
  ] as [string, string][],
  paras: [
    `Веб-приложения полного цикла: backend-сервисы и REST API на Node.js и Bun, интерфейсы на React, Next.js и Astro.js. Четыре года разрабатываю и сопровождаю продуктовую разработку: headless-архитектуры на Payload и Strapi CMS, SSR и SSG, базы данных — PostgreSQL, MongoDB, SQLite.`,
    `Внедряю генеративный ИИ: локальные LLM, RAG-системы, AI-ассистенты и боты для Telegram, VK и MAX. Беру на себя инфраструктуру — Linux-серверы, CI/CD, деплой. Менторю новых разработчиков и спокойно работаю с legacy-системами на Bitrix и WordPress. А ещё строю TUI, которые никто не просил — этот портфолио включено.`,
  ],
  principles: [
    ['малые релизы', 'каждое изменение откатывается за минуту'],
    ['латентность — фича', 'у каждого пути есть бюджет; регрессии производительности не проходят'],
    ['скучные технологии, интересные продукты', 'новое — где важно, проверенное — везде, где можно'],
    ['не считано — не факт', 'метрики — до дедлайнов'],
  ] as [string, string][],
  now: [
    ['в работе', '2 WIP: headless CMS (Bun · любая major DB · Redis + BullMQ) и self-hosted chat (Bun · Postgres · PWA · E2EE)'],
    ['внедряю', 'AI в бизнес-процессы: LLM, RAG, AI-генерация контента'],
    ['изучаю', 'Elysia · BullMQ · PWA/E2EE'],
  ] as [string, string][],
};

export const PROJECTS: Project[] = [
  {
    id: 'velesrp',
    name: 'velesrp',
    st: 'prod',
    short: 'GTA V · event-driven · MySQL',
    year: 'сент. 2024 → июль 2025',
    tag: 'Gamedev: сервер для GTA 5',
    desc: `Gamedev: разработка сервера для GTA 5. Ускорил клиент-серверный обмен данными более чем в 100 раз — кэширование и event-driven архитектура. Новые механики и фичи, настройка и оптимизация сервера, проектирование БД (MySQL) и оптимизация запросов.`,
    stack: 'MySQL, кэширование, event-driven (клиент-сервер)',
    role: 'fullstack · проектная работа',
    impact: '×100 к обмену данными · MySQL',
  },
  {
    id: 'brandmap',
    name: 'brandmap',
    st: 'prod',
    short: 'TS · Bun · Elysia',
    year: 'фев. → апр. 2026',
    tag: 'интеграции: Мой Склад и 1С',
    desc: `Backend-разработка проекта brand map: интеграция с API Мой Склад и интеграция с 1С. Стек: TypeScript, Bun, Elysia.js.`,
    stack: 'TypeScript, Bun, Elysia.js, Мой Склад, 1С',
    role: 'backend · проектная работа',
    impact: 'Мой Склад + 1С за один спринт',
  },
  {
    id: 'headless-cms',
    name: 'headless-cms',
    st: 'wip',
    short: 'Bun · TS · BullMQ',
    year: 'WIP · 2026',
    tag: 'headless CMS на любую major DB',
    desc: `WIP: headless CMS-система на Bun + TypeScript. Поддержка любой основной базы данных, очереди задач на Redis и BullMQ.`,
    stack: 'Bun, TypeScript, any major DB, Redis, BullMQ',
    role: 'автор',
    impact: 'wip · прототип',
  },
  {
    id: 'selfchat',
    name: 'selfchat',
    st: 'wip',
    short: 'Bun · Postgres · PWA',
    year: 'WIP · 2026',
    tag: 'self-hosted chat с E2EE',
    desc: `WIP: self-hosted сервис чата: Bun, PostgreSQL, PWA-клиент, end-to-end шифрование (E2EE).`,
    stack: 'Bun, PostgreSQL, PWA, E2EE',
    role: 'автор',
    impact: 'wip · прототип',
  },
];

export const ACH = [
  { h: 'a1f93c2', y: '2025', t: 'VelesRP: ×100 скорость клиент-серверного обмена (кэширование, event-driven)' },
  { h: '8c41e0d', y: '2025', t: 'внедрение RAG и локальных LLM — Traffic agency' },
  { h: '5b90ffe', y: '2026', t: 'brand map: интеграции Мой Склад и 1С (Bun, Elysia.js)' },
  { h: '3e77aa0', y: '2023→', t: 'Traffic agency: разработка полного цикла — Node · Bun · Next · Astro' },
  { h: 'c19d4b1', y: '2024→', t: 'боты Telegram, VK и MAX — включая кроссплатформенные' },
  { h: '6d20a3f', y: '2023→', t: 'менторинг и адаптация новых разработчиков' },
];

export const SKILLS = {
  learning: 'Elysia · BullMQ · PWA/E2EE',
  groups: [
    {
      name: 'frontend',
      rows: [
        ['TypeScript', 92, 4],
        ['React', 88, 4],
        ['Next.js', 86, 3],
        ['Tailwind CSS', 84, 4],
        ['Astro', 80, 1],
      ] as [string, number, number][],
    },
    {
      name: 'backend',
      rows: [
        ['Node.js', 90, 4],
        ['Payload CMS', 80, 2],
        ['Bun', 78, 2],
        ['Strapi CMS', 76, 2],
        ['Elysia.js', 70, 1],
      ] as [string, number, number][],
    },
    {
      name: 'data и AI',
      rows: [
        ['PostgreSQL', 85, 3],
        ['SQLite', 80, 3],
        ['LLM · RAG', 80, 2],
        ['MySQL', 78, 2],
        ['MongoDB', 75, 2],
      ] as [string, number, number][],
    },
    {
      name: 'devops и инструменты',
      rows: [
        ['боты TG / VK / MAX', 85, 2],
        ['Linux', 80, 4],
        ['CI/CD', 78, 3],
        ['Bitrix · WordPress (legacy)', 72, 4],
      ] as [string, number, number][],
    },
  ],
};

export interface ContactRow {
  k: string;
  v: string;
  copy?: boolean;
  tzlive?: boolean;
  ask?: boolean;
}

export const CONTACT = {
  rows: [
    { k: 'локация', v: 'Великий Новгород' },
    { k: 'таймзона', v: 'UTC+3 · локально ', tzlive: true },
    { k: 'занятость', v: 'полная · частичная · проектная работа / разовое задание' },
    { k: 'формат', v: 'удаленно · на месте работодателя' },
    { k: 'ожидания', v: 'от 170 000 ₽ на руки' },
    { k: 'ответ', v: '< 24 ч — обычно быстрее' },
    { k: 'cv', v: 'по запросу', ask: true },
  ] as ContactRow[],
  status: '● открыт: полная / частичная занятость · проектная работа — Великий Новгород/Санкт-Петербург',
  note: '# резюме обновлено 15.10.2026 · остальное: да, давайте',
};

/* ═══════════════ вкладки — страницы, href и «файл», которым каждая является ═══════════════ */

export interface Tab {
  id: string;
  path: string;
  file: string;
  tag: string;
}

export const TABS: Tab[] = [
  { id: 'about', path: '/portfolio-sh/about/', file: 'about.md', tag: ABOUT.tag },
  { id: 'projects', path: '/portfolio-sh/projects/', file: 'projects/', tag: '2 закрытых · 2 WIP' },
  { id: 'skills', path: '/portfolio-sh/skills/', file: 'skills.json', tag: 'самооценка, близкая к бенчмарку' },
  { id: 'contact', path: '/portfolio-sh/contacts/', file: 'contact.txt', tag: 'как меня найти' },
];

export const THEMES = ['amber', 'phosphor', 'paper'];

/* ═══════════════ хелперы ═══════════════ */

export const getProject = (id: string) => PROJECTS.find(p => p.id === id);

export const projectPath = (p: Project) => `/portfolio-sh/projects/${p.id}/`;

export const tabByPath = (pathname: string) => {
  const path = pathname.replace(/\/+$/, '');
  if (path === '' || path === '/portfolio-sh/about') return TABS[0];
  if (path === '/portfolio-sh/projects' || path.startsWith('/portfolio-sh/projects/')) return TABS[1];
  if (path === '/portfolio-sh/skills') return TABS[2];
  if (path === '/portfolio-sh/contacts') return TABS[3];
  return null;
};

/* ═══════════════ корпус grep/cat (из тех же данных) ═══════════════ */

export interface CorpusLine { f: string; t: string }

export const CORPUS: CorpusLine[] = (() => {
  const lines: CorpusLine[] = [];
  const put = (f: string, t: string) => lines.push({ f, t });
  put('about.md', ABOUT.tag);
  ABOUT.fm.forEach(([k, v]) => put('about.md', `${k}: ${v}`));
  ABOUT.paras.forEach(p => put('about.md', p));
  ABOUT.principles.forEach(([a, b]) => put('about.md', `${a} — ${b}`));
  ABOUT.now.forEach(([k, v]) => put('about.md', `${k}: ${v}`));
  ACH.forEach(a => put('projects/achievements.log', `${a.y} · ${a.t}`));
  PROJECTS.forEach(p => {
    const f = 'projects/' + p.id;
    put(f, `${p.name} — ${p.tag}`);
    put(f, p.desc);
    put(f, `stack: ${p.stack}`);
    put(f, `role: ${p.role}`);
    put(f, `impact: ${p.impact}`);
    put(f, `year: ${p.year}`);
  });
  SKILLS.groups.forEach(g =>
    g.rows.forEach(([n, p, y]) => put('skills.json', `${n} — ${p}% · ${y}y (${g.name})`))
  );
  put('skills.json', `learning: ${SKILLS.learning}`);
  CONTACT.rows.forEach(r => put('contact.txt', `${r.k}: ${r.v}`));
  put('contact.txt', CONTACT.status);
  put('contact.txt', CONTACT.note);
  return lines;
})();
