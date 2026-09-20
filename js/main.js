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
