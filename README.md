# Midnight Calculator

A static web tool for [Lineage II](https://www.lineage2.com/) players that converts your current in-game time into real-world timestamps showing exactly when in-game midnight (00:00) will occur throughout a chosen day.

## Why

In Lineage II, 24 in-game hours pass in just 4 real-life hours — a **6:1 ratio**. This means there are exactly **6 game midnights per real-world day**. Knowing when midnight hits matters because it triggers key world events:

- **Hellman** spawns at game midnight
- **Zaken** door opens at game midnight and closes 12 in-game minutes later (2 real minutes)

This tool takes your current in-game clock reading, your timezone, and a date — then gives you all 6 midnight times as precise real-world timestamps.

## Features

- **Automatic timezone detection** with a full dropdown of IANA timezones
- **6 midnight slots** per day, displayed in your local time
- **Discord timestamp modal** — click any slot to get copyable `<t:UNIX:FORMAT>` markdown in all 10 Discord formats (short/long date, short/long time, relative, raw, and combinations)
- **Zaken door closing toggle** — shows a second timestamp column 2 real minutes after each midnight
- **8 languages** — English, Українська, Русский, Español, Português, Ελληνικά, Lietuvių, 中文
- Language and toggle preferences persisted in `localStorage`
- Zero runtime dependencies — pure TypeScript + Vite

## Usage

1. Open your Lineage II client and note the current in-game time
2. Enter that time in the **Current in-game time** field
3. Confirm your timezone and pick a date (defaults to today)
4. Click **Calculate**
5. Click any midnight slot to open the Discord timestamp modal
6. Copy the format you need and paste it into Discord

## Live Site

[https://haswelldev.github.io/midnight/](https://haswelldev.github.io/midnight/)

## Development

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # type-check + production build → dist/
npm run preview  # preview the production build locally
```

**Stack:** TypeScript · Vite · vanilla DOM · no UI framework
