/* ============================================================================
   PUJAPATH — UI layer
   ========================================================================== */
"use strict";

/* ------------------------------- icons ----------------------------------- */
const I = (p, extra) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ${extra || ""}>${p}</svg>`;
const ICONS = {
  pin: I('<path d="M12 21s-6-5.1-6-10a6 6 0 1 1 12 0c0 4.9-6 10-6 10z"/><circle cx="12" cy="11" r="2.2"/>'),
  flag: I('<path d="M6 21V4"/><path d="M6 5c4-2.2 8 2.2 12 0v9c-4 2.2-8-2.2-12 0"/>'),
  diya: I('<path d="M12 3c1.6 1.7 2.2 3 2.2 4.1a2.2 2.2 0 0 1-4.4 0C9.8 6 10.4 4.7 12 3z"/><path d="M5 13h14c0 3.5-3 6-7 6s-7-2.5-7-6z"/><path d="M9 22h6"/>'),
  temple: I('<path d="M4 21h16"/><path d="M6 21v-7.5C6 9 8.7 6.2 12 4c3.3 2.2 6 5 6 9.5V21"/><path d="M12 4V1.8"/><path d="M9.5 21v-4.5a2.5 2.5 0 0 1 5 0V21"/>'),
  food: I('<path d="M7 3v18"/><path d="M4.5 3v4a2.5 2.5 0 0 0 5 0V3"/><path d="M17 3c-2 0-3.2 2-3.2 5v3H17v10"/>'),
  train: I('<rect x="5" y="3" width="14" height="13" rx="2.5"/><path d="M5 9h14"/><circle cx="9" cy="12.6" r=".6"/><circle cx="15" cy="12.6" r=".6"/><path d="M8 16l-2.5 5M16 16l2.5 5"/>'),
  metro: I('<rect x="4" y="3" width="16" height="18" rx="4.5"/><path d="M7.5 14.5v-5l4.5 3.6 4.5-3.6v5"/>'),
  bus: I('<rect x="4" y="4" width="16" height="13" rx="2.5"/><path d="M4 10.5h16"/><circle cx="8" cy="19.4" r="1.4"/><circle cx="16" cy="19.4" r="1.4"/>'),
  auto: I('<path d="M4 15l1.6-6A2 2 0 0 1 7.5 7.5h6L17 12l3 1.4V16"/><path d="M4 15v1.5h2"/><circle cx="8.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/><path d="M10.3 17.5h4.4"/>'),
  cab: I('<path d="M5 12l1.7-4.4A2 2 0 0 1 8.6 6.4h6.8a2 2 0 0 1 1.9 1.2L19 12"/><rect x="4" y="12" width="16" height="5.5" rx="1.6"/><circle cx="8" cy="17.6" r="1.5"/><circle cx="16" cy="17.6" r="1.5"/>'),
  walk: I('<circle cx="13" cy="4.5" r="1.8"/><path d="M13 7.5l-2.5 4 2 3v6"/><path d="M10.5 11.5L7 13"/><path d="M13 7.5l3 2.5 2.5.8"/><path d="M12.5 14.5l-2.8 6"/>'),
  hospital: I('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8.5v7M8.5 12h7"/>'),
  pill: I('<rect x="3.5" y="9" width="17" height="7" rx="3.5" transform="rotate(-35 12 12.5)"/><path d="M8.5 8.5l6 7"/>'),
  star: I('<path d="M12 3.5l2.5 5.2 5.7.7-4.2 4 1.1 5.6-5.1-2.8-5.1 2.8 1.1-5.6-4.2-4 5.7-.7z"/>'),
  clock: I('<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.4 2"/>'),
  users: I('<circle cx="9" cy="8.5" r="3"/><path d="M3.5 20c.6-3.4 2.8-5 5.5-5s4.9 1.6 5.5 5"/><circle cx="16.8" cy="9.5" r="2.4"/><path d="M16 14.6c2.3.3 4 1.8 4.5 4.4"/>'),
  chevron: I('<path d="M6 9l6 6 6-6"/>'),
  search: I('<circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/>'),
  spark: I('<path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/><path d="M19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9z"/>'),
  dhaak: I('<path d="M6 4h12M6 20h12"/><path d="M7.5 4C5.8 9 5.8 15 7.5 20"/><path d="M16.5 4c1.7 5 1.7 11 0 16"/><path d="M3 2l4 4M21 2l-4 4"/>'),
  bag: I('<path d="M6 8h12l-1.2 12.2a1.8 1.8 0 0 1-1.8 1.6H9a1.8 1.8 0 0 1-1.8-1.6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>'),
  gem: I('<path d="M7 3h10l4 6-9 12L3 9z"/><path d="M3 9h18M12 21L8.5 9 12 3l3.5 6z"/>'),
  copy: I('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
  printer: I('<path d="M7 8V3h10v5"/><rect x="4" y="8" width="16" height="9" rx="2"/><path d="M7 14h10v7H7z"/>'),
  x: I('<path d="M5 5l14 14M19 5L5 19"/>'),
  plus: I('<path d="M12 5v14M5 12h14"/>'),
  check: I('<path d="M4.5 12.5l5 5L19.5 7"/>'),
  arrow: I('<path d="M12 4v16M6 14l6 6 6-6"/>'),
  edit: I('<path d="M14 5l5 5L8 21H3v-5z"/><path d="M12 7l5 5"/>'),
  nav: I('<path d="M12 2l3 8 7 2-7 2-3 8-3-8-7-2 7-2z"/>'),
  info: I('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.1"/>'),
  shield: I('<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4.5"/>'),
  event: I('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M9 15l2 2 4-4"/>'),
  home: I('<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/>')
};
function icon(name, cls) { return `<span class="ic ${cls || ""}">${ICONS[name] || ICONS.pin}</span>`; }
const MODE_ICON = { walk: "walk", auto: "auto", cab: "cab", bus: "bus", metro: "metro", train: "train" };
const MODE_LABEL = { walk: "Walk", auto: "Auto", cab: "App cab", bus: "Bus", metro: "Metro", train: "Local train" };

/* ------------------------------ helpers ---------------------------------- */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const CROWD_CLS = { "Very High": "vh", "High": "hi", "Moderate": "mo", "Low": "lo" };
const CAT_LABEL = { major: "Major", local: "Local barowari", community: "Community", heritage: "Heritage bonedi", hidden: "Hidden gem" };

function store(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
function load(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }

const state = {
  must: new Set(load("pj_must", [])),
  result: null,
  input: null,
  exploreCat: "all", exploreArea: "all", exploreCrowd: "all", exploreSort: "pop", exploreQ: ""
};

/* ----------------------------- navigation -------------------------------- */
function go(view) {
  $$(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + view));
  $$(".nav-link").forEach(b => b.classList.toggle("active", b.dataset.view === view));
  if (view === "roadmap") renderPlan();
  if (view === "explore") renderExplore();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* --------------------------- understanding chips -------------------------- */
function renderChips(chips, mount) {
  if (!chips.length) { mount.innerHTML = ""; return; }
  mount.innerHTML = `<div class="chips-title">${icon("spark")} Here is what I understood — tap CREATE to accept, or edit your sentence:</div>
    <div class="chips">` + chips.map(c =>
    `<span class="chip ${c.assumed ? "assumed" : ""}"><b>${esc(c.label)}</b>${esc(c.value)}${c.assumed ? " <i>(assumed)</i>" : ""}</span>`).join("") + `</div>`;
}

/* ============================ ROADMAP RENDER ============================= */
function renderPlan() {
  const r = state.result;
  const mount = $("#roadmap-body");
  if (!r) {
    mount.innerHTML = `<div class="empty-roadmap">
      <div class="empty-diya">${icon("diya")}</div>
      <h3>No roadmap yet</h3>
      <p>Tell us your plan on the home page — or build one stop by stop — and your Puja path appears here.</p>
      <button class="btn primary" onclick="go('home')">Plan my Puja</button>
    </div>`;
    return;
  }
  mount.innerHTML = `
    <div class="rm-head">
      <div>
        <p class="sec-kicker">আপনার রোডম্যাপ</p>
        <h2 class="rm-title">Your Puja ${isNight(r) ? "Night" : "Trail"}</h2>
      </div>
      <div class="rm-actions">
        <button class="btn ghost sm" onclick="copyPlan()">${icon("copy")} Copy plan</button>
        <button class="btn ghost sm" onclick="window.print()">${icon("printer")} Print</button>
      </div>
    </div>
    ${state.options && state.options.length > 1 ? `<div class="note" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><b>Route options:</b> ${state.options.map((o,i) => `<button class="btn ghost sm ${i===state.optionIdx?'active':''}" onclick="selectOption(${i})">${esc(o.label)}</button>`).join("")}</div>` : ""}
    ${renderStats(r)}
    ${r.notes.length ? `<div class="notes">${r.notes.map(n => `<div class="note ${n.k}">${icon("info")}<span>${esc(n.text)}</span></div>`).join("")}</div>` : ""}
    <div class="rm-grid">
      <div class="rm-map-col">${renderMap(r)}</div>
      <div class="rm-tl-col">${renderTimeline(r)}</div>
    </div>
    <div class="refine-bar">
      <div class="refine-label">${icon("edit")} <b>Tweak it in plain words</b> — “add biryani”, “make it relaxed”, “add Maddox Square”, “end at Garia instead”…</div>
      <div class="refine-row">
        <input id="refine-input" placeholder="e.g. add dinner, avoid crowds, finish an hour later" />
        <button class="btn primary sm" onclick="doRefine()">Update roadmap</button>
      </div>
      <div id="refine-changes"></div>
    </div>`;
}
function isNight(r) { return r.input.startMin >= 960; }

function renderStats(r) {
  const s = r.stats;
  const items = [
    ["diya", s.pandals + " pandal" + (s.pandals === 1 ? "" : "s")],
    ["food", s.food + " food stop" + (s.food === 1 ? "" : "s")],
    ["nav", s.km + " km on the road"],
    ["clock", s.window],
    ["users", r.input.groupSize + " · " + ({ family: "family", couple: "couple", solo: "solo", friends: "friends" }[r.input.groupType])],
    ["event", r.input.day.label],
    ["bag", "≈ ₹" + s.cost.toLocaleString("en-IN") + " transport+food (indicative)"]
  ];
  return `<div class="stat-strip">` + items.map(i => `<span class="stat">${icon(i[0])}${esc(i[1])}</span>`).join("") + `</div>`;
}

function renderTimeline(r) {
  let html = `<div class="tl">`;
  html += tlStart(r);
  for (const s of r.stops) {
    if (s.kind === "leg") html += tlLeg(s, r);
    else if (s.kind === "pandal") html += tlPandal(s, r);
    else if (s.kind === "food") html += tlFood(s, r);
    else if (s.kind === "end") html += tlEnd(s, r);
  }
  return html + `</div>`;
}

function tlStart(r) {
  return `<div class="tl-item start">
    <div class="tl-time">${fmtTime(r.input.startMin)}</div>
    <div class="tl-node">${icon("flag")}</div>
    <div class="tl-card plain"><b>Start — ${esc(r.input.start.name)}</b>
      <span class="tl-sub">${r.input.groupSize} ${r.input.groupType === "family" ? "family members" : r.input.groupType === "couple" ? "of you" : r.input.groupType === "solo" ? "traveller" : "friends"} · ${r.input.day.label} · ${r.input.pace} pace</span>
    </div>
  </div>`;
}

function tlLeg(s) {
  const via = s.from ? `<em>${esc(s.from)} → ${esc(s.to)}${s.line ? " · " + s.line + " line" : ""}</em>` : "";
  const alt = s.alt ? `<em>alt: ${MODE_LABEL[s.alt.mode]} ≈ ${Math.round(s.alt.mins)} min</em>` : "";
  const night = s.night && (s.mode === "auto" || s.mode === "cab") ? `<em>late hour — prefer app cab</em>` : "";
  return `<div class="tl-leg">
    <span class="leg-pill">${icon(MODE_ICON[s.mode])}<b>${Math.round(s.mins)} min</b> ${MODE_LABEL[s.mode]} · ${s.km} km</span>
    ${via}${alt}${night}
  </div>`;
}

function tlPandal(s, r) {
  const p = s.ref;
  const saved = state.must.has(p.i);
  return `<div class="tl-item">
    <div class="tl-time">${fmtTime(s.arrive)}</div>
    <div class="tl-node">${icon(p.cat === "heritage" ? "temple" : p.cat === "hidden" ? "gem" : "diya")}</div>
    <div class="tl-card">
      <div class="tl-card-head" onclick="toggleCard(this)">
        <div class="tl-title">
          <b>${esc(p.n)}</b>
          <span class="tl-sub">${esc(p.loc)} · ${p.area} Kolkata</span>
        </div>
        <div class="tl-chips">
          <span class="badge cat-${p.cat}">${CAT_LABEL[p.cat]}</span>
          <span class="chip2">${icon("clock")}${s.mins} min</span>
          <span class="chip2 crowd-${CROWD_CLS[p.crowd]}">${icon("users")}${p.crowd}</span>
        </div>
        <span class="tl-toggle">${icon("chevron")}</span>
      </div>
      <div class="tl-details">
        <p class="tl-desc">${esc(p.d)}</p>
        <div class="tagrow">${p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("")}${p.since ? `<span class="tag">since ~${p.since}</span>` : ""}${p.demo ? `<span class="tag demo">demo listing</span>` : ""}</div>
        <div class="pop-meter"><span>Public profile</span><div class="meter">${meter(p.pop)}</div><b>${p.pop}/10</b></div>
        <div class="tl-actions">
          <button class="mini" onclick="openAround('${p.i}')">${icon("nav")} Everything around here</button>
          <button class="mini ${saved ? "saved" : ""}" onclick="toggleMust('${p.i}', this)">${icon(saved ? "check" : "plus")} ${saved ? "In my plan" : "Keep in plan"}</button>
          <a class="mini" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}">${icon("pin")} Navigate</a>
        </div>
        ${renderAroundMini(p.lat, p.lng, p.i)}
      </div>
    </div>
  </div>`;
}

function meter(pop) {
  let h = "";
  for (let i = 1; i <= 10; i++) h += `<i class="${i <= pop ? "on" : ""}"></i>`;
  return h;
}

function tlFood(s) {
  const f = s.ref;
  return `<div class="tl-item food">
    <div class="tl-time">${fmtTime(s.arrive)}</div>
    <div class="tl-node">${icon("food")}</div>
    <div class="tl-card">
      <div class="tl-card-head" onclick="toggleCard(this)">
        <div class="tl-title">
          <b>${esc(s.meal.rest ? "Rest stop — " : "")}${esc(f.n)}</b>
          <span class="tl-sub">${esc(s.meal.label)} · ${esc(f.loc)} · ${f.price || ""}</span>
        </div>
        <div class="tl-chips"><span class="badge cat-food">${esc(f.type)}</span><span class="chip2">${icon("clock")}${s.mins} min</span></div>
        <span class="tl-toggle">${icon("chevron")}</span>
      </div>
      <div class="tl-details">
        <p class="tl-desc">${esc(f.d)}</p>
        <div class="tagrow">${f.cu.map(c => `<span class="tag">${esc(c)}</span>`).join("")}${f.veg ? `<span class="tag">veg</span>` : ""}${f.since ? `<span class="tag">since ~${f.since}</span>` : ""}</div>
        <div class="tl-actions"><a class="mini" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${f.lat},${f.lng}">${icon("pin")} Navigate</a></div>
      </div>
    </div>
  </div>`;
}

function tlEnd(s, r) {
  const isStation = s.kindOf === "station";
  return `<div class="tl-item end">
    <div class="tl-time">${fmtTime(Math.min(s.arrive, r.input.endMin))}</div>
    <div class="tl-node">${icon(isStation ? "train" : "pin")}</div>
    <div class="tl-card plain"><b>${s.open ? "Finish (open-ended)" : "End — " + esc(s.name)}</b>
      <span class="tl-sub">${s.open ? esc(r.endNote || "") : isStation ? "Railway station — book return tickets ahead on peak days" : "Planned arrival — within your window"}</span>
      ${s.arrive > r.input.endMin ? `<span class="tl-warn">${icon("info")} Runs ~${Math.round(s.arrive - r.input.endMin)} min past your target — drop a stop or shift the end time.</span>` : ""}
    </div>
  </div>`;
}

function renderAroundMini(lat, lng, excludeId) {
  const a = aroundHere(lat, lng, excludeId);
  const row = (ic, label, items, fmt) => items.length ? `<div class="arow"><span class="alabel">${icon(ic)}${label}</span><span class="aval">${items.map(fmt).join(" · ") || "—"}</span></div>` : "";
  const d = x => `${esc(x.ref.n.split(",")[0])} <i>${x.d < 0.95 ? Math.round(x.d * 1000) + " m" : x.d.toFixed(1) + " km"}</i>`;
  return `<div class="around-mini">
    ${row("train", "Rail", a.rail.slice(0, 1), d)}
    ${row("metro", "Metro", a.metro.slice(0, 1), d)}
    ${row("food", "Food", a.food.slice(0, 2), d)}
    ${row("hospital", "Hospital", a.hospitals.slice(0, 1), d)}
  </div>`;
}

function toggleCard(head) {
  head.parentElement.classList.toggle("open");
}

/* ------------------------------ SVG map ----------------------------------- */
function renderMap(r) {
  const pts = [];
  r.stops.forEach(s => {
    if (s.kind === "pandal") pts.push({ lat: s.ref.lat, lng: s.ref.lng, name: s.ref.n, kind: "pandal" });
    else if (s.kind === "food") pts.push({ lat: s.ref.lat, lng: s.ref.lng, name: s.ref.n, kind: "food" });
  });
  pts.unshift({ lat: r.input.start.lat, lng: r.input.start.lng, name: r.input.start.name, kind: "start" });
  if (r.input.end) pts.push({ lat: r.input.end.lat, lng: r.input.end.lng, name: r.input.end.name, kind: "end" });
  /* de-dupe consecutive same points */
  const seq = pts.filter((p, i) => i === 0 || haversineKm(p, pts[i - 1]) > 0.03);

  const W = 520, H = 560, PAD = 46;
  const lats = seq.map(p => p.lat), lngs = seq.map(p => p.lng);
  const RIVER = [[88.366, 22.665], [88.356, 22.620], [88.352, 22.600], [88.347, 22.585], [88.342, 22.570], [88.336, 22.555], [88.330, 22.540], [88.322, 22.520], [88.312, 22.500], [88.306, 22.480], [88.300, 22.458]];
  [...RIVER].forEach(([x, y]) => { lats.push(y); lngs.push(x); });
  const minLa = Math.min(...lats), maxLa = Math.max(...lats), minLo = Math.min(...lngs), maxLo = Math.max(...lngs);
  const sx = (maxLo - minLo) || 0.01, sy = (maxLa - minLa) || 0.01;
  const scale = Math.min((W - 2 * PAD) / sx, (H - 2 * PAD) / sy);
  const ox = (W - sx * scale) / 2, oy = (H - sy * scale) / 2;
  const X = lo => ox + (lo - minLo) * scale;
  const Y = la => H - (oy + (la - minLa) * scale);

  const riverPath = RIVER.map(([lo, la], i) => (i ? "L" : "M") + X(lo).toFixed(1) + " " + Y(la).toFixed(1)).join(" ");
  const routePath = seq.map((p, i) => (i ? "L" : "M") + X(p.lng).toFixed(1) + " " + Y(p.lat).toFixed(1)).join(" ");

  let markers = "";
  seq.forEach((p, i) => {
    const x = X(p.lng), y = Y(p.lat);
    if (p.kind === "start") markers += `<g class="mk"><circle cx="${x}" cy="${y}" r="11" class="mk-start"/><text x="${x}" y="${y + 4}" text-anchor="middle">S</text></g>`;
    else if (p.kind === "end") markers += `<g class="mk"><circle cx="${x}" cy="${y}" r="11" class="mk-end"/><text x="${x}" y="${y + 4}" text-anchor="middle">E</text></g>`;
    else if (p.kind === "food") markers += `<g class="mk"><circle cx="${x}" cy="${y}" r="9" class="mk-food"/><text x="${x}" y="${y + 4}" text-anchor="middle">${i}</text></g>`;
    else markers += `<g class="mk"><circle cx="${x}" cy="${y}" r="10" class="mk-pandal"/><text x="${x}" y="${y + 4}" text-anchor="middle">${i}</text></g>`;
  });

  const labels = seq.filter((p, i) => p.kind === "start" || p.kind === "end" || i % 2 === 1)
    .map((p, i) => `<text class="mk-label" x="${X(p.lng) + 14}" y="${Y(p.lat) - 8}">${esc(p.name.split(",")[0].split("(")[0].slice(0, 22))}</text>`).join("");

  return `<div class="map-frame">
    <div class="map-title"><span>${icon("nav")} Route sketch</span><em>illustrative — not to scale</em></div>
    <svg viewBox="0 0 ${W} ${H}" class="rmap" role="img" aria-label="Illustrative route map">
      <rect x="0" y="0" width="${W}" height="${H}" class="map-bg"/>
      <path d="${riverPath}" class="river"/>
      <text x="${X(88.335)}" y="${Y(22.56)}" class="river-label" transform="rotate(-72 ${X(88.335)} ${Y(22.56)})">Hooghly river</text>
      <path d="${routePath}" class="route"/>
      ${markers}${labels}
    </svg>
    <div class="map-key">
      <span><i class="dot start"></i>Start</span><span><i class="dot pandal"></i>Pandal</span>
      <span><i class="dot food"></i>Food</span><span><i class="dot end"></i>End</span>
    </div>
  </div>`;
}

/* =========================== EXPLORE DATABASE ============================ */
function renderExplore() {
  const mount = $("#explore-body");
  const q = state.exploreQ.toLowerCase();
  let list = DB.pandals.filter(p =>
    (state.exploreCat === "all" || p.cat === state.exploreCat) &&
    (state.exploreArea === "all" || p.area === state.exploreArea) &&
    (state.exploreCrowd === "all" || p.crowd === state.exploreCrowd) &&
    (!q || (p.n + " " + p.loc + " " + p.d + " " + p.tags.join(" ")).toLowerCase().includes(q))
  );
  list.sort((a, b) => state.exploreSort === "name" ? a.n.localeCompare(b.n) :
    state.exploreSort === "quiet" ? ["Low", "Moderate", "High", "Very High"].indexOf(a.crowd) - ["Low", "Moderate", "High", "Very High"].indexOf(b.crowd) :
    b.pop - a.pop);

  mount.innerHTML = `
    <div class="explore-filters">
      <div class="searchbox">${icon("search")}<input id="ex-q" placeholder="Search pandals, localities, vibes…" value="${esc(state.exploreQ)}"></div>
      <div class="frow">
        <div class="fchips" id="ex-cats">
          ${["all", "major", "local", "community", "heritage", "hidden"].map(c => `<button class="fchip ${state.exploreCat === c ? "on" : ""}" data-c="${c}">${c === "all" ? "All" : CAT_LABEL[c]}</button>`).join("")}
        </div>
        <select id="ex-area">${["all", ...DB.areas.map(a => a.key)].map(a => `<option ${state.exploreArea === a ? "selected" : ""} value="${a}">${a === "all" ? "All areas" : a + " Kolkata"}</option>`).join("")}</select>
        <select id="ex-crowd">${["all", "Low", "Moderate", "High", "Very High"].map(c => `<option ${state.exploreCrowd === c ? "selected" : ""} value="${c}">${c === "all" ? "Any crowd" : c + " crowd"}</option>`).join("")}</select>
        <select id="ex-sort"><option value="pop" ${state.exploreSort === "pop" ? "selected" : ""}>Sort: most known</option><option value="quiet" ${state.exploreSort === "quiet" ? "selected" : ""}>Sort: quietest first</option><option value="name" ${state.exploreSort === "name" ? "selected" : ""}>Sort: A–Z</option></select>
      </div>
      <p class="fcount">Showing <b>${list.length}</b> of ${DB.pandals.length} Puja listings — majors, paras, bonedi baris, hidden gems.</p>
    </div>
    <div class="pgrid">` + list.map(pCard).join("") + `</div>
    <div class="events-strip">
      <h3>${icon("dhaak")} Seasonal experiences <em>(indicative patterns — timings vary by year)</em></h3>
      <div class="egrid">${DB.events.map(e => `<div class="ecard" onclick="openMarker(${e.lat},${e.lng},'${esc(e.n)}')"><b>${esc(e.n)}</b><span>${esc(e.where)}</span><span class="ewhen">${icon("clock")}${esc(e.when)}</span><p>${esc(e.d)}</p></div>`).join("")}</div>
    </div>`;

  $("#ex-q").oninput = e => { state.exploreQ = e.target.value; softRerenderGrid(); };
  $$("#ex-cats .fchip").forEach(b => b.onclick = () => { state.exploreCat = b.dataset.c; renderExplore(); });
  $("#ex-area").onchange = e => { state.exploreArea = e.target.value; renderExplore(); };
  $("#ex-crowd").onchange = e => { state.exploreCrowd = e.target.value; renderExplore(); };
  $("#ex-sort").onchange = e => { state.exploreSort = e.target.value; renderExplore(); };
}
function softRerenderGrid() { renderExplore(); const inp = $("#ex-q"); inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }

function pCard(p) {
  const saved = state.must.has(p.i);
  return `<article class="pcard" onclick="openAround('${p.i}')">
    <div class="pc-badges"><span class="badge cat-${p.cat}">${CAT_LABEL[p.cat]}</span><span class="chip2 crowd-${CROWD_CLS[p.crowd]}">${icon("users")}${p.crowd}</span>${p.demo ? `<span class="tag demo">demo</span>` : ""}</div>
    <h3>${esc(p.n)}</h3>
    <p class="pc-loc">${icon("pin")}${esc(p.loc)} · ${p.area} Kolkata</p>
    <p class="pc-desc">${esc(p.d)}</p>
    <div class="pc-foot">
      <span class="chip2">${icon("clock")}${p.dur} min</span>
      <div class="meter sm">${meter(p.pop)}</div>
      <button class="mini ${saved ? "saved" : ""}" onclick="event.stopPropagation(); toggleMust('${p.i}', this)">${icon(saved ? "check" : "plus")} ${saved ? "Saved" : "My plan"}</button>
    </div>
  </article>`;
}

/* --------------------------- around / modal ------------------------------- */
function openAround(id) {
  const p = DB.pandals.find(x => x.i === id);
  if (!p) return;
  const a = aroundHere(p.lat, p.lng, p.i);
  openSheet(`
    <div class="sheet-head">
      <div class="pc-badges"><span class="badge cat-${p.cat}">${CAT_LABEL[p.cat]}</span><span class="chip2 crowd-${CROWD_CLS[p.crowd]}">${icon("users")}${p.crowd} crowd</span><span class="chip2">${icon("clock")}${p.dur} min typical</span>${p.since ? `<span class="chip2">since ~${p.since}</span>` : ""}</div>
      <h2>${esc(p.n)}</h2>
      <p class="pc-loc">${icon("pin")}${esc(p.loc)} · ${p.area} Kolkata ${p.demo ? `<span class="tag demo">community-suggested demo listing — details approximate</span>` : ""}</p>
      <p class="sheet-desc">${esc(p.d)}</p>
      <div class="pop-meter"><span>Public profile</span><div class="meter">${meter(p.pop)}</div><b>${p.pop}/10</b></div>
      <div class="tl-actions">
        <button class="mini ${state.must.has(p.i) ? "saved" : ""}" onclick="toggleMust('${p.i}', this)">${icon(state.must.has(p.i) ? "check" : "plus")} ${state.must.has(p.i) ? "In my plan" : "Keep in my plan"}</button>
        <a class="mini" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}">${icon("pin")} Open in Google Maps</a>
        <button class="mini" onclick="planFromHere(${p.lat},${p.lng},'${esc(p.n.split(",")[0])}')">${icon("flag")} Start a plan from here</button>
      </div>
    </div>
    <h3 class="around-title">${icon("nav")} Everything around here</h3>
    <div class="around-grid">
      ${aroundCol("diya", "Other pandals", a.pandals, x => `<button class="alink" onclick="openAround('${x.ref.i}')">${esc(x.ref.n.split(",")[0])}</button> <i>${dkm(x.d)}</i>`, "The full spectrum — majors to para lanes")}
      ${aroundCol("food", "Food", a.food, x => `${esc(x.ref.n)} <i>${dkm(x.d)} · ${x.ref.price || ""}</i>`, "Restaurants, cabins, street rows")}
      ${aroundCol("train", "Railway", a.rail, x => `${esc(x.ref.n)} <i>${dkm(x.d)}</i>`, "Highlighted for longer hops home")}
      ${aroundCol("metro", "Metro", a.metro, x => `${esc(x.ref.n)} <i>${dkm(x.d)} · ${x.ref.line}</i>`, "Fastest at rush hour")}
      ${aroundCol("hospital", "Hospitals", a.hospitals, x => `${esc(x.ref.n)} <i>${dkm(x.d)} · ${x.ref.type}</i>`, "24×7 emergency (indicative)")}
      ${aroundCol("shield", "Police", a.police, x => `${esc(x.ref.n)} <i>${dkm(x.d)}</i>`, "Dial 100 in emergencies")}
      ${aroundCol("bag", "Markets & places", a.markets, x => `${esc(x.ref.n)} <i>${dkm(x.d)}</i>`, "Browse between pandals")}
      ${aroundCol("dhaak", "Events", a.events, x => `${esc(x.ref.n)} <i>${esc(x.ref.when)}</i>`, "Seasonal, indicative")}
    </div>`);
}
function openMarker(lat, lng, name) {
  const a = aroundHere(lat, lng, null);
  openSheet(`
    <div class="sheet-head"><h2>${esc(name)}</h2><p class="pc-loc">${icon("pin")}Approximate location shown on the route sketch data</p></div>
    <h3 class="around-title">${icon("nav")} Around this spot</h3>
    <div class="around-grid">
      ${aroundCol("diya", "Pandals", a.pandals, x => `<button class="alink" onclick="openAround('${x.ref.i}')">${esc(x.ref.n.split(",")[0])}</button> <i>${dkm(x.d)}</i>`)}
      ${aroundCol("food", "Food", a.food, x => `${esc(x.ref.n)} <i>${dkm(x.d)}</i>`)}
      ${aroundCol("metro", "Metro", a.metro, x => `${esc(x.ref.n)} <i>${dkm(x.d)}</i>`)}
      ${aroundCol("train", "Railway", a.rail, x => `${esc(x.ref.n)} <i>${dkm(x.d)}</i>`)}
      ${aroundCol("hospital", "Hospitals", a.hospitals, x => `${esc(x.ref.n)} <i>${dkm(x.d)}</i>`)}
    </div>`);
}
function dkm(d) { return d < 0.95 ? Math.round(d * 1000) + " m" : d.toFixed(1) + " km"; }
function aroundCol(ic, title, items, fmt, hint) {
  return `<div class="acol"><h4>${icon(ic)}${title}</h4>${hint ? `<span class="ahint">${esc(hint)}</span>` : ""}
    ${items && items.length ? `<ul>${items.map(x => `<li>${fmt(x)}</li>`).join("")}</ul>` : `<p class="anone">Nothing close in the demo data</p>`}</div>`;
}

function openSheet(html) {
  $("#sheet-body").innerHTML = html;
  $("#sheet").classList.add("open");
  document.body.classList.add("no-scroll");
}
function closeSheet() { $("#sheet").classList.remove("open"); document.body.classList.remove("no-scroll"); }

function planFromHere(lat, lng, name) {
  state.preStart = { name, lat, lng, kind: "custom" };
  closeSheet();
  go("home");
  const f = $("#f-start"); if (f) f.value = name;
  $("#ai-box").focus();
}

/* ------------------------------ must-visit -------------------------------- */
function toggleMust(id, btn) {
  if (state.must.has(id)) state.must.delete(id); else state.must.add(id);
  store("pj_must", [...state.must]);
  if (btn) {
    const saved = state.must.has(id);
    btn.classList.toggle("saved", saved);
    btn.innerHTML = `${icon(saved ? "check" : "plus")} ${saved ? (btn.classList.contains("mini") ? "Saved" : "In my plan") : (btn.closest(".pcard") ? "My plan" : "Keep in plan")}`;
  }
  renderMustStrip();
}
function renderMustStrip() {
  const mount = $("#must-strip");
  if (!mount) return;
  if (!state.must.size) { mount.innerHTML = ""; mount.classList.add("hide"); return; }
  mount.classList.remove("hide");
  mount.innerHTML = `<span class="must-label">${icon("star")} Kept in my plan:</span>` +
    [...state.must].map(id => { const p = DB.pandals.find(x => x.i === id); return p ? `<span class="chip">${esc(p.n.split(",")[0])}<button onclick="toggleMust('${id}')" aria-label="remove">${icon("x")}</button></span>` : ""; }).join("");
}

/* ------------------------------- actions ---------------------------------- */
function planText(r) {
  const lines = ["PUJAPATH — Your Puja Roadmap", "Day: " + r.input.day.label + " · " + fmtTime(r.input.startMin) + " start · " + r.input.groupSize + " people (" + r.input.groupType + ")", ""];
  r.stops.forEach(s => {
    if (s.kind === "leg") lines.push("   ↓ " + MODE_LABEL[s.mode] + " · " + Math.round(s.mins) + " min · " + s.km + " km" + (s.from ? " (" + s.from + " → " + s.to + ")" : ""));
    else if (s.kind === "pandal") lines.push(fmtTime(s.arrive) + "  🪔 " + s.ref.n + " — " + s.ref.loc + " (" + s.mins + " min)");
    else if (s.kind === "food") lines.push(fmtTime(s.arrive) + "  🍴 " + s.ref.n + " — " + s.meal.label + " (" + s.mins + " min)");
    else if (s.kind === "end") lines.push(fmtTime(Math.min(s.arrive, r.input.endMin)) + "  🏁 " + (s.open ? "Finish (open-ended)" : "End — " + s.name));
  });
  lines.push("", "Stats: " + r.stats.pandals + " pandals · " + r.stats.km + " km · ≈ ₹" + r.stats.cost + " (indicative)");
  lines.push("Demo data — verify timings locally. শুভ পুজো!");
  return lines.join("\n");
}
function copyPlan() {
  const txt = planText(state.result);
  const done = () => toast("Roadmap copied — paste it anywhere");
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done).catch(() => fallbackCopy(txt, done));
  else fallbackCopy(txt, done);
}
function fallbackCopy(txt, done) {
  const ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); done(); } catch (e) {}
  ta.remove();
}
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2600);
}
function doRefine() {
  const v = $("#refine-input").value.trim();
  if (!v || !state.input) return;
  const { input, changes } = applyRefine(state.input, v);
  state.input = input;
  state.result = buildItinerary({ ...input });
  renderPlan();
  $("#refine-changes").innerHTML = changes.map(c => `<span class="chip ok">${icon("check")}${esc(c)}</span>`).join("");
  $("#refine-input").value = "";
  $("#roadmap").scrollIntoView({ behavior: "smooth" });
}

/* --------------------------- planner wiring ------------------------------- */
function collectForm() {
  const inp = defaultInput();
  const s = $("#f-start").value.trim();
  const e = $("#f-end").value.trim();
  inp.start = s ? (geocode(s) || { name: s, lat: 22.5726, lng: 88.3639, kind: "custom" }) : null;
  inp.end = e ? (geocode(e) || null) : null;
  if (s && !geocode(s)) inp.notes.push({ k: "assumed", text: "Could not locate “" + s + "” on the demo map — placed it near the city centre. Try a nearby landmark instead." });
  inp.day = DB.pujaDays.find(d => d.key === $("#f-day").value) || inp.day;
  inp.startMin = toMin(...$("#f-stime").value.split(":").map(Number));
  inp.endMin = toMin(...$("#f-etime").value.split(":").map(Number));
  if (inp.endMin <= inp.startMin) inp.endMin = inp.startMin + 240;
  inp.groupSize = Math.max(1, Math.min(30, +$("#f-size").value || 4));
  inp.groupType = $("#f-type").value;
  inp.pace = $("input[name=f-pace]:checked").value;
  inp.crowd = $("#f-crowd").checked ? "avoid" : "any";
  const interests = $$("input[name=f-int]:checked").map(x => x.value);
  inp.focus = new Set(interests);
  const foods = [];
  const mealChk = $$("input[name=f-meal]:checked").map(x => x.value);
  const cuiChk = $$("input[name=f-food]:checked").map(x => x.value);
  if (mealChk.includes("breakfast")) foods.push({ cuisine: cuiChk[0] || null, meal: "breakfast", window: [480, 660], label: "Breakfast" });
  if (mealChk.includes("lunch")) foods.push({ cuisine: cuiChk[0] || null, meal: "lunch", window: [750, 900], label: "Lunch" });
  if (mealChk.includes("dinner")) foods.push({ cuisine: cuiChk.find(c => ["biryani", "bengali", "chinese", "mughlai"] .includes(c)) || cuiChk[0] || null, meal: "dinner", window: [1170, 1350], label: cuiChk.length ? "Dinner — " + cuiChk[0] : "Dinner" });
  if (mealChk.includes("snacks") || (cuiChk.length && !mealChk.length)) foods.push({ cuisine: cuiChk[0] || null, meal: "snacks", window: [1000, 1140], label: cuiChk.length ? "Snacks — " + cuiChk.join(", ") : "Snacks" });
  if (cuiChk.includes("biryani") && !foods.some(f => f.cuisine === "biryani")) foods.unshift({ cuisine: "biryani", meal: "dinner", window: [1170, 1350], label: "Biryani" });
  inp.foods = foods.slice(0, 3);
  inp.veg = $("#f-veg").checked;
  inp.modes = { walk: $("#m-walk").checked, auto: $("#m-auto").checked, bus: $("#m-bus").checked, metro: $("#m-metro").checked, train: $("#m-train").checked };
  const mv = $("#f-must").value.trim();
  inp.must = [...state.must];
  if (mv) {
    mv.split(",").forEach(name => {
      const t = name.trim().toLowerCase();
      const hit = DB.pandals.find(p => p.n.toLowerCase().includes(t) || p.i.replace(/-/g, " ") === t);
      if (hit && !inp.must.includes(hit.i)) inp.must.push(hit.i);
    });
  }
  return inp;
}

function runPlan(inp, chips) {
  state.input = inp;
  state.options = buildAllOptions(inp);
  state.optionIdx = 0;
  state.result = state.options[0].plan;
  go("roadmap");
}
function selectOption(i) {
  state.optionIdx = i;
  state.result = state.options[i].plan;
  renderPlan();
}

/* --------------------------------- boot ----------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  /* static icons */
  $$("[data-ic]").forEach(el => { el.innerHTML = ICONS[el.dataset.ic] || ""; });

  /* nav */
  $$(".nav-link").forEach(b => b.onclick = () => go(b.dataset.view));
  $$("[data-goto]").forEach(b => b.onclick = () => go(b.dataset.goto));

  /* datalists */
  $("#dl-landmarks").innerHTML = DB.landmarks.map(l => `<option value="${esc(l.n)}">`).join("");
  $("#dl-pandals").innerHTML = DB.pandals.map(p => `<option value="${esc(p.n.split(",")[0])}">`).join("");

  /* day select */
  $("#f-day").innerHTML = DB.pujaDays.map(d => `<option value="${d.key}" ${d.key === "saptami" ? "selected" : ""}>${d.label} — ${d.date}</option>`).join("");

  /* countdown (indicative dates) */
  const shashthi = new Date(2026, 9, 18), now = new Date();
  const days = Math.max(0, Math.round((shashthi - now) / 86400000));
  $("#countdown").innerHTML = days > 0 && days < 40
    ? `${icon("dhaak")} <b>${days}</b> day${days === 1 ? "" : "s"} to Shashthi <em>(dates indicative)</em>`
    : `${icon("dhaak")} শারদোৎসব ২০২৬`;

  /* AI box: live parse + run */
  const aiBox = $("#ai-box");
  const aiChips = $("#ai-chips");
  let lastParsed = null;
  const reparse = () => {
    const v = aiBox.value.trim();
    if (v.length < 8) { aiChips.innerHTML = ""; lastParsed = null; return; }
    lastParsed = parseRequest(v);
    const inp = lastParsed.input, s = lastParsed.set;
    const display = [...lastParsed.chips];
    if (!s.has("start")) display.push({ label: "Start", value: "city centre (Esplanade) — say “from …” to change", assumed: true });
    if (!s.has("end")) display.push({ label: "End", value: inp.end ? inp.end.name : "open-ended", assumed: !inp.end });
    if (!s.has("time")) display.push({ label: "Time", value: fmtTime(inp.startMin) + " → " + fmtTime(inp.endMin), assumed: true });
    if (!s.has("day")) display.push({ label: "Day", value: inp.day.label, assumed: true });
    if (!s.has("group")) display.push({ label: "Group", value: inp.groupSize + " · friends", assumed: true });
    if (!s.has("pace")) display.push({ label: "Pace", value: inp.pace, assumed: true });
    renderChips(display, aiChips);
  };
  aiBox.addEventListener("input", reparse);
  $("#ai-run").onclick = () => {
    const v = aiBox.value.trim();
    if (v.length < 3) { toast("Tell us a little about your plan first"); return; }
    const parsed = parseRequest(v);
    const inp = parsed.input;
    inp.must = [...new Set([...inp.must, ...state.must])];
    if (state.preStart) { inp.start = state.preStart; state.preStart = null; }
    runPlan(inp);
  };
  $$(".ex-fill").forEach(b => b.onclick = () => { aiBox.value = b.dataset.q; reparse(); aiBox.focus(); });

  /* form */
  $("#f-run").onclick = e => { e.preventDefault(); runPlan(collectForm()); };

  /* tabs between the two entry modes */
  $$(".entry-tab").forEach(b => b.onclick = () => {
    $$(".entry-tab").forEach(x => x.classList.toggle("active", x === b));
    $$(".entry-pane").forEach(p => p.classList.toggle("active", p.id === b.dataset.pane));
  });

  renderMustStrip();

  /* sheet */
  $("#sheet-close").onclick = closeSheet;
  $("#sheet").addEventListener("click", e => { if (e.target.id === "sheet") closeSheet(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeSheet(); });

  /* safety directory (about) */
  $("#safety-list").innerHTML = `
    <div class="safe-col"><h4>${icon("hospital")} Hospitals (24×7, indicative)</h4><ul>${DB.hospitals.map(h => `<li><b>${esc(h.n)}</b> <i>${h.type}</i></li>`).join("")}</ul></div>
    <div class="safe-col"><h4>${icon("shield")} Police stations</h4><ul>${DB.police.map(p => `<li><b>${esc(p.n)}</b></li>`).join("")}</ul></div>
    <div class="safe-col"><h4>${icon("info")} Emergency numbers</h4><ul>
      <li><b>100</b> Police</li><li><b>102 / 108</b> Ambulance</li><li><b>101</b> Fire</li>
      <li><b>1091</b> Women helpline</li><li><b>1073</b> Road accident</li></ul>
      <p class="ahint">During Puja, Kolkata Police runs extra crowd-control and lost-and-found booths near major pandals.</p></div>`;

  go("home");
});
