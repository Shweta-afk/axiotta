import { motion } from "framer-motion";

const logos = [
  { src: "/clients/au-bank.png",     alt: "AU Small Finance Bank" },
  { src: "/clients/rbl-bank.png",    alt: "RBL Bank" },
  { src: "/clients/onecard.png",     alt: "OneCard" },
  { src: "/clients/tvs-credit.png",  alt: "TVS Credit" },
  { src: "/clients/incred.png",      alt: "InCred Finance" },
  { src: "/clients/home-credit.png", alt: "Home Credit" },
  { src: "/clients/tru.png",         alt: "Tru" },
  { src: "/clients/loantap.png",     alt: "LoanTap" },
  { src: "/clients/bajaj-finserv.png", alt: "Bajaj Finserv" },
  { src: "/clients/axio.png",        alt: "Axio" },
  { src: "/clients/liquiloans.png",  alt: "LiquiLoans" },
  { src: "/clients/neogrowth.png",   alt: "NeoGrowth" },
  { src: "/clients/cred.png",        alt: "CRED" },
];

export default function Clients() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Trusted by leading banks, NBFCs &amp; fintechs
        </p>
      </div>
      <div className="relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
          {[...logos, ...logos].map((logo, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.06 }}
              className="flex h-24 w-56 shrink-0 items-center justify-center rounded-2xl border border-border bg-white px-6 shadow-sm"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-14 max-w-full object-contain"
                draggable={false}
                onError={(e) => {
                  // Show alt text as fallback while images are missing
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const span = target.nextElementSibling as HTMLElement;
                  if (span) span.style.display = "block";
                }}
              />
              <span
                className="hidden text-xs font-semibold text-muted-foreground text-center leading-tight"
                style={{ display: "none" }}
              >
                {logo.alt}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
