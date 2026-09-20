// Per-day token ledger.
//
// ccusage can only report days whose transcripts still exist under ~/.claude,
// and Claude Code deletes those after `cleanupPeriodDays` (30 by default). So
// the published total cannot come from a single ccusage run — it comes from a
// ledger on this Mac that remembers every day ever seen, merged by the larger
// count per date. The ledger stays local; only its sum is ever published.

/**
 * Read one day's total per date out of `ccusage claude daily --json`.
 *
 * `totalTokens` is input + output + cache creation + cache reads, so cache
 * reads are counted. Reading it once per day (rather than also adding
 * `totals.totalTokens`) is what keeps the number from doubling.
 */
export function dailyTotals(report) {
  if (!report || !Array.isArray(report.daily)) {
    throw new Error('ccusage output has no `daily` array — schema changed?');
  }

  const days = {};
  for (const day of report.daily) {
    if (day && (day.agent !== undefined || day.metadata !== undefined)) {
      throw new Error(
        'ccusage output carries an `agent` field — that is the all-agents ' +
        'report, which includes Codex. Use `ccusage claude daily --json`.',
      );
    }
    const date = day?.date;
    if (typeof date !== 'string') {
      throw new Error('a daily entry has no `date` — schema changed?');
    }
    if (typeof day.totalTokens !== 'number' || !Number.isFinite(day.totalTokens)) {
      throw new Error(`daily entry ${date} has no numeric \`totalTokens\` — schema changed?`);
    }
    days[date] = day.totalTokens;
  }
  return days;
}

/** Merge two ledgers by the larger count per date. Never lowers a date. */
export function mergeLedger(stored, incoming) {
  const merged = {};
  for (const source of [stored, incoming]) {
    for (const [date, count] of Object.entries(source ?? {})) {
      if (typeof count !== 'number' || !Number.isFinite(count) || count < 0) continue;
      merged[date] = Math.max(merged[date] ?? 0, count);
    }
  }
  return merged;
}

/** Total tokens across every date in a ledger. */
export function sumLedger(ledger) {
  return Object.values(ledger ?? {}).reduce(
    (total, count) => total + (typeof count === 'number' && Number.isFinite(count) && count >= 0 ? count : 0),
    0,
  );
}
