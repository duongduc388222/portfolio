#!/usr/bin/env node
// Write stats.json: the total Claude Code tokens burnt on this Mac, and when
// that total was last checked.
//
// This runs locally, not in CI: ccusage reads the JSONL transcripts under
// ~/.claude, which only exist on Duc's Mac.
//
// Two things this script is careful about:
//   1. It asks ccusage for Claude only. The bare `ccusage` command merges every
//      agent it can find, Codex included, and Tokens Burnt is a Claude Code
//      number.
//   2. It keeps a per-day ledger outside the repo. Claude Code deletes
//      transcripts after ~30 days, so a fresh ccusage run sees less history
//      than the last one did; merging by the larger count per date means the
//      total never goes down. Per-day counts stay in that ledger — stats.json
//      carries only the total and the check time.

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { dailyTotals, mergeLedger, sumLedger } from './lib/ledger.mjs';

// Pinned: ccusage's JSON schema has changed between majors, and this script
// reads specific fields. Bump deliberately, and re-run the tests after.
const CCUSAGE = 'ccusage@20.0.20';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const statsPath = join(repoRoot, 'stats.json');
const ledgerPath =
  process.env.PORTFOLIO_TOKENS_LEDGER ||
  join(homedir(), '.local', 'state', 'portfolio', 'tokens-ledger.json');

function readLedger(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return {};
    // A corrupt ledger must not silently reset the total to this month's days.
    throw new Error(`ledger at ${path} is unreadable: ${err.message}`);
  }
}

function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
}

const raw = execFileSync('npx', ['--yes', CCUSAGE, 'claude', 'daily', '--json'], {
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
});

const seen = dailyTotals(JSON.parse(raw));
const stored = readLedger(ledgerPath);
const ledger = mergeLedger(stored, seen);
const total = sumLedger(ledger);

writeJson(ledgerPath, ledger);
writeJson(statsPath, { tokens_burnt: total, checked_at: new Date().toISOString() });

const carried = Object.keys(ledger).length - Object.keys(seen).length;
console.log(
  `${statsPath}: ${total} tokens across ${Object.keys(ledger).length} days ` +
  `(${Object.keys(seen).length} from ccusage, ${carried} carried by the ledger)`,
);
