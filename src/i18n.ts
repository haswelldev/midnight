export type LangCode = 'en' | 'uk' | 'ru' | 'es' | 'pt' | 'el' | 'lt' | 'zh';

const LANG_KEY = 'midnight_lang';

export const LANGUAGES: Record<LangCode, string> = {
  en: 'English',
  uk: 'Українська',
  ru: 'Русский',
  es: 'Español',
  pt: 'Português',
  el: 'Ελληνικά',
  lt: 'Lietuvių',
  zh: '中文',
};

/** Intl locale codes for each language, used for date/time previews. */
export const LOCALES: Record<LangCode, string> = {
  en: 'en-US',
  uk: 'uk-UA',
  ru: 'ru-RU',
  es: 'es-ES',
  pt: 'pt-BR',
  el: 'el-GR',
  lt: 'lt-LT',
  zh: 'zh-CN',
};

const TRANSLATIONS = {
  en: {
    pageTitle: 'Midnight Calculator',
    subtitle: 'Find out when in-game midnight occurs in real life',
    labelGameTime: 'Current in-game time',
    labelTimezone: 'Your timezone',
    labelDate: 'Date',
    btnCalculate: 'Calculate',
    gameMidnightsOn: 'Game midnights on',
    hintClickSlot: 'Click a time slot to get Discord timestamps',
    slotHint: 'Click for Discord timestamps',
    noMidnights: 'No game midnights found for this date.',
    discordTimestamps: 'Discord Timestamps',
    toggleZaken: 'Show Zaken door closing time.',
    sectionOpening: 'Hellman spawn / Zaken door opening time.',
    sectionClosing: 'Zaken door closing time.',
    fmtShortDate: 'Short Date',
    fmtLongDate: 'Long Date',
    fmtShortTime: 'Short Time',
    fmtLongTime: 'Long Time',
    fmtShortDateTime: 'Short Date + Time',
    fmtLongDateTime: 'Long Date + Time',
    fmtShortDateShortTime: 'Short Date + Short Time',
    fmtShortDateLongTime: 'Short Date + Long Time',
    fmtRelative: 'Relative Time',
    fmtRelativeNote: '(shown relative by Discord)',
    fmtRaw: 'Raw Unix Timestamp',
    copy: 'Copy',
    copied: 'Copied!',
  },
  uk: {
    pageTitle: 'Калькулятор Опівночі',
    subtitle: 'Дізнайтесь, коли настає ігрова північ у реальному житті',
    labelGameTime: 'Поточний ігровий час',
    labelTimezone: 'Ваш часовий пояс',
    labelDate: 'Дата',
    btnCalculate: 'Розрахувати',
    gameMidnightsOn: 'Ігрові опівночі:',
    hintClickSlot: 'Натисніть на часовий слот для міток Discord',
    slotHint: 'Натисніть для міток Discord',
    noMidnights: 'Ігрових опівночей для цієї дати не знайдено.',
    discordTimestamps: 'Мітки часу Discord',
    toggleZaken: 'Показати час закриття дверей Закена.',
    sectionOpening: 'Поява Хельмана / Двері Закена.',
    sectionClosing: 'Закриття дверей Закена.',
    fmtShortDate: 'Коротка дата',
    fmtLongDate: 'Повна дата',
    fmtShortTime: 'Короткий час',
    fmtLongTime: 'Повний час',
    fmtShortDateTime: 'Дата + час',
    fmtLongDateTime: 'Повна дата + час',
    fmtShortDateShortTime: 'Коротка дата + короткий час',
    fmtShortDateLongTime: 'Коротка дата + повний час',
    fmtRelative: 'Відносний час',
    fmtRelativeNote: '(відображається відносно в Discord)',
    fmtRaw: 'Мітка Unix',
    copy: 'Копіювати',
    copied: 'Скопійовано!',
  },
  ru: {
    pageTitle: 'Калькулятор Полуночи',
    subtitle: 'Узнайте, когда наступает игровая полночь в реальной жизни',
    labelGameTime: 'Текущее игровое время',
    labelTimezone: 'Ваш часовой пояс',
    labelDate: 'Дата',
    btnCalculate: 'Рассчитать',
    gameMidnightsOn: 'Игровые полночи:',
    hintClickSlot: 'Нажмите на временной слот для меток Discord',
    slotHint: 'Нажмите для меток Discord',
    noMidnights: 'Игровых полночей для этой даты не найдено.',
    discordTimestamps: 'Метки времени Discord',
    toggleZaken: 'Показать время закрытия дверей Закена.',
    sectionOpening: 'Появление Хельмана / Дверь Закена.',
    sectionClosing: 'Закрытие дверей Закена.',
    fmtShortDate: 'Краткая дата',
    fmtLongDate: 'Полная дата',
    fmtShortTime: 'Краткое время',
    fmtLongTime: 'Полное время',
    fmtShortDateTime: 'Дата + время',
    fmtLongDateTime: 'Полная дата + время',
    fmtShortDateShortTime: 'Краткая дата + краткое время',
    fmtShortDateLongTime: 'Краткая дата + полное время',
    fmtRelative: 'Относительное время',
    fmtRelativeNote: '(отображается относительно в Discord)',
    fmtRaw: 'Метка времени Unix',
    copy: 'Копировать',
    copied: 'Скопировано!',
  },
  es: {
    pageTitle: 'Calculadora de Medianoche',
    subtitle: 'Descubre cuándo ocurre la medianoche del juego en la vida real',
    labelGameTime: 'Hora actual en el juego',
    labelTimezone: 'Tu zona horaria',
    labelDate: 'Fecha',
    btnCalculate: 'Calcular',
    gameMidnightsOn: 'Medianoches del juego:',
    hintClickSlot: 'Haz clic en un horario para ver marcas de tiempo de Discord',
    slotHint: 'Clic para marcas de Discord',
    noMidnights: 'No se encontraron medianoches del juego para esta fecha.',
    discordTimestamps: 'Marcas de Tiempo de Discord',
    toggleZaken: 'Mostrar cierre de puerta de Zaken.',
    sectionOpening: 'Aparición de Hellman / Apertura de puerta de Zaken.',
    sectionClosing: 'Cierre de puerta de Zaken.',
    fmtShortDate: 'Fecha corta',
    fmtLongDate: 'Fecha larga',
    fmtShortTime: 'Hora corta',
    fmtLongTime: 'Hora larga',
    fmtShortDateTime: 'Fecha + hora',
    fmtLongDateTime: 'Fecha larga + hora',
    fmtShortDateShortTime: 'Fecha corta + hora corta',
    fmtShortDateLongTime: 'Fecha corta + hora larga',
    fmtRelative: 'Tiempo relativo',
    fmtRelativeNote: '(mostrado relativo en Discord)',
    fmtRaw: 'Marca Unix',
    copy: 'Copiar',
    copied: '¡Copiado!',
  },
  pt: {
    pageTitle: 'Calculadora da Meia-Noite',
    subtitle: 'Descubra quando a meia-noite do jogo ocorre na vida real',
    labelGameTime: 'Hora atual no jogo',
    labelTimezone: 'Seu fuso horário',
    labelDate: 'Data',
    btnCalculate: 'Calcular',
    gameMidnightsOn: 'Meias-noites do jogo:',
    hintClickSlot: 'Clique em um horário para ver marcas de tempo do Discord',
    slotHint: 'Clique para marcas do Discord',
    noMidnights: 'Nenhuma meia-noite do jogo encontrada para esta data.',
    discordTimestamps: 'Marcas de Tempo do Discord',
    toggleZaken: 'Mostrar fechamento da porta de Zaken.',
    sectionOpening: 'Spawn de Hellman / Abertura da porta de Zaken.',
    sectionClosing: 'Fechamento da porta de Zaken.',
    fmtShortDate: 'Data curta',
    fmtLongDate: 'Data longa',
    fmtShortTime: 'Hora curta',
    fmtLongTime: 'Hora longa',
    fmtShortDateTime: 'Data + hora',
    fmtLongDateTime: 'Data longa + hora',
    fmtShortDateShortTime: 'Data curta + hora curta',
    fmtShortDateLongTime: 'Data curta + hora longa',
    fmtRelative: 'Tempo relativo',
    fmtRelativeNote: '(exibido relativo no Discord)',
    fmtRaw: 'Marca Unix',
    copy: 'Copiar',
    copied: 'Copiado!',
  },
  el: {
    pageTitle: 'Υπολογιστής Μεσάνυχτων',
    subtitle: 'Μάθετε πότε τα μεσάνυχτα του παιχνιδιού συμβαίνουν στην πραγματικότητα',
    labelGameTime: 'Τρέχουσα ώρα παιχνιδιού',
    labelTimezone: 'Η ζώνη ώρας σας',
    labelDate: 'Ημερομηνία',
    btnCalculate: 'Υπολογισμός',
    gameMidnightsOn: 'Μεσάνυχτα παιχνιδιού:',
    hintClickSlot: 'Κάντε κλικ σε χρονοθυρίδα για σφραγίδες Discord',
    slotHint: 'Κλικ για σφραγίδες Discord',
    noMidnights: 'Δεν βρέθηκαν μεσάνυχτα παιχνιδιού για αυτή την ημερομηνία.',
    discordTimestamps: 'Σφραγίδες Χρόνου Discord',
    toggleZaken: 'Εμφάνιση ώρας κλεισίματος πόρτας Zaken.',
    sectionOpening: 'Εμφάνιση Hellman / Άνοιγμα πόρτας Zaken.',
    sectionClosing: 'Κλείσιμο πόρτας Zaken.',
    fmtShortDate: 'Σύντομη ημερομηνία',
    fmtLongDate: 'Πλήρης ημερομηνία',
    fmtShortTime: 'Σύντομη ώρα',
    fmtLongTime: 'Πλήρης ώρα',
    fmtShortDateTime: 'Ημερομηνία + ώρα',
    fmtLongDateTime: 'Πλήρης ημερομηνία + ώρα',
    fmtShortDateShortTime: 'Σύντομη ημ. + ώρα',
    fmtShortDateLongTime: 'Σύντομη ημ. + πλήρης ώρα',
    fmtRelative: 'Σχετικός χρόνος',
    fmtRelativeNote: '(εμφανίζεται σχετικά στο Discord)',
    fmtRaw: 'Σφραγίδα Unix',
    copy: 'Αντιγραφή',
    copied: 'Αντιγράφηκε!',
  },
  lt: {
    pageTitle: 'Vidurnakčio Skaičiuoklė',
    subtitle: 'Sužinokite, kada žaidimo vidurnaktis įvyksta realiame gyvenime',
    labelGameTime: 'Dabartinis žaidimo laikas',
    labelTimezone: 'Jūsų laiko juosta',
    labelDate: 'Data',
    btnCalculate: 'Skaičiuoti',
    gameMidnightsOn: 'Žaidimo vidurnakčiai:',
    hintClickSlot: 'Spustelėkite laiko tarpsnį Discord laiko žymėms',
    slotHint: 'Spustelėkite Discord žymėms',
    noMidnights: 'Šiai datai žaidimo vidurnakčių nerasta.',
    discordTimestamps: 'Discord Laiko Žymės',
    toggleZaken: 'Rodyti Zaken durų uždarymo laiką.',
    sectionOpening: 'Hellman pasirodymas / Zaken durų atidarymas.',
    sectionClosing: 'Zaken durų uždarymas.',
    fmtShortDate: 'Trumpa data',
    fmtLongDate: 'Pilna data',
    fmtShortTime: 'Trumpas laikas',
    fmtLongTime: 'Pilnas laikas',
    fmtShortDateTime: 'Data + laikas',
    fmtLongDateTime: 'Pilna data + laikas',
    fmtShortDateShortTime: 'Trumpa data + trumpas laikas',
    fmtShortDateLongTime: 'Trumpa data + pilnas laikas',
    fmtRelative: 'Santykinis laikas',
    fmtRelativeNote: '(rodoma santykinai Discord)',
    fmtRaw: 'Unix laiko žymė',
    copy: 'Kopijuoti',
    copied: 'Nukopijuota!',
  },
  zh: {
    pageTitle: '午夜计算器',
    subtitle: '了解游戏内午夜在现实生活中何时发生',
    labelGameTime: '当前游戏时间',
    labelTimezone: '您的时区',
    labelDate: '日期',
    btnCalculate: '计算',
    gameMidnightsOn: '游戏午夜：',
    hintClickSlot: '点击时间段获取 Discord 时间戳',
    slotHint: '点击获取时间戳',
    noMidnights: '此日期未找到游戏午夜。',
    discordTimestamps: 'Discord 时间戳',
    toggleZaken: '显示 Zaken 门关闭时间。',
    sectionOpening: 'Hellman 出现 / Zaken 门开启时间。',
    sectionClosing: 'Zaken 门关闭时间。',
    fmtShortDate: '短日期',
    fmtLongDate: '长日期',
    fmtShortTime: '短时间',
    fmtLongTime: '长时间',
    fmtShortDateTime: '日期 + 时间',
    fmtLongDateTime: '长日期 + 时间',
    fmtShortDateShortTime: '短日期 + 短时间',
    fmtShortDateLongTime: '短日期 + 长时间',
    fmtRelative: '相对时间',
    fmtRelativeNote: '（在 Discord 中显示为相对时间）',
    fmtRaw: 'Unix 时间戳',
    copy: '复制',
    copied: '已复制！',
  },
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS.en;

let currentLang: LangCode = 'en';

export function getCurrentLang(): LangCode {
  return currentLang;
}

export function getCurrentLocale(): string {
  return LOCALES[currentLang];
}

/** Read saved language from localStorage (call on page load). */
export function loadSavedLang(): LangCode {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved && Object.prototype.hasOwnProperty.call(LANGUAGES, saved)) {
    currentLang = saved as LangCode;
  }
  return currentLang;
}

/** Persist and activate a language choice. */
export function setCurrentLang(lang: LangCode): void {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
}

/** Translate a key using the current language (falls back to English). */
export function t(key: TranslationKey): string {
  const tr = TRANSLATIONS[currentLang] as Record<string, string>;
  return tr[key] ?? (TRANSLATIONS.en as Record<string, string>)[key] ?? key;
}

/** Update all [data-i18n] elements in the DOM and the page title/lang attr. */
export function applyTranslations(): void {
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset['i18n'] as TranslationKey | undefined;
    if (key) el.textContent = t(key);
  });
  document.title = t('pageTitle');
  document.documentElement.lang = getCurrentLocale().split('-')[0] ?? 'en';
}
