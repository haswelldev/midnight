import './styles.css';
import {
  LANGUAGES,
  LangCode,
  loadSavedLang,
  setCurrentLang,
  getCurrentLocale,
  applyTranslations,
  t,
} from './i18n';
import { getSupportedTimezones, detectUserTimezone } from './timezones';
import { computeAnchor, getMidnightsForDate, MidnightSlot } from './timemath';
import { populateTimezoneSelect, renderResults, openModal, closeModal } from './ui';

// ── DOM refs ────────────────────────────────────────────────────────
const langSelect     = document.getElementById('lang-select')     as HTMLSelectElement;
const gameTimeInput  = document.getElementById('game-time')       as HTMLInputElement;
const timezoneSelect = document.getElementById('timezone-select') as HTMLSelectElement;
const datePicker     = document.getElementById('date-picker')     as HTMLInputElement;
const calculateBtn   = document.getElementById('calculate-btn')   as HTMLButtonElement;
const resultsList    = document.getElementById('results-list')    as HTMLUListElement;
const resultsSection = document.getElementById('results')         as HTMLElement;
const resultsDateSpan = document.getElementById('results-date')   as HTMLSpanElement;
const modal          = document.getElementById('modal')           as HTMLDialogElement;
const modalTitle     = document.getElementById('modal-title')     as HTMLElement;
const modalContent   = document.getElementById('modal-content')   as HTMLElement;
const modalClose     = document.getElementById('modal-close')     as HTMLButtonElement;

// ── Language setup ──────────────────────────────────────────────────
// Populate dropdown from LANGUAGES map
for (const [code, name] of Object.entries(LANGUAGES)) {
  const opt = document.createElement('option');
  opt.value = code;
  opt.textContent = name;
  langSelect.appendChild(opt);
}

// Load persisted language and apply
loadSavedLang();
langSelect.value = loadSavedLang();
applyTranslations();

langSelect.addEventListener('change', () => {
  setCurrentLang(langSelect.value as LangCode);
  applyTranslations();
  // Re-format the results date if the section is visible
  if (!resultsSection.hidden && resultsDateSpan.dataset['ms']) {
    resultsDateSpan.textContent = formatResultsDate(
      Number(resultsDateSpan.dataset['ms']),
      timezoneSelect.value,
    );
  }
});

// ── Timezone + date defaults ────────────────────────────────────────
const zones = getSupportedTimezones();
const detected = detectUserTimezone();
populateTimezoneSelect(timezoneSelect, zones, detected);
datePicker.value = new Intl.DateTimeFormat('en-CA', { timeZone: detected }).format(new Date());

// ── Helpers ─────────────────────────────────────────────────────────
function formatResultsDate(ms: number, tz: string): string {
  return new Intl.DateTimeFormat(getCurrentLocale(), {
    timeZone: tz,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(ms));
}

// ── Calculate ───────────────────────────────────────────────────────
calculateBtn.addEventListener('click', () => {
  const gameTimeStr = gameTimeInput.value;
  const nowMs = Date.now();
  const tz = timezoneSelect.value;
  const dateStr = datePicker.value;

  if (!gameTimeStr || !dateStr) return;

  const [hoursStr, minutesStr] = gameTimeStr.split(':');
  const gameHours   = parseInt(hoursStr   ?? '0', 10);
  const gameMinutes = parseInt(minutesStr ?? '0', 10);
  const gameDecimalHours = gameHours + gameMinutes / 60;

  const anchorMs = computeAnchor(nowMs, gameDecimalHours);
  const slots    = getMidnightsForDate(anchorMs, dateStr, tz);

  const refMs = slots[0]?.realMs ?? Date.now();
  resultsDateSpan.textContent = formatResultsDate(refMs, tz);
  resultsDateSpan.dataset['ms'] = String(refMs);

  renderResults(resultsList, slots, tz, (slot: MidnightSlot) => {
    openModal(modal, modalTitle, modalContent, slot, tz);
  });

  resultsSection.removeAttribute('hidden');
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ── Modal close ─────────────────────────────────────────────────────
modalClose.addEventListener('click', () => closeModal(modal));
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
modal.addEventListener('cancel', () => closeModal(modal));

// Update close button aria-label when language changes
langSelect.addEventListener('change', () => {
  modalClose.setAttribute('aria-label', t('btnCalculate')); // just keeps aria fresh
});
