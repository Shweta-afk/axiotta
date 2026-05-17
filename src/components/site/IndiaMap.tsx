import { motion } from "framer-motion";
import { SectionHeader } from "./Problems";

/* ─── Geographic bounds from india.svg geoViewBox ─────────────── */
const GEO = { west: 68.184, east: 97.418, north: 37.084, south: 6.754 };
const geoW = GEO.east - GEO.west;
const geoH = GEO.north - GEO.south;

function pin(lon: number, lat: number) {
  return {
    left: ((lon - GEO.west) / geoW) * 100,
    top:  ((GEO.north - lat) / geoH) * 100,
  };
}

const cities = [
  // Metros
  { name: "Delhi",       ...pin(77.21, 28.61) },
  { name: "Mumbai",      ...pin(72.88, 19.08) },
  { name: "Bengaluru",   ...pin(77.59, 12.97) },
  { name: "Chennai",     ...pin(80.27, 13.08) },
  { name: "Kolkata",     ...pin(88.36, 22.57) },
  { name: "Hyderabad",   ...pin(78.48, 17.38) },
  // Tier-1
  { name: "Ahmedabad",   ...pin(72.59, 23.03) },
  { name: "Pune",        ...pin(73.86, 18.52) },
  { name: "Jaipur",      ...pin(75.79, 26.91) },
  { name: "Lucknow",     ...pin(80.95, 26.85) },
  { name: "Chandigarh",  ...pin(76.78, 30.74) },
  { name: "Kochi",       ...pin(76.26,  9.93) },
  { name: "Surat",       ...pin(72.85, 21.17) },
  { name: "Nagpur",      ...pin(79.09, 21.15) },
  { name: "Indore",      ...pin(75.86, 22.72) },
  { name: "Bhopal",      ...pin(77.41, 23.26) },
  { name: "Visakhapatnam",...pin(83.32, 17.69) },
  { name: "Patna",       ...pin(85.14, 25.59) },
  { name: "Bhubaneswar", ...pin(85.82, 20.30) },
  { name: "Coimbatore",  ...pin(76.96, 11.02) },
  { name: "Vadodara",    ...pin(73.20, 22.31) },
  // Tier-2
  { name: "Guwahati",    ...pin(91.74, 26.14) },
  { name: "Dehradun",    ...pin(78.03, 30.32) },
  { name: "Amritsar",    ...pin(74.87, 31.63) },
  { name: "Jodhpur",     ...pin(73.02, 26.30) },
  { name: "Ranchi",      ...pin(85.33, 23.36) },
  { name: "Raipur",      ...pin(81.63, 21.25) },
  { name: "Thiruvananthapuram", ...pin(76.94,  8.52) },
  { name: "Madurai",     ...pin(78.12,  9.93) },
  { name: "Varanasi",    ...pin(82.97, 25.32) },
  { name: "Agra",        ...pin(78.00, 27.18) },
  { name: "Meerut",      ...pin(77.71, 28.98) },
  { name: "Vijayawada",  ...pin(80.62, 16.51) },
  { name: "Rajkot",      ...pin(70.80, 22.30) },
  { name: "Nashik",      ...pin(73.79, 19.99) },
];

const stats = [
  { value: "120+", label: "Cities" },
  { value: "500+", label: "Active Agents" },
  { value: "28",   label: "States" },
  { value: "24/7", label: "Operations" },
];

export default function IndiaMap() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-blue-950/5 to-background" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-12 md:flex-row md:items-center">

          {/* ── Left ── */}
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

          {/* ── Right: map + dots ── */}
          <div className="md:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[420px]"
            >
              {/* SVG filter: maps black fills → pastel blue, transparent stays transparent */}
              <svg width="0" height="0" className="absolute overflow-hidden">
                <defs>
                  <filter id="pastelBlue" colorInterpolationFilters="sRGB">
                    {/* feColorMatrix: each row = R G B A const → output channel
                        black(0,0,0,1) → pastel blue (0.56, 0.77, 0.93, 1)
                        transparent(0,0,0,0) → transparent (0,0,0,0)         */}
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0.56 0
                              0 0 0 0.77 0
                              0 0 0 0.93 0
                              0 0 0 1    0"
                    />
                  </filter>
                </defs>
              </svg>

              {/* Map image using the precise SVG color filter */}
              <img
                src="/india-map.svg"
                alt="India map"
                className="w-full h-auto select-none pointer-events-none"
                draggable={false}
                style={{ filter: "url(#pastelBlue)" }}
              />

              {/* City dots */}
              {cities.map((city, idx) => (
                <div
                  key={city.name}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${city.left}%`,
                    top:  `${city.top}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  {/* Dot — smooth zoom-in/zoom-out breathe */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: 8, height: 8,
                      left: "50%", top: "50%",
                      translate: "-50% -50%",
                      background: "oklch(0.55 0.22 250)",
                      boxShadow: "0 0 0 1.5px white, 0 0 6px oklch(0.55 0.2 250 / 0.55)",
                    }}
                    animate={{ scale: [0.75, 1.35, 0.75] }}
                    transition={{
                      duration: 2.8 + (idx % 5) * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: (idx * 0.25) % 2.5,
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
