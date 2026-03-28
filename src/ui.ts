import { MidnightSlot, getDiscordFormats } from './timemath';
import { t, getCurrentLocale } from './i18n';

// 12 in-game minutes × 10 real seconds/game-minute = 120 real seconds
const ZAKEN_CLOSE_OFFSET_MS = 12 * 10 * 1000;
const ZAKEN_KEY = 'midnight_zaken';

function buildFormatTable(slot: MidnightSlot, tz: string): HTMLDivElement {
  const table = document.createElement('div');
  table.className = 'format-table';

  for (const fmt of getDiscordFormats(slot, tz)) {
    const row = document.createElement('div');
    row.className = 'format-row';

    const info = document.createElement('div');
    info.className = 'format-info';

    const label = document.createElement('span');
    label.className = 'format-label';
    label.textContent = fmt.label;

    const preview = document.createElement('span');
    preview.className = 'format-preview';
    preview.textContent = fmt.preview;

    info.appendChild(label);
    info.appendChild(preview);

    const codeWrap = document.createElement('div');
    codeWrap.className = 'format-code-wrap';

    const code = document.createElement('code');
    code.className = 'format-markdown';
    code.textContent = fmt.markdown;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.type = 'button';
    copyBtn.textContent = t('copy');
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(fmt.markdown).then(() => {
        copyBtn.textContent = t('copied');
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = t('copy');
          copyBtn.classList.remove('copied');
        }, 1500);
      });
    });

    codeWrap.appendChild(code);
    codeWrap.appendChild(copyBtn);
    row.appendChild(info);
    row.appendChild(codeWrap);
    table.appendChild(row);
  }

  return table;
}

export function populateTimezoneSelect(
  select: HTMLSelectElement,
  zones: string[],
  detected: string,
): void {
  for (const zone of zones) {
    const option = document.createElement('option');
    option.value = zone;
    option.textContent = zone;
    if (zone === detected) option.selected = true;
    select.appendChild(option);
  }
}

export function renderResults(
  list: HTMLUListElement,
  slots: MidnightSlot[],
  tz: string,
  onSlotClick: (slot: MidnightSlot) => void,
): void {
  list.innerHTML = '';

  if (slots.length === 0) {
    const li = document.createElement('li');
    li.className = 'slot-empty';
    li.textContent = t('noMidnights');
    list.appendChild(li);
    return;
  }

  for (const slot of slots) {
    const li = document.createElement('li');
    li.className = 'slot';

    const timeStr = new Intl.DateTimeFormat(getCurrentLocale(), {
      timeZone: tz,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(slot.realMs));

    const label = document.createElement('span');
    label.className = 'slot-time';
    label.textContent = timeStr;

    const hint = document.createElement('span');
    hint.className = 'slot-hint';
    hint.textContent = t('slotHint');

    li.appendChild(label);
    li.appendChild(hint);
    li.addEventListener('click', () => onSlotClick(slot));
    list.appendChild(li);
  }
}

export function openModal(
  dialog: HTMLDialogElement,
  titleEl: HTMLElement,
  contentEl: HTMLElement,
  slot: MidnightSlot,
  tz: string,
): void {
  const timeStr = new Intl.DateTimeFormat(getCurrentLocale(), {
    timeZone: tz,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    month: 'short',
    day: 'numeric',
  }).format(new Date(slot.realMs));

  titleEl.textContent = `${t('discordTimestamps')} — ${timeStr}`;
  contentEl.innerHTML = '';

  // ── Toggle controls bar ──────────────────────────────────────────
  const controlsBar = document.createElement('div');
  controlsBar.className = 'controls-bar';

  const toggleWrap = document.createElement('label');
  toggleWrap.className = 'toggle-wrap';

  const toggleCheckbox = document.createElement('input');
  toggleCheckbox.type = 'checkbox';
  toggleCheckbox.className = 'toggle-checkbox';

  // Restore persisted toggle state
  const savedZaken = localStorage.getItem(ZAKEN_KEY) === 'true';
  toggleCheckbox.checked = savedZaken;

  const toggleTrack = document.createElement('span');
  toggleTrack.className = 'toggle-track';

  const toggleText = document.createElement('span');
  toggleText.textContent = t('toggleZaken');

  toggleWrap.appendChild(toggleCheckbox);
  toggleWrap.appendChild(toggleTrack);
  toggleWrap.appendChild(toggleText);
  controlsBar.appendChild(toggleWrap);
  contentEl.appendChild(controlsBar);

  // ── Side-by-side tables container ────────────────────────────────
  const tablesContainer = document.createElement('div');
  tablesContainer.className = 'tables-container';

  // Left column — door opening (always visible)
  const openingCol = document.createElement('div');
  openingCol.className = 'table-col';

  const openingLabel = document.createElement('div');
  openingLabel.className = 'section-label';
  openingLabel.textContent = t('sectionOpening');

  openingCol.appendChild(openingLabel);
  openingCol.appendChild(buildFormatTable(slot, tz));

  // Right column — door closing (hidden until toggle)
  const zakenSlot: MidnightSlot = {
    realMs: slot.realMs + ZAKEN_CLOSE_OFFSET_MS,
    unixSeconds: Math.floor((slot.realMs + ZAKEN_CLOSE_OFFSET_MS) / 1000),
  };

  const zakenCol = document.createElement('div');
  zakenCol.className = 'table-col';
  zakenCol.hidden = !savedZaken;

  const zakenLabel = document.createElement('div');
  zakenLabel.className = 'section-label';
  zakenLabel.textContent = t('sectionClosing');

  zakenCol.appendChild(zakenLabel);
  zakenCol.appendChild(buildFormatTable(zakenSlot, tz));

  tablesContainer.appendChild(openingCol);
  tablesContainer.appendChild(zakenCol);
  contentEl.appendChild(tablesContainer);

  toggleCheckbox.addEventListener('change', () => {
    zakenCol.hidden = !toggleCheckbox.checked;
    localStorage.setItem(ZAKEN_KEY, String(toggleCheckbox.checked));
  });

  dialog.showModal();
}

export function closeModal(dialog: HTMLDialogElement): void {
  dialog.close();
}
