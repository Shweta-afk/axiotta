import { motion } from "framer-motion";
import {
  BrainCircuit,
  MessageCircle,
  Smartphone,
  Bot,
  Headphones,
  MapPin,
  PieChart,
  CheckCircle2,
} from "lucide-react";
import { SectionHeader } from "./Problems";

/* ── Mind-map radial layout constants ── */
const MM_ORBIT = 36; // % radius from center (in 0-100 viewbox units)
const MM_HUB_R = 11; // hub radius in viewbox units
const MM_NODE_R = 8;  // node radius in viewbox units

const mindmapNodes = [
  { Icon: MessageCircle, label: "WhatsApp\nOutreach",  color: "#22c55e", angle: -90 },
  { Icon: Smartphone,    label: "SMS\nCampaigns",      color: "#3b82f6", angle: -30 },
  { Icon: Bot,           label: "AI Voice\nBot",       color: "#06b6d4", angle:  30 },
  { Icon: Headphones,    label: "Human\nTele-calling", color: "#6366f1", angle:  90 },
  { Icon: MapPin,        label: "Field\nCollection",   color: "#10b981", angle: 150 },
  { Icon: PieChart,      label: "Portfolio\nAnalytics",color: "#f59e0b", angle: 210 },
];

function ServicesMindmap() {
  return (
    <div className="flex items-center justify-center">
      {/* Plain div owns position/size — no Framer scale on container */}
      <div className="relative" style={{ width: 380, height: 380 }}>
        {/* SVG layer — arrows + orbit ring */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {mindmapNodes.map(({ color }, i) => (
              <marker
                key={i}
                id={`mm-arrow-${i}`}
                markerWidth="3.5" markerHeight="3.5"
                refX="1.8" refY="1.75"
                orient="auto"
              >
                <path d="M 0 0 L 3.5 1.75 L 0 3.5 Z" fill={color} opacity="0.8" />
              </marker>
            ))}
          </defs>

          {/* Orbit guide ring */}
          <circle cx="50" cy="50" r={MM_ORBIT} fill="none"
            stroke="oklch(0.55 0.18 250 / 0.1)" strokeWidth="0.3" strokeDasharray="1.5 2" />

          {/* Connector arrows */}
          {mindmapNodes.map(({ color, angle }, i) => {
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
                strokeWidth="0.55"
                strokeOpacity={0.55}
                strokeDasharray="1.5 1.2"
                fill="none"
                markerEnd={`url(#mm-arrow-${i})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.6 + i * 0.1 }}
              />
            );
          })}
        </svg>

        {/* Central hub — plain div positions, inner motion.div animates */}
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
            <span className="text-[8px] font-bold text-foreground/50 tracking-widest uppercase">AI CRM</span>
          </motion.div>
        </div>

        {/* Service nodes — plain div positions, inner motion.div animates */}
        {mindmapNodes.map(({ Icon, label, color, angle }, i) => {
          const rad = (angle * Math.PI) / 180;
          const leftPct = 50 + Math.cos(rad) * MM_ORBIT;
          const topPct  = 50 + Math.sin(rad) * MM_ORBIT;
          return (
            <div
              key={label}
              className="absolute"
              style={{ left: `${leftPct}%`, top: `${topPct}%`, transform: "translate(-50%, -50%)", zIndex: 10 }}
            >
              <motion.div
                className="flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1, type: "spring", stiffness: 220 }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: 40, height: 40,
                    background: `${color}18`,
                    border: `1.5px solid ${color}55`,
                    boxShadow: `0 6px 22px -4px ${color}55`,
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </motion.div>
                <span
                  className="text-center text-[10px] font-semibold text-muted-foreground leading-tight whitespace-pre-line"
                  style={{ maxWidth: 72 }}
                >
                  {label}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── 6 service cards ── */
const services = [
  {
    Icon: MessageCircle,
    title: "WhatsApp Outreach",
    desc: "Personalised messages, payment links and two-way conversations at scale.",
    bullets: ["Smart send-time optimisation", "Auto payment link generation"],
    metric: "22% higher promise-to-pay",
    grad: "from-green-500 to-emerald-400",
    pop: "pop-emerald",
    metricColor: "text-emerald-600 dark:text-emerald-400",
    chipBg: "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-700/40",
  },
  {
    Icon: Smartphone,
    title: "SMS Campaigns",
    desc: "High-deliverability SMS nudges timed to borrower behaviour patterns.",
    bullets: ["Personalised per borrower", "DLT-registered templates"],
    metric: "98% delivery rate",
    grad: "from-blue-500 to-blue-400",
    pop: "pop-violet",
    metricColor: "text-blue-600 dark:text-blue-400",
    chipBg: "bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700/40",
  },
  {
    Icon: Bot,
    title: "AI Voice Bot",
    desc: "Natural-language voice calls that negotiate, answer questions and schedule callbacks — 24/7.",
    bullets: ["Handles objections intelligently", "Seamless human hand-off"],
    metric: "3× calls vs human team",
    grad: "from-cyan-500 to-sky-400",
    pop: "",
    metricColor: "text-cyan-600 dark:text-cyan-400",
    chipBg: "bg-cyan-50 border-cyan-200 dark:bg-cyan-900/30 dark:border-cyan-700/40",
  },
  {
    Icon: Headphones,
    title: "Human Tele-Calling",
    desc: "Trained agents guided by real-time AI CRM prompts for maximum closure probability.",
    bullets: ["Live compliance monitoring", "AI-suggested settlement offers"],
    metric: "3× agent effectiveness",
    grad: "from-indigo-500 to-violet-500",
    pop: "pop-violet",
    metricColor: "text-indigo-600 dark:text-indigo-400",
    chipBg: "bg-indigo-50 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-700/40",
  },
  {
    Icon: MapPin,
    title: "Field Collection",
    desc: "Geo-tracked field agents covering 120+ cities for on-ground resolution.",
    bullets: ["GPS-stamped every visit", "Recorded interactions"],
    metric: "120+ cities PAN-India",
    grad: "from-emerald-500 to-teal-400",
    pop: "pop-emerald",
    metricColor: "text-emerald-600 dark:text-emerald-400",
    chipBg: "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-700/40",
  },
  {
    Icon: PieChart,
    title: "Portfolio Analytics & MIS",
    desc: "Real-time dashboards, cohort segmentation and board-ready reports that put you in full control.",
    bullets: ["Live recovery rate by cohort", "Automated monthly board packs"],
    metric: "Real-time MIS",
    grad: "from-amber-500 to-yellow-400",
    pop: "pop-orange",
    metricColor: "text-amber-600 dark:text-amber-400",
    chipBg: "bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-700/40",
  },
];

/* ── Main component ── */
export default function Services() {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 space-y-12">
        {/* ── Header + Mindmap side by side ── */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <SectionHeader
            eyebrow="What we do"
            title={
              <div className="text-4xl md:text-5xl font-bold leading-tight">
                Full-stack <span className="gradient-text">recovery services</span>
              </div>
            }
            subtitle="From first digital nudge to courtroom — one partner, every channel, complete accountability."
          />
          <ServicesMindmap />
        </div>

        {/* ── 6 Service Cards ── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className={`card-pop ${s.pop} group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card`}
            >
              {/* Glow blob */}
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${s.grad} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`}
              />

              <div className="relative space-y-4">
                {/* Icon */}
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.grad} text-white shadow-md`}
                >
                  <s.Icon className="h-6 w-6" />
                </div>

                {/* Title + desc */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>

                {/* Bullets */}
                <ul className="space-y-1.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Metric badge */}
                <span
                  className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${s.chipBg} ${s.metricColor}`}
                >
                  {s.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
