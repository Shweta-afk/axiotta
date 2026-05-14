import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

const items = [
  { l: "HDFC Recoveries", v: "+₹14.2L", up: true },
  { l: "Bajaj NBFC TAT", v: "18 days", up: true },
  { l: "Portfolio NPA", v: "-32% YoY", up: true },
  { l: "Cred Settled", v: "+₹22.1L", up: true },
  { l: "Legal cases won", v: "1,284", up: true },
  { l: "Field visits today", v: "3,940", up: true },
  { l: "Avg success rate", v: "95.2%", up: true },
  { l: "ICICI Pipeline", v: "₹128.4 Cr", up: true },
  { l: "Defaults flagged", v: "-12%", up: false },
];

export default function Ticker() {
  return (
    <div className="relative border-y border-border bg-card/40 py-3 backdrop-blur">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
      <div className="overflow-hidden">
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...items].map((it, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">{it.l}</span>
              <span className={`font-semibold ${it.up ? "text-accent-emerald" : "text-destructive"}`}>{it.v}</span>
              {it.up ? (
                <TrendingUp className="h-3.5 w-3.5 text-accent-emerald" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-destructive" />
              )}
              <span className="ml-2 h-1 w-1 rounded-full bg-border" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
