import { t, getCurrentLocale } from './i18n';

export interface MidnightSlot {
  realMs: number;
  unixSeconds: number;
}

export interface DiscordFormat {
  code: string;
  label: string;
  preview: string;
  markdown: string;
}

const GAME_DAY_MS = 4 * 60 * 60 * 1000; // 4 real hours per game day

/**
 * Compute the real-world Unix timestamp (ms) of the most recent game midnight,
 * given the current in-game time as a decimal hour value and the current real time.
 */
export function computeAnchor(nowMs: number, gameDecimalHours: number): number {
  const gameFraction = gameDecimalHours / 24;
  const realOffsetMs = gameFraction * GAME_DAY_MS;
  return nowMs - realOffsetMs;
}

/**
 * Return the UTC offset in milliseconds for a given timezone at a given Unix ms.
 * Positive = west of UTC (e.g. UTC-5 → +18000000), negative = east of UTC.
 */
function getUTCOffsetMs(tz: string, atMs: number): number {
  const date = new Date(atMs);
  // Format the date in the target timezone, then parse it back as if it were UTC.
  // The difference is the offset.
  const localStr = date.toLocaleString('en-US', {
    timeZone: tz,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  // toLocaleString with en-US and hour12:false gives: "MM/DD/YYYY, HH:MM:SS"
  // We need to reparse this as UTC to find the offset.
  const localAsUtcMs = new Date(localStr + ' UTC').getTime();
  return atMs - localAsUtcMs;
}

/**
 * Return the Unix ms of local midnight (00:00:00) for the given date string
 * (YYYY-MM-DD) in the given IANA timezone.
 */
function localMidnightMs(dateStr: string, tz: string): number {
  const parts = dateStr.split('-');
  const y = parseInt(parts[0] ?? '2000', 10);
  const m = parseInt(parts[1] ?? '1', 10);
  const d = parseInt(parts[2] ?? '1', 10);

  // Sample offset at noon UTC to avoid DST ambiguous hour (02:00 transitions).
  const noonUtcMs = Date.UTC(y, m - 1, d, 12, 0, 0);
  const offsetMs = getUTCOffsetMs(tz, noonUtcMs);

  // local midnight = UTC midnight + offset
  // e.g. UTC-5: local 00:00 = UTC 05:00, so midnightMs = Date.UTC(y,m-1,d) + 5h
  return Date.UTC(y, m - 1, d, 0, 0, 0) + offsetMs;
}

/**
 * Return all game midnight times that fall within the given calendar day
 * (identified by dateStr YYYY-MM-DD) in the given timezone.
 * Normally returns exactly 6 slots (24h / 4h per game day = 6).
 */
export function getMidnightsForDate(
  anchorMs: number,
  dateStr: string,
  tz: string,
): MidnightSlot[] {
  const dayStartMs = localMidnightMs(dateStr, tz);
  const dayEndMs = dayStartMs + 24 * 60 * 60 * 1000; // exclusive

  const results: MidnightSlot[] = [];

  // Cast a wide net: n from -100 to +200 covers any reasonable anchor offset.
  for (let n = -100; n <= 200; n++) {
    const ms = anchorMs + n * GAME_DAY_MS;
    if (ms >= dayStartMs && ms < dayEndMs) {
      results.push({
        realMs: ms,
        unixSeconds: Math.floor(ms / 1000),
      });
    }
  }

  return results;
}

/**
 * Return all Discord timestamp formats for a given midnight slot.
 * Previews are rendered in the user's chosen timezone for reference.
 */
export function getDiscordFormats(slot: MidnightSlot, tz: string): DiscordFormat[] {
  const ts = slot.unixSeconds;
  const d = new Date(slot.realMs);
  const locale = getCurrentLocale();

  const fmt = (opts: Intl.DateTimeFormatOptions): string =>
    new Intl.DateTimeFormat(locale, { timeZone: tz, ...opts }).format(d);

  return [
    {
      code: 'd',
      label: t('fmtShortDate'),
      preview: fmt({ month: '2-digit', day: '2-digit', year: 'numeric' }),
      markdown: `<t:${ts}:d>`,
    },
    {
      code: 'D',
      label: t('fmtLongDate'),
      preview: fmt({ month: 'long', day: 'numeric', year: 'numeric' }),
      markdown: `<t:${ts}:D>`,
    },
    {
      code: 't',
      label: t('fmtShortTime'),
      preview: fmt({ hour: 'numeric', minute: '2-digit' }),
      markdown: `<t:${ts}:t>`,
    },
    {
      code: 'T',
      label: t('fmtLongTime'),
      preview: fmt({ hour: 'numeric', minute: '2-digit', second: '2-digit' }),
      markdown: `<t:${ts}:T>`,
    },
    {
      code: 'f',
      label: t('fmtShortDateTime'),
      preview: fmt({ month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
      markdown: `<t:${ts}:f>`,
    },
    {
      code: 'F',
      label: t('fmtLongDateTime'),
      preview: fmt({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
      markdown: `<t:${ts}:F>`,
    },
    {
      code: 's',
      label: t('fmtShortDateShortTime'),
      preview: fmt({ month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
      markdown: `<t:${ts}:s>`,
    },
    {
      code: 'S',
      label: t('fmtShortDateLongTime'),
      preview: fmt({ month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit' }),
      markdown: `<t:${ts}:S>`,
    },
    {
      code: 'R',
      label: t('fmtRelative'),
      preview: t('fmtRelativeNote'),
      markdown: `<t:${ts}:R>`,
    },
    {
      code: 'raw',
      label: t('fmtRaw'),
      preview: String(ts),
      markdown: String(ts),
    },
  ];
}
