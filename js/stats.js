/* ─── TOKENS BURNT: FORMATTING ───────────────────────────────
   Pure helpers shared by js/main.js and covered by
   scripts/stats-format.test.mjs. Classic script, no build step.        */
(function (root) {
  'use strict';

  var UNITS = [
    { min: 1e9, div: 1e9, suffix: 'B' },
    { min: 1e6, div: 1e6, suffix: 'M' },
    { min: 1e3, div: 1e3, suffix: 'K' },
    { min: 0,   div: 1,   suffix: ''  },
  ];

  /* Decimals that leave three significant figures: 1.21B, 12.3M, 513M. */
  function decimalsFor(scaled) {
    if (scaled >= 100) return 0;
    if (scaled >= 10) return 1;
    return 2;
  }

  /**
   * Render a token count as three significant figures with a K/M/B suffix.
   * Returns { text, value, decimals, suffix }, or null if `n` is not a count —
   * callers show a dash for null rather than inventing a zero.
   */
  function formatCount(n) {
    if (typeof n !== 'number' || !isFinite(n) || n < 0) return null;

    for (var i = 0; i < UNITS.length; i++) {
      var unit = UNITS[i];
      if (n < unit.min) continue;

      var scaled = n / unit.div;
      var decimals = decimalsFor(scaled);
      var value = Number(scaled.toFixed(decimals));

      /* Rounding can carry into the next unit: 999,999,999 → 1000M → 1.00B. */
      if (value >= 1000 && i > 0) {
        unit = UNITS[i - 1];
        scaled = n / unit.div;
        decimals = decimalsFor(scaled);
        value = Number(scaled.toFixed(decimals));
      }

      /* Below a thousand the count is exact, so show it whole. */
      if (unit.suffix === '') {
        value = Math.round(n);
        decimals = 0;
      }

      return {
        text: value.toFixed(decimals) + unit.suffix,
        value: value,
        decimals: decimals,
        suffix: unit.suffix,
      };
    }
    return null;
  }

  /**
   * "UPDATED TODAY" under 24 hours, then "UPDATED 1D AGO". Never says stale:
   * the line reports when the number was last checked, at any age. Returns
   * null only when the timestamp is unusable, so the line can be left empty.
   */
  function freshnessLabel(checkedAt, now) {
    if (typeof checkedAt !== 'string') return null;
    var then = Date.parse(checkedAt);
    if (isNaN(then)) return null;

    var days = Math.floor(Math.max(0, now - then) / 86400000);
    return days === 0 ? 'UPDATED TODAY' : 'UPDATED ' + days + 'D AGO';
  }

  root.PortfolioStats = { formatCount: formatCount, freshnessLabel: freshnessLabel };
})(typeof globalThis !== 'undefined' ? globalThis : this);
