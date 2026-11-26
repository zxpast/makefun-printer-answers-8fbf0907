// The Printer Finally Answers — a one-line entry.
// Runs on Node 22 with the standard library alone: nothing fetched, nothing
// random. It leaves a single line (no trailing newline) in entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Resolve the output file path from the environment, defaulting to /output.
function outputPath() {
  const dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  return join(dir, "entry.txt");
}

// Guard the sealed scorer's rule: 1–240 UTF-8 characters, a single line, and
// more than whitespace alone. Returns the line untouched when it passes.
function validateLine(line) {
  const lineLength = [...line].length;
  const fitsLengthLimit = lineLength >= 1 && lineLength <= 240;
  const isSingleLine = !line.includes("\n");
  if (!fitsLengthLimit || !line.trim() || !isSingleLine) {
    throw new Error("entry line violates the 1-240 char single-line gate");
  }
  return line;
}

// The printer speaks at last, tired, literal, and a touch passive-aggressive:
// three beats of breakdown — a jam in tray 1, an empty tray 2, and error
// 13.20.00, a genuine HP paper-jam code — followed by the reckoning: 47,312
// sheets handed to people who thump it, against the ONE page it ever held on
// to. The punchline closes on a quote — the kept page is the one that reads
// 'I quit.' The figures work by contrast (47,312 fed against 1 kept); no
// explanation is offered; the joke survives a single read on its own.
const PRINTER_LINE = validateLine(
  [
    "Tray 1 jammed, tray 2 empty, error 13.20.00.",
    "I have fed 47,312 sheets to people who thump me,",
    "and the only page I ever kept was the one that says 'I quit.'",
  ].join(" "),
);

const OUT_PATH = outputPath();
mkdirSync(OUT_PATH.replace(/\/entry\.txt$/, ""), { recursive: true });
writeFileSync(OUT_PATH, PRINTER_LINE, "utf8");
