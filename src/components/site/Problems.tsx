import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  TrendingDown,
  ShieldAlert,
  PhoneOff,
  MapPinOff,
  IndianRupee,
} from "lucide-react";
import React from "react";

const problems = [
  {
    icon: TrendingDown,
    title: "NPA Ratios Alarming Auditors",
    problem:
      "Gross NPA ratios above 3% trigger RBI scrutiny, provisioning hits and board-level pressure. Manual recovery teams can't move fast enough.",
    solution:
      "AI-ranked portfolio segmentation identifies high-propensity payers within 48 hours. Our clients see an average 40% reduction in Days-Past-Due within 90 days.",
    metric: "40% DPD reduction",
    accent: "border-violet-500/40",
    glow: "bg-violet-500/10",
    metricColor: "text-violet-400",
    chipBg: "bg-violet-500/15 border-violet-500/30",
  },
  {
    icon: ShieldAlert,
    title: "One Wrong Call Can Cost You Your Licence",
    problem:
      "A call made outside permitted hours, a missing borrower notice, an unlogged field visit — any single slip can trigger RBI censure, heavy fines, or worse. Manual teams can't maintain that standard at scale.",
    solution:
      "Every channel — WhatsApp, SMS, Voice Bot, tele-call, field visit — runs through automated compliance guardrails that enforce RBI's Fair Practices Code in real time. 100% audit-ready logs, zero compliance gaps.",
    metric: "100% audit trail",
    accent: "border-emerald-500/40",
    glow: "bg-emerald-500/10",
    metricColor: "text-emerald-400",
    chipBg: "bg-emerald-500/15 border-emerald-500/30",
  },
  {
    icon: PhoneOff,
    title: "Borrowers Going Silent",
    problem:
      "Outdated contact data, ignored phone calls, undelivered notices. Recovery teams burn hours chasing ghosts instead of settling accounts.",
    solution:
      "Skip-tracing + AI-ranked contactability scoring, then multi-channel outreach: WhatsApp, SMS, personalised Voice Bot — delivered when borrowers are most receptive.",
    metric: "3× contact rate",
    accent: "border-amber-500/40",
    glow: "bg-amber-500/10",
    metricColor: "text-amber-400",
    chipBg: "bg-amber-500/15 border-amber-500/30",
  },
  {
    icon: MapPinOff,
    title: "Field Teams: Untracked & Unaccountable",
    problem:
      "No GPS. No call recordings. No visit logs. Disputed interactions, no proof — and settlements that fall apart in court.",
    solution:
      "Every field visit is geo-tagged in real time. Every call recorded. Every interaction timestamped and synced to our AI CRM — full proof chain, always.",
    metric: "Live geo-tracking",
    accent: "border-sky-500/40",
    glow: "bg-sky-500/10",
    metricColor: "text-sky-400",
    chipBg: "bg-sky-500/15 border-sky-500/30",
  },
  {
    icon: IndianRupee,
    title: "Cost-Per-Recovery Eroding Margins",
    problem:
      "Large tele-calling teams with low strike rates drive up cost-per-recovery. Banks end up spending ₹500 to collect ₹300.",
    solution:
      "AI CRM automation handles the first 3 digital touchpoints automatically. Agents only take calls where AI predicts high closure probability — cutting cost-per-account by up to 60%.",
    metric: "60% lower cost-per-account",
    accent: "border-pink-500/40",
    glow: "bg-pink-500/10",
    metricColor: "text-pink-400",
    chipBg: "bg-pink-500/15 border-pink-500/30",
  },
];

export default function Problems() {
  const [selected, setSelected] = useState(0);
  const active = problems[selected];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-indigo-950/20 to-background" />

      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="The Challenge"
          title={
            <div className="text-4xl md:text-5xl font-bold leading-tight">
              What's draining your{" "}
              <span className="gradient-text whitespace-nowrap">recovery ROI</span>
            </div>
          }
          subtitle="Five critical problems every Indian lender faces — and how Axiotta solves each one."
        />

        {/* Two-panel layout on desktop */}
        <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Left: problem list */}
          <div className="flex flex-col gap-3 lg:w-5/12">
            {problems.map((p, i) => {
              const Icon = p.icon;
              const isActive = selected === i;
              return (
                <motion.button
                  key={p.title}
                  onClick={() => setSelected(i)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className={`group w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                    isActive
                      ? `${p.accent} bg-card shadow-card`
                      : "border-border/50 bg-card/40 hover:bg-card/80 hover:border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-colors ${
                        isActive ? p.glow : "bg-secondary/60"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 transition-colors ${
                          isActive ? p.metricColor : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`text-sm font-semibold leading-snug transition-colors ${
                          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {p.title}
                      </div>
                      {isActive && (
                        <div className={`mt-1 text-xs font-medium ${p.metricColor}`}>
                          {p.metric}
                        </div>
                      )}
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="active-arrow"
                        className={`ml-auto h-2 w-2 shrink-0 rounded-full ${p.metricColor.replace("text-", "bg-")}`}
                      />
                    )}
                  </div>

                  {/* Mobile: inline accordion */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key="mobile-solution"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden lg:hidden"
                      >
                        <div className="mt-4 space-y-3 text-sm">
                          <div>
                            <div className="font-semibold text-foreground mb-1">The Problem</div>
                            <p className="text-muted-foreground leading-relaxed">{p.problem}</p>
                          </div>
                          <div>
                            <div className="font-semibold text-foreground mb-1">The Solution</div>
                            <p className="text-muted-foreground leading-relaxed">{p.solution}</p>
                          </div>
                          <span
                            className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${p.chipBg} ${p.metricColor}`}
                          >
                            {p.metric}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* Right: solution detail (desktop only) */}
          <div className="hidden lg:flex lg:flex-1 lg:items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 24, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -16, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`relative w-full overflow-hidden rounded-2xl border ${active.accent} bg-card p-8 shadow-card`}
              >
                {/* Glow blob */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl ${active.glow}`}
                />

                <div className="relative">
                  {/* Icon + metric */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`grid h-14 w-14 place-items-center rounded-xl ${active.glow}`}>
                      <active.icon className={`h-7 w-7 ${active.metricColor}`} />
                    </div>
                    <span
                      className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${active.chipBg} ${active.metricColor}`}
                    >
                      {active.metric}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold leading-snug mb-6">{active.title}</h3>

                  {/* Problem block */}
                  <div className="mb-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-1.5 w-4 rounded-full bg-rose-400/70" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-rose-400/80">
                        The Problem
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{active.problem}</p>
                  </div>

                  {/* Divider */}
                  <div className="my-5 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Solution block */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-1.5 w-4 rounded-full ${active.metricColor.replace("text-", "bg-")}`} />
                      <span
                        className={`text-xs font-semibold uppercase tracking-widest ${active.metricColor}`}
                      >
                        Axiotta's Solution
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{active.solution}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl"
    >
      <div className="inline-flex rounded-full border border-border bg-white px-3 py-1 text-xl text-primary-glow ">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}
