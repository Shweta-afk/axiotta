import { motion } from "framer-motion";
import { Coins, TrendingUp, Activity } from "lucide-react";

export default function Showcase() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-primary-glow">
            Real-time intelligence
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            A <span className="gradient-text">live command center</span> for every recovery
          </h2>
          <p className="mt-4 text-muted-foreground">
            Track pipeline, agents, recoveries and legal milestones in one unified dashboard.
            Get predictive insights powered by AI scoring and historical resolution data.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Geo-tagged field activity",
              "AI-driven settlement scoring",
              "Automated compliance audit trail",
              "White-labelled client dashboards",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full gradient-primary" />
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative h-[460px]"
        >
          <div className="glass-strong absolute inset-0 rounded-3xl p-6 shadow-elegant">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-accent-emerald" />
                <span className="text-sm">Live recovery feed</span>
              </div>
              <span className="text-xs text-muted-foreground">Updated 2s ago</span>
            </div>

            {/* Bar chart */}
            <div className="mt-6 flex h-44 items-end gap-3">
              {[40, 65, 50, 78, 55, 88, 72, 95, 80].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-lg gradient-primary opacity-90"
                  animate={{ height: [`${Math.max(20, h * 0.55)}%`, `${h}%`, `${Math.max(25, h * 0.7)}%`, `${h}%`] }}
                  transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                />
              ))}
            </div>

            {/* Feed rows */}
            <div className="mt-6 space-y-2">
              {[
                { t: "HDFC Portfolio · Mumbai", v: "+₹14.2L", c: "text-accent-emerald" },
                { t: "Bajaj NBFC · Pune", v: "+₹8.6L", c: "text-accent-emerald" },
                { t: "Fintech Alpha · Bengaluru", v: "+₹22.1L", c: "text-accent-emerald" },
              ].map((r, i) => (
                <motion.div
                  key={r.t}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  className="flex items-center justify-between rounded-xl border border-border bg-white/5 px-4 py-2.5"
                >
                  <span className="text-sm text-muted-foreground">{r.t}</span>
                  <span className={`text-sm font-semibold ${r.c}`}>{r.v}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Floating coins */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute grid h-12 w-12 place-items-center rounded-full gradient-primary text-primary-foreground shadow-glow"
              style={{
                left: `${[-5, 90, 70][i]}%`,
                top: `${[60, 20, 80][i]}%`,
              }}
              animate={{ y: [0, -14, 0], rotate: [0, 12, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            >
              <Coins className="h-5 w-5" />
            </motion.div>
          ))}
          <motion.div
            className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-2xl glass-strong px-4 py-3 shadow-elegant"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <TrendingUp className="h-4 w-4 text-accent-emerald" />
            <span className="text-sm font-semibold">+24.6% MoM</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
