import { useState, useEffect, useRef } from "react";

const FONTS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400&display=swap');
@font-face { font-family:'Charter'; font-weight:400; font-style:normal; font-display:swap; src:url('https://cdn.jsdelivr.net/gh/fonts-archive/Charter/Charter-Regular.woff2') format('woff2'); }
@font-face { font-family:'Charter'; font-weight:400; font-style:italic; font-display:swap; src:url('https://cdn.jsdelivr.net/gh/fonts-archive/Charter/Charter-Italic.woff2') format('woff2'); }
@font-face { font-family:'Charter'; font-weight:700; font-style:normal; font-display:swap; src:url('https://cdn.jsdelivr.net/gh/fonts-archive/Charter/Charter-Bold.woff2') format('woff2'); }
@font-face { font-family:'Charter'; font-weight:700; font-style:italic; font-display:swap; src:url('https://cdn.jsdelivr.net/gh/fonts-archive/Charter/Charter-BoldItalic.woff2') format('woff2'); }
`;

/* --- DESIGN SYSTEM TOKENS --- */
const S = "'Charter', 'Georgia', serif";
const U = "'Inter', sans-serif";
const M = "'JetBrains Mono', monospace";
const PAD = "clamp(20px, 5vw, 56px)";

/* Typography scale: 3 sizes only */
const TYPE = { body: 18.5, lede: 21.5, small: 14 };
/* Line heights: iA recommends ~140%, Charter needs slightly more */
const LH = { body: 1.58, lede: 1.55, small: 1.5 };
/* Spacing system: 3 values */
const GAP = { paragraph: 22, section: 56, element: 32 };

/* Color system — contrast-first, iA benchmark: #333 on #fff minimum */
function theme(dark) {
  return {
    bg: dark ? "#141413" : "#faf9f7",
    fg: dark ? "#e5e2dd" : "#1d1d1b",
    body: dark ? "rgba(229,226,221,0.92)" : "rgba(29,29,27,0.88)",
    muted: dark ? "rgba(229,226,221,0.55)" : "rgba(29,29,27,0.55)",
    faint: dark ? "rgba(229,226,221,0.3)" : "rgba(29,29,27,0.3)",
    border: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    subtle: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    link: dark ? "#6db3f2" : "#0969da",
  };
}

/* Pretext-inspired column width calculation */
function useOptimalWidth(font, fontSize, targetWpl) {
  const [width, setWidth] = useState(640);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.font = `${fontSize}px ${font.replace(/'/g, "")}`;
      const sample = "The quick brown fox jumps over the lazy dog and finds peace in simplicity";
      const words = sample.split(" ");
      const totalWidth = ctx.measureText(sample).width;
      const avgWordWidth = totalWidth / words.length;
      const spaceWidth = ctx.measureText(" ").width;
      const optimalWidth = (avgWordWidth + spaceWidth) * targetWpl;
      setWidth(Math.round(Math.min(Math.max(optimalWidth, 520), 720)));
    } catch (e) { setWidth(640); }
  }, [font, fontSize, targetWpl]);
  return width;
}

/* --- DATA --- */
const articles = [
  {
    id: "wanderer", category: "Essay", title: "The Wanderer",
    subtitle: "On time blindness, immigration, and a watch that keeps showing up",
    date: "April 2026", readTime: "12 min", bg: "#1a1a2e", fg: "#e5e2dd",
    heroImage: { ratio: "16/10", color: "#2a2a4e", caption: "Nivada Grenchen Antarctic 'Wanderer', c. 1965. The dial has aged from white to warm cream — yaketsuki." },
    body: [
      { type: "lede", text: "I bought the watch because I couldn't stop thinking about it. A 1960s Nivada Grenchen Antarctic, with a dial that had turned from white to a warm cream over sixty years — the Japanese call this yaketsuki, the beautiful aging that happens when something has been lived with." },
      { type: "h2", text: "Time blindness" },
      { type: "p", text: "There's a condition — not officially, not in any manual — called time blindness. It's the inability to feel time passing. Not in the philosophical sense that occupies German professors. In the practical sense: you sit down to work, and when you look up, four hours have vanished. You consistently underestimate how long things take. You are perpetually, genuinely surprised that it's already Thursday." },
      { type: "p", text: ["I have this. I've had it my whole life.", 1, " And for most of that life, I compensated with systems — calendars, alarms, the gentle tyranny of other people's expectations. Moving to Copenhagen made it worse, or perhaps just more visible. When you immigrate, you lose the ambient time-keeping of familiarity."] },
      { type: "image", ratio: "3/2", color: "#252540", caption: "Copenhagen in October. The light arrives at a different angle than what I grew up with." },
      { type: "component", id: "timeline" },
      { type: "h2", text: "What remains" },
      { type: "p", text: "The Wanderer was Nivada Grenchen's attempt at a tool watch for people who moved between time zones. It had an inner rotating bezel — you could track a second time zone by turning the ring. This was 1960s practicality: if you're flying between Zurich and New York, you want to know what time it is in both places without doing arithmetic." },
      { type: "p", text: ["Sixty years later, I don't need that feature. My phone handles time zones. What I need is something more basic: a physical reminder that time is passing.", 2, ""] },
      { type: "image", ratio: "1/1", color: "#2e2e4a", caption: "Detail of the inner rotating bezel. The second timezone markings have faded unevenly.", width: "55%" },
      { type: "p", text: "This is the paradox of the immigrant's relationship to objects. You leave a country and you leave most of your things. The few objects that travel with you take on outsized significance — they become anchors in a life that's otherwise been unmoored and rebuilt." },
      { type: "p", text: ["There's a Japanese concept — mono no aware", 3, " — that translates roughly as 'the pathos of things.' It's the bittersweet awareness that everything is transient. The cherry blossom is beautiful precisely because it falls."] },
    ],
    footnotes: [
      "ADHD researchers use the term clinically. For those who experience it, it's less a blindness and more a different relationship to duration.",
      "A persistent, gentle interruption to the timelessness of deep work and digital life.",
      "Mono no aware (物の哀れ) — literally 'the ahh-ness of things.' Articulated by Motoori Norinaga as the emotional core of Japanese aesthetics.",
    ],
  },
  {
    id: "default-quality", category: "Observation", title: "Default Quality",
    subtitle: "What the Japanese convenience store teaches about baseline standards",
    date: "March 2026", readTime: "6 min", bg: "#eae6de", fg: "#1d1d1b",
    heroImage: { ratio: "16/10", color: "#d8d0c4", caption: "A 7-Eleven in Shibuya, 2am." },
    body: [
      { type: "lede", text: "In a 7-Eleven in Shibuya, at 2am, you can buy an onigiri that is genuinely good. Not 'good for a convenience store.' Good. The rice is the right temperature, the nori is crisp, and the filling is made with care that would be considered premium anywhere else." },
      { type: "h2", text: "The baseline problem" },
      { type: "p", text: "Most industries in most countries have settled on a baseline quality that's adequate. It's fine. Nobody complains, because nobody expects more. The Japanese combini inverts this — the baseline is set high enough that the gap between convenience and craft is almost imperceptible." },
      { type: "p", text: ["This isn't perfectionism. Perfectionism is neurotic and unsustainable. This is something else — a cultural agreement that the default should be good.", 1, " Not the premium tier. The default."] },
      { type: "image", ratio: "4/3", color: "#cfc8bc", caption: "The three-step onigiri wrapper. Someone designed and iterated on this — for a convenience store snack." },
      { type: "component", id: "quality-spectrum" },
      { type: "h2", text: "What this means for design" },
      { type: "p", text: "When I design systems — curriculum, software, operational infrastructure — I keep coming back to this principle. The question isn't 'how do we make the best version?' It's 'how do we raise the floor?' Because most people interact with the floor. The ceiling is for brochures." },
      { type: "p", text: "The combini doesn't have a 'premium onigiri' section. They're all good. That's the lesson." },
    ],
    footnotes: ["Kodawari (こだわり) — an uncompromising dedication to pursuing a particular thing."],
  },
  {
    id: "five-cs", category: "Framework", title: "The Five C's",
    subtitle: "A creative process for the age of AI thinking partners",
    date: "February 2026", readTime: "9 min", bg: "#0d1b2a", fg: "#dddcd8",
    heroImage: { ratio: "16/10", color: "#162d45" },
    body: [
      { type: "lede", text: "The blank page has been the enemy of creative work since the invention of the page. But the blank page problem was never really about the page — it was about the gap between thinking and articulating. AI doesn't solve creativity. It removes the blank page." },
      { type: "component", id: "five-cs-diagram" },
      { type: "h2", text: "Capture" },
      { type: "p", text: "Everything starts with capture — the bookmark, the photograph, the voice memo, the screenshot. Most of this will never become anything. That's fine. Capture is compost." },
      { type: "h2", text: "Converse" },
      { type: "p", text: ["This is where AI changes the game. You bring a half-formed idea to a thinking partner and through dialogue, the idea takes shape.", 1, " The AI doesn't generate the insight. You do. But you generate it in conversation rather than in isolation."] },
      { type: "h2", text: "Clarify → Create → Communicate" },
      { type: "p", text: "After conversation comes clarification — deciding what the thing actually is. Then making it, with momentum behind you. Then shipping it. The Five C's treat communication as part of the creative process, not an afterthought." },
    ],
    footnotes: ["Frank Chimero: 'You use a tool, but you play an instrument.' Instruments require technique and touch."],
  },
  {
    id: "systems", category: "Thinking", title: "Systems, Not Sequences",
    subtitle: "Why I think in spatial arrangements rather than linear plans",
    date: "January 2026", readTime: "7 min", bg: "#264653", fg: "#eeece8",
    heroImage: { ratio: "16/10", color: "#2f5565", caption: "An Obsidian graph view." },
    body: [
      { type: "lede", text: "My architecture education didn't teach me to build buildings. It taught me to see systems — how light, material, movement, and purpose interact in space." },
      { type: "p", text: "When someone asks me to plan a project, my instinct is never to make a list. It's to draw a map. Where are the elements? How do they connect? What influences what?" },
      { type: "h2", text: "The cost of linear thinking" },
      { type: "p", text: ["Linear plans break the moment reality introduces a variable you didn't sequence for.", 1, " If your mental model is a sequence, you're stuck. If your mental model is a system, you route around the blockage."] },
      { type: "p", text: "Curriculum design taught me this viscerally. A teenager's attention, energy, and readiness fluctuate. The curriculum needs to be a system that adapts, not a sequence that marches forward." },
    ],
    footnotes: ["This is why Obsidian appeals to systems thinkers — the vault is a graph, not a notebook."],
  },
];

const issues = [
  { num: "006", title: "The constraint is the feature", date: "Apr 2026", preview: "On iA Writer, deliberate limitations, and why the best tools say no.", image: { color: "#2a2a3a" },
    sections: [
      { type: "intro", text: "I've been thinking about why the tools I return to are the ones that constrain me — iA Writer over Notion, a mechanical watch over a smart one, a walk over a gym session." },
      { type: "image", ratio: "16/9", color: "#2a2a3a", caption: "iA Writer on macOS. A cursor, a typeface, and nothing else." },
      { type: "essay", title: "Constraints as creative material", paragraphs: ["iA Writer does one thing: it lets you write. No databases, no page layout, no formatting toolbar. Just you, a cursor, and markdown.", "Oliver Reichenstein talks about radical simplification — going back to roots. When you strip away everything that isn't essential, you find out what the thing actually is.", "I've started applying this to my own work. When I design a workshop: what's the one thing? The constraint isn't the enemy. The constraint is the material."] },
      { type: "found", items: [{ title: "Pretext by Cheng Lou", desc: "A text layout engine that computes typography with pure arithmetic.", url: "github.com/chenglou/pretext" }, { title: "iA's 'Design as Thought'", desc: "A conversation about AI, design, and whether machines can think.", url: "ia.net/topics/design-as-thought" }] },
      { type: "onsite", text: "I published 'The Wanderer' — an essay about time blindness, immigration, and a 1960s watch." },
    ],
  },
  { num: "005", title: "Fifteen trips to Japan", date: "Mar 2026", preview: "What changes when a place stops being a destination and starts being a practice.", image: { color: "#3a3028" },
    sections: [
      { type: "intro", text: "March in Tokyo is cherry blossom season, and I'm not there. The absence made me think about what Japan actually is to me." },
      { type: "image", ratio: "3/2", color: "#3a3028", caption: "Meguro River, late March." },
      { type: "essay", title: "The practice of a place", paragraphs: ["The first trip is about surfaces. Vending machines, bowing, toilets. Everything is novel.", "By the fifth trip, surfaces become transparent. You notice the gaps — space that isn't wasted but designed.", "By the fifteenth, you stop noticing Japan and start noticing yourself in Japan."] },
      { type: "found", items: [{ title: "Craig Mod's Kissa by Kissa", desc: "The gold standard for walking, writing, and publishing.", url: "craigmod.com/books/kissa" }] },
      { type: "onsite", text: "New essay: 'Default Quality.'" },
    ],
  },
  { num: "004", title: "Building in public, quietly", date: "Feb 2026", preview: "The difference between performing work and sharing work.", image: { color: "#28303a" },
    sections: [
      { type: "intro", text: "Building in public and performing in public look similar from the outside. The intent is different." },
      { type: "essay", title: "The quiet version", paragraphs: ["Social media rewards performance. A newsletter is different — nobody subscribes for content. They subscribe because they're interested in the person.", "Frank Chimero describes his site as 'a good room.' I want this newsletter to be the same."] },
      { type: "image", ratio: "16/9", color: "#28303a", caption: "Frank Chimero's site. The good room." },
      { type: "found", items: [{ title: "Frank Chimero's 'The Good Room'", desc: "The essay that convinced me personal publishing matters.", url: "frankchimero.com/blog/2018/the-good-room" }] },
      { type: "onsite", text: "Published 'The Five C's.'" },
    ],
  },
  { num: "003", title: "Musashi's sword", date: "Jan 2026", preview: "Hidden tools inside a katana's scabbard.", image: { color: "#2e2e28" },
    sections: [
      { type: "intro", text: "A research hole that started with Miyamoto Musashi and ended with a lesson about tool design." },
      { type: "image", ratio: "4/3", color: "#2e2e28", caption: "Kogai and kogatana — the utility tools within a katana's scabbard." },
      { type: "essay", title: "Hidden tools", paragraphs: ["Most people know about the katana. Fewer know about the kogai and kogatana.", "The sword system accommodated writing, eating, maintenance, and fighting in one package."] },
      { type: "found", items: [{ title: "The Book of Five Rings", desc: "Musashi's treatise on strategy.", url: "" }] },
      { type: "onsite", text: "Essay coming: 'Systems, Not Sequences.'" },
    ],
  },
  { num: "002", title: "Systems, not sequences", date: "Dec 2025", preview: "How architecture school taught me to think in maps.", image: { color: "#1e2e38" },
    sections: [
      { type: "intro", text: "December is the month of planning. Everyone makes lists. I've never been able to make lists work." },
      { type: "essay", title: "Maps over lists", paragraphs: ["Architecture school taught me to see relationships between elements.", "I apply this to everything now — mapping concepts, not sequencing steps."] },
      { type: "image", ratio: "16/9", color: "#1e2e38", caption: "Owen's Obsidian graph." },
      { type: "found", items: [{ title: "Obsidian", desc: "A vault is a graph, not a notebook.", url: "obsidian.md" }] },
      { type: "onsite", text: "First essay: 'Systems, Not Sequences.'" },
    ],
  },
  { num: "001", title: "Hello, and the onigiri principle", date: "Nov 2025", preview: "Why default quality matters more than peak quality.", image: { color: "#2a2828" },
    sections: [
      { type: "intro", text: "Hello. I'm Owen. I live in Copenhagen, I've been to Japan fifteen times, and I think in systems rather than sequences." },
      { type: "image", ratio: "3/2", color: "#2a2828", caption: "7-Eleven, Shibuya. 2am." },
      { type: "essay", title: "The onigiri principle", paragraphs: ["In Japan, the baseline quality is remarkably high. The floor is set at a level most cultures reserve for premium.", "I call this 'the onigiri principle': the default should be good. This newsletter is an exercise in it."] },
      { type: "found", items: [{ title: "Craig Mod's Roden", desc: "The model for what a personal newsletter can be.", url: "craigmod.com/roden" }, { title: "Arun Venkatesan's 'Inside arun.is'", desc: "Nine years documenting how he builds his site.", url: "arun.is" }] },
      { type: "onsite", text: "The site is live. We start somewhere." },
    ],
  },
];

/* --- COMPONENTS --- */
function Fn({ n, dark }) {
  const c = theme(dark);
  return <sup onClick={() => document.getElementById(`fn-${n}`)?.scrollIntoView({ behavior: "smooth", block: "center" })} style={{ fontFamily: M, fontSize: "0.58em", cursor: "pointer", color: c.link, marginLeft: 2, marginRight: 1, position: "relative", top: "-0.5em" }}>{n}</sup>;
}
function Txt({ content, dark }) {
  if (typeof content === "string") return content;
  return content.map((p, i) => typeof p === "number" ? <Fn key={i} n={p} dark={dark} /> : <span key={i}>{p}</span>);
}
function Img({ ratio, color, caption, width, dark }) {
  const c = theme(dark);
  return (
    <figure style={{ margin: `${GAP.element}px 0`, padding: 0, maxWidth: width || "100%" }}>
      <div style={{ aspectRatio: ratio, background: color, borderRadius: 2, width: "100%" }} />
      {caption && <figcaption style={{ fontFamily: U, fontSize: TYPE.small, lineHeight: LH.small, color: c.muted, marginTop: 10, paddingTop: 10, borderTop: `0.5px solid ${c.border}` }}>{caption}</figcaption>}
    </figure>
  );
}

function Timeline() {
  const [a, setA] = useState(null);
  const ev = [{ y: "1960", l: "Antarctic line released" }, { y: "1965", l: "Wanderer variant" }, { y: "1970s", l: "Quartz crisis" }, { y: "2019", l: "Nivada revived" }, { y: "2023", l: "Owen's Wanderer" }, { y: "Now", l: "Copenhagen" }];
  return (
    <div style={{ margin: `${GAP.element}px 0`, padding: "24px 0" }}>
      <div style={{ display: "flex", position: "relative" }}>
        <div style={{ position: "absolute", top: 7, left: 0, right: 0, height: 1, background: "currentColor", opacity: 0.12 }} />
        {ev.map((e, i) => (
          <div key={i} onClick={() => setA(a === i ? null : i)} style={{ flex: 1, cursor: "pointer", textAlign: "center", padding: "0 4px", position: "relative" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", margin: "0 auto 10px", border: "1.5px solid currentColor", background: a === i ? "currentColor" : "transparent", opacity: a === i ? 0.7 : 0.2, transition: "all 0.2s" }} />
            <div style={{ fontFamily: M, fontSize: 11, opacity: a === i ? 0.85 : 0.35, transition: "opacity 0.2s" }}>{e.y}</div>
            {a === i && <div style={{ fontFamily: U, fontSize: 12, lineHeight: 1.45, marginTop: 6, opacity: 0.55, maxWidth: 110, margin: "6px auto 0" }}>{e.l}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
function QualitySpectrum() {
  const [h, setH] = useState(null);
  const items = [{ l: "Negligent", p: 8, c: "#a3281e" }, { l: "Adequate", p: 25, c: "#b87333" }, { l: "Default quality", p: 70, c: "#3a7d5c" }, { l: "Craft", p: 90, c: "#2a5a8a" }, { l: "Obsessive", p: 98, c: "#5c3d7a" }];
  return (
    <div style={{ margin: `${GAP.element}px 0` }}>
      {items.map((item, i) => (
        <div key={i} onMouseEnter={() => setH(i)} onMouseLeave={() => setH(null)} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 6, cursor: "default" }}>
          <div style={{ fontFamily: U, fontSize: 12, width: 100, textAlign: "right", opacity: h === i ? 0.85 : 0.45, transition: "opacity 0.15s", flexShrink: 0 }}>{item.l}</div>
          <div style={{ flex: 1, height: 20, borderRadius: 2, overflow: "hidden", background: "currentColor", opacity: 0.05 }}>
            <div style={{ height: "100%", width: `${item.p}%`, borderRadius: 2, background: item.c, opacity: h === i ? 0.6 : 0.25, transition: "opacity 0.2s" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
function FiveCsDiagram() {
  const [a, setA] = useState(null);
  const s = [{ k: "Capture", d: "Bookmarks, notes, voice memos." }, { k: "Converse", d: "Dialogue with a thinking partner." }, { k: "Clarify", d: "Decide what the thing is." }, { k: "Create", d: "Make it, with momentum." }, { k: "Communicate", d: "Ship it." }];
  return (
    <div style={{ margin: `${GAP.element}px 0` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {s.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div onClick={() => setA(a === i ? null : i)} style={{ cursor: "pointer", padding: "6px 10px", borderRadius: 4, background: a === i ? "currentColor" : "transparent", opacity: a === i ? 0.06 : 1, transition: "all 0.15s" }}>
              <div style={{ fontFamily: U, fontSize: 13, fontWeight: a === i ? 600 : 400, opacity: a === i ? 1 : 0.45, transition: "all 0.15s" }}>{step.k}</div>
            </div>
            {i < s.length - 1 && <div style={{ width: 20, height: 1, background: "currentColor", opacity: 0.1 }} />}
          </div>
        ))}
      </div>
      <div style={{ minHeight: 40, display: "flex", justifyContent: "center", alignItems: "center", marginTop: 12 }}>
        {a !== null && <div style={{ fontFamily: S, fontSize: TYPE.small, lineHeight: LH.small, opacity: 0.5, maxWidth: 320, textAlign: "center" }}>{s[a].d}</div>}
      </div>
    </div>
  );
}
function Comp({ id }) { return id === "timeline" ? <Timeline /> : id === "quality-spectrum" ? <QualitySpectrum /> : id === "five-cs-diagram" ? <FiveCsDiagram /> : null; }

/* --- LAYOUT COMPONENTS --- */
function Header({ page, nav, dark, setDark }) {
  const c = theme(dark);
  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: `0 ${PAD}`, height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", background: dark ? "rgba(20,20,19,0.92)" : "rgba(250,249,247,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `0.5px solid ${c.border}`, transition: "background 0.3s" }}>
      <button onClick={() => nav("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: U, fontSize: TYPE.small, fontWeight: 500, color: c.fg }}>Owen McFadzen</button>
      <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {[{ id: "home", l: "Writing" }, { id: "newsletter", l: "Newsletter" }, { id: "about", l: "About" }].map(i => (
          <button key={i.id} onClick={() => nav(i.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 0", fontFamily: U, fontSize: 13, color: page === i.id ? c.fg : c.muted, transition: "color 0.2s" }}>{i.l}</button>
        ))}
        <button onClick={() => setDark(!dark)} style={{ background: "none", border: "none", cursor: "pointer", padding: "3px 8px", borderRadius: 3, fontFamily: M, fontSize: 11, color: c.faint, border: `0.5px solid ${c.border}` }}>{dark ? "light" : "dark"}</button>
      </nav>
    </header>
  );
}

function Footer({ dark }) {
  const c = theme(dark);
  return (
    <footer style={{ background: c.bg, padding: `0 ${PAD}`, transition: "background 0.3s" }}>
      <div style={{ borderTop: `0.5px solid ${c.border}`, padding: `${GAP.section}px 0 ${GAP.element}px` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: GAP.section }}>
          <div>
            <div style={{ fontFamily: S, fontSize: 15, color: c.muted }}>Owen McFadzen</div>
            <div style={{ fontFamily: U, fontSize: 12, color: c.faint, marginTop: 4 }}>Copenhagen, Denmark</div>
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
            <span style={{ fontFamily: U, fontSize: 13, color: c.link, cursor: "pointer" }}>LinkedIn</span>
            <span style={{ fontFamily: M, fontSize: 12, color: c.link, cursor: "pointer" }}>/feed</span>
          </div>
        </div>
        <div style={{ borderTop: `0.5px solid ${c.border}`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontFamily: S, fontSize: 12, fontStyle: "italic", color: c.faint }}>Plain surface, deep structure</div>
          <div style={{ fontFamily: M, fontSize: 10, color: c.faint }}>Charter · Inter · Astro</div>
        </div>
      </div>
    </footer>
  );
}

function Hero({ article, onSelect }) {
  return (
    <section style={{ height: "36em", background: article.bg, color: article.fg, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div style={{ position: "relative", zIndex: 2, padding: `0 ${PAD} clamp(28px, 5vw, 48px)` }}>
        <h5 style={{ fontFamily: U, fontSize: 12, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.45, margin: "0 0 14px" }}>{article.category}</h5>
        <h2 style={{ fontFamily: S, fontSize: "clamp(28px, 4.5vw, 46px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 10px", letterSpacing: "-0.01em" }}>{article.title}</h2>
        <p style={{ fontFamily: U, fontSize: 15, fontWeight: 400, lineHeight: 1.45, margin: "0 0 GAP.paragraphpx", opacity: 0.55, maxWidth: 400 }}>{article.subtitle}</p>
        <div style={{ marginTop: GAP.paragraph }}><button onClick={() => onSelect(article)} style={{ fontFamily: U, fontSize: 12, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", background: article.fg, color: article.bg, border: "none", borderRadius: 30, padding: "0.6em 1.5em 0.5em", cursor: "pointer", transition: "transform 0.1s" }} onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"} onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>Read Article</button></div>
      </div>
      {article.heroImage && <div style={{ position: "absolute", bottom: 0, right: 0, width: "48%", maxWidth: 440, zIndex: 1 }}><div style={{ width: "100%", aspectRatio: "16/10", background: article.heroImage.color, borderRadius: "2px 0 0 0" }} /></div>}
    </section>
  );
}

function Article({ article, onBack, dark }) {
  const c = theme(dark);
  const colWidth = useOptimalWidth("Charter, Georgia, serif", TYPE.body, 14);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ background: c.bg, color: c.fg, minHeight: "100vh", transition: "background 0.3s" }}>
      <div style={{ background: article.bg, color: article.fg, padding: `clamp(100px, 14vw, 180px) ${PAD} 0`, minHeight: "40vh", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ maxWidth: 620, paddingBottom: GAP.section }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: U, fontSize: 13, color: article.fg, opacity: 0.4, padding: 0, marginBottom: 40 }}>← Back</button>
          <h5 style={{ fontFamily: U, fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.45, margin: "0 0 14px" }}>{article.category}</h5>
          <h1 style={{ fontFamily: S, fontSize: "clamp(32px, 5.5vw, 50px)", fontWeight: 700, lineHeight: 1.12, margin: "0 0 12px" }}>{article.title}</h1>
          <p style={{ fontFamily: U, fontSize: 15, lineHeight: 1.45, margin: "0 0 24px", opacity: 0.5, maxWidth: 440 }}>{article.subtitle}</p>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontFamily: U, fontSize: 12, opacity: 0.35 }}>{article.date}</span>
            <span style={{ width: 2, height: 2, borderRadius: "50%", background: article.fg, opacity: 0.2 }} />
            <span style={{ fontFamily: U, fontSize: 12, opacity: 0.35 }}>{article.readTime}</span>
          </div>
        </div>
        {article.heroImage && <div style={{ maxWidth: 860, margin: "0 auto", width: "100%", padding: `0 ${PAD}` }}><div style={{ aspectRatio: "16/10", background: article.heroImage.color, borderRadius: "2px 2px 0 0", width: "100%" }} /></div>}
      </div>
      {article.heroImage?.caption && <div style={{ maxWidth: colWidth, margin: "0 auto", padding: `10px ${PAD} 0` }}><figcaption style={{ fontFamily: U, fontSize: TYPE.small, lineHeight: LH.small, color: c.muted, paddingBottom: 10, borderBottom: `0.5px solid ${c.border}` }}>{article.heroImage.caption}</figcaption></div>}
      <div style={{ maxWidth: colWidth, margin: "0 auto", padding: `${GAP.section}px ${PAD}` }}>
        {article.body.map((b, i) => {
          if (b.type === "component") return <Comp key={i} id={b.id} />;
          if (b.type === "image") return <Img key={i} {...b} dark={dark} />;
          if (b.type === "h2") return <h2 key={i} style={{ fontFamily: U, fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", margin: `${GAP.section}px 0 ${GAP.paragraph}px`, color: c.muted }}>{b.text}</h2>;
          const lede = b.type === "lede";
          return <p key={i} style={{ fontFamily: S, fontSize: lede ? TYPE.lede : TYPE.body, fontWeight: 400, lineHeight: lede ? LH.lede : LH.body, margin: `0 0 ${GAP.paragraph}px`, color: lede ? c.fg : c.body }}><Txt content={b.text} dark={dark} /></p>;
        })}
        {article.footnotes?.length > 0 && (
          <div style={{ marginTop: GAP.section, paddingTop: GAP.paragraph, borderTop: `0.5px solid ${c.border}` }}>
            {article.footnotes.map((fn, i) => (
              <div key={i} id={`fn-${i + 1}`} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "baseline" }}>
                <span style={{ fontFamily: M, fontSize: 11, color: c.link, flexShrink: 0, minWidth: 14 }}>{i + 1}</span>
                <span style={{ fontFamily: U, fontSize: TYPE.small, lineHeight: LH.small, color: c.muted }}>{fn}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer dark={dark} />
    </div>
  );
}

function IssuePage({ issue, onBack, dark }) {
  const c = theme(dark);
  useEffect(() => { window.scrollTo(0, 0); }, [issue.num]);
  return (
    <div style={{ background: c.bg, color: c.fg, minHeight: "100vh", paddingTop: 52, transition: "background 0.3s" }}>
      <div style={{ maxWidth: 620, margin: "0 auto", padding: `clamp(60px, 10vw, 112px) ${PAD} 0` }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: U, fontSize: 13, color: c.muted, padding: 0, marginBottom: 48 }}>← Archive</button>
        <div style={{ marginBottom: GAP.section + 8 }}>
          <div style={{ fontFamily: M, fontSize: 40, fontWeight: 400, color: c.faint, lineHeight: 1, marginBottom: 24 }}>{issue.num}</div>
          <h1 style={{ fontFamily: U, fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 600, lineHeight: 1.22, margin: "0 0 10px", letterSpacing: "-0.01em" }}>{issue.title}</h1>
          <div style={{ fontFamily: U, fontSize: TYPE.small, color: c.muted }}>{issue.date}</div>
        </div>
        {issue.sections.map((sec, si) => {
          if (sec.type === "intro") return <div key={si} style={{ marginBottom: GAP.section, paddingBottom: GAP.section, borderBottom: `0.5px solid ${c.border}` }}><p style={{ fontFamily: S, fontSize: TYPE.body, lineHeight: LH.body, color: c.fg, margin: 0 }}>{sec.text}</p></div>;
          if (sec.type === "image") return <div key={si} style={{ marginBottom: GAP.section, paddingBottom: GAP.section, borderBottom: `0.5px solid ${c.border}` }}><div style={{ aspectRatio: sec.ratio, background: sec.color, borderRadius: 2, width: "100%" }} />{sec.caption && <div style={{ fontFamily: U, fontSize: TYPE.small, lineHeight: LH.small, color: c.muted, marginTop: 10, paddingTop: 10, borderTop: `0.5px solid ${c.border}` }}>{sec.caption}</div>}</div>;
          if (sec.type === "essay") return (
            <div key={si} style={{ marginBottom: GAP.section, paddingBottom: GAP.section, borderBottom: `0.5px solid ${c.border}` }}>
              <div style={{ marginBottom: GAP.paragraph }}>
                <span style={{ fontFamily: U, fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: c.muted, display: "block", marginBottom: 10 }}>On my mind</span>
                <h2 style={{ fontFamily: U, fontSize: "clamp(19px, 2.2vw, 23px)", fontWeight: 600, margin: 0, lineHeight: 1.25 }}>{sec.title}</h2>
              </div>
              {sec.paragraphs.map((p, pi) => <p key={pi} style={{ fontFamily: S, fontSize: TYPE.body, lineHeight: LH.body, margin: `0 0 ${GAP.paragraph}px`, color: c.body }}>{p}</p>)}
            </div>
          );
          if (sec.type === "found") return (
            <div key={si} style={{ marginBottom: GAP.section, paddingBottom: GAP.section, borderBottom: `0.5px solid ${c.border}` }}>
              <span style={{ fontFamily: U, fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: c.muted, display: "block", marginBottom: GAP.paragraph }}>Found this month</span>
              {sec.items.map((item, ii) => (
                <div key={ii} style={{ marginBottom: 18, paddingLeft: 14, borderLeft: `2px solid ${c.border}` }}>
                  <div style={{ fontFamily: U, fontSize: TYPE.small, fontWeight: 500, marginBottom: 3, color: c.fg }}>{item.title}</div>
                  <div style={{ fontFamily: S, fontSize: TYPE.small, lineHeight: 1.55, color: c.body }}>{item.desc}</div>
                  {item.url && <div style={{ fontFamily: M, fontSize: 12, color: c.link, marginTop: 4 }}>{item.url}</div>}
                </div>
              ))}
            </div>
          );
          if (sec.type === "onsite") return (
            <div key={si} style={{ marginBottom: GAP.section, paddingBottom: GAP.section, borderBottom: `0.5px solid ${c.border}` }}>
              <span style={{ fontFamily: U, fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: c.muted, display: "block", marginBottom: 8 }}>On the site</span>
              <p style={{ fontFamily: S, fontSize: 16, lineHeight: 1.6, color: c.body, margin: 0 }}>{sec.text}</p>
            </div>
          );
          return null;
        })}
        <div style={{ background: c.subtle, borderRadius: 6, padding: "24px 24px 20px", marginBottom: GAP.section }}>
          <div style={{ fontFamily: S, fontSize: 16, lineHeight: 1.55, color: c.fg, marginBottom: 14 }}>Enjoyed this? The newsletter lands roughly monthly.</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="email" placeholder="you@example.com" style={{ flex: 1, fontFamily: U, fontSize: TYPE.small, padding: "9px 12px", background: c.bg, border: `0.5px solid ${c.border}`, borderRadius: 4, color: c.fg, outline: "none" }} />
            <button style={{ fontFamily: U, fontSize: 12, fontWeight: 500, padding: "9px 16px", background: c.fg, color: c.bg, border: "none", borderRadius: 4, cursor: "pointer" }}>Subscribe</button>
          </div>
        </div>
      </div>
      <Footer dark={dark} />
    </div>
  );
}

function About({ dark }) {
  const c = theme(dark);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ background: c.bg, color: c.fg, minHeight: "100vh", paddingTop: 52, transition: "background 0.3s" }}>
      <div style={{ maxWidth: 620, margin: "0 auto", padding: `clamp(60px, 10vw, 112px) ${PAD}` }}>
        <h1 style={{ fontFamily: S, fontSize: "clamp(30px, 4.5vw, 42px)", fontWeight: 700, lineHeight: 1.15, margin: `0 0 ${GAP.section - 12}px` }}>Owen McFadzen</h1>
        <p style={{ fontFamily: S, fontSize: TYPE.lede, lineHeight: LH.lede, margin: `0 0 ${GAP.element}px`, color: c.fg }}>I design systems that help people think and work better. I live in Copenhagen with my family. My background is in architecture — interaction design and digital media — which taught me to see problems as spatial rather than sequential.</p>
        <div style={{ margin: `${GAP.section}px 0`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <div style={{ aspectRatio: "4/3", background: dark ? "#2a2a28" : "#e8e4df", borderRadius: 2 }} />
          <div style={{ aspectRatio: "4/3", background: dark ? "#2a2a28" : "#e8e4df", borderRadius: 2 }} />
        </div>
        <h2 style={{ fontFamily: U, fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: c.muted, margin: `0 0 ${GAP.paragraph - 6}px` }}>Currently</h2>
        <p style={{ fontFamily: S, fontSize: TYPE.body, lineHeight: LH.body, margin: `0 0 ${GAP.paragraph}px`, color: c.body }}>Director of Programs & Learning at Hudson Lab Ventures, building entrepreneurship education for teenagers across three continents. Sole operator of HLV's automation infrastructure — Make.com, Notion, Tally, Loops, Stripe.</p>
        <h2 style={{ fontFamily: U, fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: c.muted, margin: `${GAP.section}px 0 ${GAP.paragraph - 6}px` }}>Previously</h2>
        <p style={{ fontFamily: S, fontSize: TYPE.body, lineHeight: LH.body, margin: `0 0 ${GAP.paragraph}px`, color: c.body }}>Entrepreneur in Residence and Partner at Prehype, the venture development firm behind Bark and Barkbox. Architecture education at two universities — the foundation for everything since.</p>
        <h2 style={{ fontFamily: U, fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: c.muted, margin: `${GAP.section}px 0 ${GAP.paragraph - 6}px` }}>Interests</h2>
        <p style={{ fontFamily: S, fontSize: TYPE.body, lineHeight: LH.body, margin: `0 0 ${GAP.paragraph}px`, color: c.body }}>Fifteen trips to Japan. Scandinavian restraint and Japanese craft shape how I think about quality, intention, and attention. I write about systems thinking, material culture, movement practice, and using AI as a creative instrument.</p>
        <div style={{ margin: `${GAP.section}px 0 0` }}><div style={{ aspectRatio: "16/9", background: dark ? "#2a2a28" : "#e8e4df", borderRadius: 2 }} /></div>
        <figcaption style={{ fontFamily: U, fontSize: TYPE.small, lineHeight: LH.small, color: c.muted, marginTop: 10, paddingTop: 10, borderTop: `0.5px solid ${c.border}`, marginBottom: GAP.section }}>Tokyo, somewhere between the fifth and fifteenth trip.</figcaption>
        <h2 style={{ fontFamily: U, fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: c.muted, margin: `0 0 ${GAP.paragraph - 6}px` }}>This site</h2>
        <p style={{ fontFamily: S, fontSize: TYPE.body, lineHeight: LH.body, margin: `0 0 ${GAP.paragraph}px`, color: c.body }}>Built with Astro, typeset in Charter and Inter, styled by hand. The interactive components are built with Claude. Column width is calculated from font metrics to hold 12–16 words per line. If something on this site can only exist on the web, that's by design.</p>
        <div style={{ marginTop: GAP.section, paddingTop: GAP.paragraph, borderTop: `0.5px solid ${c.border}` }}>
          <div style={{ fontFamily: M, fontSize: 13, color: c.link }}>owen@owenmcfadzen.com</div>
          <div style={{ fontFamily: U, fontSize: 13, color: c.link, marginTop: 8 }}>LinkedIn</div>
        </div>
      </div>
      <Footer dark={dark} />
    </div>
  );
}

function Newsletter({ dark, onSelect }) {
  const c = theme(dark);
  const [email, setEmail] = useState("");
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ background: c.bg, color: c.fg, minHeight: "100vh", paddingTop: 52, transition: "background 0.3s" }}>
      <div style={{ maxWidth: 620, margin: "0 auto", padding: `clamp(60px, 10vw, 112px) ${PAD}` }}>
        <h1 style={{ fontFamily: U, fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 600, lineHeight: 1.18, margin: `0 0 ${GAP.paragraph - 4}px` }}>Newsletter</h1>
        <p style={{ fontFamily: S, fontSize: TYPE.body, lineHeight: LH.body, color: c.body, margin: `0 0 ${GAP.element}px` }}>Shorter thinking, half-formed ideas, things I've found. Three parts: something on my mind, something I found, what's new on the site.</p>
        <div style={{ background: c.subtle, borderRadius: 6, padding: "22px 22px 18px", marginBottom: GAP.section + 16 }}>
          <div style={{ fontFamily: U, fontSize: 13, fontWeight: 500, color: c.fg, marginBottom: 10 }}>Subscribe</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} style={{ flex: 1, fontFamily: U, fontSize: TYPE.small, padding: "9px 12px", background: c.bg, border: `0.5px solid ${c.border}`, borderRadius: 4, color: c.fg, outline: "none" }} />
            <button style={{ fontFamily: U, fontSize: 12, fontWeight: 500, padding: "9px 16px", background: c.fg, color: c.bg, border: "none", borderRadius: 4, cursor: "pointer" }}>Subscribe</button>
          </div>
          <div style={{ fontFamily: U, fontSize: 12, color: c.faint, marginTop: 8 }}>Roughly monthly. No tracking. Also on RSS.</div>
        </div>
        <div style={{ fontFamily: U, fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: c.muted, marginBottom: 8 }}>Archive — {issues.length} issues</div>
        {issues.map((issue, i) => (
          <div key={i} data-issue={issue.num} onClick={() => onSelect(issue)} style={{ padding: `${GAP.paragraph + 4}px 0`, borderTop: `0.5px solid ${c.border}`, cursor: "pointer" }}>
            <div style={{ display: "grid", gridTemplateColumns: issue.image ? "1fr 110px" : "1fr", gap: "0 20px", alignItems: "start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                  <span style={{ fontFamily: M, fontSize: 12, color: c.faint }}>{issue.num}</span>
                  <span style={{ fontFamily: U, fontSize: 12, color: c.muted }}>{issue.date}</span>
                </div>
                <div style={{ fontFamily: U, fontSize: 17, fontWeight: 600, marginBottom: 5, lineHeight: 1.28 }}>{issue.title}</div>
                <div style={{ fontFamily: U, fontSize: TYPE.small, lineHeight: LH.small, color: c.muted }}>{issue.preview}</div>
              </div>
              {issue.image && <div style={{ aspectRatio: "16/10", background: issue.image.color, borderRadius: 2, width: "100%", marginTop: 2 }} />}
            </div>
          </div>
        ))}
        <div style={{ borderTop: `0.5px solid ${c.border}`, paddingTop: GAP.paragraph }} />
      </div>
      <Footer dark={dark} />
    </div>
  );
}

/* --- APP --- */
export default function App() {
  const [page, setPage] = useState("home");
  const [art, setArt] = useState(null);
  const [iss, setIss] = useState(null);
  const [dark, setDark] = useState(false);
  const c = theme(dark);
  const nav = p => { setArt(null); setIss(null); setPage(p); };
  const shell = (pg, ch) => (<><style>{FONTS_CSS}</style><Header page={pg} nav={nav} dark={dark} setDark={setDark} />{ch}</>);
  if (iss) return shell("newsletter", <IssuePage issue={iss} onBack={() => setIss(null)} dark={dark} />);
  if (art) return shell("home", <Article article={art} onBack={() => setArt(null)} dark={dark} />);
  if (page === "about") return shell("about", <About dark={dark} />);
  if (page === "newsletter") return shell("newsletter", <Newsletter dark={dark} onSelect={setIss} />);
  return shell("home", (
    <div style={{ paddingTop: 52, background: c.bg, transition: "background 0.3s" }}>
      {articles.map(a => <Hero key={a.id} article={a} onSelect={setArt} />)}
      <Footer dark={dark} />
    </div>
  ));
}
