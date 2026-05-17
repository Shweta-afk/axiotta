import { motion } from "framer-motion";

const logos = [
  { src: "/clients/au-bank.png",       alt: "AU Small Finance Bank" },
  { src: "/clients/rbl-bank.png",      alt: "RBL Bank" },
  { src: "/clients/onecard.png",       alt: "OneCard" },
  { src: "/clients/tvs-credit.png",    alt: "TVS Credit" },
  { src: "/clients/incred.png",        alt: "InCred Finance" },
  { src: "/clients/home-credit.png",   alt: "Home Credit" },
  { src: "/clients/tru.png",           alt: "Tru" },
  { src: "/clients/loantap.png",       alt: "LoanTap" },
  { src: "/clients/bajaj-finserv.png", alt: "Bajaj Finserv" },
  { src: "/clients/axio.png",          alt: "Axio" },
  { src: "/clients/liquiloans.png",    alt: "LiquiLoans" },
  { src: "/clients/neogrowth.png",     alt: "NeoGrowth" },
  { src: "/clients/cred.png",          alt: "CRED" },
];

export default function Clients() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">

        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-10">
          Trusted by leading banks, NBFCs &amp; fintechs
        </p>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.alt}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex h-16 w-36 sm:h-[72px] sm:w-44 items-center justify-center
                         rounded-2xl border border-border bg-white px-5 shadow-sm
                         hover:border-primary/25 hover:shadow-md transition-all"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-9 max-w-full object-contain"
                draggable={false}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const span = target.nextElementSibling as HTMLElement;
                  if (span) span.style.display = "flex";
                }}
              />
              <span
                className="hidden items-center justify-center text-[11px] font-semibold text-muted-foreground text-center leading-tight"
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
