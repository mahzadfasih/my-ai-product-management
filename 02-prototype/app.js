/* Signal — PRD → Reach × Impact prototype. Vanilla JS, no build step. */
(() => {
  "use strict";

  // ---------- Icons ----------
  const P = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICONS = {
    upload: P('<path d="M12 15V3"/><path d="m7 8 5-5 5 5"/><path d="M20 15v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"/>'),
    file: P('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>'),
    check: P('<path d="M20 6 9 17l-5-5"/>'),
    x: P('<path d="M18 6 6 18M6 6l12 12"/>'),
    arrowRight: P('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>'),
    chevUp: P('<path d="m18 15-6-6-6 6"/>'),
    chevDown: P('<path d="m6 9 6 6 6-6"/>'),
    info: P('<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>'),
    refresh: P('<path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/>'),
    copy: P('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>'),
    download: P('<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M20 21H4"/>'),
    plus: P('<path d="M12 5v14M5 12h14"/>'),
    minus: P('<path d="M5 12h14"/>'),
    users: P('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>'),
    bolt: P('<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>'),
    alert: P('<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>'),
    wrench: P('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>'),
    exit: P('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>'),
    lightbulb: P('<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>'),
    repeat: P('<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>'),
    target: P('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
    eye: P('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
    scissors: P('<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>'),
    up: P('<path d="m18 15-6-6-6 6"/>'),
    layers: P('<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>'),
    gauge: P('<path d="M12 14 16 10"/><path d="M3.3 19a10 10 0 1 1 17.4 0"/>'),
    trophy: P('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>'),
    person: P('<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>'),
    trend: P('<path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/>'),
  };
  const ic = (n) => ICONS[n] || "";

  // ---------- Helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (n) => Math.round(n).toLocaleString("en-US");
  const kfmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(Math.round(n)));
  const srcById = Object.fromEntries(SOURCES.map((s) => [s.id, s]));
  const hash = (str) => { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = (seed) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const hydrateIcons = (root = document) => $$("[data-icon]", root).forEach((el) => {
    if (el.dataset.hydrated) return;
    el.dataset.hydrated = "1";
    el.insertAdjacentHTML("afterbegin", ic(el.dataset.icon));
  });

  // ---------- State ----------
  const STEPS = ["input", "extract", "research", "results"];
  const state = {
    prd: null,
    workflows: [],
    extracted: false,
    researched: false,
    sources: new Set(SOURCES.map((s) => s.id)),
    window: "12",
    maxStep: 0,
    view: "input",
    overrides: {},
    sort: "priority",
    selected: null,
    evFilter: "all",
    totals: { scanned: 0, matches: 0 },
  };

  // ---------- Navigation ----------
  function setView(v) {
    const changed = state.view !== v;
    state.view = v;
    state.maxStep = Math.max(state.maxStep, STEPS.indexOf(v));
    $$(".view").forEach((el) => el.classList.toggle("active", el.id === "view-" + v));
    updateStepper();
    if (changed) window.scrollTo(0, 0);
  }
  function updateStepper() {
    const idx = STEPS.indexOf(state.view);
    $$(".step").forEach((el) => {
      const i = STEPS.indexOf(el.dataset.step);
      el.classList.toggle("active", i === idx);
      el.classList.toggle("done", i < idx || (i <= state.maxStep && i !== idx));
      el.disabled = i > state.maxStep || (el.dataset.step === "research" && !state.researched && i !== idx);
    });
  }
  $$(".step").forEach((el) => el.addEventListener("click", () => {
    const v = el.dataset.step;
    if (v === state.view) return;
    if (v === "extract") renderExtract(false);
    if (v === "results") renderResults();
    setView(v);
  }));

  // ---------- Markdown (minimal) ----------
  function inline(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"); }
  function md(text) {
    const out = []; let list = false; let afterH1 = false;
    const close = () => { if (list) { out.push("</ul>"); list = false; } };
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim();
      let m;
      if ((m = /^(#{1,6})\s+(.*)$/.exec(line))) {
        close();
        const lvl = Math.min(m[1].length, 3);
        const id = "sec-" + m[2].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        out.push(`<h${lvl} id="${id}">${inline(m[2])}</h${lvl}>`);
        afterH1 = lvl === 1; continue;
      }
      if ((m = /^(?:[-*•]|\d+[.)])\s+(.*)$/.exec(line))) {
        if (!list) { out.push("<ul>"); list = true; }
        out.push(`<li>${inline(m[1])}</li>`); afterH1 = false; continue;
      }
      close();
      if (!line) continue;
      out.push(`<p${afterH1 ? ' class="doc-meta"' : ""}>${inline(line)}</p>`);
      afterH1 = false;
    }
    close();
    return out.join("\n");
  }

  // ---------- Workflow extraction ----------
  const WF_SECTION = /workflow|use case|user stor|scenario|feature|requirement|capabilit|jobs? to be done|functional/i;
  function summarize(s) {
    let t = s.replace(/\*\*/g, "").replace(/^[A-Z]{1,4}-?\d+[:.)\-–]\s*/, "").trim();
    t = t.replace(/^(workflow|use case|user story|scenario)\s*\d*[:.)\-–]?\s*/i, "");
    t = t.replace(/^as an? [^,]+?,\s*i (want|need|would like) to\s+/i, "");
    t = t.replace(/^(the )?(users?|customers?|admins?|we|they|reviewers?)\s+(can|should|must|will|need to|want to|are able to)\s+(be able to\s+)?/i, "");
    t = t.split(/\s+so that\s+|\.\s/)[0].replace(/[.;:]$/, "");
    if (t.length > 72) t = t.slice(0, 72).replace(/\s+\S*$/, "") + "…";
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  function extractCustom(text) {
    const lines = text.split(/\r?\n/);
    const found = []; const seen = new Set();
    let inSec = false, secLvl = 0, section = "";
    const push = (name, anchor, desc, sec) => {
      const key = name.toLowerCase();
      if (!name || name.length < 6 || seen.has(key)) return;
      seen.add(key); found.push({ name, anchor, desc: desc || "", section: sec });
    };
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim(); let m;
      if ((m = /^(#{1,6})\s+(.*)$/.exec(line))) {
        const lvl = m[1].length, title = m[2].trim();
        const secNum = (/^(\d+(?:\.\d+)*)/.exec(title) || [])[1] || "";
        if (inSec && lvl > secLvl) {
          let desc = ""; for (let j = i + 1; j < lines.length && j < i + 6; j++) { const l = lines[j].trim(); if (/^#/.test(l)) break; if (l) { desc = l.replace(/^[-*•]\s+/, ""); break; } }
          push(summarize(title.replace(/^\d+(\.\d+)*\s*/, "")), title, desc.replace(/\*\*/g, ""), secNum || section);
          continue;
        }
        if (lvl <= secLvl) inSec = false;
        if (WF_SECTION.test(title)) { inSec = true; secLvl = lvl; section = secNum; }
        else if (/^(workflow|use case|user story|scenario)\b/i.test(title)) push(summarize(title), title, "", secNum);
        continue;
      }
      if ((m = /^(?:[-*•]|\d+[.)])\s+(.*)$/.exec(line))) {
        const item = m[1];
        if (inSec || /^as an? /i.test(item) || /\b(users?|customers?) (can|should|must|need)/i.test(item)) {
          push(summarize(item), item.replace(/\*\*/g, "").slice(0, 90), item.replace(/\*\*/g, ""), section);
        }
        continue;
      }
      if (/^as an? .+?,?\s*i (want|need|would like) to/i.test(line)) push(summarize(line), line.slice(0, 90), line, section);
    }
    if (found.length < 3) {
      const sentences = text.replace(/\n+/g, " ").split(/(?<=[.!?])\s+/);
      for (const s of sentences) {
        if (found.length >= 8) break;
        if (/\b(users?|customers?|admins?|teams?)\s+(can|should|must|need to|want to|will be able to)\b/i.test(s)) push(summarize(s), s.slice(0, 90), s, "");
      }
    }
    return found.slice(0, 10).map((f, i) => ({
      id: "W" + (i + 1), name: f.name, short: f.name.split(" ").slice(0, 4).join(" "),
      section: f.section, persona: "User", anchor: f.anchor, desc: f.desc.length > 180 ? f.desc.slice(0, 180) + "…" : f.desc,
      include: true, generated: true,
    }));
  }

  // Deterministic simulated research for non-sample workflows.
  function genData(wf) {
    const r = rng(hash(wf.name));
    const rr = Math.round((1 + r() * 4) * 10) / 10, ri = Math.round((1 + r() * 4) * 10) / 10;
    const kw = wf.name.replace(/…$/, "").toLowerCase();
    const sig = (v) => clamp(Math.round(((v - 1) / 4) * 100 + (r() - 0.5) * 24), 4, 100);
    const mentions = Math.round(18 + ((rr - 1) / 4) * 440 * (0.8 + r() * 0.4));
    const mixRaw = SOURCES.map((s) => s.base * (0.4 + r()));
    const sum = mixRaw.reduce((a, b) => a + b, 0);
    const mix = {}; SOURCES.forEach((s, i) => (mix[s.id] = Math.round((mixRaw[i] / sum) * 100)));
    const reachWord = REACH_RUBRIC[Math.round(rr) - 1][1].toLowerCase();
    const impWord = IMPACT_RUBRIC[Math.round(ri) - 1][1].toLowerCase();
    Object.assign(wf, {
      reach: { raw: rr, rationale: `Discussion of this workflow is ${reachWord}: ${mentions} matching threads, ${rr >= 3.5 ? "spread across most sources with strong co-signing" : rr >= 2.5 ? "spread across a few sources and segments" : "concentrated in a small group of authors"}.`,
        signals: { "Share of relevant threads": sig(rr), "Unique authors": sig(rr), "Cross-source spread": sig(rr), "Co-sign / upvotes": sig(rr) } },
      impact: { raw: ri, rationale: `When customers hit this problem it reads as ${impWord}. ${ri >= 4 ? "Threads describe blocked work and some mention evaluating alternatives." : ri >= 3 ? "Users describe costly manual workarounds." : "Workarounds are cheap and the tone is mild."}`,
        signals: { "Severity language": sig(ri), "Workaround cost": sig(ri), "Blocker mentions": sig(ri), "Churn / switching risk": sig(ri) } },
      mentions, confidence: mentions > 250 ? "High" : mentions > 90 ? "Medium" : "Low",
      trend: (r() > 0.25 ? "+" : "−") + Math.round(r() * 24) + "%",
      mix,
      queries: [kw, `${kw} workaround`, `${kw} not working`],
      evidence: [
        { source: "forum", title: `Any way to ${kw}?`, votes: Math.round(20 + r() * 200), date: "Aug 2026", author: "community_member",
          quote: `We've asked about this for a while. Right now [[we handle it manually]] and it eats time every week.`, tags: ri > 3.5 ? ["workaround", "blocker"] : ["workaround"] },
        { source: "ideas", title: `Idea: better support to ${kw}`, votes: Math.round(40 + r() * 600), date: "Jun 2026", author: "power_user",
          quote: `+1 from our team. [[This comes up in almost every project]] we run.`, tags: ["request", "frequency"] },
        { source: "reddit", title: `Frustrated trying to ${kw}`, votes: Math.round(10 + r() * 180), date: "May 2026", author: "u/practitioner",
          quote: ri >= 4 ? `This has blocked us more than once. [[We've started evaluating other tools]] because of it.` : `Not a dealbreaker, but [[it's a recurring annoyance]] for the team.`, tags: ri >= 4 ? ["churn"] : ["frequency"] },
      ],
    });
  }

  // ---------- Scores ----------
  const aiScore = (wf, k) => clamp(Math.round(wf[k].raw), 1, 5);
  const score = (wf, k) => state.overrides[wf.id]?.[k] ?? aiScore(wf, k);
  const prio = (wf) => score(wf, "reach") * score(wf, "impact");
  const tier = (p) => (p >= 16 ? "P1" : p >= 9 ? "P2" : "P3");
  const isAdjusted = (wf) => { const o = state.overrides[wf.id]; return !!o && ((o.reach != null && o.reach !== aiScore(wf, "reach")) || (o.impact != null && o.impact !== aiScore(wf, "impact"))); };
  const activeWfs = () => state.workflows.filter((w) => w.include);
  const selShare = (wf) => SOURCES.filter((s) => state.sources.has(s.id)).reduce((a, s) => a + (wf.mix[s.id] || 0), 0) / 100;
  const mentionsOf = (wf) => Math.max(1, Math.round(wf.mentions * WINDOWS[state.window] * selShare(wf)));
  function sorted() {
    const list = [...activeWfs()];
    const by = {
      priority: (a, b) => prio(b) - prio(a) || b.reach.raw * b.impact.raw - a.reach.raw * a.impact.raw,
      reach: (a, b) => score(b, "reach") - score(a, "reach") || b.reach.raw - a.reach.raw,
      impact: (a, b) => score(b, "impact") - score(a, "impact") || b.impact.raw - a.impact.raw,
      mentions: (a, b) => mentionsOf(b) - mentionsOf(a),
      prd: () => 0,
    }[state.sort];
    return list.sort(by);
  }

  // ---------- 1 · Input ----------
  function renderSources() {
    const f = WINDOWS[state.window];
    $("#sourceList").innerHTML = SOURCES.map((s) => `
      <label class="source-opt ${state.sources.has(s.id) ? "on" : ""}" data-id="${s.id}">
        <span class="box">${ic("check")}</span>
        <span class="swatch" style="background:${s.color}"></span>
        <span class="s-name">${s.name}</span>
        <span class="s-meta">~${kfmt(s.base * f)} threads</span>
      </label>`).join("");
    $("#sourceCount").textContent = `${state.sources.size} of ${SOURCES.length}`;
    updateCta();
  }
  $("#sourceList").addEventListener("click", (e) => {
    const opt = e.target.closest(".source-opt"); if (!opt) return;
    e.preventDefault();
    const id = opt.dataset.id;
    state.sources.has(id) ? state.sources.delete(id) : state.sources.add(id);
    renderSources();
  });
  $("#windowSeg").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    $$("#windowSeg button").forEach((x) => x.classList.toggle("active", x === b));
    state.window = b.dataset.v; renderSources();
  });
  $$(".tab").forEach((t) => t.addEventListener("click", () => {
    $$(".tab").forEach((x) => x.classList.toggle("active", x === t));
    $("#tab-upload").classList.toggle("hidden", t.dataset.tab !== "upload");
    $("#tab-paste").classList.toggle("hidden", t.dataset.tab !== "paste");
    if (t.dataset.tab === "paste") $("#pasteArea").focus();
  }));

  function updateCta() {
    const ok = !!state.prd && state.sources.size > 0;
    $("#extractBtn").disabled = !ok;
    $("#ctaHint").textContent = !state.prd ? "Load a PRD to continue" : state.sources.size === 0 ? "Select at least one source" : "Ready to extract workflows";
  }
  function loadDoc(doc) {
    state.prd = doc; state.extracted = false; state.researched = false; state.overrides = {}; state.maxStep = 0;
    const words = doc.text.split(/\s+/).filter(Boolean).length;
    const secs = (doc.text.match(/^#{2,3}\s/gm) || []).length;
    $("#docName").textContent = doc.file;
    $("#docMeta").textContent = `${fmt(words)} words · ${secs} sections${doc.isSample ? " · sample" : ""}`;
    $("#previewBox").innerHTML = md(doc.text);
    $("#previewBox").classList.add("hidden");
    $("#previewToggle").textContent = "Preview";
    $("#docEmpty").classList.add("hidden");
    $("#docLoaded").classList.remove("hidden");
    setView("input");
    updateCta();
  }
  function titleFrom(text, fallback) { const m = /^#\s+(.+)$/m.exec(text); return m ? m[1].replace(/\*\*/g, "").trim() : fallback; }
  $("#loadSampleBtn").addEventListener("click", () => loadDoc({ ...SAMPLE_PRD, isSample: true }));
  $("#usePasteBtn").addEventListener("click", () => {
    const text = $("#pasteArea").value.trim();
    if (text.length < 40) { toast("Paste a bit more text: at least a few sentences"); return; }
    loadDoc({ text, title: titleFrom(text, "Untitled PRD"), file: "Pasted PRD", isSample: false });
  });
  $("#browseBtn").addEventListener("click", () => $("#fileInput").click());
  $("#fileInput").addEventListener("change", (e) => readFile(e.target.files[0]));
  const dz = $("#dropzone");
  ["dragenter", "dragover"].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add("drag"); }));
  ["dragleave", "drop"].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove("drag"); }));
  dz.addEventListener("drop", (e) => readFile(e.dataTransfer.files[0]));
  function readFile(file) {
    if (!file) return;
    if (!/\.(md|markdown|txt)$/i.test(file.name) && !file.type.startsWith("text")) { toast("This prototype reads .md and .txt files"); return; }
    const fr = new FileReader();
    fr.onload = () => loadDoc({ text: String(fr.result), title: titleFrom(String(fr.result), file.name.replace(/\.\w+$/, "")), file: file.name, isSample: false });
    fr.readAsText(file);
  }
  $("#clearDocBtn").addEventListener("click", () => {
    state.prd = null; state.maxStep = 0; $("#fileInput").value = "";
    $("#docEmpty").classList.remove("hidden"); $("#docLoaded").classList.add("hidden");
    setView("input"); updateCta();
  });
  $("#previewToggle").addEventListener("click", (e) => {
    const box = $("#previewBox"); box.classList.toggle("hidden");
    e.currentTarget.textContent = box.classList.contains("hidden") ? "Preview" : "Hide preview";
  });
  $("#extractBtn").addEventListener("click", () => {
    if (!state.extracted) {
      state.workflows = state.prd.isSample ? SAMPLE_WORKFLOWS.map((w) => ({ ...w, include: true })) : extractCustom(state.prd.text);
    }
    renderExtract(!state.extracted);
    setView("extract");
  });

  // ---------- 2 · Extract ----------
  function docWithHighlights() {
    let html = md(state.prd.text);
    for (const wf of state.workflows) {
      if (!wf.anchor) continue;
      const a = esc(wf.anchor.replace(/\*\*/g, ""));
      const i = html.indexOf(a);
      if (i < 0) continue;
      html = html.slice(0, i) + `<mark class="hl pending" data-wf="${wf.id}">${a}<span class="hl-tag">${wf.id}</span></mark>` + html.slice(i + a.length);
    }
    return html;
  }
  function wfCard(wf, delay = 0) {
    return `
      <div class="wf-card ${wf.include ? "" : "off"}" data-id="${wf.id}" style="animation-delay:${delay}ms">
        <span class="wf-id">${wf.id}</span>
        <div style="min-width:0">
          <div class="wf-name" contenteditable="true" spellcheck="false">${esc(wf.name)}</div>
          ${wf.desc ? `<div class="wf-desc">${esc(wf.desc)}</div>` : ""}
          <div class="wf-meta">
            ${wf.anchor ? `<button class="chip" data-jump="${wf.id}">${ic("eye")}${wf.section ? "§" + esc(wf.section) : "Find in PRD"}</button>` : `<span class="chip">${ic("plus")}Added manually</span>`}
            ${wf.persona ? `<span class="chip">${ic("person")}${esc(wf.persona)}</span>` : ""}
          </div>
        </div>
        <button class="toggle ${wf.include ? "on" : ""}" data-toggle="${wf.id}" title="${wf.include ? "Exclude from research" : "Include in research"}" aria-pressed="${wf.include}"></button>
      </div>`;
  }
  let extractRun = 0;
  async function renderExtract(animate) {
    const run = ++extractRun;
    $("#exDocName").textContent = state.prd.file;
    $("#exDoc").innerHTML = docWithHighlights();
    const list = $("#wfList");
    const scan = $("#scanline");
    scan.style.display = animate ? "" : "none";
    if (animate) { scan.style.animation = "none"; void scan.offsetWidth; scan.style.animation = ""; }
    $("#researchBtn").disabled = true;
    if (animate) {
      $("#exStatus").innerHTML = `<span class="spinner"></span>Reading document…`;
      $("#wfSub").textContent = "Identifying workflows and use cases…";
      $("#wfCount").textContent = "0";
      list.innerHTML = `<div class="skeleton"></div><div class="skeleton" style="opacity:.7"></div><div class="skeleton" style="opacity:.4"></div>`;
      await sleep(1100);
      if (run !== extractRun) return;
      list.innerHTML = "";
      $("#exStatus").innerHTML = `<span class="spinner"></span>Extracting workflows…`;
      for (const wf of state.workflows) {
        list.insertAdjacentHTML("beforeend", wfCard(wf));
        const mark = $(`mark[data-wf="${wf.id}"]`);
        if (mark) { mark.classList.remove("pending"); mark.classList.add("flash"); }
        $("#wfCount").textContent = $$(".wf-card", list).length;
        await sleep(240);
        if (run !== extractRun) return;
      }
      state.extracted = true;
    } else {
      list.innerHTML = state.workflows.map((w) => wfCard(w)).join("");
      $$("mark.hl").forEach((m) => m.classList.remove("pending"));
    }
    if (!state.workflows.length) {
      list.innerHTML = `<div class="muted" style="padding:20px;text-align:center;font-size:13px">No workflows detected. Try adding headings like <span class="mono">## Key workflows</span> or user stories, or add workflows manually below.</div>`;
    }
    list.insertAdjacentHTML("beforeend", `<button class="add-wf" id="addWf">${ic("plus")}Add workflow</button>`);
    refreshExtractMeta();
  }
  function refreshExtractMeta() {
    const n = state.workflows.length, inc = activeWfs().length;
    $("#wfCount").textContent = n;
    $("#wfSub").textContent = `${inc} of ${n} included · linked to source text`;
    $("#exStatus").innerHTML = `<span style="color:#3fcf3f;display:inline-flex;width:14px;height:14px">${ic("check")}</span>${n} workflows found`;
    $("#researchBtn").disabled = inc === 0;
    $$("mark.hl").forEach((m) => { const wf = state.workflows.find((w) => w.id === m.dataset.wf); m.classList.toggle("excluded", !!wf && !wf.include); });
  }
  function focusWf(id, scrollDoc) {
    $$(".wf-card").forEach((c) => c.classList.toggle("focus", c.dataset.id === id));
    $$("mark.hl").forEach((m) => m.classList.toggle("focus", m.dataset.wf === id));
    const mark = $(`mark[data-wf="${id}"]`);
    if (scrollDoc && mark) {
      const box = $(".doc-scroll");
      box.scrollTo({ top: mark.offsetTop - box.clientHeight / 3, behavior: "smooth" });
      mark.classList.remove("flash"); void mark.offsetWidth; mark.classList.add("flash");
    }
  }
  $("#wfList").addEventListener("click", (e) => {
    const t = e.target.closest("[data-toggle]");
    if (t) {
      const wf = state.workflows.find((w) => w.id === t.dataset.toggle);
      wf.include = !wf.include;
      t.classList.toggle("on", wf.include); t.setAttribute("aria-pressed", wf.include);
      t.closest(".wf-card").classList.toggle("off", !wf.include);
      state.researched = false; state.maxStep = Math.min(state.maxStep, 1); updateStepper();
      refreshExtractMeta(); return;
    }
    if (e.target.closest("#addWf")) {
      const n = state.workflows.reduce((m, w) => Math.max(m, +w.id.slice(1) || 0), 0) + 1;
      const wf = { id: "W" + n, name: "New workflow", short: "New workflow", section: "", persona: "", anchor: "", desc: "", include: true, generated: true };
      state.workflows.push(wf);
      e.target.closest("#addWf").insertAdjacentHTML("beforebegin", wfCard(wf));
      const name = $(`.wf-card[data-id="${wf.id}"] .wf-name`);
      name.focus(); document.execCommand("selectAll", false, null);
      state.researched = false; state.maxStep = Math.min(state.maxStep, 1); updateStepper();
      refreshExtractMeta(); return;
    }
    const card = e.target.closest(".wf-card");
    if (card && !e.target.closest(".wf-name")) focusWf(card.dataset.id, true);
  });
  $("#wfList").addEventListener("input", (e) => {
    const name = e.target.closest(".wf-name"); if (!name) return;
    const wf = state.workflows.find((w) => w.id === name.closest(".wf-card").dataset.id);
    wf.name = name.textContent.trim() || wf.name;
    wf.short = wf.name.split(" ").slice(0, 4).join(" ");
    if (wf.generated) { delete wf.reach; state.researched = false; }
  });
  $("#wfList").addEventListener("keydown", (e) => { if (e.target.closest(".wf-name") && e.key === "Enter") { e.preventDefault(); e.target.blur(); } });
  $("#exDoc").addEventListener("mouseover", (e) => { const m = e.target.closest("mark.hl"); if (m) focusWf(m.dataset.wf, false); });
  $("#exDoc").addEventListener("click", (e) => {
    const m = e.target.closest("mark.hl"); if (!m) return;
    $(`.wf-card[data-id="${m.dataset.wf}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  $("#researchBtn").addEventListener("click", () => { setView("research"); runResearch(); });

  // ---------- 3 · Research ----------
  let researchRun = 0, skipNow = false;
  async function runResearch() {
    const run = ++researchRun; skipNow = false;
    const wfs = activeWfs();
    wfs.forEach((w) => { if (!w.reach) genData(w); });
    const srcs = SOURCES.filter((s) => state.sources.has(s.id));
    const f = WINDOWS[state.window];
    const scannedTotal = Math.round(srcs.reduce((a, s) => a + s.base * f, 0));
    const matchTotal = wfs.reduce((a, w) => a + mentionsOf(w), 0);
    state.totals = { scanned: scannedTotal, matches: matchTotal };

    $("#rsTitle").textContent = "Scanning customer forums";
    $("#rsSub").textContent = `${wfs.length} workflows · ${srcs.length} sources · last ${state.window} months${$("#segmentInput").value ? " · " + $("#segmentInput").value : ""}`;
    $("#pulseDot").classList.remove("done");
    $("#viewResultsBtn").disabled = true;
    $("#skipBtn").classList.remove("hidden");
    $("#feedSpin").classList.remove("hidden");
    $("#feedStatus").textContent = "Streaming";
    $("#feed").innerHTML = "";
    $("#cSources").textContent = srcs.length;
    $("#wfProgress").innerHTML = wfs.map((w) => `
      <div class="wfp-row" data-id="${w.id}">
        <span class="wf-id">${w.id}</span>
        <div style="min-width:0"><div class="name">${esc(w.name)}</div><div class="sub">Queued</div><div class="wfp-bar"><i></i></div></div>
        <div class="wfp-state">—</div>
      </div>`).join("");

    const perWf = 1050; // ms
    const total = perWf * wfs.length;
    const t0 = performance.now();
    let lastFeed = 0;
    const evQueues = Object.fromEntries(wfs.map((w) => [w.id, [...w.evidence]]));
    const r = rng(hash(state.prd.file + wfs.length));

    const finish = () => {
      $("#rsProgress").style.width = "100%";
      $("#cScanned").textContent = fmt(scannedTotal);
      $("#cMatches").textContent = fmt(matchTotal);
      $$(".wfp-row").forEach((row) => markRowDone(row, wfs.find((w) => w.id === row.dataset.id)));
      $("#rsTitle").textContent = "Research complete";
      $("#pulseDot").classList.add("done");
      $("#viewResultsBtn").disabled = false;
      $("#skipBtn").classList.add("hidden");
      $("#feedSpin").classList.add("hidden");
      $("#feedStatus").textContent = `${fmt(matchTotal)} matches clustered`;
      state.researched = true;
      state.maxStep = Math.max(state.maxStep, 2);
      updateStepper();
      $("#viewResultsBtn").focus();
    };

    while (true) {
      await sleep(60);
      if (run !== researchRun) return;
      const el = performance.now() - t0;
      if (skipNow || el >= total) { $("#cElapsed").textContent = (Math.min(el, total) / 1000).toFixed(1) + "s"; finish(); return; }
      const p = el / total;
      $("#rsProgress").style.width = (p * 100).toFixed(1) + "%";
      $("#cScanned").textContent = fmt(scannedTotal * easeOut(p));
      $("#cMatches").textContent = fmt(matchTotal * p);
      $("#cElapsed").textContent = (el / 1000).toFixed(1) + "s";
      const cur = Math.floor(el / perWf);
      $$(".wfp-row").forEach((row, i) => {
        const w = wfs[i];
        if (i < cur) { markRowDone(row, w); return; }
        if (i === cur) {
          const lp = (el - i * perWf) / perWf;
          row.classList.add("active");
          $(".wfp-bar i", row).style.width = (lp * 100) + "%";
          $(".sub", row).textContent = lp < 0.6 ? `Searching: “${w.queries[Math.min(2, Math.floor(lp * 5))]}”` : "Clustering & scoring…";
          $(".wfp-state", row).innerHTML = `<span class="spinner"></span>${fmt(mentionsOf(w) * lp)}`;
        }
      });
      if (el - lastFeed > 170 && cur < wfs.length) {
        lastFeed = el;
        const w = wfs[cur];
        const q = evQueues[w.id];
        const matched = r() < 0.62;
        let item;
        if (matched && q.length && r() < 0.6) {
          const ev = q.shift();
          if (state.sources.has(ev.source)) item = { src: ev.source, title: ev.title, sub: `▲ ${ev.votes} · ${ev.date}`, wf: w.id };
        }
        if (!item && matched) {
          const s = srcs[Math.floor(r() * srcs.length)];
          item = { src: s.id, title: `${["Re:", "Question:", "Feedback:", "Help:"][Math.floor(r() * 4)]} ${w.short.toLowerCase()}${["?", " not working", " workaround", " (+1)"][Math.floor(r() * 4)]}`, sub: `▲ ${Math.round(r() * 90)} · ${["Sep", "Aug", "Jul", "Jun"][Math.floor(r() * 4)]} 2026`, wf: w.id };
        }
        if (!item) {
          const s = srcs[Math.floor(r() * srcs.length)];
          item = { src: s.id, title: NOISE_TITLES[Math.floor(r() * NOISE_TITLES.length)], sub: "Not relevant", wf: null };
        }
        pushFeed(item);
      }
    }
  }
  const easeOut = (p) => 1 - Math.pow(1 - p, 2.2);
  function markRowDone(row, w) {
    if (row.classList.contains("done")) return;
    row.classList.remove("active"); row.classList.add("done");
    $(".wfp-bar i", row).style.width = "100%";
    $(".sub", row).textContent = `${fmt(mentionsOf(w))} relevant threads · Reach ${aiScore(w, "reach")} · Impact ${aiScore(w, "impact")}`;
    $(".wfp-state", row).innerHTML = `<span class="ok">${ic("check")}</span>`;
  }
  function pushFeed(it) {
    const feed = $("#feed");
    const s = srcById[it.src];
    feed.insertAdjacentHTML("afterbegin", `
      <div class="feed-item ${it.wf ? "" : "skip"}">
        <span class="src"><span class="swatch" style="background:${s.color}"></span>${s.name}</span>
        <span class="t">${esc(it.title)}<small>${esc(it.sub)}</small></span>
        <span class="m">${it.wf ? "→ " + it.wf : "skip"}</span>
      </div>`);
    while (feed.children.length > 14) feed.lastElementChild.remove();
  }
  $("#skipBtn").addEventListener("click", () => (skipNow = true));
  $("#viewResultsBtn").addEventListener("click", () => { renderResults(); setView("results"); });

  // ---------- 4 · Results ----------
  function renderResults() {
    const wfs = activeWfs();
    const list = sorted();
    $("#resSub").textContent = `${state.prd.title} · ${wfs.length} workflows · ${SOURCES.filter((s) => state.sources.has(s.id)).length} sources · last ${state.window} months`;
    renderKpis(list);
    renderMatrix();
    renderTable(list);
    renderInsights();
  }
  function renderKpis(list) {
    const top = [...activeWfs()].sort((a, b) => prio(b) - prio(a) || b.reach.raw * b.impact.raw - a.reach.raw * a.impact.raw)[0];
    const conf = { High: 0, Medium: 0, Low: 0 }; activeWfs().forEach((w) => conf[w.confidence]++);
    const avg = activeWfs().reduce((a, w) => a + { High: 3, Medium: 2, Low: 1 }[w.confidence], 0) / activeWfs().length;
    const p1 = list.filter((w) => tier(prio(w)) === "P1").length;
    $("#kpis").innerHTML = `
      <div class="card kpi"><div class="k">${ic("layers")}Workflows analyzed</div><div class="v">${list.length}</div><div class="d">${p1} rated P1 · ${state.workflows.length - list.length} excluded</div></div>
      <div class="card kpi"><div class="k">${ic("users")}Customer threads</div><div class="v">${fmt(state.totals.matches)}</div><div class="d">relevant, from ${fmt(state.totals.scanned)} scanned</div></div>
      <div class="card kpi"><div class="k">${ic("trophy")}Top priority</div><div class="v sm">${esc(top.name)}</div><div class="d">${top.id} · R${score(top, "reach")} × I${score(top, "impact")} = ${prio(top)}</div></div>
      <div class="card kpi"><div class="k">${ic("gauge")}Evidence confidence</div><div class="v">${avg >= 2.5 ? "High" : avg >= 1.75 ? "Medium" : "Low"}</div><div class="d">${conf.High} high · ${conf.Medium} medium · ${conf.Low} low</div></div>`;
  }

  const MX = { W: 560, H: 450, l: 54, r: 22, t: 18, b: 50 };
  const mx = (v) => MX.l + ((v - 0.5) / 5) * (MX.W - MX.l - MX.r);
  const my = (v) => MX.t + (MX.H - MX.t - MX.b) - ((v - 0.5) / 5) * (MX.H - MX.t - MX.b);
  function plotPos(wf) {
    const o = state.overrides[wf.id] || {};
    // Keep the signal position unless the user overrode that axis; nudge within the integer cell.
    const px = o.reach != null ? o.reach + (wf.reach.raw - aiScore(wf, "reach")) : wf.reach.raw;
    const py = o.impact != null ? o.impact + (wf.impact.raw - aiScore(wf, "impact")) : wf.impact.raw;
    return [clamp(px, 0.7, 5.3), clamp(py, 0.7, 5.3)];
  }
  function renderMatrix() {
    const { W, H, l, r, t, b } = MX;
    const x3 = mx(3), y3 = my(3), x0 = l, x1 = W - r, y0 = t, y1 = H - b;
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Reach versus Impact scatter plot">
      <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="8" fill="#17191d"/>
      <rect class="q-bg" x="${x3}" y="${y0}" width="${x1 - x3}" height="${y3 - y0}" fill="rgba(57,135,229,0.09)" />`;
    for (let v = 1; v <= 5; v++) {
      s += `<line x1="${mx(v)}" x2="${mx(v)}" y1="${y0}" y2="${y1}" stroke="#23272d" />`;
      s += `<line x1="${x0}" x2="${x1}" y1="${my(v)}" y2="${my(v)}" stroke="#23272d" />`;
      s += `<text x="${mx(v)}" y="${y1 + 18}" text-anchor="middle" font-size="11" fill="#80868f">${v}</text>`;
      s += `<text x="${x0 - 12}" y="${my(v) + 4}" text-anchor="end" font-size="11" fill="#80868f">${v}</text>`;
    }
    s += `<line x1="${x3}" x2="${x3}" y1="${y0}" y2="${y1}" stroke="#3b414a" stroke-dasharray="4 4"/>
      <line x1="${x0}" x2="${x1}" y1="${y3}" y2="${y3}" stroke="#3b414a" stroke-dasharray="4 4"/>
      <text x="${(x0 + x1) / 2}" y="${H - 8}" text-anchor="middle" font-size="12" font-weight="600" fill="#b7bcc4">Reach →  <tspan fill="#80868f" font-weight="400">how many customers hit it</tspan></text>
      <text transform="translate(16 ${(y0 + y1) / 2}) rotate(-90)" text-anchor="middle" font-size="12" font-weight="600" fill="#b7bcc4">Impact →  <tspan fill="#80868f" font-weight="400">how much it hurts</tspan></text>`;
    const ql = (x, y, txt, anchor, fill) => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="10.5" font-weight="700" letter-spacing="0.08em" fill="${fill}">${txt}</text>`;
    s += ql(x1 - 10, y0 + 20, "PRIORITIZE", "end", "#86b6ef");
    s += ql(x0 + 10, y0 + 20, "NICHE · SEVERE", "start", "#5d636b");
    s += ql(x1 - 10, y1 - 12, "BROAD · LOW SEVERITY", "end", "#5d636b");
    s += ql(x0 + 10, y1 - 12, "DEPRIORITIZE", "start", "#5d636b");

    const wfs = activeWfs();
    for (const wf of wfs) {
      const [vx, vy] = plotPos(wf);
      const cx = mx(vx), cy = my(vy);
      const sel = state.selected === wf.id;
      const left = cx > x1 - 46;
      s += `<g class="pt ${sel ? "sel" : ""} ${isAdjusted(wf) ? "adjusted" : ""}" data-id="${wf.id}" transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)})" tabindex="0" role="button" aria-label="${esc(wf.name)}: reach ${score(wf, "reach")}, impact ${score(wf, "impact")}">
        <circle r="18" fill="transparent"/>
        <circle class="adj-ring" r="13" fill="none" stroke="#b7bcc4" stroke-width="1.5" stroke-dasharray="3 3" opacity="0"/>
        <circle class="dot" r="${sel ? 10 : 8}" fill="#3987e5" stroke="${sel ? "#ffffff" : "#17191d"}" stroke-width="2"/>
        <text class="lbl" x="${left ? -15 : 15}" y="4" text-anchor="${left ? "end" : "start"}">${wf.id}</text>
      </g>`;
    }
    s += `</svg>`;
    $("#matrix").innerHTML = s;
  }
  function pips(v, cls, adj) {
    return `<span class="pips ${cls}">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= v ? "on" : ""}"></i>`).join("")}<b>${v}</b>${adj ? `<span class="adj" title="Adjusted by you"></span>` : ""}</span>`;
  }
  function confHtml(c) { const n = { High: 3, Medium: 2, Low: 1 }[c]; return `<span class="conf"><span class="conf-bars">${[1, 2, 3].map((i) => `<i class="${i <= n ? "on" : ""}"></i>`).join("")}</span>${c}</span>`; }
  function renderTable(list) {
    $("#rankTable").innerHTML = `
      <thead><tr><th>#</th><th>Workflow</th><th>Reach</th><th>Impact</th><th>Priority</th><th>Confidence</th><th class="num">Threads</th></tr></thead>
      <tbody>${list.map((wf, i) => {
        const o = state.overrides[wf.id] || {}; const p = prio(wf);
        return `<tr data-id="${wf.id}" class="${state.selected === wf.id ? "sel" : ""}">
          <td class="muted" style="font-variant-numeric:tabular-nums">${i + 1}</td>
          <td><div class="rank-name"><span class="wf-id">${wf.id}</span>${esc(wf.name)}</div><div class="rank-sub">${esc(wf.persona || "User")} · trend ${wf.trend}</div></td>
          <td>${pips(score(wf, "reach"), "", o.reach != null && o.reach !== aiScore(wf, "reach"))}</td>
          <td>${pips(score(wf, "impact"), "impact", o.impact != null && o.impact !== aiScore(wf, "impact"))}</td>
          <td><span class="prio"><span class="prio-val">${p}</span><span class="tier ${tier(p).toLowerCase()}">${tier(p)}</span></span></td>
          <td>${confHtml(wf.confidence)}</td>
          <td class="num" style="font-variant-numeric:tabular-nums">${fmt(mentionsOf(wf))}</td>
        </tr>`;
      }).join("")}</tbody>`;
  }
  function renderInsights() {
    const wfs = activeWfs();
    const byP = [...wfs].sort((a, b) => prio(b) - prio(a) || b.reach.raw * b.impact.raw - a.reach.raw * a.impact.raw);
    const top = byP[0];
    const low = byP[byP.length - 1];
    const rest = wfs.filter((w) => w !== top && w !== low);
    const byImpact = (a, b) => score(b, "impact") - score(a, "impact") || b.impact.raw - a.impact.raw;
    const niche = rest.filter((w) => score(w, "reach") <= 2).sort(byImpact)[0] || rest.sort(byImpact)[0];
    const cards = [
      top && { wf: top, icon: "target", eye: "Build first", title: top.name, body: `Reach ${score(top, "reach")} × Impact ${score(top, "impact")} across ${fmt(mentionsOf(top))} threads. ${top.impact.rationale.split(". ")[0]}.` },
      niche && { wf: niche, icon: "alert", eye: "Niche but severe", title: niche.name, body: `Only Reach ${score(niche, "reach")}, but Impact ${score(niche, "impact")}. Worth considering for a targeted segment or a fast-follow. ${niche.reach.rationale.split(". ")[0]}.` },
      low && low !== top && { wf: low, icon: "scissors", eye: "Candidate to de-scope", title: low.name, body: `Lowest priority (${prio(low)}/25). ${low.impact.rationale.split(". ")[0]}.` },
    ].filter(Boolean);
    $("#insights").innerHTML = cards.map((c) => `
      <div class="card insight" data-id="${c.wf.id}" tabindex="0">
        <div class="ic">${ic(c.icon)}</div>
        <div class="eyebrow">${c.eye} · ${c.wf.id}</div>
        <h4>${esc(c.title)}</h4>
        <p>${esc(c.body)}</p>
      </div>`).join("");
  }

  // Linked hover between matrix and table
  const tip = $("#tooltip");
  function setHover(id) {
    $("#matrix").classList.toggle("has-hover", !!id);
    $$("#matrix .pt").forEach((p) => p.classList.toggle("hover", p.dataset.id === id));
    $$("#rankTable tbody tr").forEach((r) => r.classList.toggle("hover", r.dataset.id === id));
  }
  function showTip(wf, x, y) {
    tip.innerHTML = `<div class="tt-title">${wf.id} · ${esc(wf.name)}</div>
      <div class="tt-row"><span>Reach</span><b>${score(wf, "reach")} / 5</b></div>
      <div class="tt-row"><span>Impact</span><b>${score(wf, "impact")} / 5</b></div>
      <div class="tt-row"><span>Priority</span><b>${prio(wf)} · ${tier(prio(wf))}</b></div>
      <div class="tt-row"><span>Relevant threads</span><b>${fmt(mentionsOf(wf))}</b></div>
      <div class="tt-foot">${isAdjusted(wf) ? "Adjusted by you · " : ""}Click to view evidence</div>`;
    tip.classList.add("show");
    const w = tip.offsetWidth, h = tip.offsetHeight;
    let left = x + 16, top = y + 16;
    if (left + w > innerWidth - 12) left = x - w - 16;
    if (top + h > innerHeight - 12) top = y - h - 16;
    tip.style.left = left + "px"; tip.style.top = top + "px";
  }
  const hideTip = () => tip.classList.remove("show");
  $("#matrix").addEventListener("mousemove", (e) => {
    const g = e.target.closest(".pt");
    if (!g) { setHover(null); hideTip(); return; }
    setHover(g.dataset.id);
    showTip(state.workflows.find((w) => w.id === g.dataset.id), e.clientX, e.clientY);
  });
  $("#matrix").addEventListener("mouseleave", () => { setHover(null); hideTip(); });
  $("#matrix").addEventListener("click", (e) => { const g = e.target.closest(".pt"); if (g) { hideTip(); openDrawer(g.dataset.id); } });
  $("#matrix").addEventListener("keydown", (e) => { const g = e.target.closest(".pt"); if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openDrawer(g.dataset.id); } });
  $("#rankTable").addEventListener("mouseover", (e) => { const r = e.target.closest("tbody tr"); setHover(r ? r.dataset.id : null); });
  $("#rankTable").addEventListener("mouseleave", () => setHover(null));
  $("#rankTable").addEventListener("click", (e) => { const r = e.target.closest("tbody tr"); if (r) openDrawer(r.dataset.id); });
  $("#insights").addEventListener("click", (e) => { const c = e.target.closest(".insight"); if (c) openDrawer(c.dataset.id); });
  $("#sortSel").addEventListener("change", (e) => { state.sort = e.target.value; renderTable(sorted()); });

  // ---------- Drawer ----------
  function prdSentence(wf) {
    if (!wf.anchor) return wf.desc || "Added manually during review.";
    const text = state.prd.text.replace(/\*\*/g, "");
    const i = text.indexOf(wf.anchor.replace(/\*\*/g, ""));
    if (i < 0) return wf.desc || wf.anchor;
    let s = Math.max(text.lastIndexOf("\n", i), text.lastIndexOf(". ", i) + 1);
    let e = text.indexOf(". ", i); const nl = text.indexOf("\n", i);
    if (e < 0 || (nl >= 0 && nl < e)) e = nl < 0 ? text.length : nl - 1;
    return text.slice(s + 1, e + 1).trim().replace(/^#+\s*/, "");
  }
  function scoreCard(wf, k) {
    const v = score(wf, k), ai = aiScore(wf, k);
    const adj = state.overrides[wf.id]?.[k] != null && v !== ai;
    const rub = (k === "reach" ? REACH_RUBRIC : IMPACT_RUBRIC)[v - 1];
    return `<div class="score-card">
      <div class="top">
        <div>
          <div class="lbl">${ic(k === "reach" ? "users" : "bolt").replace("<svg", '<svg width="14" height="14"')}${k === "reach" ? "Reach" : "Impact"}</div>
          <div class="big">${v}<small>/5</small></div>
          <div class="word">${rub[1]}: ${rub[2]}</div>
        </div>
        <div class="stepper-ctl">
          <button data-adj="${k}" data-d="-1" ${v <= 1 ? "disabled" : ""} aria-label="Decrease ${k}">${ic("minus")}</button>
          <button data-adj="${k}" data-d="1" ${v >= 5 ? "disabled" : ""} aria-label="Increase ${k}">${ic("plus")}</button>
        </div>
      </div>
      <div class="ai-note">${adj ? `Adjusted from AI estimate ${ai} · <button class="reset" data-reset="${k}">Reset</button>` : `AI estimate · signal strength ${wf[k].raw.toFixed(1)}`}</div>
      <p class="rationale">${esc(wf[k].rationale)}</p>
    </div>`;
  }
  const TAGS = {
    blocker: ["alert", "Blocker"], workaround: ["wrench", "Workaround"], churn: ["exit", "Churn risk"],
    request: ["lightbulb", "Feature request"], frequency: ["repeat", "Recurring"],
  };
  function renderDrawer() {
    const wf = state.workflows.find((w) => w.id === state.selected); if (!wf) return;
    const body = $("#drawerBody"); const st = body.scrollTop;
    const p = prio(wf);
    const srcs = SOURCES.filter((s) => state.sources.has(s.id) && wf.mix[s.id]);
    const mixSum = srcs.reduce((a, s) => a + wf.mix[s.id], 0);
    const m = mentionsOf(wf);
    const evAll = wf.evidence.filter((e) => state.sources.has(e.source));
    const ev = state.evFilter === "all" ? evAll : evAll.filter((e) => e.tags.includes(state.evFilter));
    const tagCounts = {}; evAll.forEach((e) => e.tags.forEach((t) => (tagCounts[t] = (tagCounts[t] || 0) + 1)));
    const list = sorted(); const idx = list.findIndex((w) => w.id === wf.id);
    $("#prevBtn").disabled = idx <= 0; $("#nextBtn").disabled = idx >= list.length - 1;
    $("#drawerCrumb").innerHTML = `<span class="wf-id">${wf.id}</span>${wf.section ? `PRD §${esc(wf.section)}` : "Workflow"} · ranked #${idx + 1} of ${list.length}`;
    const meters = (obj, v) => Object.entries(obj).map(([k, val]) => `
      <div class="signal"><div class="row"><span>${k}</span><b>${val}</b></div><div class="meter ${v ? "v" : ""}"><i style="width:${val}%"></i></div></div>`).join("");
    body.innerHTML = `
      <h2>${esc(wf.name)}</h2>
      <div class="tags">
        <span class="chip"><span class="tier ${tier(p).toLowerCase()}" style="padding:0 5px;font-size:10px">${tier(p)}</span>Priority ${p}/25</span>
        ${wf.persona ? `<span class="chip">${ic("person")}${esc(wf.persona)}</span>` : ""}
        <span class="chip">${confHtml(wf.confidence)} confidence</span>
        <span class="chip">${ic("trend")}${wf.trend} vs prior period</span>
      </div>
      <div class="excerpt"><span class="eyebrow">From the PRD${wf.section ? " · §" + esc(wf.section) : ""}</span>“${esc(prdSentence(wf))}”</div>
      <div class="score-cards">${scoreCard(wf, "reach")}${scoreCard(wf, "impact")}</div>
      <div class="section">
        <div class="sec-title">Signal breakdown <span class="muted" style="text-transform:none;letter-spacing:0;font-weight:400">0–100, normalized across workflows</span></div>
        <div class="signals">
          <div style="display:grid;gap:12px"><div class="eyebrow" style="font-size:10.5px">Reach signals</div>${meters(wf.reach.signals, false)}</div>
          <div style="display:grid;gap:12px"><div class="eyebrow" style="font-size:10.5px">Impact signals</div>${meters(wf.impact.signals, true)}</div>
        </div>
      </div>
      <div class="section">
        <div class="sec-title">Where it's discussed <span class="muted" style="text-transform:none;letter-spacing:0;font-weight:400">${fmt(m)} relevant threads</span></div>
        <div class="mix-bar">${srcs.map((s) => `<i style="width:${(wf.mix[s.id] / mixSum) * 100}%;background:${s.color}" title="${s.name}"></i>`).join("")}</div>
        <div class="mix-legend">${srcs.map((s) => `<span><i class="swatch" style="background:${s.color}"></i>${s.name} <b>${fmt((m * wf.mix[s.id]) / mixSum)}</b></span>`).join("")}</div>
      </div>
      <div class="section">
        <div class="sec-title">Customer evidence <span class="muted" style="text-transform:none;letter-spacing:0;font-weight:400">top ${evAll.length} of ${fmt(m)}</span></div>
        <div class="ev-filters">
          <button data-ev="all" class="${state.evFilter === "all" ? "active" : ""}">All ${evAll.length}</button>
          ${Object.keys(TAGS).filter((t) => tagCounts[t]).map((t) => `<button data-ev="${t}" class="${state.evFilter === t ? "active" : ""}">${TAGS[t][1]} ${tagCounts[t]}</button>`).join("")}
        </div>
        ${ev.length ? ev.map((e, i) => `
          <div class="ev" style="animation-delay:${i * 50}ms">
            <div class="ev-top"><span class="swatch" style="background:${srcById[e.source].color}"></span>${srcById[e.source].name}<span>·</span><span>${esc(e.author)}</span><span>·</span><span>${e.date}</span><span class="sp"></span><span class="votes">${ic("up")}${fmt(e.votes)}</span></div>
            <h5>${esc(e.title)}</h5>
            <blockquote>“${esc(e.quote).replace(/\[\[(.+?)\]\]/g, "<mark>$1</mark>")}”</blockquote>
            <div class="ev-tags">${e.tags.map((t) => `<span class="ev-tag ${t}">${ic(TAGS[t][0])}${TAGS[t][1]}</span>`).join("")}</div>
          </div>`).join("") : `<div class="muted" style="font-size:13px;padding:12px 0">No evidence from the selected sources matches this filter.</div>`}
      </div>
      <div class="section">
        <div class="sec-title">Search queries used</div>
        <div class="queries">${wf.queries.map((q) => `<code>${esc(q)}</code>`).join("")}</div>
      </div>`;
    body.scrollTop = st;
  }
  function openDrawer(id) {
    const changed = state.selected !== id;
    state.selected = id;
    if (changed) state.evFilter = "all";
    renderDrawer();
    if (changed) $("#drawerBody").scrollTop = 0;
    $("#drawer").classList.add("open"); $("#drawer").setAttribute("aria-hidden", "false");
    $("#scrim").classList.add("open");
    renderMatrix(); renderTable(sorted());
  }
  function closeDrawer() {
    $("#drawer").classList.remove("open"); $("#drawer").setAttribute("aria-hidden", "true");
    $("#scrim").classList.remove("open");
    state.selected = null;
    if (state.view === "results") { renderMatrix(); renderTable(sorted()); }
  }
  function step(d) {
    const list = sorted(); const i = list.findIndex((w) => w.id === state.selected);
    const n = list[i + d]; if (n) openDrawer(n.id);
  }
  $("#closeDrawer").addEventListener("click", closeDrawer);
  $("#scrim").addEventListener("click", closeDrawer);
  $("#prevBtn").addEventListener("click", () => step(-1));
  $("#nextBtn").addEventListener("click", () => step(1));
  $("#drawerBody").addEventListener("click", (e) => {
    const wf = state.workflows.find((w) => w.id === state.selected);
    const a = e.target.closest("[data-adj]");
    if (a) {
      const k = a.dataset.adj; const v = clamp(score(wf, k) + +a.dataset.d, 1, 5);
      state.overrides[wf.id] = { ...(state.overrides[wf.id] || {}), [k]: v };
      if (v === aiScore(wf, k)) delete state.overrides[wf.id][k];
      renderDrawer(); renderResults(); return;
    }
    const rs = e.target.closest("[data-reset]");
    if (rs) { delete state.overrides[wf.id][rs.dataset.reset]; renderDrawer(); renderResults(); return; }
    const f = e.target.closest("[data-ev]");
    if (f) { state.evFilter = f.dataset.ev; renderDrawer(); }
  });

  // ---------- Rubric modal ----------
  function renderRubric() {
    const col = (title, icon, intro, rows, signals) => `
      <div>
        <h3>${ic(icon).replace("<svg", '<svg width="16" height="16"')}${title}</h3>
        <p>${intro}</p>
        ${rows.map(([n, w, d]) => `<div class="rubric-row"><b>${n}</b><div><strong>${w}</strong>${d}</div></div>`).join("")}
        <div class="rubric-signals">Signals: ${signals.map((s) => `<code>${s}</code>`).join(" · ")}</div>
      </div>`;
    $("#rubricBody").innerHTML =
      col("Reach", "users", "How broadly the problem shows up across the customer base.", REACH_RUBRIC, ["share of relevant threads", "unique authors", "cross-source spread", "co-signs / upvotes"]) +
      col("Impact", "bolt", "How significant the problem is for customers when it occurs.", IMPACT_RUBRIC, ["severity language", "workaround cost", "blocker mentions", "churn / switching risk"]);
  }
  const modal = $("#rubricModal");
  const openModal = () => { renderRubric(); modal.classList.add("open"); $("#scrim").classList.add("open"); };
  const closeModal = () => { modal.classList.remove("open"); if (!$("#drawer").classList.contains("open")) $("#scrim").classList.remove("open"); };
  $("#rubricBtn").addEventListener("click", openModal);
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest("[data-close]")) closeModal(); });

  // ---------- Export ----------
  function exportCsv() {
    const q = (v) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = [["Rank", "ID", "Workflow", "PRD section", "Persona", "Reach", "Impact", "Priority", "Tier", "AI Reach", "AI Impact", "Adjusted", "Confidence", "Relevant threads", "Reach rationale", "Impact rationale"]];
    sorted().forEach((w, i) => rows.push([i + 1, w.id, w.name, w.section, w.persona, score(w, "reach"), score(w, "impact"), prio(w), tier(prio(w)), aiScore(w, "reach"), aiScore(w, "impact"), isAdjusted(w) ? "yes" : "no", w.confidence, mentionsOf(w), w.reach.rationale, w.impact.rationale]));
    const blob = new Blob([rows.map((r) => r.map(q).join(",")).join("\r\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (state.prd.title || "signal").replace(/[^\w]+/g, "_") + "_reach_impact.csv";
    a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast("CSV exported");
  }
  async function copySummary() {
    const list = sorted();
    const lines = [`## Reach × Impact: ${state.prd.title}`, `_${list.length} workflows · ${fmt(state.totals.matches)} relevant customer threads · last ${state.window} months_`, "",
      "| # | Workflow | Reach | Impact | Priority | Confidence |", "|---|---|---|---|---|---|",
      ...list.map((w, i) => `| ${i + 1} | ${w.id} ${w.name} | ${score(w, "reach")} | ${score(w, "impact")} | ${prio(w)} (${tier(prio(w))}) | ${w.confidence} |`)];
    const text = lines.join("\n");
    try { await navigator.clipboard.writeText(text); }
    catch { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); }
    toast("Markdown summary copied");
  }
  $("#csvBtn").addEventListener("click", exportCsv);
  $("#copyBtn").addEventListener("click", copySummary);
  $("#rerunBtn").addEventListener("click", () => { closeDrawer(); setView("input"); });

  // ---------- Toast & keys ----------
  let toastT;
  function toast(msg) {
    $("#toastMsg").textContent = msg; $("#toast").classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => $("#toast").classList.remove("show"), 2200);
  }
  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea, [contenteditable='true']")) return;
    if (e.key === "Escape") { if (modal.classList.contains("open")) closeModal(); else closeDrawer(); }
    if ($("#drawer").classList.contains("open")) {
      if (e.key === "ArrowDown" || e.key === "j") { e.preventDefault(); step(1); }
      if (e.key === "ArrowUp" || e.key === "k") { e.preventDefault(); step(-1); }
    }
  });

  // ---------- Init ----------
  hydrateIcons();
  renderSources();
  setView("input");

  // Demo deep links: #extract, #research, #results, #drawer (loads the sample PRD).
  const deep = location.hash.slice(1);
  if (["extract", "research", "results", "drawer"].includes(deep)) {
    loadDoc({ ...SAMPLE_PRD, isSample: true });
    $("#extractBtn").click();
    if (deep !== "extract") {
      extractRun++; state.extracted = true; renderExtract(false);
      setView("research"); runResearch();
      if (deep !== "research") {
        skipNow = true;
        setTimeout(() => { $("#viewResultsBtn").click(); if (deep === "drawer") openDrawer("W8"); }, 150);
      }
    }
  }
})();
