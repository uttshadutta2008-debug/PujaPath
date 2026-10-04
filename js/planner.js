/* ============================================================================
   PUJAPATH — planning engine
   Natural-language parsing + realistic itinerary construction.
   Pure client-side heuristics: no data leaves the browser.
   ========================================================================== */

"use strict";

/* ----------------------------- geo helpers ------------------------------- */
function haversineKm(a, b) {
  const R = 6371, dLa = (b.lat - a.lat) * Math.PI / 180, dLo = (b.lng - a.lng) * Math.PI / 180;
  const h = Math.sin(dLa / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
function roadKm(a, b) { return haversineKm(a, b) * 1.28; } /* city road factor */
function nearestOf(lat, lng, list, n, maxKm) {
  return list
    .map(x => ({ ref: x, d: haversineKm({ lat, lng }, x) }))
    .filter(x => !maxKm || x.d <= maxKm)
    .sort((a, b) => a.d - b.d)
    .slice(0, n || 3);
}
function distToSegmentKm(p, a, b) {
  if (!a || !b) return 0;
  const latKm = 111.32, lngKm = 111.32 * Math.cos(a.lat * Math.PI / 180);
  const ax = a.lng * lngKm, ay = a.lat * latKm, bx = b.lng * lngKm, by = b.lat * latKm;
  const px = p.lng * lngKm, py = p.lat * latKm;
  const dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy;
  if (L2 === 0) return Math.hypot(px - ax, py - ay) / 1; /* km approx */
  let t = ((px - ax) * dx + (py - ay) * dy) / L2; t = Math.max(0, Math.min(1, t));
  const cx = ax + t * dx, cy = ay + t * dy;
  const dLat = (py - cy) / latKm, dLng = (px - cx) / lngKm;
  return haversineKm(p, { lat: p.lat - dLat, lng: p.lng - dLng });
}

/* ----------------------------- time helpers ------------------------------ */
function fmtTime(min) {
  min = Math.round(min);
  let h = Math.floor(min / 60) % 24, m = min % 60;
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12; if (h === 0) h = 12;
  return h + ":" + String(m).padStart(2, "0") + " " + ap;
}
function toMin(h, m) { return h * 60 + (m || 0); }

/* ------------------------- default planner input ------------------------- */
function defaultInput() {
  return {
    start: null, end: null,
    day: DB.pujaDays.find(d => d.key === "saptami"),
    startMin: 17 * 60, endMin: 23 * 60,
    groupSize: 4, groupType: "friends",
    modes: { walk: true, auto: true, bus: true, metro: true, train: true },
    foods: [], veg: false,
    pace: "balanced", crowd: "any",
    focus: new Set(), areas: new Set(),
    must: [], roam: [],
    notes: []
  };
}

/* --------------------------- NL understanding ---------------------------- */
const AREA_WORDS = [
  [/\b(north)\s*(kolkata|calcutta)\b/, "North"],
  [/\b(south)\s*(kolkata|calcutta)\b/, "South"],
  [/\b(central)\s*(kolkata|calcutta)\b/, "Central"],
  [/\b(east)\s*(kolkata|calcutta)\b/, "East"],
  [/\bsalt\s*lake\s*side\b/, "East"],
  [/\bbypass\s*side\b/, "East"],
  [/\bbehala\s*side\b/, "West"]
];

const DAY_WORDS = [
  [/\b(pre[- ]?puja|mahalaya)\b/, "pre"],
  [/\b(panchami|ponchomi)\b/, "panchami"],
  [/\b(shashthi|sashthi|sasthi|sashthi)\b/, "shashthi"],
  [/\b(saptami|soptomi)\b/, "saptami"],
  [/\b(ashtami|astami|ostomi)\b/, "ashtami"],
  [/\b(navami|nabami|nabomi)\b/, "navami"],
  [/\b(dashami|dasami|dosomi|bijoya|bijaya|dussehra)\b/, "dashami"]
];

const FOOD_WORDS = [
  { re: /\bbir?iy?ani\b/, cuisine: "biryani", label: "Biryani" },
  { re: /\b(kathi\s*)?rolls?\b/, cuisine: "rolls", label: "Kathi rolls" },
  { re: /\b(puchka|phuchka|golgappa|panipuri)\b/, cuisine: "street", label: "Puchka & street food" },
  { re: /\bstreet\s*food|chaat|tele\s*bhaja|jhal\s*muri|momo/, cuisine: "street", label: "Street food" },
  { re: /\bchinese|chow(mein)?|chilli\s*chicken\b/, cuisine: "chinese", label: "Chinese" },
  { re: /\bbengali|thali|maach|kosha\s*mangsho|ilish\b/, cuisine: "bengali", label: "Bengali food" },
  { re: /\b(mishti|sweets?|rosogolla|sandesh|mishti doi)\b/, cuisine: "sweets", label: "Mishti" },
  { re: /\b(cafe|coffee|adda)\b/, cuisine: "cafe", label: "Café" },
  { re: /\b(kebab|mughlai|rezala)\b/, cuisine: "mughlai", label: "Mughlai" },
  { re: /\b(veg|vegetarian|shakahari)\b/, veg: true }
];
const MEAL_WORDS = [
  { re: /\bbreakfast|morning\s*(food|walk)|kochuri\b/, meal: "breakfast", window: [480, 660], label: "Breakfast" },
  { re: /\blunch\b/, meal: "lunch", window: [750, 900], label: "Lunch" },
  { re: /\bsnacks?|evening\s*snack\b/, meal: "snacks", window: [1000, 1140], label: "Snacks" },
  { re: /\bdinner|dine\b/, meal: "dinner", window: [1170, 1350], label: "Dinner" },
  { re: /\b(food|eat|khawa|khawar|meal|hungry)\b/, meal: "dinner", window: [1170, 1350], label: "Food stop", soft: true }
];

function pandalAliases(p) {
  const base = [p.i.replace(/-/g, " "), p.n.toLowerCase()];
  const n = p.n.toLowerCase();
  const short = n.split(",")[0].split("(")[0].trim();
  base.push(short);
  /* distinctive tokens (>=5 chars) e.g. "ekdalia", "sreebhumi" */
  n.split(/[^a-z]+/).forEach(w => { if (w.length >= 6) base.push(w); });
  return [...new Set(base)];
}

function geocode(name) {
  const t = name.toLowerCase().trim();
  for (const l of DB.landmarks) {
    if (l.n.toLowerCase() === t || l.aliases.some(a => a === t)) return { name: l.n, lat: l.lat, lng: l.lng, kind: l.kind };
  }
  for (const l of DB.landmarks) {
    if (l.aliases.some(a => t.includes(a)) || t.includes(l.n.toLowerCase())) return { name: l.n, lat: l.lat, lng: l.lng, kind: l.kind };
  }
  for (const p of DB.pandals) {
    if (p.n.toLowerCase().includes(t) || t.includes(p.i.replace(/-/g, " "))) return { name: p.n, lat: p.lat, lng: p.lng, kind: "pandal" };
  }
  for (const f of DB.food) {
    if (f.n.toLowerCase().includes(t)) return { name: f.n, lat: f.lat, lng: f.lng, kind: "food" };
  }
  return null;
}

/* Find landmark mentions in a text, with positions */
function landmarkMentions(t) {
  const found = [];
  for (const l of DB.landmarks) {
    for (const a of [...l.aliases, l.n.toLowerCase()]) {
      const re = new RegExp("\\b" + a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b");
      const m = re.exec(t);
      if (m) { found.push({ l, idx: m.index, len: a.length }); break; }
    }
  }
  return found.sort((a, b) => a.idx - b.idx);
}

/* parse one time token like "5", "5:30", with optional am/pm and context */
function parseClock(str, defaultPM) {
  const m = str.match(/(\d{1,2})(?:[.:](\d{2}))?\s*(a\.?m\.?|p\.?m\.?)?/i);
  if (!m) return null;
  let h = parseInt(m[1], 10), mi = m[2] ? parseInt(m[2], 10) : 0;
  if (h > 24 || mi > 59) return null;
  const ap = m[3] ? m[3][0].toLowerCase() : null;
  if (ap === "p" && h < 12) h += 12;
  if (ap === "a" && h === 12) h = 0;
  if (!ap) { if (defaultPM && h < 12) h += 12; }
  return toMin(h, mi);
}

/* Main NL parser. Returns { input, chips, set:Set } */
function parseRequest(text, baseInput) {
  const t = " " + text.toLowerCase().replace(/\s+/g, " ") + " ";
  const inp = baseInput ? JSON.parse(JSON.stringify({ ...baseInput, focus: [...baseInput.focus], areas: [...baseInput.areas] })) : defaultInput();
  inp.focus = new Set(inp.focus); inp.areas = new Set(inp.areas);
  if (!inp.notes) inp.notes = [];
  const set = new Set();
  const chips = [];
  const chip = (label, value, assumed) => chips.push({ label, value, assumed: !!assumed });

  /* ---- group size ---- */
  let gs = null;
  const gsPatterns = [
    /\bwe(?:'re| are| r)?\s*(\d{1,2})\b(?!\s*(?:am|pm|hours?|days?))/,
    /\b(\d{1,2})\s*(?:college friends|friends|people|persons|members|ppl|guys|folks|adults|buddies|of us)\b/,
    /\b(?:family|group|party) of\s*(\d{1,2})\b/,
    /\b(?:me and|with)\s*(\d{1,2})\s*(?:friends|others|people|cousins)\b/
  ];
  for (const re of gsPatterns) { const m = t.match(re); if (m) { gs = parseInt(m[1], 10); break; } }
  if (gs && gs <= 30) { inp.groupSize = gs; set.add("group"); }

  /* ---- group type ---- */
  if (/\b(parents?|family|kids?|children|bachcha|elders?|grandparents?|maa|baba)\b/.test(t)) { inp.groupType = "family"; set.add("group"); }
  else if (/\b(couple|partner|wife|husband|girlfriend|boyfriend|fiance|date)\b/.test(t)) { inp.groupType = "couple"; set.add("group"); }
  else if (/\b(solo|alone|myself)\b/.test(t)) { inp.groupType = "solo"; set.add("group"); }
  else if (/\b(friends?|buddies|gang|colleagues?|office|roommates?|classmates?)\b/.test(t)) { inp.groupType = "friends"; set.add("group"); }
  if (set.has("group")) chip("Group", (gs ? gs + " · " : "") + { family: "Family / parents", couple: "Couple", solo: "Solo", friends: "Friends" }[inp.groupType]);

  /* ---- day ---- */
  for (const [re, key] of DAY_WORDS) {
    if (re.test(t)) { inp.day = DB.pujaDays.find(d => d.key === key); set.add("day"); chip("Day", inp.day.label + " · " + inp.day.date); break; }
  }
  if (!set.has("day") && /\b(today|tonight|this evening)\b/.test(t)) {
    const now = new Date(2026, 9, 3); /* demo clock: Sharod season 2026 */
    const map = { 17: "panchami", 18: "shashthi", 19: "saptami", 20: "ashtami", 21: "navami", 22: "dashami" };
    const key = (now.getMonth() === 9) ? map[now.getDate()] : null;
    if (key) { inp.day = DB.pujaDays.find(d => d.key === key); set.add("day"); chip("Day", inp.day.label); }
  }

  /* ---- areas ---- */
  for (const [re, area] of AREA_WORDS) if (re.test(t)) { inp.areas.add(area); set.add("areas"); }
  if (inp.areas.size) chip("Area", [...inp.areas].map(a => a + " Kolkata").join(" + "));

  /* ---- landmarks: start / end / roam ---- */
  const mentions = landmarkMentions(t);
  let start = null, end = null;
  const verbStart = t.match(/(?:start(?:ing)?|begin|leave|depart|set out)(?:\s+(?:from|at|near))?\s+([a-z][a-z .'-]{1,28}?)(?=[,.;]|$|\s+(?:at|around|by|to|and|we|with|on|towards?)\b)/);
  const verbEnd = t.match(/(?:reach|end(?:ing)?|finish|get to|back to|return to|drop(?: us| me)?(?: at)?|head(?:ing)? to)\s*(?:at|near|by|to)?\s*([a-z][a-z .'-]{1,28}?)(?=[,.;]|$|\s+(?:at|around|by|and|we|with|on|before)\b)/);
  const findIn = (frag) => {
    if (!frag) return null;
    const lm = landmarkMentions(" " + frag + " ");
    return lm.length ? { name: lm[0].l.n, lat: lm[0].l.lat, lng: lm[0].l.lng, kind: lm[0].l.kind } : null;
  };
  start = findIn(verbStart && verbStart[1]);
  end = findIn(verbEnd && verbEnd[1]);
  if (!start && !end && mentions.length >= 2 && (/\s(to|till|until|->|→)\s/.test(t))) {
    start = { name: mentions[0].l.n, lat: mentions[0].l.lat, lng: mentions[0].l.lng, kind: mentions[0].l.kind };
    end = { name: mentions[mentions.length - 1].l.n, lat: mentions[mentions.length - 1].l.lat, lng: mentions[mentions.length - 1].l.lng, kind: mentions[mentions.length - 1].l.kind };
  } else if (!start && !end && mentions.length === 1) {
    const m0 = mentions[0];
    const pt = { name: m0.l.n, lat: m0.l.lat, lng: m0.l.lng, kind: m0.l.kind };
    if (/\b(reach|end|finish|back to|return|drop)\b/.test(t)) end = pt; else start = pt;
  }
  const usedPts = [start, end].filter(Boolean).map(p => p.name);
  const roam = mentions.filter(m => !usedPts.includes(m.l.n)).map(m => ({ name: m.l.n, lat: m.l.lat, lng: m.l.lng }));
  if (start) { inp.start = start; set.add("start"); chip("Start", start.name); }
  if (end) { inp.end = end; set.add("end"); chip("End", end.name); }
  if (roam.length) { inp.roam = roam; set.add("roam"); chip("Also around", roam.map(r => r.name).slice(0, 3).join(", ")); }

  /* ---- times ---- */
  let startT = null, endT = null, durH = null;
  const stM = t.match(/(?:start|starting|begin|leave|around|from|at)\s+(?:around\s+|about\s+)?(\d{1,2}(?:[.:]\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)?)/i);
  if (stM) startT = parseClock(stM[1], true);
  const enM = t.match(/(?:by|till|until|before|reach.*?(?:at|by)|end(?:ing)?\s*(?:at|by|around)?|finish(?:ing)?\s*(?:at|by|around)?)\s*(\d{1,2}(?:[.:]\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)?)(?![\d\s]*(?:hours?|hrs?))/i);
  if (enM) endT = parseClock(enM[1], true);
  const duM = t.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)\b/);
  if (duM) durH = parseFloat(duM[1]);
  if (durH == null) {
    const wn = t.match(/\b(an?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s*(?:hours?|hrs?)\b/);
    if (wn) durH = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12 }[wn[1]];
  }
  if (durH == null && /\b(half an hour|half hour)\b/.test(t)) durH = 0.5;
  if (durH == null && /\bfull day\b/.test(t)) durH = 12;
  if (startT == null && endT != null && durH != null) { endT = endT; startT = endT - durH * 60; }
  if (startT != null && endT == null && durH != null) endT = startT + durH * 60;
  if (startT == null && durH != null) { startT = 17 * 60; endT = startT + durH * 60; }
  if (startT == null && /\bmorning\b/.test(t)) startT = 8 * 60;
  if (startT == null && /\bafternoon\b/.test(t)) startT = 14 * 60;
  if (startT == null && /\b(evening|tonight|night)\b/.test(t)) startT = 17 * 60;
  if (startT == null && /\bafter (office|work|college)\b/.test(t)) startT = 18 * 60;
  if (endT == null && /\b(late night|till late|raat)\b/.test(t)) endT = 24 * 60;
  if (startT != null && endT != null && endT <= startT) endT += 12 * 60; /* "5 to 10" evening sense */
  if (startT != null) { inp.startMin = Math.max(300, Math.min(1410, startT)); set.add("time"); }
  if (endT != null) { inp.endMin = Math.max(inp.startMin + 60, Math.min(1530, endT)); set.add("time"); }
  if (set.has("time")) chip("Time", fmtTime(inp.startMin) + " → " + fmtTime(inp.endMin) + (durH ? " · " + durH + " h" : ""));

  /* ---- pace ---- */
  if (/\b(as many|as much|maximum|max(imum)? number|packed|marathon|cover (everything|all)|everything possible|jitna|joto)\b/.test(t)) { inp.pace = "packed"; set.add("pace"); }
  else if (/\b(relaxed|slow|chill|leisure|easy|gentle|comfortable|aram)\b/.test(t)) { inp.pace = "relaxed"; set.add("pace"); }
  if (set.has("pace")) chip("Pace", inp.pace === "packed" ? "Packed — fit in as much as possible" : "Relaxed and easy");

  /* ---- crowd ---- */
  if (/\b(less[- ]crowd|avoid (the )?crowd|not crowded|without (the )?crowd|quiet|peaceful|calm|low crowd|bhir (kom|chara|chhara))\b/.test(t)) { inp.crowd = "avoid"; set.add("crowd"); chip("Crowds", "Prefer less-crowded places"); }

  /* ---- interests / focus ---- */
  const before = inp.focus.size;
  if (/\btheme|themes|artistic|art installation|decor/.test(t)) { inp.focus.add("theme"); }
  if (/\b(bonedi|heritage|old|aristocratic|rajbari|traditional|history|historic|thakur dalan)\b/.test(t)) { inp.focus.add("heritage"); }
  if (/\b(hidden|lesser|offbeat|unexplored|secret|unknown|gem)\b/.test(t)) { inp.focus.add("hidden"); inp.focus.add("community"); }
  if (/\b(local|neighbourhood|neighborhood|para|community|small)\b/.test(t)) { inp.focus.add("local"); inp.focus.add("community"); }
  if (/\b(famous|big|grand|popular|mega)\b/.test(t)) { inp.focus.add("major"); }
  if (/\b(photo|photography|instagram|lights|lighting)\b/.test(t)) { inp.focus.add("photo"); }
  if (inp.focus.size > before) { set.add("focus"); chip("Interests", [...inp.focus].map(f => ({ theme: "Theme & art pujas", heritage: "Heritage & bonedi baris", hidden: "Hidden gems", community: "Community paras", local: "Local barowaris", major: "Famous majors", photo: "Photo-worthy spots" }[f] || f)).join(", ")); }

  /* ---- food ---- */
  const mealsFound = [];
  for (const mw of MEAL_WORDS) if (mw.re.test(t) && !mw.soft) mealsFound.push(mw);
  const foods = [];
  for (const fw of FOOD_WORDS) {
    if (fw.re.test(t)) {
      if (fw.veg) { inp.veg = true; continue; }
      foods.push(fw);
    }
  }
  if (foods.length || mealsFound.length) {
    const merged = [];
    const addFood = (cuisine, meal, window, label) => {
      if (!merged.some(f => f.meal === meal && (f.cuisine === cuisine || !cuisine || !f.cuisine))) {
        merged.push({ cuisine: cuisine || null, meal, window, label });
      }
    };
    for (const fw of foods) {
      const impliedMeal = fw.cuisine === "sweets" || fw.cuisine === "cafe" || fw.cuisine === "street" || fw.cuisine === "rolls" ? "snacks" :
        fw.cuisine === "chinese" && /\bbreakfast|morning\b/.test(t) ? "breakfast" : "dinner";
      const mw = MEAL_WORDS.find(m => m.meal === impliedMeal);
      addFood(fw.cuisine, impliedMeal, mw.window, fw.label);
    }
    for (const mw of mealsFound) addFood(null, mw.meal, mw.window, mw.label);
    if (!foods.length && !mealsFound.length && /\b(food|eat|dinner)\b/.test(t)) addFood(null, "dinner", [1170, 1350], "Dinner");
    inp.foods = merged.slice(0, 3);
    set.add("food");
    chip("Food", inp.foods.map(f => f.label).join(" + ") + (inp.veg ? " (veg)" : ""));
  }

  /* ---- transport ---- */
  if (/\bno metro|avoid metro\b/.test(t)) { inp.modes.metro = false; set.add("modes"); }
  if (/\bonly metro|by metro\b/.test(t)) { inp.modes = { walk: true, auto: true, bus: false, metro: true, train: false }; set.add("modes"); }
  if (/\bno bus|avoid bus\b/.test(t)) { inp.modes.bus = false; set.add("modes"); }
  if (/\b(walking|on foot|walkable)\b/.test(t)) { inp.walkPref = true; set.add("modes"); }
  if (set.has("modes")) chip("Transport", "Preferences applied");

  /* ---- must-visit pandals ---- */
  const must = [];
  for (const p of DB.pandals) {
    const aliases = pandalAliases(p);
    if (aliases.some(a => a.length >= 5 && new RegExp("\\b" + a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b").test(t))) {
      must.push(p.i); if (must.length >= 6) break;
    }
  }
  if (must.length) {
    inp.must = [...new Set([...inp.must, ...must])];
    set.add("must");
    chip("Must visit", inp.must.map(id => DB.pandals.find(p => p.i === id).n.split(",")[0]).slice(0, 4).join(", "));
  }

  return { input: inp, chips, set };
}

/* --------------------------- leg / transport ----------------------------- */
const SPEED = { walk: 4.8, auto: 15, bus: 12, cab: 17 };
function rideMinutes(km, mode) { return km / SPEED[mode] * 60; }

function metroLeg(a, b) {
  const ma = nearestOf(a.lat, a.lng, DB.metro, 1, 1.15)[0];
  const mb = nearestOf(b.lat, b.lng, DB.metro, 1, 1.15)[0];
  if (!ma || !mb || ma.ref.line !== mb.ref.line || ma.ref.n === mb.ref.n) return null;
  const walk = rideMinutes(ma.d + mb.d, "walk");
  const ride = haversineKm(ma.ref, mb.ref) * 2.2 + 3;
  return { mode: "metro", mins: walk + ride + 9, from: ma.ref.n, to: mb.ref.n, line: ma.ref.line };
}
function trainLeg(a, b) {
  const ra = nearestOf(a.lat, a.lng, DB.rail, 1, 1.3)[0];
  const rb = nearestOf(b.lat, b.lng, DB.rail, 1, 1.3)[0];
  if (!ra || !rb || ra.ref.n === rb.ref.n) return null;
  const shared = ra.ref.lines.some(l1 => rb.ref.lines.some(l2 => l1.split(" ")[0] === l2.split(" ")[0]));
  if (!shared) return null;
  const walk = rideMinutes(ra.d + rb.d, "walk");
  const ride = haversineKm(ra.ref, rb.ref) * 2.0 + 4;
  return { mode: "train", mins: walk + ride + 14, from: ra.ref.n, to: rb.ref.n };
}
function chooseLeg(a, b, inp, tMin) {
  const d = roadKm(a, b);
  const night = tMin >= 1290;
  const opts = [];
  if (d <= (inp.groupType === "family" ? 0.8 : 1.15) && inp.modes.walk) opts.push({ mode: "walk", mins: rideMinutes(d, "walk") + 3, pen: d <= 0.9 ? 0 : 6 });
  if (inp.modes.auto) opts.push({ mode: "auto", mins: rideMinutes(d, "auto") + 5, pen: 4 });
  if (inp.modes.auto && d > 3.5) opts.push({ mode: "cab", mins: rideMinutes(d, "cab") + 6, pen: night ? 1 : 5 });
  if (inp.modes.bus && d > 1.4 && !night) opts.push({ mode: "bus", mins: rideMinutes(d, "bus") + 10, pen: 7 });
  const m = inp.modes.metro ? metroLeg(a, b) : null;
  if (m) opts.push({ ...m, pen: inp.groupType === "family" ? 6 : 2 });
  const tr = inp.modes.train && d > 3 ? trainLeg(a, b) : null;
  if (tr) opts.push({ ...tr, pen: 4 });
  if (!opts.length) opts.push({ mode: "auto", mins: rideMinutes(d, "auto") + 5, pen: 0 });
  opts.forEach(o => { if (inp.groupType === "family" && o.mode === "walk") o.pen += 7; if (inp.walkPref && o.mode === "walk") o.pen -= 3; });
  opts.sort((x, y) => (x.mins + x.pen) - (y.mins + y.pen));
  const best = opts[0], alt = opts[1];
  const buf = inp.pace === "relaxed" ? 5 : inp.pace === "packed" ? 1 : 3;
  const fam = inp.groupType === "family" ? 3 : 0;
  const leg = {
    mode: best.mode,
    mins: Math.max(4, Math.round(best.mins + buf + fam)),
    km: +d.toFixed(1),
    alt: alt && alt.mode !== best.mode ? alt : null,
    night
  };
  if (best.from) { leg.from = best.from; leg.to = best.to; leg.line = best.line; }
  return leg;
}
function legCost(leg, groupSize) {
  switch (leg.mode) {
    case "walk": return 0;
    case "metro": return 10 * groupSize;
    case "train": return 8 * groupSize;
    case "bus": return 15 * groupSize;
    case "auto": return leg.km <= 2.5 ? 15 * groupSize : Math.round(20 * leg.km + 30);
    case "cab": return Math.round(22 * leg.km + 45);
    default: return 0;
  }
}

/* ------------------------- visit & crowd model --------------------------- */
function visitMinutes(p, inp) {
  let v = p.dur;
  v *= inp.pace === "packed" ? 0.9 : inp.pace === "relaxed" ? 1.2 : 1;
  if (inp.groupType === "family") v *= 1.08;
  if (inp.groupSize >= 7) v *= 1.05;
  return Math.round(v);
}
function queueMinutes(p, inp, tMin) {
  const base = { "Very High": 12, "High": 6, "Moderate": 2, "Low": 0 }[p.crowd] || 0;
  let q = base + base * 1.8 * (inp.day.crowd - 1);
  if (tMin > 1290) q *= 0.5;
  return Math.round(Math.min(25, q));
}
function catScore(p, inp) {
  let s = p.pop * 1.5;
  const f = inp.focus;
  if (f.size) {
    if (f.has(p.cat)) s += 6;
    if (f.has("theme") && p.tags.includes("theme")) s += 4;
    if (f.has("photo") && p.tags.some(t => ["lights", "reflection", "photo", "theme"].includes(t))) s += 3;
    if (f.has("heritage") && p.tags.includes("bonedi")) s += 4;
    if (f.has("hidden") && (p.cat === "hidden" || p.cat === "community" || p.tags.includes("hidden"))) s += 3;
  } else {
    s += { major: 2.5, heritage: 2, local: 1.4, community: 1.1, hidden: 1.6 }[p.cat] || 1;
  }
  if (inp.groupType === "family") {
    if (p.cat === "heritage") s += 1.6;
    if (p.cat === "community") s += 1.2;
    if (p.crowd === "Very High") s -= 2.5;
  }
  if (inp.groupType === "friends") {
    if (p.tags.includes("theme")) s += 1.4;
    if (p.tags.includes("hangout")) s += 1.6;
  }
  if (inp.groupType === "couple") {
    if (p.tags.some(t => ["lights", "reflection", "serene", "photo"].includes(t))) s += 1.8;
  }
  if (inp.crowd === "avoid") s += { "Very High": -6.5, "High": -3, "Moderate": 0.5, "Low": 2 }[p.crowd] || 0;
  if (inp.pace === "packed" && p.cat === "major" && p.crowd === "Very High") s -= 0.8; /* queues eat time */
  return s;
}

/* --------------------------- food selection ------------------------------ */
function mealMinutes(meal, inp) {
  const base = { breakfast: 35, lunch: 55, snacks: 25, dinner: 65 }[meal] || 45;
  let m = base;
  if (inp.groupType === "family") m += 10;
  if (inp.pace === "packed") m -= 10;
  if (inp.pace === "relaxed") m += 8;
  return Math.max(18, m);
}
function pickRestaurant(fw, nearA, nearB, inp) {
  const cands = DB.food
    .filter(f => (!fw.cuisine || f.cu.includes(fw.cuisine)) && (!inp.veg || f.veg || f.cu.includes("veg") || f.cu.includes("sweets")))
    .map(f => {
      let d;
      if (nearB) d = roadKm(nearA, f) + roadKm(f, nearB) - roadKm(nearA, nearB); /* detour km */
      else d = roadKm(nearA, f);
      let s = -d * 2.2;
      if (f.type === "street" || f.type === "cabin") s += fw.meal === "snacks" ? 1.5 : 0;
      if (f.price === "₹₹₹" && fw.meal !== "dinner") s -= 1;
      if (fw.cuisine && f.cu[0] === fw.cuisine) s += 0.6;
      if (f.tags && f.tags.includes("hangout") && inp.groupType === "friends") s += 0.8;
      return { f, s, detour: Math.max(0, d) };
    })
    .filter(x => x.detour <= 1.9)
    .sort((a, b) => b.s - a.s);
  return cands.length ? cands[0].f : null;
}

/* ----------------------------- the planner ------------------------------- */
function buildItinerary(inp) {
  const notes = [];
  /* resolve defaults */
  if (!inp.start) {
    const areaGuess = inp.areas.size ? DB.landmarks.find(l => l.kind === "hub" && inp.roam[0] && l.n === inp.roam[0].name) : null;
    inp.start = areaGuess ? { name: areaGuess.n, lat: areaGuess.lat, lng: areaGuess.lng, kind: "hub" } :
      { name: "Esplanade / Dharmatala", lat: 22.5645, lng: 88.3515, kind: "hub" };
    notes.push({ k: "assumed", text: "No start point detected — assumed " + inp.start.name + ". Change it anytime." });
  }
  if (!inp.end && inp.roam.length && inp.roam[0]) { /* keep open-ended, mention */ }

  const day = inp.day;
  if (day.key === "dashami") notes.push({ k: "day", text: "Dashami: immersion (bhashan) processions head to Babughat and Bagbazar Ghat from late afternoon — expect slow traffic near the ghats after 4 PM." });
  if (day.crowd >= 1.3) notes.push({ k: "day", text: day.label + " is a peak night — famous pandals will have queues. The plan adds buffer time." });
  if (inp.endMin > 1410) notes.push({ k: "night", text: "Your plan runs past 11:30 PM — metro and trains wind down around then; prefer autos or app cabs late at night." });

  /* candidate pool */
  const corridor = (p) => {
    if (inp.areas.size && inp.areas.has(p.area)) return true;
    if (inp.must.includes(p.i)) return true;
    if (inp.roam && inp.roam.some(r => haversineKm(r, p) <= 2.4)) return true;
    if (inp.end) return distToSegmentKm(p, inp.start, inp.end) <= 3.4;
    return haversineKm(inp.start, p) <= (inp.areas.size ? 9 : 7.5);
  };
  let pool = DB.pandals.filter(corridor);
  if (pool.length < 6 && !inp.areas.size && !inp.end) { pool = DB.pandals.filter(p => haversineKm(inp.start, p) <= 10); }
  if (day.key === "pre") { pool = pool.filter(p => p.tags.includes("idol-art") || p.area === "North" || p.cat === "heritage"); }

  const scored = pool.map(p => {
    let s = catScore(p, inp);
    if (inp.end) s -= 1.05 * distToSegmentKm(p, inp.start, inp.end);
    else s -= 0.35 * haversineKm(inp.start, p);
    if (inp.roam && inp.roam.length) s += Math.max(0, 3 - Math.min(...inp.roam.map(r => haversineKm(r, p)))) * 0.9;
    if (inp.must.includes(p.i)) s += 100;
    return { p, s };
  }).sort((a, b) => b.s - a.s);

  /* greedy build */
  const stops = [];
  const used = new Set();
  let cur = inp.start, t = inp.startMin, cost = 0, totalKm = 0;
  const reserveEnd = () => inp.end ? chooseLeg(cur, inp.end, inp, t).mins + 12 : 10;
  const foodsPending = inp.foods.map(f => ({ ...f, done: false }));

  const tryFood = (nextPt) => {
    const fw = foodsPending.find(f => !f.done && t >= f.window[0] - 35 && t <= f.window[1]);
    if (!fw) return false;
    const r = pickRestaurant(fw, cur, nextPt || inp.end || null, inp);
    if (!r) return false;
    const legF = chooseLeg(cur, r, inp, t);
    const mMin = mealMinutes(fw.meal, inp);
    const need = legF.mins + mMin;
    if (t + need + reserveEnd() + 10 > inp.endMin) return false;
    stops.push({ kind: "leg", ...legF, fromName: cur.name || cur.n, toName: r.n });
    stops.push({ kind: "food", ref: r, meal: fw, arrive: t + legF.mins, mins: mMin });
    t += need; totalKm += legF.km; cost += legCost(legF, inp.groupSize) + ({ breakfast: 60, lunch: 180, snacks: 50, dinner: 220 }[fw.meal] || 120) * inp.groupSize;
    cur = r; fw.done = true;
    return true;
  };

  /* family rest rule */
  let sinceRest = 0;
  const tryRest = () => {
    if (inp.groupType !== "family" || sinceRest < 150) return false;
    const r = nearestOf(cur.lat, cur.lng, DB.food.filter(f => f.cu.includes("cafe") || f.cu.includes("sweets") || f.cu.includes("sherbet")), 1, 1.4)[0];
    if (!r) return false;
    const legR = chooseLeg(cur, r.ref, inp, t);
    if (t + legR.mins + 20 + reserveEnd() + 10 > inp.endMin) return false;
    stops.push({ kind: "leg", ...legR, fromName: cur.name || cur.n, toName: r.ref.n });
    stops.push({ kind: "food", ref: r.ref, meal: { meal: "snacks", label: "Rest & refreshment", window: [0, 0], rest: true }, arrive: t + legR.mins, mins: 20 });
    t += legR.mins + 20; totalKm += legR.km; cost += legCost(legR, inp.groupSize);
    cur = r.ref; sinceRest = 0;
    return true;
  };

  let guard = 0;
  while (guard++ < 40) {
    const remaining = inp.endMin - t - reserveEnd();
    if (remaining < 18) break;
    let best = null;
    for (const { p, s } of scored) {
      if (used.has(p.i)) continue;
      const legP = chooseLeg(cur, p, inp, t);
      const v = visitMinutes(p, inp) + queueMinutes(p, inp, t + legP.mins);
      const backCost = inp.end ? Math.max(0, chooseLeg(p, inp.end, inp, t).mins - chooseLeg(cur, inp.end, inp, t).mins) : 0;
      if (legP.mins + v + backCost > remaining) continue;
      const eff = s - legP.mins * 0.06 - backCost * 0.25;
      if (!best || eff > best.eff) best = { p, s, legP, v, eff };
    }
    if (!best) break;
    tryFood(best.p) || tryRest();
    /* recompute after possible food insertion */
    const leg2 = chooseLeg(cur, best.p, inp, t);
    if (t + leg2.mins + best.v + reserveEnd() > inp.endMin) { used.add(best.p.i); continue; }
    stops.push({ kind: "leg", ...leg2, fromName: cur.name || cur.n, toName: best.p.n });
    stops.push({ kind: "pandal", ref: best.p, arrive: t + leg2.mins, mins: best.v });
    t += leg2.mins + best.v; totalKm += leg2.km; cost += legCost(leg2, inp.groupSize);
    sinceRest += leg2.mins + best.v;
    cur = best.p; used.add(best.p.i);
  }

  /* unsatisfied food: one last insertion attempt */
  for (const fw of foodsPending.filter(f => !f.done)) {
    const r = pickRestaurant(fw, cur, inp.end, inp);
    if (!r) continue;
    const legF = chooseLeg(cur, r, inp, t), mMin = mealMinutes(fw.meal, inp);
    if (t + legF.mins + mMin + reserveEnd() <= inp.endMin) {
      stops.push({ kind: "leg", ...legF, fromName: cur.name || cur.n, toName: r.n });
      stops.push({ kind: "food", ref: r, meal: fw, arrive: t + legF.mins, mins: mMin });
      t += legF.mins + mMin; totalKm += legF.km; cost += legCost(legF, inp.groupSize);
      cur = r; fw.done = true;
    }
  }
  const unmet = foodsPending.filter(f => !f.done);
  if (unmet.length) notes.push({ k: "food", text: "Could not comfortably fit " + unmet.map(f => f.label).join(", ") + " in this window — extend your end time or try a packed pace." });

  /* final leg to end point */
  let endNote = null;
  if (inp.end) {
    const legE = chooseLeg(cur, inp.end, inp, t);
    stops.push({ kind: "leg", ...legE, fromName: cur.name || cur.n, toName: inp.end.name });
    t += legE.mins; totalKm += legE.km; cost += legCost(legE, inp.groupSize);
    stops.push({ kind: "end", name: inp.end.name, kindOf: inp.end.kind, arrive: t });
  } else {
    endNote = "Open-ended plan — finish anywhere near " + cur.name;
    stops.push({ kind: "end", name: cur.name || cur.n, kindOf: "open", arrive: t, open: true });
  }

  const pandalCount = stops.filter(s => s.kind === "pandal").length;
  const foodCount = stops.filter(s => s.kind === "food").length;
  if (pandalCount === 0) notes.push({ k: "warn", text: "The time window was too tight for even one pandal — try widening the hours." });
  else if (pandalCount <= 2 && (inp.endMin - inp.startMin) > 240) notes.push({ k: "warn", text: "Only " + pandalCount + " stops fit comfortably — widen the area, loosen the crowd filter, or extend your time." });

  return {
    input: inp, stops, notes, endNote,
    stats: {
      pandals: pandalCount, food: foodCount,
      km: +totalKm.toFixed(1),
      cost: Math.round(cost / 10) * 10,
      window: fmtTime(inp.startMin) + " → " + fmtTime(Math.min(t, inp.endMin)),
      modes: [...new Set(stops.filter(s => s.kind === "leg").map(s => s.mode))]
    }
  };
}

/* ------------------------- everything around you ------------------------- */
function aroundHere(lat, lng, excludeId) {
  return {
    pandals: nearestOf(lat, lng, DB.pandals.filter(p => p.i !== excludeId), 5, 2.6),
    food: nearestOf(lat, lng, DB.food, 5, 1.9),
    metro: nearestOf(lat, lng, DB.metro, 2, 3),
    rail: nearestOf(lat, lng, DB.rail, 2, 4),
    hospitals: nearestOf(lat, lng, DB.hospitals, 2, 4.5),
    police: nearestOf(lat, lng, DB.police, 1, 3.5),
    markets: nearestOf(lat, lng, DB.markets, 3, 3),
    events: nearestOf(lat, lng, DB.events, 2, 3)
  };
}

/* ------------------------------ refine ----------------------------------- */
function applyRefine(prevInput, text) {
  const t = " " + text.toLowerCase() + " ";
  const inp = JSON.parse(JSON.stringify({ ...prevInput, focus: [...prevInput.focus], areas: [...prevInput.areas] }));
  inp.focus = new Set(inp.focus); inp.areas = new Set(inp.areas);
  const day = DB.pujaDays.find(d => d.key === (inp.day.key || inp.day)); inp.day = day || inp.day;
  const changes = [];

  if (/\b(shorter|less time|finish earlier|cut)\b/.test(t)) { inp.endMin = Math.max(inp.startMin + 90, inp.endMin - 60); changes.push("Shortened the window by an hour"); }
  if (/\b(longer|more time|extend|finish later)\b/.test(t)) { inp.endMin = Math.min(1530, inp.endMin + 60); changes.push("Extended the window by an hour"); }
  if (/\b(relaxed|slower|calmer)\b/.test(t)) { inp.pace = "relaxed"; changes.push("Switched to a relaxed pace"); }
  if (/\b(faster|packed|more pandals|fit more)\b/.test(t)) { inp.pace = "packed"; changes.push("Switched to a packed pace"); }
  if (/\b(less crowd|fewer crowd|quieter|avoid crowd)\b/.test(t)) { inp.crowd = "avoid"; changes.push("Filtering out heavy-crowd pandals"); }
  if (/\b(more famous|bigger|popular)\b/.test(t)) { inp.crowd = "any"; inp.focus.add("major"); changes.push("Leaning into the famous majors"); }
  if (/\b(veg|vegetarian)\b/.test(t)) { inp.veg = true; changes.push("Vegetarian food filter on"); }

  const parsed = parseRequest(text, null);
  if (parsed.set.has("start")) { inp.start = parsed.input.start; changes.push("Start → " + inp.start.name); }
  if (parsed.set.has("end")) { inp.end = parsed.input.end; changes.push("End → " + inp.end.name); }
  if (parsed.set.has("time")) { inp.startMin = parsed.input.startMin; inp.endMin = parsed.input.endMin; changes.push("Time window updated"); }
  if (parsed.set.has("day")) { inp.day = parsed.input.day; changes.push("Day → " + inp.day.label); }
  if (parsed.set.has("food")) {
    for (const f of parsed.input.foods) {
      if (!inp.foods.some(x => x.meal === f.meal && x.cuisine === f.cuisine)) { inp.foods.push(f); changes.push("Added food stop: " + f.label); }
    }
    inp.foods = inp.foods.slice(0, 3);
  }
  if (parsed.set.has("must")) {
    for (const id of parsed.input.must) if (!inp.must.includes(id)) { inp.must.push(id); changes.push("Must-visit added: " + DB.pandals.find(p => p.i === id).n.split(",")[0]); }
  }
  if (/\bremove (the )?(dinner|food|lunch|breakfast|snacks)\b/.test(t)) {
    const meal = t.match(/remove (?:the )?(dinner|food|lunch|breakfast|snacks)/)[1];
    inp.foods = inp.foods.filter(f => f.meal !== meal && !(meal === "food"));
    changes.push("Removed the " + meal + " stop");
  }
  if (!changes.length) changes.push("Nothing specific detected — regenerated with the same brief");
  return { input: inp, changes };
}


/* ------------------- all possible ways ------------------- */
function cloneInput(inp) {
  return {
    ...inp,
    modes: { ...inp.modes },
    foods: [...inp.foods],
    focus: new Set(inp.focus),
    areas: new Set(inp.areas),
    must: [...inp.must], roam: [...inp.roam], notes: []
  };
}
function buildAllOptions(inp) {
  const out = [];
  out.push({ label: "Best match", plan: buildItinerary(cloneInput(inp)) });
  const rlx = cloneInput(inp); rlx.pace = "relaxed"; out.push({ label: "Relaxed & calm", plan: buildItinerary(rlx) });
  const pkd = cloneInput(inp); pkd.pace = "packed"; out.push({ label: "Packed - maximum pandals", plan: buildItinerary(pkd) });
  const qc = cloneInput(inp); qc.crowd = "avoid"; out.push({ label: "Avoid heavy crowds", plan: buildItinerary(qc) });
  const met = cloneInput(inp); met.modes = { walk: true, auto: false, bus: false, metro: true, train: true }; out.push({ label: "Metro + walk route", plan: buildItinerary(met) });
  const aut = cloneInput(inp); aut.modes = { walk: true, auto: true, bus: false, metro: false, train: false }; out.push({ label: "Auto + walk route", plan: buildItinerary(aut) });
  const bus = cloneInput(inp); bus.modes = { walk: true, auto: false, bus: true, metro: false, train: true }; out.push({ label: "Bus + train route", plan: buildItinerary(bus) });
  const food = cloneInput(inp); if (!food.foods.length) food.foods = [{ meal: "dinner", cuisine: "any", window: [1170, 1350], label: "Puja street food" }]; out.push({ label: "Food-first trail", plan: buildItinerary(food) });
  const major = cloneInput(inp); major.focus.add("major"); out.push({ label: "Famous majors tour", plan: buildItinerary(major) });
  const local = cloneInput(inp); local.focus.delete("major"); local.focus.add("local"); out.push({ label: "Local neighbourhood Puja", plan: buildItinerary(local) });
  return out;
}

