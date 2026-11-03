export const ABOUT = {
  tag: 'who i am, minus the buzzwords',
  fm: [['name', 'Adrián Vega'], ['role', 'senior full-stack developer'], ['location', 'Bucharest · remote (UTC+2)'],
  ['experience', '7+ years · 40+ releases'], ['status', '● open to work']],
  paras: [
    `I build products end to end — from the first schema migration to the last loading skeleton. Over the last seven years I've shipped SaaS platforms, internal tools and open-source libraries, usually as the person bridging "we need it yesterday" and "it must not fall over in production".`,
    `TypeScript everywhere, Go where it counts, Postgres underneath. I care about small honest interfaces, p95s under 100 ms, tests that fail loudly, and deploys that are boring. When I'm not shipping I'm building TUIs nobody asked for — this portfolio included.`],
  principles: [
    ['ship small', 'trunk-based, feature-flagged — every change reversible within a minute'],
    ['latency is a feature', 'every user path gets a budget; perf regressions fail CI'],
    ['boring tech, exciting products', 'novel where it matters, proven everywhere else'],
    ['measured or it didn\'t happen', 'dashboards before deadlines, always']],
  now: [['building', 'ledgerline v2 — multi-currency, EU e-invoicing (EN 16931)'],
  ['learning', 'Rust · WebGL shaders'],
  ['reading', 'Designing Data-Intensive Applications — 3rd pass']]
};


export const PROJECTS = [
  {
    id: 'ledgerline', name: 'ledgerline', st: 'prod', short: 'TS · Next · tRPC · PG', year: '2021 → now',
    tag: 'invoicing & expenses for EU freelancers',
    desc: `Multi-tenant invoicing with EU e-invoicing (EN 16931), bank reconciliation over PSD2, and a PDF pipeline that renders 40k documents a month. Postgres row-level security keeps tenants apart; tRPC keeps types honest end to end.`,
    stack: 'TypeScript, Next.js, tRPC, Postgres (RLS), Redis, Stripe',
    role: 'lead full-stack · team of 5', impact: '40k users · €12M processed / yr · 99.95% uptime'
  },
  {
    id: 'pulseboard', name: 'pulseboard', st: 'oss', short: 'Go · ClickHouse · WS', year: '2023 → now',
    tag: 'self-hosted observability for teams that outgrew free tiers',
    desc: `Metrics, traces and log tails from a single binary. Agents push over HTTP/UDP, dashboards live as code in YAML, and the whole thing runs happily on a 2-core VPS. Built it because my homelab deserved better than five Grafana tabs.`,
    stack: 'Go, ClickHouse, React, WebSocket, systemd',
    role: 'creator & maintainer', impact: '1.2k stars · 58 contributors'
  },
  {
    id: 'dispatchr', name: 'dispatchr', st: 'prod', short: 'Node · Redis · K8s', year: '2022 → 2024',
    tag: 'fulfillment orchestration for mid-size e-commerce',
    desc: `Routes orders across 12 warehouses with SLA-aware queues, idempotent retries and a replayable event log. Held p95 under 50 ms through three Black Fridays — the third one was almost relaxing.`,
    stack: 'Node, Redis streams, RabbitMQ, Kubernetes, Terraform',
    role: 'full-stack · 2-person core team', impact: '2.4M orders / yr · p95 48 ms · 0 lost orders since v1.2'
  },
  {
    id: 'formforge', name: 'formforge', st: 'oss', short: 'TS · JSON Schema', year: '2023 → now',
    tag: 'schema-first form builder — no drag, no drop',
    desc: `JSON Schema in, accessible React forms out — live validation, 4.9 kB runtime. Powers ledgerline's onboarding; the API is boring on purpose.`,
    stack: 'TypeScript, JSON Schema, Monaco, vitest',
    role: 'author', impact: '2.1M npm downloads · 4.9 kB core'
  },
  {
    id: 'syncroom', name: 'syncroom', st: 'wip', short: 'TS · Yjs · WebRTC', year: '2025',
    tag: 'pair-programming rooms with no server in the data path',
    desc: `CRDT-backed shared editing plus voice over WebRTC; only signaling ever touches a server. Prototype stage — sync RTT is already 12 ms between continents.`,
    stack: 'TypeScript, Yjs, WebRTC',
    role: 'solo experiment', impact: 'prototype · 12 ms cross-Atlantic sync'
  }
];


export const ACH = [
  { h: 'a1f93c2', y: '2024', t: 'HackBucharest — 1st place (ledgerline prototype)' },
  { h: '8c41e0d', y: '2024', t: 'dispatchr p95: 320 ms → 48 ms' },
  { h: '5b90ffe', y: '2024', t: 'speaker — "Ship Fast, Safely", DevOps Bucharest' },
  { h: '3e77aa0', y: '2023', t: 'pulseboard crosses 1k GitHub stars' },
  { h: 'c19d4b1', y: '2023', t: 'AWS Solutions Architect — Associate' },
  { h: '6d20a3f', y: '2022', t: 'first €1M quarter processed through ledgerline' }
];

export const SKILLS = {
  learning: 'Rust · WebGL shaders', groups: [
    { name: 'frontend', rows: [['TypeScript', 95, 7], ['React', 92, 6], ['Next.js', 88, 4], ['CSS & motion', 85, 7], ['Vue', 64, 2]] },
    { name: 'backend', rows: [['Node.js', 93, 7], ['PostgreSQL', 90, 6], ['Redis', 85, 5], ['Go', 82, 3], ['GraphQL', 78, 4]] },
    { name: 'ops', rows: [['Docker', 88, 6], ['CI/CD · GH Actions', 86, 5], ['AWS', 80, 4], ['Kubernetes', 74, 3], ['Terraform', 68, 2]] },
    { name: 'practices', rows: [['testing · vitest/pw', 87, 5], ['DX tooling', 84, 5], ['observability', 78, 4], ['security · OWASP', 72, 3]] }
  ]
};

export const CONTACT = {
  rows: [
    { k: 'email', v: 'hello@avega.dev', copy: true },
    { k: 'github', v: 'github.com/avega', copy: true },
    { k: 'location', v: 'Bucharest, RO' },
    { k: 'timezone', v: 'UTC+2 · local <span id="tzLive">--:--:--</span>', live: true },
    { k: 'response', v: '< 24h — usually much faster' },
    { k: 'cv', v: 'on request <button class="copy" data-cv title="ask for the CV">[ask]</button>' }
  ],
  status: '● open to senior full-stack / platform roles — remote or Bucharest',
  note: '# no crypto recruiters. everything else: yes, please.'
};

export const TREE = [
  { nav: 'about', n: 'about.md', m: '2kB', cls: '' },
  {
    nav: 'projects', n: 'projects/', m: '6', cls: '', kids: [
      { ach: 1, n: 'achievements.log', m: '6', cls: '' },
      { proj: 'dispatchr', n: 'dispatchr', m: 'prod', cls: 'st-prod' },
      { proj: 'formforge', n: 'formforge', m: 'oss', cls: 'st-oss' },
      { proj: 'ledgerline', n: 'ledgerline', m: 'prod', cls: 'st-prod' },
      { proj: 'pulseboard', n: 'pulseboard', m: 'oss', cls: 'st-oss' },
      { proj: 'syncroom', n: 'syncroom', m: 'wip', cls: 'st-wip' }
    ]
  },
  { nav: 'skills', n: 'skills.json', m: '1kB', cls: '' },
  { nav: 'contact', n: 'contact.txt', m: '1kB', cls: '' }
];

export const TABS = [
  { id: 'about', file: 'about.md', tag: ABOUT.tag },
  { id: 'projects', file: 'projects/', tag: '4 in the wild · 1 in the lab' },
  { id: 'skills', file: 'skills.json', tag: 'self-assessed, benchmark-adjacent' },
  { id: 'contact', file: 'contact.txt', tag: 'the fastest route is email' }
];