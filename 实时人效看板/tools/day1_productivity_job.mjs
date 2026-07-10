#!/usr/bin/env node
import { addDays, parseYmd } from "./wms_export_core.mjs";
import { defaultDay1BusinessDate, runDay1Job, todayFixedOffset } from "./day1_productivity.mjs";

function lastWednesdayBeforeToday() {
  const today = todayFixedOffset();
  const { year, month, day } = parseYmd(today);
  const date = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = date.getUTCDay();
  const wednesday = 3;
  const diff = ((dayOfWeek - wednesday + 7) % 7) || 7;
  return addDays(today, -diff);
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--date") options.date = argv[++index];
    else if (arg === "--from") options.from = argv[++index];
    else if (arg === "--to") options.to = argv[++index];
    else if (arg === "--last-wednesday") {
      options.from = lastWednesdayBeforeToday();
      options.to = addDays(defaultDay1BusinessDate(), 0);
    }
  }
  return options;
}

const options = parseArgs(process.argv.slice(2));
const results = await runDay1Job(options);
console.log(JSON.stringify({
  ok: true,
  count: results.length,
  dates: results.map((item) => item.businessDate),
  files: results.map((item) => item.rawFile),
}, null, 2));
