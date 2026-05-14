import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeader } from "./Problems";

const cities = [
  { name: "Delhi",      x: 127, y: 148, label: "Delhi",      agents: "45+", delay: 0 },
  { name: "Mumbai",     x: 75,  y: 308, label: "Mumbai",     agents: "62+", delay: 0.18 },
  { name: "Bangalore",  x: 148, y: 418, label: "Bengaluru",  agents: "38+", delay: 0.36 },
  { name: "Chennai",    x: 170, y: 408, label: "Chennai",    agents: "29+", delay: 0.54 },
  { name: "Kolkata",    x: 278, y: 252, label: "Kolkata",    agents: "24+", delay: 0.72 },
  { name: "Hyderabad",  x: 158, y: 338, label: "Hyderabad",  agents: "31+", delay: 0.90 },
  { name: "Ahmedabad",  x: 68,  y: 235, label: "Ahmedabad",  agents: "18+", delay: 1.08 },
  { name: "Pune",       x: 88,  y: 322, label: "Pune",       agents: "22+", delay: 1.26 },
  { name: "Jaipur",     x: 112, y: 172, label: "Jaipur",     agents: "12+", delay: 1.44 },
  { name: "Lucknow",    x: 182, y: 175, label: "Lucknow",    agents: "15+", delay: 1.62 },
  { name: "Chandigarh", x: 120, y: 108, label: "Chandigarh", agents: "8+",  delay: 1.80 },
  { name: "Kochi",      x: 120, y: 460, label: "Kochi",      agents: "11+", delay: 1.98 },
];

const stats = [
  { value: "120+", label: "Cities" },
  { value: "500+", label: "Active Agents" },
  { value: "28",   label: "States" },
  { value: "24/7", label: "Operations" },
];

export default function IndiaMap() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-blue-950/5 to-background" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-12 md:flex-row md:items-center">
          {/* ── Left: copy ── */}
          <div className="md:w-1/2 space-y-8">
            <SectionHeader
              eyebrow="Our Reach"
              title={
                <div className="text-4xl md:text-5xl font-bold leading-tight">
                  Active in <span className="gradient-text">120+ cities</span>
                </div>
              }
              subtitle="From Leh to Kanyakumari, our field agents, tele-callers and legal teams are on the ground."
            />

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="rounded-xl border border-border bg-card p-4 text-center shadow-card"
                >
                  <div className="text-2xl font-bold text-primary">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Axiotta's network spans metros, tier-2 and tier-3 cities across all 28 states —
              with dedicated regional managers ensuring local compliance and cultural sensitivity
              in every borrower interaction.
            </p>
          </div>

          {/* ── Right: India SVG map ── */}
          <div className="md:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <svg
                viewBox="0 0 400 510"
                className="w-full max-w-sm drop-shadow-lg"
                style={{ maxHeight: 480 }}
              >
                {/* India mainland outline — geographically corrected */}
                <path
                  d="
                    M 87,10
                    L 115,95 L 174,120 L 230,155 L 272,171 L 320,179 L 390,162
                    L 377,213 L 355,240 L 340,248 L 324,255 L 295,262 L 279,272
                    L 262,290 L 248,308 L 230,335 L 210,362 L 192,382
                    L 174,399 L 162,422 L 148,448 L 134,498
                    L 119,492 L 105,468 L 92,440 L 82,410 L 76,385
                    L 73,358 L 73,330 L 73,308
                    L 62,295 L 52,282 L 40,276 L 35,284
                    L 42,296 L 55,298 L 64,292
                    L 66,276 L 58,258 L 46,248 L 34,246 L 20,238
                    L 16,222 L 18,202 L 26,182
                    L 36,145 L 52,108 L 72,72 L 87,10 Z
                  "
                  fill="oklch(0.55 0.18 250 / 0.09)"
                  stroke="oklch(0.55 0.2 250 / 0.35)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* State boundary suggestion lines */}
                <line x1="127" y1="148" x2="182" y2="175" stroke="oklch(0.55 0.2 250 / 0.08)" strokeWidth="0.5" />
                <line x1="112" y1="172" x2="68" y2="235" stroke="oklch(0.55 0.2 250 / 0.08)" strokeWidth="0.5" />
                <line x1="158" y1="338" x2="148" y2="418" stroke="oklch(0.55 0.2 250 / 0.08)" strokeWidth="0.5" />

                {/* Region labels */}
                <text x="155" y="68"  textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.3" fontWeight="600" letterSpacing="1">NORTH</text>
                <text x="310" y="215" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.3" fontWeight="600" letterSpacing="1">EAST</text>
                <text x="38"  y="188" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.3" fontWeight="600" letterSpacing="1">WEST</text>
                <text x="148" y="470" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.3" fontWeight="600" letterSpacing="1">SOUTH</text>

                {/* City dots */}
                {cities.map((city, index) => (
                  <g
                    key={city.name}
                    onMouseEnter={() => setHoveredCity(city.name)}
                    onMouseLeave={() => setHoveredCity(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Pulsing ring */}
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r={7}
                      fill="oklch(0.55 0.2 250)"
                      animate={{ scale: [1, 2.8], opacity: [0.55, 0] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeOut",
                      }}
                      style={{ transformOrigin: `${city.x}px ${city.y}px` }}
                    />
                    {/* Solid dot */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={4}
                      fill="oklch(0.55 0.2 250)"
                      stroke="white"
                      strokeWidth="1.5"
                      opacity="0.92"
                    />
                  </g>
                ))}

                {/* Hover tooltips */}
                {cities.map((city) =>
                  hoveredCity === city.name ? (
                    <g key={`tooltip-${city.name}`}>
                      <rect
                        x={city.x + 8}
                        y={city.y - 20}
                        width={76}
                        height={30}
                        rx={5}
                        fill="oklch(0.18 0.04 260)"
                        opacity="0.94"
                      />
                      <text x={city.x + 13} y={city.y - 7} fontSize="7" fill="white" fontWeight="700">
                        {city.label}
                      </text>
                      <text x={city.x + 13} y={city.y + 5} fontSize="6.2" fill="oklch(0.72 0.18 230)">
                        {city.agents} agents active
                      </text>
                    </g>
                  ) : null
                )}
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
