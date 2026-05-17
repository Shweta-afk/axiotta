import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   HOW TO ADD REAL PHOTOS LATER
   ────────────────────────────────────────────────────────────────
   1. Drop the headshot images into:  /public/team/
      e.g.  /public/team/saurabh.jpg
            /public/team/vaikhari.jpg
            /public/team/shweta.jpg

   2. In the `directors` array below, change `photo: null` to:
      photo: "/team/saurabh.jpg"   ← (and so on for each person)

   That's it — the <img> will automatically show instead of the
   initials avatar. No other code changes needed.
   ───────────────────────────────────────────────────────────────── */

const directors = [
  {
    name: "Saurabh Yadav",
    role: "Co-Founder",
    initials: "SY",
    photo: null as string | null,
    bio: "Drives Axiotta's vision, strategy and technology roadmap. Brings deep expertise in fintech operations and recovery systems.",
    gradient: "from-[oklch(0.55_0.2_250)] to-[oklch(0.38_0.18_280)]",
    accent: "oklch(0.55 0.2 250)",
  },
  {
    name: "Vaikhari Manere",
    role: "Co-Founder",
    initials: "VM",
    photo: null as string | null,
    bio: "Leads daily operations, compliance frameworks and client delivery. Ensures every lender partnership runs on time and on standard.",
    gradient: "from-[oklch(0.52_0.16_162)] to-[oklch(0.36_0.14_185)]",
    accent: "oklch(0.52 0.16 162)",
  },
  {
    name: "Shweta Yadav",
    role: "Director",
    initials: "SY",
    photo: null as string | null,
    bio: "Oversees human capital, regional expansion and organisational culture — ensuring Axiotta's teams stay trained, motivated and compliant.",
    gradient: "from-[oklch(0.58_0.18_45)] to-[oklch(0.42_0.16_30)]",
    accent: "oklch(0.58 0.18 45)",
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

        {/* ── Header + floating logo ── */}
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
              We started lean, stayed compliant and built a collections operation
              that banks and fintechs actually trust — without the legacy baggage.
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

        {/* ── Leadership ── */}
        <div className="mt-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
                Leadership
              </p>
              <h3 className="mt-2 text-2xl font-bold md:text-3xl">
                The people behind Axiotta
              </h3>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {directors.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group relative overflow-hidden rounded-2xl bg-foreground"
                style={{
                  boxShadow: `0 0 0 1px oklch(1 0 0 / 0.07), 0 24px 48px -12px oklch(0 0 0 / 0.4)`,
                }}
              >
                {/* Ambient glow in corner */}
                <div
                  className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl opacity-25 group-hover:opacity-40 transition-opacity"
                  style={{ background: `radial-gradient(circle, ${d.accent}, transparent 70%)` }}
                />

                {/* Top colour bar */}
                <div
                  className={`h-1 w-full bg-gradient-to-r ${d.gradient}`}
                />

                <div className="relative flex flex-col gap-6 p-7">
                  {/* Avatar */}
                  <div className="relative w-fit">
                    {d.photo ? (
                      <img
                        src={d.photo}
                        alt={d.name}
                        className="h-24 w-24 rounded-2xl object-cover ring-2 ring-white/10"
                      />
                    ) : (
                      <div
                        className={`flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br ${d.gradient} select-none ring-2 ring-white/10`}
                      >
                        <span className="text-3xl font-black text-white tracking-tight">
                          {d.initials}
                        </span>
                      </div>
                    )}
                    <span className="absolute -bottom-1.5 -right-1.5 h-4 w-4 rounded-full border-2 border-foreground bg-emerald-400" />
                  </div>

                  {/* Name + role */}
                  <div>
                    <h4 className="text-xl font-bold text-white leading-tight">
                      {d.name}
                    </h4>
                    <p
                      className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: d.accent }}
                    >
                      {d.role}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-white/50 leading-relaxed">
                    {d.bio}
                  </p>

                  {/* Divider — LinkedIn slot left empty for later */}
                  <div className="h-px bg-white/8" />
                  <div className="h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── What we believe — dark band ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 relative overflow-hidden rounded-3xl bg-foreground p-10 md:p-16"
        >
          <div className="pointer-events-none absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 70% 50%, oklch(0.55 0.2 250 / 0.4) 0%, transparent 60%), radial-gradient(circle at 20% 80%, oklch(0.62 0.16 162 / 0.3) 0%, transparent 50%)" }}
          />

          <div className="relative grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                What we believe
              </p>
              <h3 className="mt-4 text-3xl font-bold text-white leading-snug md:text-4xl">
                Collections done right<br />
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, oklch(0.7 0.18 230), oklch(0.74 0.13 162))" }}>
                  is good for everyone
                </span>
              </h3>
              <p className="mt-5 max-w-md text-sm text-white/55 leading-relaxed">
                We built Axiotta because the industry needed a partner that could combine
                speed and scale with fairness and full regulatory compliance — not choose
                between them.
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
