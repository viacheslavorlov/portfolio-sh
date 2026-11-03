/* portfolio.sh — общий терминальный шелл (на каждой странице, навигация через window.location) */
import { CORPUS, getProject, PROJECTS, TABS, THEMES } from '../data/portfolio';

/* ═══════════════ утилиты ═══════════════ */
const $ = s => document.querySelector(s);
const h = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtTime = d => d.toTimeString().slice(0, 8);
const smooth = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

const body = document.body;
const curTab = () => body.dataset.tab || 'about';
const bootAt = Date.now();

/* ═══════════════ навигация — <a> href в оболочке, window.location из консоли ═══════════════ */
function nav(path) {
  const url = new URL(path, location.origin).href;
  if (url !== location.href) { location.href = url; return; }
  // та же страница: обработка якоря / прокрутка вверх
  const m = path.match(/#([\w-]+)$/);
  if (m) {
    const el = document.getElementById(m[1]);
    if (el) {
      el.scrollIntoView({ behavior: smooth(), block: 'start' });
      el.classList.add('flashsec');
      setTimeout(() => el.classList.remove('flashsec'), 1200);
    }
  } else $('#pane').scrollTo({ top: 0, behavior: smooth() });
}

/* ═══════════════ консоль ═══════════════ */
const conBody = $('#consoleBody');
const entries = [];
function log(kind, text) {
  entries.push({ t: fmtTime(new Date()), kind, text });
  if (entries.length > 250) entries.shift();
  conBody.innerHTML = entries.map(e => e.kind === 'raw'
    ? `<div class="cline k-raw">${e.text}</div>`
    : `<div class="cline k-${e.kind}"><span class="lt">${e.t}</span><span class="lp">${e.kind === 'cmd' ? '❯' : e.kind === 'sys' ? '▸' : e.kind === 'ok' ? '✓' : e.kind === 'err' ? '✗' : ' '
    }</span><span class="lx">${e.text}</span></div>`).join('');
  conBody.scrollTop = conBody.scrollHeight;
  const last = conBody.lastElementChild;
  if (last) last.classList.add('fresh');
}
function outs(lines) { lines.forEach(l => log('out', l)); }

/* ═══════════════ тема ═══════════════ */
function curTheme() { return body.dataset.theme; }
function setTheme(name, o = {}) {
  if (!THEMES.includes(name)) return;
  body.dataset.theme = name;
  $('#sbTheme').textContent = name;
  document.querySelectorAll('.thm').forEach(b => b.classList.toggle('on', b.dataset.thm === name));
  try { localStorage.setItem('pf-theme', name); } catch (e) { }
  if (!o.silent) log('ok', 'theme ▸ ' + name);
}
function cycleTheme() { setTheme(THEMES[(THEMES.indexOf(curTheme()) + 1) % THEMES.length]); }

/* ═══════════════ размер шрифта (масштаб всего интерфейса) ═══════════════ */
const FS_MIN = 0.9, FS_MAX = 1.6, FS_STEP = 0.05;
let fsx = 1.15;
try {
  const stored = parseFloat(localStorage.getItem('pf-fsx'));
  if (Number.isFinite(stored)) fsx = Math.min(FS_MAX, Math.max(FS_MIN, stored));
} catch (e) { }
function applyFs(v, o = {}) {
  fsx = Math.min(FS_MAX, Math.max(FS_MIN, Math.round(v * 100) / 100));
  document.documentElement.style.setProperty('--fsx', String(fsx));
  try { localStorage.setItem('pf-fsx', String(fsx)); } catch (e) { }
  const el = $('#fsNow');
  if (el) el.textContent = Math.round(fsx * 100) + '%';
  if (!o.silent) log('ok', 'шрифт ▸ ' + Math.round(fsx * 100) + '%');
}
applyFs(fsx, { silent: true });
function cmdFont(arg) {
  const a = String(arg || '').trim();
  if (!a) {
    log('ok', 'шрифт ▸ ' + Math.round(fsx * 100) + '%');
    return log('out', 'диапазон 90–160% · примеры: font 150 · font + · font -');
  }
  let val;
  if (a === '+') val = fsx + FS_STEP;
  else if (a === '-') val = fsx - FS_STEP;
  else {
    const n = parseFloat(a);
    if (!Number.isFinite(n)) return log('err', 'sh: font: укажите значение · напр. font 150 или font +');
    val = n > 2 ? n / 100 : n; /* font 150 = 150% · font 1.5 = 150% */
  }
  if (val < FS_MIN - 0.001 || val > FS_MAX + 0.001)
    return log('err', 'sh: font: доступный диапазон 90–160% · напр. font 125');
  applyFs(val);
}

/* выбор темы в сайдбаре */
const themeRow = $('#themeRow');
if (themeRow) themeRow.addEventListener('click', e => {
  const b = e.target.closest('[data-thm]');
  if (b) setTheme(b.dataset.thm);
});

/* ═══════════════ вкладки (порядок для 1–4, h/l) ═══════════════ */
const tabIdx = () => Math.max(0, TABS.findIndex(t => t.id === curTab()));
const prevTab = () => nav(TABS[(tabIdx() + TABS.length - 1) % TABS.length].path);
const nextTab = () => nav(TABS[(tabIdx() + 1) % TABS.length].path);

/* ═══════════════ внутристраничные действия (делегирование — работает на всех страницах) ═══════════════ */
document.addEventListener('click', e => {
  const c = e.target.closest('[data-copy]');
  if (c) return doCopy(c, c.dataset.copy);
  const fb = e.target.closest('[data-fs]');
  if (fb) { e.preventDefault(); return applyFs(fsx + (fb.dataset.fs === 'inc' ? FS_STEP : -FS_STEP)); }
  if (e.target.closest('[data-cv]'))
    return log('ok', 'запрос на cv записан — пришлю в ответ на письмо');
  const sk = e.target.closest('[data-si]');
  if (sk) return log('out', 'skill ▸ ' + h(sk.dataset.si));
});
function doCopy(btn, val) {
  const done = () => {
    btn.textContent = '[copied]'; btn.classList.add('copied');
    log('ok', 'скопировано ▸ ' + h(val));
    setTimeout(() => { btn.textContent = '[copy]'; btn.classList.remove('copied'); }, 1400);
  };
  if (navigator.clipboard && navigator.clipboard.writeText)
    navigator.clipboard.writeText(val).then(done).catch(() => fallback());
  else fallback();
  function fallback() {
    const ta = document.createElement('textarea');
    ta.value = val; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); }
    catch (e) { log('err', 'буфер обмена заблокирован — скопируйте вручную'); }
    ta.remove();
  }
}

/* ═══════════════ ввод команд ═══════════════ */
const cmd = $('#cmd'), mirror = $('#mirror');
const hist = []; let hIdx = -1, gg = false;

cmd.addEventListener('input', () => { mirror.textContent = cmd.value; });
cmd.addEventListener('focus', () => { body.classList.add('cmd-on'); $('#sbMode').textContent = 'COMMAND'; });
cmd.addEventListener('blur', () => { body.classList.remove('cmd-on'); $('#sbMode').textContent = 'NORMAL'; });
cmd.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const v = cmd.value; cmd.value = ''; mirror.textContent = ''; hIdx = -1;
    if (v.trim()) exec(v);
  } else if (e.key === 'ArrowUp') {
    if (hist.length) {
      hIdx = hIdx < 0 ? hist.length - 1 : Math.max(0, hIdx - 1);
      cmd.value = hist[hIdx]; mirror.textContent = cmd.value;
    }
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    if (hIdx >= 0) {
      hIdx++; if (hIdx >= hist.length) { hIdx = -1; cmd.value = ''; } else cmd.value = hist[hIdx];
      mirror.textContent = cmd.value;
    }
    e.preventDefault();
  } else if (e.key === 'Escape') { cmd.blur(); e.preventDefault(); }
});
$('#cmdrow').addEventListener('click', () => cmd.focus());

/* ═══════════════ глобальные клавиши ═══════════════ */
const overlay = $('#overlay');
document.addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  if (!overlay.classList.contains('open')) {
    if (document.activeElement === cmd) return;
    const k = e.key;
    if (k === '+' || k === '=' || k === '-' || k === '_') {
      e.preventDefault();
      return applyFs(fsx + (k === '+' || k === '=' ? FS_STEP : -FS_STEP));
    }
    if (k === ':' || k === '/') {
      e.preventDefault(); cmd.focus();
      if (k === ':') { cmd.value = ':'; mirror.textContent = ':'; }
      return;
    }
    if (k === '?') { e.preventDefault(); return openHelp(); }
    if (k >= '1' && k <= '4') return nav(TABS[+k - 1].path);
    if (k === 'j' || k === 'ArrowDown') { $('#pane').scrollBy({ top: 34, behavior: smooth() }); e.preventDefault(); return; }
    if (k === 'k' || k === 'ArrowUp') { $('#pane').scrollBy({ top: -34, behavior: smooth() }); e.preventDefault(); return; }
    if (k === 'G' || k === 'End') { const p = $('#pane'); p.scrollTop = p.scrollHeight; return; }
    if (k === 'Home') { $('#pane').scrollTop = 0; return; }
    if (k === 'g') {
      if (gg) { $('#pane').scrollTop = 0; gg = false; }
      else { gg = true; setTimeout(() => gg = false, 600); }
      return;
    }
    if (k === 'h') return prevTab();
    if (k === 'l') return nextTab();
    if (k === 't') return cycleTheme();
  } else {
    if (e.key === 'Escape' || e.key === '?') { e.preventDefault(); closeOverlay(); }
  }
});

/* ═══════════════ движок команд ═══════════════ */
function exec(raw) {
  const shown = raw.trim();
  const clean = shown.replace(/^[:/]+/, '').trim();
  if (!clean) return;
  if (hist[hist.length - 1] !== clean) hist.push(clean);
  log('cmd', h(shown.replace(/^[:]+/, '').trim() || shown));
  const [c, ...rest] = clean.split(/\s+/);
  const cmd0 = c.toLowerCase(), arg = rest.join(' ');
  switch (cmd0) {
    case 'help': case 'h': openHelp(); break;
    case 'ls': cmdLs(arg); break;
    case 'cd': cmdCd(arg); break;
    case 'cat': cmdCat(arg); break;
    case 'open': case 'e': cmdOpen(arg); break;
    case 'about': nav('/about'); break;
    case 'projects': nav('/projects'); break;
    case 'skills': nav('/skills'); break;
    case 'contact': case 'contacts': nav('/contacts'); break;
    case 'whoami':
      outs(['fullstack-разработчик — Великий Новгород · UTC+3',
        '4 года 4 месяца · node.js / bun / postgres — полный цикл',
        'сейчас: AI · headless cms · self-hosted chat',
        'посмотрите open /projects или запустите neofetch']); break;
    case 'theme': cmdTheme(arg); break;
    case 'font': case 'fs': case 'fontsize': cmdFont(arg); break;
    case 'grep': cmdGrep(arg); break;
    case 'echo': log('out', h(arg)); break;
    case 'history':
      log('out', hist.slice(-15).map((x, i) => String(i + 1).padStart(3, ' ') + '  ' + h(x)).join('\n') || '(пусто)'); break;
    case 'clear': entries.length = 0; conBody.innerHTML = ''; log('sys', 'консоль очищена'); break;
    case 'date': log('out', h(new Date().toLocaleString('ru-RU', { dateStyle: 'full', timeStyle: 'medium' }))); break;
    case 'uptime': {
      const s = Math.floor((Date.now() - bootAt) / 1000);
      log('out', `аптайм ${Math.floor(s / 60)} мин ${s % 60} с (с момента открытия этого буфера) · команд: ${hist.length} · load: coffee`); break;
    }
    case 'pwd': log('out', location.pathname); break;
    case 'neofetch': openNeofetch(); break;
    case 'cowsay': cmdCow(arg); break;
    case 'sudo':
      if ((rest[0] || '').toLowerCase() === 'hire-me') hireSeq();
      else log('err', 'usage: sudo hire-me'); break;
    case 'hire-me': log('err', 'permission denied — вы точно не root? попробуйте sudo hire-me'); break;
    case 'q': log('out', 'E37: нет изменений с последнего сохранения — а вот :q из портфолио не принято. попробуйте :contacts'); break;
    case 'w': log('out', 'E45: буфер только для чтения — результат уже опубликован'); break;
    case 'wq': log('out', 'E45: сохранять нечего. сначала :w, потом :q, потом :contacts'); break;
    case 'q!': log('out', 'принудительный выход заблокирован — портфолио останется с вами. (попробуйте :contacts)'); break;
    case 'exit': log('out', 'выхода нет. есть только :contacts.'); break;
    default: log('err', h(`команда не найдена: ${c}`) + ' <span class="d2">(введите help)</span>');
  }
}

function cmdLs(a) {
  a = (a || '').replace(/\/$/, '');
  if (!a || a === '~' || a === '.')
    return log('out', '<span class="acc">projects/</span>  about.md  skills.json  contact.txt');
  if (a === 'projects')
    return log('out', 'achievements.log  ' + PROJECTS.map(p => p.id).join('  ') + ' <span class="d2">(см. open &lt;имя&gt;)</span>');
  log('err', `ls: ${h(a)}: нет такого каталога`);
}

function cmdCd(a) {
  a = (a || '').replace(/\/+$/, '').toLowerCase();
  if (!a || a === '~' || a === '.' || a === '..' || a === 'home') return nav('/about');
  if (a === 'about') return nav('/about');
  if (a === 'projects') return nav('/projects');
  if (a === 'skills') return nav('/skills');
  if (a === 'contact' || a === 'contacts') return nav('/contacts');
  let m;
  if ((m = a.match(/^projects\/([a-z0-9-]+)$/))) {
    const p = getProject(m[1]);
    return p ? nav(`/projects/${p.id}/`) : log('err', `cd: нет такого каталога: ${h(a)}`);
  }
  if (a === 'achievements' || a === 'achievements.log') return nav('/projects/#ach');
  const p = getProject(a);
  if (p) return nav(`/projects/${p.id}/`);
  log('err', `cd: нет такого каталога: ${h(a)}`);
}

function cmdOpen(a) {
  if (!a) return log('err', 'open что? — например `open velesrp`');
  a = a.toLowerCase();
  if (a === 'ach' || a === 'achievements' || a === 'achievements.log') return nav('/projects/#ach');
  if (a === 'projects' || a === 'projects/') return nav('/projects');
  let m;
  if ((m = a.match(/^projects\/([a-z0-9-]+)$/))) {
    const p = getProject(m[1]);
    return p ? nav(`/projects/${p.id}/`) : log('err', `буфер не найден: ${h(a)} (см. ls)`);
  }
  const t = TABS.find(t => t.id === a || t.id + 's' === a);
  if (t) return nav(t.path);
  const p = getProject(a);
  if (p) return nav(`/projects/${p.id}/`);
  log('err', `буфер не найден: ${h(a)} (см. ls)`);
}

function cmdCat(a) {
  if (!a) return log('err', 'usage: cat <файл>');
  a = a.toLowerCase();
  let file = null;
  if (a === 'about' || a === 'about.md') file = 'about.md';
  if (a === 'skills' || a === 'skills.json') file = 'skills.json';
  if (a === 'contact' || a === 'contacts' || a === 'contact.txt') file = 'contact.txt';
  if (a === 'projects' || a === 'projects/') file = 'projects/achievements.log';
  if (a === 'achievements' || a === 'achievements.log') file = 'projects/achievements.log';
  const p = getProject(a) || getProject(a.replace(/^projects\//, ''));
  if (p) file = 'projects/' + p.id;
  if (!file) return log('err', `cat: ${h(a)}: нет такого файла`);
  const rows = CORPUS.filter(x => x.f === file);
  log('out', rows.map((r, i) =>
    `<span class="d2">${String(i + 1).padStart(3, ' ')}│</span> ${h(r.t)}`).join('\n'));
}

function cmdTheme(a) {
  if (!a) return log('out', `темы: amber · phosphor · paper <span class="d2">— текущая: ${curTheme()}</span>`);
  THEMES.includes(a) ? setTheme(a) : log('err', `неизвестная тема: ${h(a)} — попробуйте amber · phosphor · paper`);
}

function cmdGrep(q) {
  if (!q) return log('out', 'usage: grep <паттерн> — поиск по всем буферам');
  const ql = q.toLowerCase();
  const hits = CORPUS.filter(x => x.t.toLowerCase().includes(ql));
  if (!hits.length) return log('err', `совпадений нет: "${h(q)}" (exit 1)`);
  const shown = hits.slice(0, 12);
  log('out', shown.map(x => `<span class="tl">${h(x.f)}</span><span class="d2">:</span>${h(x.t)}`).join('\n')
    + (hits.length > 12 ? `\n<span class="d2">… ещё ${hits.length - 12} — сузьте запрос</span>` : ''));
}

function cmdCow(m) {
  m = (m || 'привет').slice(0, 44);
  const w = m.length + 2;
  const lines = [
    ` ${'_'.repeat(w)}`, `< ${h(m)} >`, ` ${'-'.repeat(w)}`,
    '        \\   ^__^',
    '         \\  (oo)\\_______',
    '            (__)\\       )\\/\\',
    '                ||----w |',
    '                ||     ||'];
  lines.forEach(l => log('raw', l));
}

function hireSeq() {
  if (location.pathname.replace(/\/+$/, '') === '/contacts') return;
  log('out', '[sudo] пароль для visitor: ********');
  setTimeout(() => log('ok', 'доступ разрешён — маршрутизирую запрос'), 500);
  setTimeout(() => { log('ok', 'открываю contact.txt …'); location.href = '/portfolio-sh/contacts/'; }, 1200);
}

/* ═══════════════ оверлеи ═══════════════ */
function openDlg(title, sub, html) {
  $('#dlgTitle').textContent = title;
  $('#dlgSub').textContent = sub;
  $('#dlgBody').innerHTML = html;
  overlay.classList.add('open');
  cmd.blur();
}
function closeOverlay() { overlay.classList.remove('open'); }
$('#dlgClose').addEventListener('click', closeOverlay);
overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });

function openHelp() {
  openDlg('help', 'portfolio.sh — всё можно и кликать', `
  <div class="help-grid">
    <div>
      <div class="h2 sm"><span class="d2">##</span> команды</div>
      ${[
          ['ls [dir]', 'список буферов — ls projects для подробностей'],
          ['cat <file>', 'вывести буфер с номерами строк'],
          ['cd <page>', 'навигация — cd projects, cd contacts'],
          ['open <x>', 'перейти на страницу или в проект'],
          ['theme <t>', 'amber · phosphor · paper'],
          ['font [n]', 'размер шрифта 90–160% · font 150 · font + · font -'],
          ['grep <q>', 'поиск по всем буферам'],
          ['whoami', 'коротко о себе'],
          ['neofetch', 'системная карточка, живые значения'],
          ['cowsay <t>', 'база баз'],
          ['history', 'история команд'],
          ['clear', 'очистить консоль']
        ].map(([a, b]) => `<div class="hc"><b>${a}</b><span>${b}</span></div>`).join('')}
    </div>
    <div>
      <div class="h2 sm"><span class="d2">##</span> клавиши</div>
      ${[
          [': или /', 'фокус на командную строку'],
          ['1 – 4', 'переключить вкладку'],
          ['h / l', 'вкладка назад / вперёд'],
          ['j / k', 'прокрутка буфера'],
          ['g g / G', 'вверх / вниз'],
          ['t', 'следующая тема'],
          ['+ / -', 'шрифт больше / меньше'],
          ['?', 'эта панель'],
          ['esc', 'закрыть панель · снять фокус']
        ].map(([a, b]) => `<div class="hc"><b>${a}</b><span>${b}</span></div>`).join('')}
      <div class="help-note">и ещё спрятано: whoami · uptime · date · echo · pwd · :q · sudo hire-me</div>
    </div>
  </div>`);
}

const box = lines => {
  const w = Math.max(...lines.map(l => l.length));
  return [`┌${'─'.repeat(w + 2)}┐`, ...lines.map(l => `│ ${l.padEnd(w)} │`), `└${'─'.repeat(w + 2)}┘`];
};
function openNeofetch() {
  const s = Math.floor((Date.now() - bootAt) / 1000);
  const art = box([
    '▮ portfolio.sh', '',
    ' ~ ❯ whoami', ' fullstack dev',
    ' ~ ❯ role', ' node · bun · ts',
    ' ~ ❯ status', ' ● доступен для найма _'
  ]).join('\n');
  openDlg('neofetch', 'системная карточка — живые значения на момент открытия', `
    <div class="nf">
      <pre class="nf-art">${h(art)}</pre>
      <div class="nf-i">
        <span class="k">user</span><span class="v">fullstack-разработчик</span>
        <span class="k">role</span><span class="v">node · bun · typescript</span>
        <span class="k">host</span><span class="v">portfolio.sh v2.3</span>
        <span class="k">uptime</span><span class="v">${Math.floor(s / 60)}m ${s % 60}s</span>
        <span class="k">shell</span><span class="v">portfolio.sh</span>
        <span class="k">theme</span><span class="v">${curTheme()}</span>
        <span class="k">viewport</span><span class="v">${innerWidth}×${innerHeight}</span>
        <span class="k">buffers</span><span class="v">${TABS.length} страницы · ${PROJECTS.length} проекта</span>
        <span class="k">location</span><span class="v">Великий Новгород · UTC+3</span>
        <span class="k">status</span><span class="v grn">● доступен для найма</span>
      </div>
    </div>`);
}

/* ═══════════════ часы (Великий Новгород, UTC+3) ═══════════════ */
function nvg() {
  try { return new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' }); }
  catch (e) { return fmtTime(new Date()); }
}
setInterval(() => {
  const now = new Date(), t = fmtTime(now);
  $('#tbClock').textContent = t;
  $('#sbClock').textContent = t;
  const d = $('#tbDate');
  if (d) d.textContent = now.toLocaleDateString('ru-RU', { weekday: 'short', day: '2-digit', month: 'short' });
  const z = document.querySelector('#tzLive');
  if (z) z.textContent = nvg();
}, 1000);

/* ═══════════════ очистка консоли + мета-строка + загрузка ═══════════════ */
$('#clearBtn').addEventListener('click', () => {
  entries.length = 0; conBody.innerHTML = ''; log('sys', 'консоль очищена');
});

function recalcMeta() {
  const m = document.querySelector('#metaLine');
  const page = $('#page');
  if (m && page) m.textContent = '~ ' + Math.max(1, Math.round(page.offsetHeight / 20)) + ' строк';
}

function boot() {
  requestAnimationFrame(() => document.body.classList.remove('pre'));
  const lines = [
    ['sys', 'portfolio.sh v2.3.0 — запуск'],
    ['sys', 'mount /home/dev … ok'],
    ['sys', 'индексация ' + TABS.length + ' буферов · ' + PROJECTS.length + ' проектов … ok'],
    ['sys', 'темы ▸ amber · phosphor · paper … ok'],
    ['ok', `готов за ${Math.round(performance.now())} мс — консоли настоящие. введите help`]];
  lines.forEach((l, i) => setTimeout(() => log(l[0], l[1]), 250 + i * 180));
}

/* ═══════════════ инициализация ═══════════════ */
(function init() {
  const saved = (() => { try { return localStorage.getItem('pf-theme'); } catch (e) { return null; } })();
  if (saved && THEMES.includes(saved)) setTheme(saved, { silent: true });
  recalcMeta();
  boot();
  document.fonts && document.fonts.ready.then(recalcMeta);
})();
