import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  MessageCircle,
  Smartphone,
  Bot,
  Headphones,
  MapPin,
  PieChart,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { SectionHeader } from "./Problems";

/* ── Mind-map radial layout constants ── */
const MM_ORBIT = 36;
const MM_HUB_R = 11;
const MM_NODE_R = 8;
const MM_SIZE = "min(520px, calc(100vw - 2rem))";

/* ── Full service data ── */
const services = [
  {
    Icon: MessageCircle,
    label: "WhatsApp\nOutreach",
    color: "#22c55e",
    angle: -90,
    title: "WhatsApp Outreach",
    desc: "Personalised messages, payment links and two-way conversations at scale.",
    bullets: ["Smart send-time optimisation", "Auto payment link generation"],
    metric: "22% higher promise-to-pay",
    grad: "from-green-500 to-emerald-400",
    metricColor: "text-emerald-600",
    chipBg: "bg-emerald-50 border-emerald-200",
  },
  {
    Icon: Smartphone,
    label: "SMS\nCampaigns",
    color: "#3b82f6",
    angle: -30,
    title: "SMS Campaigns",
    desc: "High-deliverability SMS nudges timed to borrower behaviour patterns.",
    bullets: ["Personalised per borrower", "DLT-registered templates"],
    metric: "98% delivery rate",
    grad: "from-blue-500 to-blue-400",
    metricColor: "text-blue-600",
    chipBg: "bg-blue-50 border-blue-200",
  },
  {
    Icon: Bot,
    label: "AI Voice\nBot",
    color: "#06b6d4",
    angle: 30,
    title: "AI Voice Bot",
    desc: "Natural-language voice calls that negotiate, answer questions and schedule callbacks — 24/7.",
    bullets: ["Handles objections intelligently", "Seamless human hand-off"],
    metric: "3× calls vs human team",
    grad: "from-cyan-500 to-sky-400",
    metricColor: "text-cyan-600",
    chipBg: "bg-cyan-50 border-cyan-200",
  },
  {
    Icon: Headphones,
    label: "Human\nTele-calling",
    color: "#6366f1",
    angle: 90,
    title: "Human Tele-Calling",
    desc: "Trained agents guided by real-time AI CRM prompts for maximum closure probability.",
    bullets: ["Live compliance monitoring", "AI-suggested settlement offers"],
    metric: "3× agent effectiveness",
    grad: "from-indigo-500 to-violet-500",
    metricColor: "text-indigo-600",
    chipBg: "bg-indigo-50 border-indigo-200",
  },
  {
    Icon: MapPin,
    label: "Field\nCollection",
    color: "#10b981",
    angle: 150,
    title: "Field Collection",
    desc: "Geo-tracked field agents covering 120+ cities for on-ground resolution.",
    bullets: ["GPS-stamped every visit", "Recorded interactions"],
    metric: "120+ cities PAN-India",
    grad: "from-emerald-500 to-teal-400",
    metricColor: "text-emerald-600",
    chipBg: "bg-emerald-50 border-emerald-200",
  },
  {
    Icon: PieChart,
    label: "Portfolio\nAnalytics",
    color: "#f59e0b",
    angle: 210,
    title: "Portfolio Analytics & MIS",
    desc: "Real-time dashboards, cohort segmentation and board-ready reports that put you in full control.",
    bullets: ["Live recovery rate by cohort", "Automated monthly board packs"],
    metric: "Real-time MIS",
    grad: "from-amber-500 to-yellow-400",
    metricColor: "text-amber-600",
    chipBg: "bg-amber-50 border-amber-200",
  },
];

/* ── Mindmap ── */
function ServicesMindmap({
  active,
  onSelect,
}: {
  active: number | null;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className="relative mx-auto"
        style={{ width: MM_SIZE, height: MM_SIZE }}
      >
        {/* SVG: orbit ring + connector lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {services.map(({ color }, i) => (
              <marker
                key={i}
                id={`mm-arrow-${i}`}
                markerWidth="3.5"
                markerHeight="3.5"
                refX="1.8"
                refY="1.75"
                orient="auto"
              >
                <path d="M 0 0 L 3.5 1.75 L 0 3.5 Z" fill={color} opacity="0.8" />
              </marker>
            ))}
          </defs>

          {/* Orbit ring */}
          <circle
            cx="50" cy="50" r={MM_ORBIT}
            fill="none"
            stroke="oklch(0.55 0.18 250 / 0.1)"
            strokeWidth="0.3"
            strokeDasharray="1.5 2"
          />

          {/* Connector lines */}
          {services.map(({ color, angle }, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = (50 + Math.cos(rad) * (MM_HUB_R + 1)).toFixed(2);
            const y1 = (50 + Math.sin(rad) * (MM_HUB_R + 1)).toFixed(2);
            const x2 = (50 + Math.cos(rad) * (MM_ORBIT - MM_NODE_R - 1)).toFixed(2);
            const y2 = (50 + Math.sin(rad) * (MM_ORBIT - MM_NODE_R - 1)).toFixed(2);
            return (
              <motion.path
                key={i}
                d={`M ${x1},${y1} L ${x2},${y2}`}
                stroke={color}
                strokeWidth={active === i ? "0.9" : "0.55"}
                strokeOpacity={active === null ? 0.55 : active === i ? 0.9 : 0.2}
                strokeDasharray="1.5 1.2"
                fill="none"
                markerEnd={`url(#mm-arrow-${i})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.6 + i * 0.1 }}
                style={{ transition: "stroke-opacity 0.25s, stroke-width 0.25s" }}
              />
            );
          })}
        </svg>

        {/* Central hub */}
        <div
          className="absolute"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}
        >
          <motion.div
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 180 }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg shadow-blue-500/35">
              <BrainCircuit className="h-7 w-7 text-white" />
            </div>
            <span className="text-[8px] font-bold text-foreground/50 tracking-widest uppercase">
              AI CRM
            </span>
          </motion.div>
        </div>

        {/* Service nodes */}
        {services.map(({ Icon, label, color, angle }, i) => {
          const rad = (angle * Math.PI) / 180;
          const leftPct = 50 + Math.cos(rad) * MM_ORBIT;
          const topPct = 50 + Math.sin(rad) * MM_ORBIT;
          const isActive = active === i;
          const isDimmed = active !== null && !isActive;

          return (
            <div
              key={label}
              className="absolute cursor-pointer select-none"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}
              onClick={() => onSelect(i)}
            >
              <motion.div
                className="flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isDimmed ? 0.3 : 1,
                  scale: isActive ? 1.15 : 1,
                }}
                transition={{ duration: 0.25 }}
              >
                {/* Icon box — relative so pulse ring is anchored to it */}
                <motion.div
                  animate={
                    isActive
                      ? { y: 0 }
                      : active === null
                        ? { y: [0, -5, 0], scale: [1, 1.05, 1] }
                        : { y: [0, -5, 0] }
                  }
                  transition={{
                    duration: 3 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  className="relative flex items-center justify-center rounded-xl"
                  style={{
                    width: 46, height: 46,
                    background: isActive ? `${color}30` : `${color}18`,
                    border: `1.5px solid ${isActive ? color : color + "66"}`,
                    boxShadow: isActive
                      ? `0 0 22px 5px ${color}55, 0 6px 22px -4px ${color}55`
                      : `0 6px 22px -4px ${color}44`,
                  }}
                >
                  {/* Pulse ring — anchored inside icon box, always centered */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{ border: `2px solid ${color}` }}
                      animate={{ scale: [1, 1.7, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <Icon className="h-5 w-5" style={{ color }} />
                </motion.div>

                <span
                  className="text-center font-semibold leading-tight whitespace-pre-line transition-colors"
                  style={{
                    maxWidth: 76,
                    fontSize: 10,
                    color: isActive ? color : undefined,
                  }}
                >
                  {label}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Hint badge — only shown when nothing selected */}
      <AnimatePresence>
        {active === null && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: [0, 0.7, 1, 0.7], y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs text-muted-foreground shadow-sm select-none"
          >
            <span className="text-base leading-none">👆</span>
            Tap any node to explore
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Service detail panel ── */
function ServiceDetail({
  service,
  onBack,
}: {
  service: (typeof services)[number];
  onBack: () => void;
}) {
  return (
    <motion.div
      key={service.title}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col justify-center gap-6 py-4 lg:py-0 lg:pr-8"
    >
      {/* Back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All services
      </button>

      {/* Icon + title */}
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${service.grad} shadow-lg text-white`}
        >
          <service.Icon className="h-7 w-7" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
          {service.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-base text-muted-foreground leading-relaxed max-w-md">
        {service.desc}
      </p>

      {/* Bullets */}
      <ul className="space-y-2.5">
        {service.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
            {b}
          </li>
        ))}
      </ul>

      {/* Metric badge */}
      <span
        className={`inline-block rounded-full border px-4 py-1.5 text-sm font-semibold w-fit ${service.chipBg} ${service.metricColor}`}
      >
        {service.metric}
      </span>

      {/* Hint */}
      <p className="text-xs text-muted-foreground/50 hidden lg:block">
        Click another node to explore more services
      </p>
    </motion.div>
  );
}

/* ── Idle left panel ── */
function IdlePanel() {
  return (
    <motion.div
      key="idle"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col justify-center lg:pr-8"
    >
      <SectionHeader
        eyebrow="What we do"
        title={
          <div className="text-4xl md:text-5xl font-bold leading-tight">
            Full-stack <span className="gradient-text">recovery services</span>
          </div>
        }
        subtitle="From first digital nudge to courtroom — one partner, every channel, complete accountability."
      />
      <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground/60">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border text-[10px]">↑</span>
        Tap any service node to explore
      </p>
    </motion.div>
  );
}

/* ── Main export ── */
export default function Services() {
  const [active, setActive] = useState<number | null>(null);

  function handleSelect(i: number) {
    setActive((prev) => (prev === i ? null : i));
  }

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[5fr_6fr] min-h-[520px]">

          {/* Left panel — animates between idle header and service detail */}
          <AnimatePresence mode="wait">
            {active !== null ? (
              <ServiceDetail
                key={`detail-${active}`}
                service={services[active]}
                onBack={() => setActive(null)}
              />
            ) : (
              <IdlePanel key="idle" />
            )}
          </AnimatePresence>

          {/* Right — mindmap */}
          <ServicesMindmap active={active} onSelect={handleSelect} />
        </div>

        {/* Mobile: show detail card below mindmap */}
        <AnimatePresence>
          {active !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="lg:hidden overflow-hidden mt-2"
            >
              <div className={`rounded-2xl border border-border bg-card p-6 shadow-card`}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${services[active].grad} text-white`}
                  >
                    {(() => { const I = services[active].Icon; return <I className="h-5 w-5" />; })()}
                  </div>
                  <h3 className="text-lg font-bold">{services[active].title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {services[active].desc}
                </p>
                <ul className="space-y-1.5 mb-3">
                  {services[active].bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                      {b}
                    </li>
                  ))}
                </ul>
                <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${services[active].chipBg} ${services[active].metricColor}`}>
                  {services[active].metric}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
