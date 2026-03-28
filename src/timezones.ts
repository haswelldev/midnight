export function getSupportedTimezones(): string[] {
  return Intl.supportedValuesOf('timeZone');
}

export function detectUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
