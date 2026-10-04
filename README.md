# 🏮 PUJAPATH — Roadmap to Puja

**Plan Your Puja. Find Your Path. Experience Kolkata.**

PUJAPATH is a personalized Kolkata Durga Puja trip planner and discovery platform. It helps you plan your entire Puja experience — not just the famous pandals — from the biggest Bonedi Bari heritage celebrations to the smallest neighbourhood pujas.

> Don't just visit the pandals everyone knows. Discover the Puja that Kolkata actually lives.

---

## ✨ Features

- **AI Puja Planner** — Describe your plan in plain English ("Starting at Howrah, 4 hours, theme pandals, street food...") and get a chronological roadmap with locations, pandals, events, transport and food stops.
- **Structured Plan Builder** — Build a plan step by step: start/end points, date, time window, group size, travel preference, food preference and experience type.
- **Multiple Route Options** — Every plan generates up to 10 alternative routes: best match, relaxed, packed, crowd-avoiding, metro-first, auto-first, bus/train, food-first, famous majors, and local neighbourhood puja.
- **Comprehensive Puja Database** — Famous pandals, theme pandals, heritage/Bonedi Bari pujas, local neighbourhood celebrations and hidden gems.
- **Everything Around You** — For each pandal: nearby pandals, events, food, railway, metro, bus, auto, hospitals, pharmacies, police, attractions and markets.
- **Puja Timeline Roadmap** — A vertical procession-style itinerary from start to end with timings and crowd notes.
- **Map & Navigation** — Light interactive map with red route lines, red pandal markers and green supporting markers, plus Google Maps handoff.
- **Safety Section** — Hospitals, pharmacies, police stations and emergency numbers (100 police, 102 ambulance, 1091 women helpline).
- **Plan Refinement in Plain Words** — Type things like *"add biryani"*, *"avoid crowds"*, *"finish an hour later"* to instantly update the roadmap.

## 🎨 Design

PUJAPATH blends **old Kolkata Bonedi Bari Puja** with a modern, premium digital experience:

- Pure white background with sindoor red and traditional muted green accents
- Serif heritage headings (Playfair Display) + clean modern body text (Noto Sans)
- Bengali typography touches (Noto Serif Bengali)
- Alpona-inspired dividers, gamchha borders, glowing diya motif
- Soft shiuli-petal animation and warm, nostalgic details

## 🛠️ Tech Stack

- **HTML / CSS / Vanilla JavaScript** — no build step, no backend
- **Leaflet + OpenStreetMap** — interactive map
- All planning logic runs **client-side** in the browser (heuristics, not live data)

## 📁 Project Structure

```
├── index.html        # App shell and views (home, planner, build, discover, map, safety)
├── css/
│   └── styles.css    # Bonedi Bari themed design system
└── js/
    ├── data.js       # Pandals, events, food, transport, safety, attractions DB
    ├── planner.js    # NL parsing + itinerary engine + route options
    └── app.js        # UI rendering, routing between views, map, refine bar
```

## 🌐 Deploying Live

The deployment for this project is done by:

- **Vercel** —

## ⚠️ Data Disclaimer

Pandal names, localities, crowd levels, timings and transport info are curated illustrative data for demonstration. For live information (crowd advisories, metro timings, weather, train schedules), always check official sources like Kolkata Police Puja portals and railway/metro apps.

## 🙏 Credits

Made with love for Kolkata, Durga Puja and every Bonedi Bari, para puja and hidden courtyard that keeps the spirit of the festival alive.

**শুভ দুর্গাপূজা 🙏**
