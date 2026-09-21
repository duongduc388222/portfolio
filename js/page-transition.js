/* ─── PAGE TRANSITION ─────────────────────────────────────
   Fade the current page out, then navigate. The styles live in the PAGE
   TRANSITION section of css/style.css.

   Stands alone rather than living in js/main.js because index.html — the
   landing terminal — has no navbar, no modal and no theme switcher, and so
   does not load main.js. The transition is the one behaviour every page
   shares, including that one. */
(() => {
  const body = document.body;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

  /* How long to wait before giving up on transitionend and navigating anyway.
     Must exceed the 180ms in the stylesheet: a transitionend that never fires
     (a backgrounded tab, a browser that skips the animation) would otherwise
     strand the click on a faded-out page that never goes anywhere. */
  const FALLBACK_MS = 220;

  document.addEventListener('click', e => {
    if (reduced.matches) return;
    // Anything but an unmodified primary click is the user asking for a new
    // tab, a context menu or a download — none of which leave this page.
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;

    // Same-document links (mailto:, tel:, #anchors, the current page) are not
    // navigations. Fading out for one would blank the page and never restore.
    let url;
    try { url = new URL(a.href, location.href); } catch { return; }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return;

    e.preventDefault();
    body.classList.add('is-leaving');

    let navigated = false;
    const go = () => {
      if (navigated) return;
      navigated = true;
      location.href = url.href;
    };
    body.addEventListener('transitionend', go, { once: true });
    setTimeout(go, FALLBACK_MS);
  });

  /* Back/forward restores this document from the bfcache exactly as it was
     left — mid-fade, opacity 0. Without this the page you return to is blank. */
  addEventListener('pageshow', () => body.classList.remove('is-leaving'));
})();
