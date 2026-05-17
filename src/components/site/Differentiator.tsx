import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const rows = [
  {
    legacy: "Limited monitoring of team members",
    axiotta: "Daily monitoring of every team member",
  },
  {
    legacy: "Irregular, inconsistent reporting",
    axiotta: "Daily EOD reports — every single day",
  },
  {
    legacy: "Untrained, high-turnover staff",
    axiotta: "Professionally trained employees",
  },
  {
    legacy: "Weak accountability structures",
    axiotta: "Strong ownership culture built in",
  },
  {
    legacy: "Cases ignored or deprioritised",
    axiotta: "Every account gets intensive follow-up",
  },
  {
    legacy: "Pure quantity, no quality filter",
    axiotta: "Quality, discipline and efficiency first",
  },
  {
    legacy: "Poor client visibility into progress",
    axiotta: "Transparent, real-time reporting",
  },
  {
    legacy: "Inconsistent, ad-hoc follow-ups",
    axiotta: "Structured, strategic follow-up cadence",
  },
  {
    legacy: "No process discipline",
    axiotta: "Strict, process-driven operations",
  },
];

export default function Differentiator() {
  return (
    <section id="why-axiotta" className="relative py-28 overflow-hidden">
      {/* Soft ambient blobs */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-red-500/4 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4">

        {/* ── Header ── */}
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70 mb-4">
            The Axiotta Difference
          </p>
          <h2 className="text-4xl font-bold tracking-tight leading-[1.1] md:text-5xl lg:text-[3.5rem]">
            Why lenders choose us over{" "}
            <span className="gradient-text">traditional agencies</span>
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-base text-muted-foreground leading-relaxed">
            Most agencies rely on volume and hope. We rely on process, accountability, and daily execution.
          </p>
        </div>

        {/* ── Column header pills ── */}
        <div className="mb-4 grid grid-cols-[1fr_48px_1fr] md:grid-cols-[1fr_64px_1fr] gap-3 px-1">
          <div className="flex items-center justify-end pr-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-red-500">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              Traditional
            </span>
          </div>
          <div />
          <div className="flex items-center pl-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-primary"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              Axiotta
            </span>
          </div>
        </div>

        {/* ── Comparison rows ── */}
        <div className="relative space-y-2">

          {/* Central spine */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
            style={{
              width: 1,
              background: "linear-gradient(to bottom, transparent 0%, oklch(0.65 0.18 15 / 0.3) 30%, oklch(0.55 0.2 250 / 0.35) 70%, transparent 100%)",
            }}
          />

          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_48px_1fr] md:grid-cols-[1fr_64px_1fr] items-stretch gap-3"
            >
              {/* Left: legacy */}
              <motion.div
                initial={{ opacity: 0, x: -36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.055 }}
                className="group relative overflow-hidden flex items-center justify-end gap-3
                           rounded-xl border border-red-100 bg-red-50/60
                           px-4 py-4 text-right
                           hover:border-red-200 hover:bg-red-50 transition-all"
              >
                {/* Ghost number */}
                <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[3rem] font-black tabular-nums leading-none text-red-100 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative text-sm text-red-400/80 leading-snug line-through decoration-red-300 group-hover:text-red-500 transition-colors">
                  {row.legacy}
                </span>
                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 border border-red-200 text-red-400">
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </motion.div>

              {/* Center VS badge */}
              <div className="flex items-center justify-center">
                <span className="inline-flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-border bg-background text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 shadow-sm">
                  vs
                </span>
              </div>

              {/* Right: Axiotta */}
              <motion.div
                initial={{ opacity: 0, x: 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.055 }}
                className="group relative overflow-hidden flex items-center gap-3
                           rounded-xl border border-primary/15 bg-primary/[0.05]
                           px-4 py-4
                           hover:border-primary/30 hover:bg-primary/[0.09] transition-all"
              >
                {/* Hover wash */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                  style={{ background: "linear-gradient(90deg, oklch(0.55 0.2 250 / 0.04) 0%, transparent 70%)" }}
                />

                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 border border-primary/25 text-primary">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span className="relative text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
                  {row.axiotta}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        {/* ── Our Approach ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-14 relative overflow-hidden rounded-3xl bg-foreground px-8 py-10 md:px-14 md:py-12"
        >
          <div className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: "radial-gradient(ellipse 60% 80% at 0% 50%, oklch(0.55 0.2 250 / 0.2) 0%, transparent 55%), radial-gradient(ellipse 40% 60% at 100% 80%, oklch(0.74 0.13 162 / 0.15) 0%, transparent 55%)" }}
          />

          <div className="relative flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Our Approach</p>
              <p className="text-xl md:text-2xl font-semibold text-white leading-snug">
                We don't assign cases and wait.{" "}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, oklch(0.7 0.18 230), oklch(0.74 0.13 162))" }}>
                  We execute, track, and report — every single day.
                </span>
              </p>
              <p className="mt-4 text-sm text-white/45 leading-relaxed max-w-lg">
                Continuous execution, strong tracking, daily reporting, and disciplined follow-up strategies.
                Every account matters. Transparency, accountability, and operational excellence — not optional.
              </p>
            </div>

            <div className="flex flex-row md:flex-col gap-6 md:gap-5 shrink-0">
              {[
                { stat: "Daily", label: "EOD reports" },
                { stat: "100%", label: "Follow-up rate" },
                { stat: "0", label: "Compliance shortcuts" },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-[oklch(0.55_0.2_250)] pl-4">
                  <div className="text-2xl font-bold text-white">{item.stat}</div>
                  <div className="text-xs text-white/35 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
