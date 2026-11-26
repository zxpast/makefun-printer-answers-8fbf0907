// The Printer Finally Answers — one-line entry.
// Node 22, stdlib only, deterministic, no network.
// Writes exactly one line (no trailing newline) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const OUT_PATH = join(OUT_DIR, "entry.txt");

// The office printer, in its own weary, literal, faintly passive-aggressive
// voice: three beats of failure (tray 1 jammed, tray 2 empty, error
// 13.20.00 — a real HP paper-jam code), then the ledger — 47,312 sheets fed
// to people who thump it, against the ONE page it ever kept. The twist lands
// on the last words, a quote: the kept page is the one that says 'I quit.'
// The number pays off by contrast (47,312 fed vs 1 kept); nothing is
// explained; the joke stands alone on a single read.
const LINE = [
  "Tray 1 jammed, tray 2 empty, error 13.20.00.",
  "I have fed 47,312 sheets to people who thump me,",
  "and the only page I ever kept was the one that says 'I quit.'",
].join(" ");

// Gate guard: the sealed scorer accepts 1-240 UTF-8 chars, not only whitespace.
// Count the code points once, then reuse the count in the guard.
const len = [...LINE].length;
const withinLimits = len >= 1 && len <= 240;
const singleLine = !LINE.includes("\n");
if (!withinLimits || !LINE.trim() || !singleLine) {
  throw new Error("entry line violates the 1-240 char single-line gate");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_PATH, LINE, "utf8");
