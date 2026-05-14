import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  BrainCircuit,
  MessageCircle,
  Headphones,
  MapPin,
  Smartphone,
  Bot,
  Users,
  Briefcase,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { SectionHeader } from "./Problems";

const steps = [
  {
    number: "01",
    title: "AI-Powered Case Intelligence",
    desc: "Every account is scored and segmented before a single contact is made. Our AI CRM ingests bureau data, repayment history and behavioural signals to rank intent and set the right treatment path.",
    channels: [
      { icon: BrainCircuit, label: "AI CRM" },
      { icon: BarChart3, label: "Risk Scoring" },
      { icon: ShieldCheck, label: "FMRG Check" },
    ],
    metric: "48 hr",
    metricLabel: "to first action plan",
    accent: "from-violet-500/20 to-indigo-500/10",
    border: "border-violet-500/30",
    glow: "bg-violet-500/10",
    dot: "bg-violet-400",
  },
  {
    number: "02",
    title: "Digital-First Outreach",
    desc: "Automated yet personalised — WhatsApp messages, SMS nudges and AI voice bots reach borrowers on the channels they actually respond to, at the moment they're most receptive.",
    channels: [
      { icon: MessageCircle, label: "WhatsApp" },
      { icon: Smartphone, label: "SMS" },
      { icon: Bot, label: "Voice Bot" },
    ],
    metric: "3×",
    metricLabel: "higher response vs. cold calls",
    accent: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    glow: "bg-emerald-500/10",
    dot: "bg-emerald-400",
  },
  {
    number: "03",
    title: "Human Agent Escalation",
    desc: "Accounts that don't resolve digitally are handed to trained tele-calling agents guided by real-time AI CRM prompts — the right script, the right offer, at the right time. Every call is recorded and compliance-monitored.",
    channels: [
      { icon: Headphones, label: "Tele-Agents" },
      { icon: BrainCircuit, label: "AI Assist" },
      { icon: ShieldCheck, label: "Live Monitor" },
    ],
    metric: "3×",
    metricLabel: "agent effectiveness",
    accent: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/30",
    glow: "bg-amber-500/10",
    dot: "bg-amber-400",
  },
  {
    number: "04",
    title: "Field & Legal Closure",
    desc: "High-value or unresponsive cases get geo-tracked field visits and, where needed, legal escalation. Settlement, digital NOC, reconciliation and live MIS — money in your account, paperwork closed.",
    channels: [
      { icon: MapPin, label: "Field Agents" },
      { icon: Users, label: "Legal Desk" },
      { icon: Briefcase, label: "Same-day NOC" },
    ],
    metric: "92%",
    metricLabel: "portfolio closure rate",
    accent: "from-sky-500/20 to-blue-500/10",
    border: "border-sky-500/30",
    glow: "bg-sky-500/10",
    dot: "bg-sky-400",
  },
];

// Per-card scroll segments
const cardSegments: [number, number][] = [
  [0, 0.35],
  [0.1, 0.45],
  [0.45, 0.75],
  [0.55, 0.85],
];

function AnimatedCard({
  step,
  index,
  scrollYProgress,
}: {
  step: (typeof steps)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [start, end] = cardSegments[index];
  const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.88, 1]);
  const y = useTransform(scrollYProgress, [start, end], [40, 0]);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-2xl border ${step.border} bg-card p-7 shadow-card`}
    >
      {/* Gradient wash */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${step.accent}`} />

      {/* Glow blob */}
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl ${step.glow}`}
      />

      <div className="relative">
        {/* Step number + metric row */}
        <div className="flex items-start justify-between">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground">
            STEP {step.number}
          </span>
          <div className="text-right">
            <div className="text-2xl font-bold leading-none">{step.metric}</div>
            <div className="mt-0.5 text-[10px] text-muted-foreground">{step.metricLabel}</div>
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-xl font-semibold leading-snug">{step.title}</h3>

        {/* Description */}
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>

        {/* Channel chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          {step.channels.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur-sm"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </span>
          ))}
        </div>

        {/* Connector dot */}
        <div className="mt-5 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className={`h-2 w-2 rounded-full ${step.dot}`} />
          {index < steps.length - 1
            ? "Escalates to next step if unresolved"
            : "Portfolio closed — MIS delivered"}
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  // Progress line height as a percentage
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" ref={sectionRef} className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="How it works"
          title={
            <>
              A proven <span className="gradient-text">4-step process</span>
            </>
          }
          subtitle="Every account gets the right channel at the right time — automated where possible, human where it counts."
        />

        {/* Progress line + grid wrapper */}
        <div className="relative mt-12 flex gap-6">
          {/* Animated vertical progress line */}
          <div className="relative hidden w-1 shrink-0 sm:block">
            {/* Track */}
            <div className="absolute inset-0 rounded-full bg-border/30" />
            {/* Fill */}
            <motion.div
              style={{ scaleY: lineScaleY, originY: 0 }}
              className="absolute inset-0 rounded-full"
            >
              <div
                className="h-full w-full rounded-full"
                style={{
                  background:
                    "linear-gradient(to bottom, oklch(0.62 0.22 300), oklch(0.62 0.16 162), oklch(0.72 0.18 45), oklch(0.55 0.18 220))",
                }}
              />
            </motion.div>
          </div>

          {/* Cards grid */}
          <div className="flex-1 grid gap-5 sm:grid-cols-2">
            {steps.map((step, i) => (
              <AnimatedCard
                key={step.number}
                step={step}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
