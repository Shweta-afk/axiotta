import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Wallet, ShieldCheck, Sparkles, BrainCircuit, BarChart3, Users, Shield, Zap, IndianRupee } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* glowing orbs */}
      <motion.div
        aria-hidden
        className="absolute -left-32 top-40 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.75, 0.4], x: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-accent-emerald/25 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.3, 0.5], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-muted-foreground"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
            </motion.span>
            Your trusted recovery partner since 2024
          </motion.div>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xlxl">
            Collections Powered by Intelligence <br />
            <motion.span
              className="gradient-text bg-[length:200%_200%]"
              style={{ backgroundImage: "var(--gradient-text)" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              Recover Faster with AI-Driven Infrastructure
            </motion.span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Axiotta Technologies combines the speed of AI with the reach of human field agents, to recover outstanding dues faster, smarter, and without the friction.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl gradient-primary px-6 py-3 font-medium text-primary-foreground shadow-glow"
            >
              <motion.span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
              />
              <span className="relative">Start Recovery Now</span>
              <motion.span
                className="relative"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </motion.a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-white/5"
            >
              Explore Services
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
            {[
              { i: ShieldCheck, t: "RBI compliant" },
              { i: TrendingUp, t: "95% success rate" },
              { i: Wallet, t: "₹500Cr+ recovered" },
            ].map((b, idx) => (
              <motion.div
                key={b.t}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                className="flex items-center gap-2"
              >
                <b.i className="h-4 w-4 text-accent-emerald" /> {b.t}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
}

const orbitNodes = [
  { angle: 0,   Icon: BrainCircuit, label: "AI Engine",   color: "#3b82f6" },
  { angle: 72,  Icon: Zap,          label: "Automation",  color: "#10b981" },
  { angle: 144, Icon: BarChart3,    label: "Live MIS",    color: "#f59e0b" },
  { angle: 216, Icon: Shield,       label: "Compliance",  color: "#06b6d4" },
  { angle: 288, Icon: Users,        label: "Agents",      color: "#a855f7" },
];

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="relative h-[480px] flex items-center justify-center"
    >
      {/* Pulsing rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/15"
          style={{ width: 200 + i * 60, height: 200 + i * 60 }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.08, 0.5] }}
          transition={{ duration: 3 + i * 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 1.1 }}
        />
      ))}

      {/* Orbit guide ring */}
      <div className="absolute rounded-full border border-dashed border-primary/15" style={{ width: 320, height: 320 }} />

      {/* Orbiting AI nodes */}
      {orbitNodes.map(({ angle, Icon, label, color }, i) => {
        const rad = ((angle - 90) * Math.PI) / 180;
        const r = 160;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        return (
          <div
            key={label}
            className="absolute flex flex-col items-center gap-1"
            style={{ left: "50%", top: "50%", transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, zIndex: 20 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.8 + i * 0.12, type: "spring", stiffness: 220 }}
              className="flex flex-col items-center gap-1"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
                className="flex items-center justify-center rounded-2xl"
                style={{
                  width: 52, height: 52,
                  background: `linear-gradient(135deg, ${color}55, ${color}30)`,
                  border: `1.5px solid ${color}90`,
                  boxShadow: `0 0 18px ${color}70, 0 4px 12px -4px ${color}80, inset 0 1px 0 rgba(255,255,255,0.2)`,
                  backdropFilter: "blur(8px)",
                }}
              >
                <Icon className="h-6 w-6" style={{ color, filter: `drop-shadow(0 0 6px ${color})` }} />
              </motion.div>
              <span className="text-[10px] font-bold tracking-wide" style={{ color, textShadow: `0 0 8px ${color}80` }}>{label}</span>
            </motion.div>
          </div>
        );
      })}

      {/* Central spinning coin */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        {/* Glow layers */}
        <div className="absolute -inset-8 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute -inset-4 rounded-full bg-primary/15 blur-xl" />

        {/* 3-D coin wrapper */}
        <div style={{ perspective: "900px", perspectiveOrigin: "50% 45%" }}>
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative h-44 w-44"
          >
            {/* ── Front face: Indian Rupee ── */}
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                background: "radial-gradient(circle at 32% 28%, #fef9c3 0%, #fde047 18%, #fbbf24 40%, #d97706 68%, #92400e 100%)",
                boxShadow: "inset 0 0 0 7px rgba(120,53,15,0.22), inset 0 0 0 14px rgba(251,191,36,0.08), 0 0 50px rgba(251,191,36,0.5)",
              }}
            >
              {/* Milled edge rings */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 176 176">
                <circle cx="88" cy="88" r="80" stroke="#78350f" strokeWidth="0.8" fill="none" strokeDasharray="3 3" opacity="0.35" />
                <circle cx="88" cy="88" r="72" stroke="#b45309" strokeWidth="0.6" fill="none" opacity="0.2" />
                <circle cx="88" cy="88" r="60" stroke="#92400e" strokeWidth="0.6" fill="none" strokeDasharray="4 6" opacity="0.25" />
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, idx) => {
                  const r2 = (a * Math.PI) / 180;
                  return (
                    <line key={idx}
                      x1={88 + 72 * Math.cos(r2)} y1={88 + 72 * Math.sin(r2)}
                      x2={88 + 80 * Math.cos(r2)} y2={88 + 80 * Math.sin(r2)}
                      stroke="#78350f" strokeWidth="1" opacity="0.3"
                    />
                  );
                })}
              </svg>
              {/* Highlight spot */}
              <div className="absolute rounded-full" style={{ top: "12%", left: "18%", width: "28%", height: "18%", background: "radial-gradient(ellipse, rgba(255,255,255,0.65) 0%, transparent 70%)", transform: "rotate(-15deg)" }} />
              <IndianRupee className="relative z-10 h-[4.5rem] w-[4.5rem]" style={{ color: "#78350f", filter: "drop-shadow(0 2px 4px rgba(120,53,15,0.4))" }} />
              {/* Shine sweep */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
                />
              </div>
            </div>

            {/* ── Back face: AI Brain ── */}
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "radial-gradient(circle at 32% 28%, #bfdbfe 0%, #60a5fa 18%, #3b82f6 40%, #1d4ed8 68%, #1e3a8a 100%)",
                boxShadow: "inset 0 0 0 7px rgba(30,58,138,0.25), inset 0 0 0 14px rgba(59,130,246,0.08), 0 0 50px rgba(59,130,246,0.5)",
              }}
            >
              {/* Milled edge rings */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 176 176">
                <circle cx="88" cy="88" r="80" stroke="white" strokeWidth="0.8" fill="none" strokeDasharray="3 3" opacity="0.25" />
                <circle cx="88" cy="88" r="72" stroke="white" strokeWidth="0.6" fill="none" opacity="0.15" />
                <circle cx="88" cy="88" r="60" stroke="white" strokeWidth="0.6" fill="none" strokeDasharray="4 6" opacity="0.18" />
                {/* Circuit nodes */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a, idx) => {
                  const r2 = (a * Math.PI) / 180;
                  const cx2 = 88 + 48 * Math.cos(r2);
                  const cy2 = 88 + 48 * Math.sin(r2);
                  return (
                    <g key={idx}>
                      <line x1={88} y1={88} x2={cx2} y2={cy2} stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
                      <circle cx={cx2} cy={cy2} r="2.5" fill="rgba(255,255,255,0.3)" />
                    </g>
                  );
                })}
              </svg>
              {/* Highlight */}
              <div className="absolute rounded-full" style={{ top: "12%", left: "18%", width: "28%", height: "18%", background: "radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 70%)", transform: "rotate(-15deg)" }} />
              <BrainCircuit className="relative z-10 h-[4.5rem] w-[4.5rem]" style={{ color: "rgba(255,255,255,0.88)", filter: "drop-shadow(0 2px 6px rgba(30,58,138,0.6))" }} />
              {/* Shine sweep */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Outer decorative rings */}
        <div className="absolute -inset-2 rounded-full border border-amber-400/35 pointer-events-none" style={{ boxShadow: "0 0 20px rgba(251,191,36,0.15)" }} />
        <div className="absolute -inset-5 rounded-full border border-primary/15 pointer-events-none" />
      </motion.div>

      {/* Floating stat cards */}
      <motion.div
        className="glass-strong absolute left-2 top-16 rounded-2xl p-4 shadow-elegant"
        animate={{ y: [0, -14, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-emerald/20 text-accent-emerald">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">NPA Recovered</div>
            <div className="text-sm font-semibold">₹1,200 Cr+</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="glass-strong absolute right-2 bottom-16 rounded-2xl p-4 shadow-elegant"
        animate={{ y: [0, 14, 0], rotate: [1, -1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
      >
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/20 text-primary-glow">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Settled Today</div>
            <div className="text-sm font-semibold">₹2.14 Cr</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="glass-strong absolute right-6 top-10 rounded-xl px-3 py-2 shadow-elegant"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      >
        <div className="flex items-center gap-2 text-xs">
          <motion.span
            className="h-2 w-2 rounded-full bg-accent-emerald"
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-muted-foreground">Live agents</span>
          <span className="font-semibold">500+</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
