import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Rotating conic glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 opacity-40"
        style={{
          background:
            "conic-gradient(from 0deg, oklch(0.68 0.18 245 / 0.25), transparent 30%, oklch(0.74 0.18 160 / 0.22) 60%, transparent 80%, oklch(0.68 0.18 245 / 0.25))",
          filter: "blur(80px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Drifting orbs */}
      {[
        { c: "bg-primary/30", x: "10%", y: "20%", d: 18 },
        { c: "bg-accent-emerald/25", x: "80%", y: "15%", d: 22 },
        { c: "bg-primary-glow/25", x: "70%", y: "75%", d: 26 },
        { c: "bg-primary/20", x: "20%", y: "85%", d: 20 },
      ].map((o, i) => (
        <motion.div
          key={i}
          className={`absolute h-72 w-72 rounded-full blur-3xl ${o.c}`}
          style={{ left: o.x, top: o.y }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: o.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary-glow/60"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 8 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
