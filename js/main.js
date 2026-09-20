/* ─── FOCUS HELPERS ─────────────────────────────────────── */
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, textarea, select';
let lastFocusBeforeModal = null;

function trapFocus(container, e) {
  if (e.key !== 'Tab') return;
  const items = container.querySelectorAll(FOCUSABLE);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

/* ─── CONNECT MODAL ─────────────────────────────────────── */
function openConnect() {
  const modal = document.getElementById('connect-modal');
  if (!modal) return;
  lastFocusBeforeModal = document.activeElement;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) closeBtn.focus();
}

function closeConnect() {
  const modal = document.getElementById('connect-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  if (lastFocusBeforeModal && typeof lastFocusBeforeModal.focus === 'function') {
    lastFocusBeforeModal.focus();
    lastFocusBeforeModal = null;
  }
}

/* ─── MOBILE MENU (M8) ──────────────────────────────────── */
let lastFocusBeforeMenu = null;

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const hamburger = document.querySelector('.nav-hamburger');
  if (!menu) return;
  menu.classList.remove('open');
  menu.setAttribute('aria-hidden', 'true');
  if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  if (lastFocusBeforeMenu && typeof lastFocusBeforeMenu.focus === 'function') {
    lastFocusBeforeMenu.focus();
    lastFocusBeforeMenu = null;
  } else if (hamburger) {
    hamburger.focus();
  }
}

function initMobileMenu() {
  const hamburger = document.querySelector('.nav-hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!hamburger || !menu) return;

  const openMenu = () => {
    lastFocusBeforeMenu = document.activeElement;
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const first = menu.querySelector(FOCUSABLE);
    if (first) first.focus();
  };

  hamburger.addEventListener('click', () => {
    if (menu.classList.contains('open')) closeMobileMenu();
    else openMenu();
  });

  // Close on link click
  menu.querySelectorAll('.nav-menu-link').forEach(link => {
    link.addEventListener('click', () => closeMobileMenu());
  });

  // Close button
  const closeBtn = menu.querySelector('.nav-menu-close');
  if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);

  // Click on background closes
  menu.addEventListener('click', e => {
    if (e.target === menu) closeMobileMenu();
  });
}

/* ─── COPY EMAIL ─────────────────────────────────────────── */
/* Each button carries its own address in data-copy. There are two (work and
   school) and a hardcoded address would have demoted whichever one it omitted. */
function flashCopied(btn) {
  const original = btn.innerHTML;
  btn.innerHTML = 'COPIED ✓ <span class="contact-btn-arrow">—</span>';
  setTimeout(() => { btn.innerHTML = original; }, 2000);
}

function copyText(btn) {
  const text = btn.dataset.copy;
  if (!text) return;
  navigator.clipboard.writeText(text)
    .then(() => flashCopied(btn))
    .catch(() => {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      flashCopied(btn);
    });
}

function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => copyText(btn));
  });
}

/* ─── WORK PAGE: CATEGORY FILTER (shared filter-btn + data-game contract) ─ */
function initGameFilter() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const gameCards  = document.querySelectorAll('[data-game]');
  const label      = document.getElementById('records-label');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (label) {
        label.textContent = filter === 'all' ? 'ALL RECORDS' : filter.toUpperCase();
      }

      gameCards.forEach(card => {
        const tags = card.dataset.game.split(' ');
        const show = filter === 'all' || tags.includes(filter);
        card.style.display = show ? '' : 'none';
        if (show) card.style.animation = 'fadeUp 0.25s ease forwards';
      });
    });
  });
}

/* ─── LIVE STATS (tokens_burnt — see scripts/update-stats.mjs) ──
   stats.json carries the total and when it was last checked; the shape and
   wording live in js/stats.js. With no usable number the markup's dash and
   empty meta line stay exactly as served, so nothing shifts and no zero is
   ever shown as if it were real.                                         */
async function loadLiveStats() {
  const cell = document.querySelector('[data-stat="tokens_burnt"]');
  if (!cell || !window.PortfolioStats) return;

  try {
    const res = await fetch('/stats.json', { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();

    const count = PortfolioStats.formatCount(data.tokens_burnt);
    if (!count) return;
    cell.dataset.count = String(count.value);
    cell.dataset.suffix = count.suffix;
    cell.dataset.decimals = String(count.decimals);

    const meta = document.querySelector('[data-stat-meta="tokens_burnt"]');
    const label = PortfolioStats.freshnessLabel(data.checked_at, Date.now());
    if (meta && label) {
      meta.textContent = '// ' + label;
      meta.classList.remove('is-empty');
    }
  } catch {
    // Offline, blocked or malformed — the dash stands.
  }
}

/* ─── COUNT-UP ANIMATION (home hero stats) ──────────────── */
function initCountUp() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  els.forEach(el => {
    const target = parseFloat(el.dataset.count);
    if (!isFinite(target)) return;
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals, 10) || 0;
    const pad = el.dataset.pad === 'true';
    const duration = 2000;
    const steps = 60;
    const stepMs = duration / steps;
    const inc = target / steps;
    let current = 0;

    const fmt = (n) => {
      const body = decimals > 0 ? n.toFixed(decimals) : String(Math.floor(n));
      return (pad && n < 10 ? '0' + body : body) + suffix;
    };

    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        el.textContent = fmt(target);
        clearInterval(timer);
      } else {
        el.textContent = fmt(current);
      }
    }, stepMs);
  });
}

/* ─── INIT ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Modal: close on overlay click
  const overlay = document.getElementById('connect-modal');
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeConnect();
    });
  }

  // Modal: close on ESC + tab trap
  document.addEventListener('keydown', e => {
    const modal = document.getElementById('connect-modal');
    const menu = document.getElementById('mobile-menu');
    const modalOpen = modal && modal.classList.contains('active');
    const menuOpen = menu && menu.classList.contains('open');
    if (e.key === 'Escape') {
      if (menuOpen) closeMobileMenu();
      else if (modalOpen) closeConnect();
    }
    if (e.key === 'Tab') {
      if (menuOpen) trapFocus(menu, e);
      else if (modalOpen) trapFocus(modal, e);
    }
  });

  initGameFilter();
  loadLiveStats().then(initCountUp);
  initMobileMenu();
  initCopyButtons();

  // Navbar active link
  const path = window.location.pathname.replace(/\/$/, '').split('/').pop() || 'index';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href')?.replace(/\/$/, '').split('/').pop() || 'index';
    if (href === path || (path === '' && href === 'index')) link.classList.add('active');
  });
});

/* ─── THEME SWITCHER (see .scratch/portfolio-v2/issues/12) ──
   Two axes. The GROUND is the fixed harmony — one dark and its literal flip —
   and never varies between Themes. The ACCENT is what a Theme actually is.
   The swatch popover is the chosen control; nav-cycle, command-menu and
   footer-row variants were dropped. The token values live in css/style.css,
   and the no-flash script in each page head applies them before first paint —
   the lists below must stay in step with both. */
(() => {
  const ACCENTS = [
    { id: 'gold',      label: 'GOLD',      fill: '#ffd700' },
    { id: 'vermilion', label: 'VERMILION', fill: '#e04b1f' },
    { id: 'cyan',      label: 'CYAN',      fill: '#14919b' },
    { id: 'violet',    label: 'VIOLET',    fill: '#7c3aed' },
  ];
  const GROUNDS = [
    { id: 'night', label: 'NIGHT', bg: '#0a0f1e', fg: '#ffffff' },
    { id: 'day',   label: 'DAY',   bg: '#f4f6fa', fg: '#0a0f1e' },
  ];
  const KEY_ACCENT = 'theme-accent';
  const KEY_SCHEME = 'theme-scheme';
  const SYSTEM = 'system';      // sentinel: an explicit opt-in to follow the OS
  const root = document.documentElement;
  // Matches on `dark`, exactly as the no-flash script does, so a browser
  // reporting no preference at all resolves the same way in both places.
  const osDark = matchMedia('(prefers-color-scheme: dark)');
  const listeners = [];

  const accentById = id => ACCENTS.find(a => a.id === id);
  const groundById = id => GROUNDS.find(g => g.id === id);
  // The scheme has three distinct stored states: a ground id, the SYSTEM
  // sentinel, or nothing. Without the sentinel, opting into MATCH_SYSTEM would
  // be indistinguishable from a first visit and the next load would silently
  // drop back to the default. The accent needs no such notion — the OS has no
  // opinion about which bright colour you like.
  const read = k => { try { return localStorage.getItem(k); } catch { return null; } };
  const write = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
  const savedAccent = () => (accentById(read(KEY_ACCENT)) ? read(KEY_ACCENT) : null);
  const savedScheme = () => (groundById(read(KEY_SCHEME)) ? read(KEY_SCHEME) : null);
  const followingSystem = () => read(KEY_SCHEME) === SYSTEM;
  const systemScheme = () => (osDark.matches ? 'night' : 'day');
  const current = () => ({ accent: root.dataset.accent, scheme: root.dataset.scheme });

  const live = document.createElement('p');
  live.id = 'theme-live';
  live.className = 'sr-only';
  live.setAttribute('role', 'status');
  live.setAttribute('aria-live', 'polite');
  document.body.append(live);

  let easeTimer = 0;
  // Either axis may be omitted: previewing an accent must not disturb the ground.
  function applyTheme({ accent, scheme } = {}, { save = true, announce = true } = {}) {
    const now = current();
    accent = accent ?? now.accent;
    scheme = scheme ?? now.scheme;
    if (accent !== now.accent || scheme !== now.scheme) {
      root.classList.add('theme-switching');
      root.dataset.accent = accent;
      root.dataset.scheme = scheme;
      clearTimeout(easeTimer); // rapid previews: keep easing until the last settles
      easeTimer = setTimeout(() => root.classList.remove('theme-switching'), 300);
    }
    if (save) { write(KEY_ACCENT, accent); write(KEY_SCHEME, scheme); }
    if (announce) live.textContent =
      `Theme: ${accentById(accent).label} on ${groundById(scheme).label}`;
    listeners.forEach(fn => fn());
  }
  const onChange = fn => { listeners.push(fn); fn(); };

  // Only an explicit MATCH_SYSTEM opt-in follows the OS live. A first visit gets
  // the night ground — the site as designed — whatever the OS says.
  osDark.addEventListener('change', () => {
    if (followingSystem()) applyTheme({ scheme: systemScheme() }, { save: false });
  });

  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'style') Object.assign(n.style, v);
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    n.append(...kids);
    return n;
  };

  const navLinks = document.querySelector('.nav-links');
  const connectBtn = navLinks?.querySelector('.btn-connect-nav');
  const navInner = document.querySelector('.navbar-inner');
  const hamburger = document.querySelector('.nav-hamburger');
  // The Landing has no navbar. It still honours the stored Theme through the
  // head script; it just offers no control, so there is nothing to mount.
  if (!navLinks || !connectBtn || !navInner || !hamburger) return;

  /* The switcher: a swatch button opening a list of Themes with previews.
     Hovering or arrowing onto a row previews that Theme live; click/Enter
     applies it; Esc, Tab, or a click outside puts the old one back. */
  const pop = el('div', { class: 'theme-pop', role: 'menu', 'aria-label': 'Theme', hidden: '' });
  // An accent row previews on whatever ground is applied right now, and a ground
  // row previews with the applied accent, so the two axes read as independent.
  const accentSwatch = a => el('span', { class: 'theme-preview', style: { background: 'var(--bg)' } },
    el('i', { style: { background: 'var(--text-primary)' } }), el('b', { style: { background: a.fill } }));
  const groundSwatch = g => el('span', { class: 'theme-preview', style: { background: g.bg } },
    el('i', { style: { background: g.fg } }), el('b', { style: { background: 'var(--accent)' } }));
  // Every row carries both trailing cells even when empty, so the AUTO row's
  // kind label and the checked glyph sit in the same columns on every row.
  const kind = text => el('span', { class: 'theme-opt-kind' }, text || '');
  const mark = () => el('span', { class: 'theme-opt-mark', 'aria-hidden': 'true' });
  const previewOn = (o, patch) => {
    const show = () => {
      if (document.activeElement !== o) o.focus();
      applyTheme(patch(), { save: false, announce: false });
    };
    o.addEventListener('pointerenter', show);
    o.addEventListener('focus', show);
  };

  pop.append(el('div', { class: 'theme-pop-head' }, 'ACCENT'));
  const opts = ACCENTS.map(a => {
    const o = el('button', {
      class: 'theme-opt', type: 'button', role: 'menuitemradio', 'data-id': a.id,
      onclick: () => { applyTheme({ accent: a.id }); close(false); },
    }, accentSwatch(a), a.label, kind(), mark());
    previewOn(o, () => ({ accent: a.id }));
    pop.append(o);
    return o;
  });

  pop.append(el('div', { class: 'theme-opt-sep' }));
  pop.append(el('div', { class: 'theme-pop-head' }, 'GROUND'));
  const grounds = GROUNDS.map(g => {
    const o = el('button', {
      class: 'theme-opt', type: 'button', role: 'menuitemradio', 'data-scheme': g.id,
      onclick: () => { applyTheme({ scheme: g.id }); close(false); },
    }, groundSwatch(g), g.label, kind(), mark());
    previewOn(o, () => ({ scheme: g.id }));
    pop.append(o);
    return o;
  });
  const auto = el('button', {
    class: 'theme-opt', type: 'button', role: 'menuitemradio', 'data-scheme': SYSTEM,
    onclick: () => {
      write(KEY_SCHEME, SYSTEM);
      applyTheme({ scheme: systemScheme() }, { save: false });
      close(false);
    },
  // Half of each ground, read off GROUNDS rather than written out: the row means
  // "either of these two", so a literal here goes stale the moment a ground moves.
  }, el('span', { class: 'theme-preview', style: {
    background: `linear-gradient(90deg, ${GROUNDS[0].bg} 50%, ${GROUNDS[1].bg} 50%)`,
  } }), 'MATCH_SYSTEM', kind('AUTO'), mark());
  previewOn(auto, () => ({ scheme: systemScheme() }));
  pop.append(auto);
  document.body.append(pop);
  const items = [...opts, ...grounds, auto];

  let opener = null, before = null;
  const btns = [];
  const makeBtn = extra => {
    // Four pips, one per accent: under the two-axis model the accent is what a
    // Theme is, so each pip names a choice.
    const b = el('button', {
      class: `theme-swatch-btn ${extra}`.trim(), type: 'button',
      'aria-haspopup': 'menu', 'aria-expanded': 'false',
    }, ...ACCENTS.map(a => el('span', { 'data-id': a.id, style: { background: a.fill } })));
    b.addEventListener('click', () => (pop.hidden ? open(b) : close(true)));
    btns.push(b);
    return b;
  };
  function open(b) {
    opener = b;
    before = current(); // both axes: a preview may move either
    pop.hidden = false;
    const r = b.getBoundingClientRect();
    pop.style.top = `${r.bottom + 8}px`;
    pop.style.left = `${Math.max(12, Math.min(r.right - pop.offsetWidth, innerWidth - pop.offsetWidth - 12))}px`;
    b.setAttribute('aria-expanded', 'true');
    (items.find(i => i.getAttribute('aria-checked') === 'true') || items[0]).focus();
  }
  function close(restore) {
    if (pop.hidden) return;
    pop.hidden = true;
    if (restore) applyTheme(before, { save: false, announce: false });
    opener.setAttribute('aria-expanded', 'false');
    opener.focus();
  }
  pop.addEventListener('keydown', e => {
    const i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    if (e.key === 'Escape' || e.key === 'Tab') { e.preventDefault(); close(true); }
  });
  document.addEventListener('click', e => {
    if (!pop.hidden && !pop.contains(e.target) && !opener.contains(e.target)) close(true);
  });
  addEventListener('resize', () => close(true));

  navLinks.insertBefore(makeBtn(''), connectBtn);
  navInner.insertBefore(makeBtn('theme-swatch-btn--mobile'), hamburger);

  onChange(() => { // checked = the applied choice, not the row being previewed
    opts.forEach(o => o.setAttribute('aria-checked', String(o.dataset.id === savedAccent())));
    grounds.forEach(o => o.setAttribute('aria-checked', String(o.dataset.scheme === savedScheme())));
    auto.setAttribute('aria-checked', String(followingSystem()));
    items.forEach(o => {
      o.querySelector('.theme-opt-mark').textContent =
        o.getAttribute('aria-checked') === 'true' ? '●' : '';
    });
    // The pips track what is APPLIED, not what is stored: the button sits beside
    // the page it describes, so during a preview it must agree with the page.
    // The stored choice is the one the rows' glyph marks.
    const now = current();
    btns.forEach(b => {
      b.querySelectorAll('span').forEach(s =>
        s.toggleAttribute('data-current', s.dataset.id === now.accent));
      b.setAttribute('aria-label',
        `Choose theme — ${accentById(now.accent).label} on ${groundById(now.scheme).label}`);
    });
  });
})();
