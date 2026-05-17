import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const principles = [
  {
    num: "01",
    title: "Founded with purpose",
    desc: "Built specifically for the gap between legacy agencies and the needs of modern lenders. Every process designed from scratch to be fast, traceable and audit-proof.",
    color: "text-[oklch(0.55_0.22_300)]",
    bar: "bg-[oklch(0.55_0.22_300)]",
  },
  {
    num: "02",
    title: "Compliance by design",
    desc: "RBI Fair Practice Code and ISO 27001 baked into operations — not bolted on after the fact. Every call recorded, every visit logged.",
    color: "text-[oklch(0.5_0.16_162)]",
    bar: "bg-[oklch(0.5_0.16_162)]",
  },
  {
    num: "03",
    title: "Lean, trained teams",
    desc: "Handpicked agents and analysts who know collections, compliance and customer handling equally well.",
    color: "text-[oklch(0.62_0.18_45)]",
    bar: "bg-[oklch(0.62_0.18_45)]",
  },
  {
    num: "04",
    title: "Growing PAN-India",
    desc: "Active across major metros and Tier 2 cities, with field teams expanding quarter on quarter.",
    color: "text-[oklch(0.48_0.2_250)]",
    bar: "bg-[oklch(0.48_0.2_250)]",
  },
];

const beliefs = [
  "Recovery should never compromise borrower dignity",
  "Technology and human empathy can coexist",
  "Every rupee recovered is trust earned with a lender",
];

export default function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-accent-emerald/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4">

        {/* ── Top: eyebrow + tagline + floating logo ── */}
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
              About Axiotta Technologies
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Built on <span className="gradient-text">trust,</span><br />
              technology<br />
              <span className="gradient-text">&amp; expertise</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
              We started lean, stayed compliant and built a collections operation that banks and fintechs actually trust — without the legacy baggage.
            </p>
          </div>

          {/* Floating logo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative flex flex-col items-center">
              <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-3xl scale-125" />
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 rounded-3xl border border-border bg-white/80 backdrop-blur-xl p-8 shadow-[0_24px_64px_-12px_oklch(0.55_0.2_250/0.3),0_8px_24px_-8px_oklch(0.2_0.05_260/0.1)]"
              >
                <img
                  src="/axiotta-logo-r.png"
                  alt="Axiotta Technologies"
                  className="h-20 w-auto object-contain"
                  style={{ minWidth: 180 }}
                />
              </motion.div>
              <motion.div
                animate={{ scaleX: [1, 0.6, 1], opacity: [0.4, 0.15, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="mt-5 h-3 w-40 rounded-full bg-primary/25 blur-md"
              />
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Smart Recovery. Real Results.
              </p>
            </div>
          </div>
        </div>

        {/* ── Numbered principles — NO cards, just typography + dividers ── */}
        <div className="mt-24 space-y-0">
          {principles.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-border via-border/60 to-transparent" />

              <div className="group grid grid-cols-[56px_1fr] md:grid-cols-[100px_1fr_1.4fr] items-start gap-4 md:gap-8 py-7 md:py-10 transition-colors hover:bg-border/20 rounded-xl px-3">
                {/* Number */}
                <span className={`text-3xl md:text-5xl font-black tabular-nums opacity-30 group-hover:opacity-70 transition-opacity ${p.color}`}>
                  {p.num}
                </span>

                {/* Title + desc (one cell on mobile, display:contents on md+) */}
                <div className="md:contents">
                  <div className="flex items-start gap-3">
                    <div className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${p.bar}`} />
                    <h3 className="text-lg md:text-2xl font-semibold text-foreground leading-snug">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-2 md:mt-0 text-sm text-muted-foreground leading-relaxed md:text-base md:pt-1.5">
                    {p.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Final divider */}
          <div className="h-px bg-gradient-to-r from-border via-border/60 to-transparent" />
        </div>

        {/* ── What we believe — full-width dark band ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 relative overflow-hidden rounded-3xl bg-foreground p-10 md:p-16"
        >
          {/* Subtle texture */}
          <div className="pointer-events-none absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 70% 50%, oklch(0.55 0.2 250 / 0.4) 0%, transparent 60%), radial-gradient(circle at 20% 80%, oklch(0.62 0.16 162 / 0.3) 0%, transparent 50%)" }} />

          <div className="relative grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">What we believe</p>
              <h3 className="mt-4 text-3xl font-bold text-white leading-snug md:text-4xl">
                Collections done right<br />
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, oklch(0.7 0.18 230), oklch(0.74 0.13 162))" }}>
                  is good for everyone
                </span>
              </h3>
              <p className="mt-5 max-w-md text-sm text-white/55 leading-relaxed">
                We built Axiotta because the industry needed a partner that could combine speed and scale with fairness and full regulatory compliance — not choose between them.
              </p>
            </div>
            <ul className="space-y-5 md:min-w-[340px]">
              {beliefs.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                  className="flex items-start gap-3 text-sm text-white/80"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.74_0.13_162)]" />
                  {b}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
