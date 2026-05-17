import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, to, mv]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const smallStats = [
  {
    value: 40,
    suffix: "%",
    label: "Average DPD reduction",
    percent: 40,
    pop: "pop-violet",
    grad: "linear-gradient(90deg, oklch(0.55 0.22 250), oklch(0.62 0.2 220))",
  },
  {
    value: 95,
    suffix: "%",
    label: "RBI compliance rate",
    percent: 95,
    pop: "pop-emerald",
    grad: "linear-gradient(90deg, oklch(0.62 0.16 162), oklch(0.74 0.13 210))",
  },
  {
    value: 3,
    suffix: "×",
    label: "Agent productivity with AI CRM",
    percent: 75,
    pop: "pop-orange",
    grad: "linear-gradient(90deg, oklch(0.72 0.18 45), oklch(0.75 0.14 85))",
  },
  {
    value: 120,
    suffix: "+",
    label: "Cities across India",
    percent: 60,
    pop: "pop-violet",
    grad: "linear-gradient(90deg, oklch(0.58 0.2 245), oklch(0.55 0.22 260))",
  },
  {
    value: 50,
    suffix: "+",
    label: "Lender clients",
    percent: 50,
    pop: "pop-violet",
    grad: "linear-gradient(90deg, oklch(0.48 0.22 260), oklch(0.55 0.22 240))",
  },
];

export default function Stats() {
  return (
    <section id="stats" className="relative py-24 overflow-hidden">
      {/* Smooth background — fades from page color at edges so there's no hard jump */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/18 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/8" />
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-500/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-400/6 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Section headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Impact that shows up on your{" "}
            <span className="gradient-text">balance sheet</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Trusted by banks, NBFCs and fintechs across India to recover what others write off.
          </p>
        </motion.div>

        {/* Two hero stats side by side */}
        <div className="mb-8 grid gap-5 md:grid-cols-2">

        {/* Hero stat 1 — NPA under management */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-900/60 via-blue-800/35 to-background p-10 shadow-card text-center"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />
          </div>

          <div className="relative">
            <div className="text-xs font-semibold tracking-widest text-blue-300/80 uppercase mb-3">
              NPA Portfolio Under Management
            </div>
            <div className="text-6xl font-extrabold tracking-tight md:text-7xl lg:text-8xl text-white drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]">
              <Counter to={1200} prefix="₹" suffix=" Cr+" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Across retail, MSME, agri and corporate loan portfolios
            </p>
          </div>

          {/* Shimmer bar */}
          <div className="relative mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "92%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="relative h-full"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.48 0.22 260), oklch(0.55 0.2 245), oklch(0.62 0.18 230))",
              }}
            >
              <motion.span
                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{ x: ["-100%", "600%"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Hero stat 2 — Recovered this month */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/60 via-emerald-800/35 to-background p-10 shadow-card text-center"
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-60 w-60 rounded-full bg-emerald-500/20 blur-3xl" />
          </div>
          <div className="relative">
            <div className="text-xs font-semibold tracking-widest text-emerald-300/80 uppercase mb-3">
              Recovered This Month
            </div>
            <div className="text-6xl font-extrabold tracking-tight md:text-7xl lg:text-8xl text-white drop-shadow-[0_0_40px_rgba(52,211,153,0.5)]">
              <Counter to={42} prefix="₹" suffix=" Cr+" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Active recoveries across retail, MSME &amp; agri portfolios
            </p>
          </div>
          <div className="relative mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "68%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="relative h-full"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.55 0.18 162), oklch(0.74 0.13 162), oklch(0.8 0.12 180))",
              }}
            >
              <motion.span
                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{ x: ["-100%", "600%"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>

        </div>{/* end two-hero grid */}

        {/* 5 smaller stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {smallStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`card-pop ${s.pop} relative glass rounded-2xl p-5 shadow-card`}
            >
              <div className="text-2xl font-bold tracking-tight md:text-3xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 text-xs text-muted-foreground leading-snug">{s.label}</div>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: i * 0.1, ease: "easeOut" }}
                  className="relative h-full"
                  style={{ background: s.grad }}
                >
                  <motion.span
                    className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    animate={{ x: ["-100%", "400%"] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
