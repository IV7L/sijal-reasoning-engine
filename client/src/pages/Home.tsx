import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Menu,
  MoveDownRight,
  MoveUpRight,
  X,
} from "lucide-react";

const stationNav = [
  ["01", "Engine", "#engine"],
  ["02", "Context", "#context"],
  ["03", "Reasoning", "#reasoning"],
  ["04", "Orchestration", "#orchestration"],
  ["05", "Memory & record", "#memory"],
  ["06", "Traceability", "#traceability"],
];

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

function EngineVisual() {
  return (
    <svg className="station-svg engine-svg" viewBox="0 0 720 520" role="img" aria-label="The Sijal engine assembling from nodes and connections">
      <defs>
        <linearGradient id="engineLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c86543" />
          <stop offset="1" stopColor="#719184" />
        </linearGradient>
        <filter id="engineGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g className="svg-ghost-grid">
        <path d="M360 40V480M80 260H640" />
        <circle cx="360" cy="260" r="184" />
        <circle cx="360" cy="260" r="120" />
      </g>
      <g className="engine-assembly">
        <path className="assembly-line" d="M360 260L148 116M360 260L574 116M360 260L600 348M360 260L124 388M360 260L360 76M360 260L360 454" />
        <path className="assembly-line assembly-line-delay" d="M148 116L574 116M124 388L600 348M148 116L124 388M574 116L600 348" />
        <circle className="engine-core-halo" cx="360" cy="260" r="58" />
        <circle className="engine-core" cx="360" cy="260" r="28" />
        <circle className="engine-core-pulse" cx="360" cy="260" r="44" />
        {[
          [148, 116, "01"], [574, 116, "02"], [600, 348, "03"], [124, 388, "04"], [360, 76, "05"], [360, 454, "06"],
        ].map(([cx, cy, label]) => (
          <g className="engine-node" key={label}>
            <circle cx={cx as number} cy={cy as number} r="19" />
            <circle className="node-dot" cx={cx as number} cy={cy as number} r="4" />
            <text x={(cx as number) + 29} y={(cy as number) + 5}>{label}</text>
          </g>
        ))}
      </g>
      <text className="svg-label" x="360" y="264" textAnchor="middle">SIJAL</text>
      <text className="svg-micro" x="56" y="474">SYSTEM CORE / 00</text>
      <text className="svg-micro" x="540" y="474">ASSEMBLY STATE: COHERENT</text>
    </svg>
  );
}

function ContextVisual() {
  const inputs = [
    ["GOAL", "What must be decided?", "28"],
    ["ROLE", "Who is reasoning?", "112"],
    ["STAGE", "Where are we?", "196"],
    ["EVIDENCE", "What is known?", "280"],
    ["LIMITS", "What constrains it?", "364"],
  ];
  return (
    <svg className="station-svg context-svg" viewBox="0 0 720 500" role="img" aria-label="Context inputs converging into one structured reasoning context">
      <defs>
        <marker id="contextArrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#c86543" strokeWidth="1.4" /></marker>
      </defs>
      <g className="svg-ghost-grid"><path d="M80 28V470M160 28V470M240 28V470M320 28V470M400 28V470M480 28V470M560 28V470M640 28V470" /></g>
      <g className="context-inputs">
        {inputs.map(([label, detail, y]) => (
          <g className="context-input" key={label} transform={`translate(44 ${y})`}>
            <rect width="230" height="54" rx="2" />
            <text className="input-kicker" x="16" y="20">{label}</text>
            <text className="input-detail" x="16" y="39">{detail}</text>
            <path d="M230 27H442" markerEnd="url(#contextArrow)" />
          </g>
        ))}
      </g>
      <g className="context-frame" transform="translate(500 126)">
        <rect width="170" height="248" rx="2" />
        <path d="M18 54H152M18 109H152M18 164H152" />
        <circle cx="28" cy="28" r="4" /><circle cx="28" cy="83" r="4" /><circle cx="28" cy="138" r="4" /><circle cx="28" cy="193" r="4" />
        <text x="18" y="226" className="context-state">CURRENT</text>
        <text x="18" y="242" className="context-state strong">CONTEXT / 02</text>
      </g>
      <text className="svg-micro" x="44" y="474">INPUTS / ORDERED</text>
      <text className="svg-micro" x="500" y="398">READY FOR STEP 01</text>
    </svg>
  );
}

function ReasoningVisual() {
  return (
    <svg className="station-svg reasoning-svg" viewBox="0 0 800 570" role="img" aria-label="Context entering a model, becoming reasoning, and adding an updated state layer">
      <defs>
        <linearGradient id="reasoningFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6eee7" />
          <stop offset="1" stopColor="#d8e3dc" />
        </linearGradient>
        <marker id="reasoningArrow" markerWidth="9" markerHeight="9" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8" fill="none" stroke="#c86543" strokeWidth="1.5" /></marker>
      </defs>
      <g className="reasoning-backdrop"><path d="M60 76H740M60 156H740M60 236H740M60 316H740M60 396H740M60 476H740" /></g>
      <g className="reasoning-flow">
        <path className="flow-line" d="M84 102H180" markerEnd="url(#reasoningArrow)" />
        <rect className="reasoning-box context-box" x="66" y="132" width="126" height="254" rx="2" />
        <text className="reasoning-kicker" x="84" y="164">CONTEXT</text>
        <text className="reasoning-title" x="84" y="192">known</text>
        <path d="M84 222H174M84 242H164M84 262H178M84 302H174M84 322H152" />
        <path className="flow-line" d="M192 258H274" markerEnd="url(#reasoningArrow)" />
        <rect className="reasoning-box model-box" x="286" y="108" width="228" height="304" rx="2" />
        <circle className="model-orbit" cx="400" cy="245" r="67" />
        <circle className="model-orbit orbit-two" cx="400" cy="245" r="42" />
        <circle className="model-core" cx="400" cy="245" r="17" />
        <text className="reasoning-kicker" x="306" y="142">MODEL</text>
        <text className="reasoning-title" x="306" y="376">language intelligence</text>
        <path className="flow-line" d="M514 258H596" markerEnd="url(#reasoningArrow)" />
        <rect className="reasoning-box state-box" x="608" y="82" width="126" height="354" rx="2" />
        <text className="reasoning-kicker" x="626" y="114">STATE</text>
        <g className="state-stacks">
          <rect x="626" y="144" width="90" height="46" /><rect x="626" y="200" width="90" height="46" /><rect x="626" y="256" width="90" height="46" /><rect x="626" y="312" width="90" height="46" />
          <path d="M642 168H700M642 224H696M642 280H704M642 336H682" />
        </g>
        <text className="reasoning-title" x="626" y="396">updated</text>
      </g>
      <path className="reasoning-underline" d="M66 492H734" />
      <text className="svg-micro" x="66" y="522">SAME ENGINE / NEW STATE LAYER ADDED</text>
      <text className="svg-micro" x="596" y="522">03 / REASONING</text>
    </svg>
  );
}

function OrchestrationVisual() {
  return (
    <svg className="station-svg orchestration-svg" viewBox="0 0 820 520" role="img" aria-label="Sequential stages with a branch that examines previous reasoning before evaluation">
      <defs>
        <marker id="orchestrationArrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#c86543" strokeWidth="1.4" /></marker>
      </defs>
      <g className="svg-ghost-grid"><path d="M58 74H764M58 156H764M58 238H764M58 320H764M58 402H764" /></g>
      <g className="orchestration-flow">
        <path className="stage-line" d="M74 282H164H274H384H494" markerEnd="url(#orchestrationArrow)" />
        <path className="stage-line examination-line" d="M384 282V146H184V282" markerEnd="url(#orchestrationArrow)" />
        <path className="stage-line" d="M494 282H604H722" markerEnd="url(#orchestrationArrow)" />
        {[
          [74, "01", "STAGE"], [184, "02", "STAGE"], [294, "03", "STAGE"], [494, "EX", "EXAMINE"], [604, "R", "RESPONSE"], [722, "EV", "EVAL"],
        ].map(([x, label, name]) => (
          <g className={`stage-marker ${label === "EX" ? "is-examination" : ""}`} key={label} transform={`translate(${x} 282)`}>
            <circle r="27" /><circle className="stage-dot" r="5" />
            <text className="stage-label" y="-42" textAnchor="middle">{label}</text>
            <text className="stage-name" y="54" textAnchor="middle">{name}</text>
          </g>
        ))}
        <g className="branch-note" transform="translate(184 102)"><path d="M0 0H198" /><text x="0" y="-12">PREVIOUS REASONING</text></g>
      </g>
      <text className="svg-micro" x="62" y="454">SEQUENTIAL / EXAMINABLE / EVALUATED</text>
      <text className="svg-micro" x="596" y="454">04 / ORCHESTRATION</text>
    </svg>
  );
}

function RecordVisual() {
  return (
    <svg className="station-svg record-svg" viewBox="0 0 700 450" role="img" aria-label="State layers accumulating into a preserved record">
      <g className="svg-ghost-grid"><path d="M40 90H660M40 170H660M40 250H660M40 330H660" /></g>
      <g className="record-stack">
        <g className="record-layer layer-one"><rect x="82" y="286" width="450" height="70" rx="2" /><text x="106" y="326">STATE 01</text><path d="M208 314H498M208 333H454" /></g>
        <g className="record-layer layer-two"><rect x="128" y="220" width="450" height="70" rx="2" /><text x="152" y="260">STATE 02</text><path d="M254 248H544M254 267H500" /></g>
        <g className="record-layer layer-three"><rect x="174" y="154" width="450" height="70" rx="2" /><text x="198" y="194">STATE 03</text><path d="M300 182H590M300 201H546" /></g>
        <g className="record-layer layer-record"><rect x="220" y="88" width="450" height="70" rx="2" /><text x="244" y="128">PRESERVED RECORD</text><circle cx="636" cy="123" r="7" /><path d="M372 116H594M372 135H552" /></g>
      </g>
      <path className="record-bracket" d="M92 386V402H630V386" />
      <text className="record-note" x="350" y="425" textAnchor="middle">STATE BECOMES HISTORY WITHOUT DISAPPEARING</text>
    </svg>
  );
}

function TraceVisual() {
  return (
    <svg className="station-svg trace-svg" viewBox="0 0 800 560" role="img" aria-label="Evidence, context, reasoning, evaluation, state and record reconnect into a complete trace">
      <defs>
        <radialGradient id="traceCore" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#d88a68" /><stop offset="1" stopColor="#b34f33" /></radialGradient>
      </defs>
      <g className="trace-orbit trace-orbit-one"><circle cx="400" cy="274" r="194" /></g>
      <g className="trace-orbit trace-orbit-two"><circle cx="400" cy="274" r="136" /></g>
      <g className="trace-links">
        <path d="M400 80V468M206 274H594M263 137L537 411M537 137L263 411" />
        <path className="trace-connection" d="M400 80L537 137L594 274L537 411L400 468L263 411L206 274L263 137Z" />
      </g>
      <g className="trace-points">
        {[
          [400, 80, "EVIDENCE", "01"], [537, 137, "CONTEXT", "02"], [594, 274, "REASONING", "03"], [537, 411, "EVALUATION", "04"], [400, 468, "STATE", "05"], [263, 411, "RECORD", "06"], [206, 274, "TRACE", "∞"], [263, 137, "ROLE", "R"],
        ].map(([cx, cy, label, n]) => (
          <g className="trace-point" key={label} transform={`translate(${cx} ${cy})`}>
            <circle className="trace-point-ring" r="23" /><circle className="trace-point-core" r="7" fill={label === "TRACE" ? "url(#traceCore)" : "#f4f0e8"} />
            <text className="trace-point-number" y="-34" textAnchor="middle">{n}</text>
            <text className="trace-point-label" y="43" textAnchor="middle">{label}</text>
          </g>
        ))}
      </g>
      <circle className="trace-center" cx="400" cy="274" r="32" />
      <text className="trace-center-text" x="400" y="279" textAnchor="middle">SIJAL</text>
      <text className="svg-micro" x="54" y="530">COMPLETE TRACE / ALL RELATIONSHIPS PRESERVED</text>
      <text className="svg-micro" x="610" y="530">06 / RESOLVED</text>
    </svg>
  );
}

const stations = [
  {
    id: "engine",
    number: "01",
    eyebrow: "The Sijal Engine",
    title: "A reasoning system with a memory of how it got there.",
    body: "Sijal organizes complex reasoning into a controlled, sequential, and traceable process. It gives modern AI models a defined structure for language understanding, analysis, generation, and synthesis.",
    note: "The model is a capability inside the engine — not the engine itself.",
    tags: ["roles", "stages", "evidence", "state"],
    visual: <EngineVisual />,
  },
  {
    id: "context",
    number: "02",
    eyebrow: "Context",
    title: "Before a step begins, the system assembles what matters.",
    body: "Goal, role, stage, previous state, evidence, constraints, and evaluation are prepared together. The result is a current reasoning context: ordered, explicit, and ready to move forward.",
    note: "Inputs are not a pile. They become a shared operating condition.",
    tags: ["goal", "role", "stage", "constraints"],
    visual: <ContextVisual />,
  },
  {
    id: "reasoning",
    number: "03",
    eyebrow: "Reasoning",
    title: "Intelligence enters the structure. The state gets richer.",
    body: "Sijal uses a model’s language intelligence within the process defined by the engine. Context enters, reasoning forms, and the updated state is added without erasing what came before.",
    note: "Every new layer extends the record of thought.",
    tags: ["context", "model", "reasoning", "updated state"],
    visual: <ReasoningVisual />,
  },
  {
    id: "orchestration",
    number: "04",
    eyebrow: "Orchestration",
    title: "A sequence that can examine its own reasoning.",
    body: "Stages advance with their own constraints and evaluation. At examination, the process can return to previous reasoning, challenge it, refine it, and then continue with a response that is accountable to the path behind it.",
    note: "Reasoning examines reasoning — no theatre required.",
    tags: ["stage 01", "examination", "response", "evaluation"],
    visual: <OrchestrationVisual />,
  },
  {
    id: "memory",
    number: "05",
    eyebrow: "Memory & Record",
    title: "The current state settles into a durable record.",
    body: "State is what the process currently carries. Record is what the completed process preserves. Layers accumulate, remain visible, and become stable enough to inspect after the moment has passed.",
    note: "Nothing important is hidden behind a reset.",
    tags: ["state 01", "state 02", "state 03", "preserved record"],
    visual: <RecordVisual />,
  },
  {
    id: "traceability",
    number: "06",
    eyebrow: "Traceability",
    title: "A complete reasoning architecture, still connected.",
    body: "Evidence, context, reasoning, evaluation, state, and record resolve into one trace. The process stays understandable because each step is preserved, related, and available for examination.",
    note: "The path does not end at an answer. It ends at understanding.",
    tags: ["evidence", "context", "evaluation", "record"],
    visual: <TraceVisual />,
  },
];

function Station({ station, index }: { station: (typeof stations)[number]; index: number }) {
  const { ref, revealed } = useReveal();
  return (
    <section ref={ref} id={station.id} className={`station station-${index + 1} ${revealed ? "is-visible" : ""}`}>
      <div className="station-marker-rail" aria-hidden="true">
        <span>{station.number}</span>
      </div>
      <div className="station-copy">
        <p className="station-eyebrow"><span>{station.number}</span>{station.eyebrow}</p>
        <h2>{station.title}</h2>
        <p className="station-body">{station.body}</p>
        <div className="station-note"><span className="note-rule" />{station.note}</div>
        <div className="station-tags" aria-label="Station concepts">
          {station.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
      <div className="station-visual">{station.visual}</div>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Sijal — The Reasoning Engine";
  }, []);

  return (
    <div className="sijal-page">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Sijal home"><span className="wordmark-mark">S</span><span>SIJAL</span><small>/ REASONING ENGINE</small></a>
        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Station navigation">
          <a href="#engine" onClick={() => setMenuOpen(false)}>Explore the engine <ArrowDownRight size={15} /></a>
          <a href="#traceability" onClick={() => setMenuOpen(false)}>Final trace <ArrowRight size={15} /></a>
        </nav>
        <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" />A structured reasoning engine</p>
            <h1>The architecture<br /><em>behind</em> a decision.</h1>
            <p className="hero-intro">Sijal turns complex reasoning into a controlled, sequential, and traceable process — carrying context, evidence, constraints, state, and examination all the way through.</p>
            <a className="hero-link" href="#engine"><span>Enter the system</span><MoveDownRight size={18} /></a>
          </div>
          <div className="hero-aside">
            <div className="hero-index"><span>00</span><span>06</span></div>
            <p>One continuous path.<br />Six engineered stations.</p>
            <div className="hero-scroll"><span>scroll to traverse</span><span className="scroll-line" /></div>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <span className="orbit-ring ring-a" /><span className="orbit-ring ring-b" /><span className="orbit-point point-a" /><span className="orbit-point point-b" /><span className="orbit-center">S</span>
          </div>
        </section>

        <div className="station-index-bar" aria-label="Six stations">
          <span className="index-bar-label">System traversal</span>
          <div className="index-bar-items">
            {stationNav.map(([number, title, href]) => <a key={href} href={href}><span>{number}</span>{title}</a>)}
          </div>
        </div>

        <div id="stations" className="stations-canvas">
          <svg className="global-path desktop-path" viewBox="0 0 1200 5160" preserveAspectRatio="none" aria-hidden="true">
            <path className="path-underlay" d="M600 0V420H846V850H700V1540H130V2142H846V3110H415V3806H925V4707H355V5160" />
            <path className="path-base" d="M600 0V420H846V850H700V1540H130V2142H846V3110H415V3806H925V4707H355V5160" />
            <path className="path-flow" d="M600 0V420H846V850H700V1540H130V2142H846V3110H415V3806H925V4707H355V5160" />
            <g className="path-nodes">
              <g transform="translate(846 420)"><circle r="10" /><text x="24" y="5">01</text></g>
              <g transform="translate(700 850)"><circle r="10" /><text x="24" y="5">02</text></g>
              <g transform="translate(846 2142)"><circle r="10" /><text x="24" y="5">03</text></g>
              <g transform="translate(415 3110)"><circle r="10" /><text x="24" y="5">04</text></g>
              <g transform="translate(925 3806)"><circle r="10" /><text x="24" y="5">05</text></g>
              <g transform="translate(355 4707)"><circle r="10" /><text x="24" y="5">06</text></g>
            </g>
          </svg>
          <svg className="mobile-path" viewBox="0 0 42 5160" preserveAspectRatio="none" aria-hidden="true"><path d="M21 0V540H36V1280H21V2050H36V2820H21V3590H36V4380H21V5160" /><path className="mobile-flow" d="M21 0V540H36V1280H21V2050H36V2820H21V3590H36V4380H21V5160" /></svg>
          <div className="stations-inner">
            {stations.map((station, index) => <Station key={station.id} station={station} index={index} />)}
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div><span className="wordmark-mark">S</span><strong>SIJAL</strong></div>
        <p>A structured reasoning engine for evidence-based decision making.</p>
        <span className="footer-code">/ SIJAL2 / EXPERIMENTAL ARCHITECTURE</span>
      </footer>
    </div>
  );
}

export { Home };
