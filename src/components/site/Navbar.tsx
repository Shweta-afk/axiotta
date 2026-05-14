import { motion } from "framer-motion";
import logo from "../../images/axiotta-logo-r.png";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#stats", label: "Impact" },
  { href: "/blog", label: "Blog" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
  { href: "/#careers", label: "Careers" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-8xl px-4">
        <div className="glass-strong flex items-center justify-between rounded-2xl px-6 py-3">
          
          {/* Logo Section */}
          <a href="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Axiotta Technologies"
              className="h-14 w-auto"
            />
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href="/#contact"
            className="rounded-xl gradient-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:scale-105"
          >
            Consult Now
          </a>

        </div>
      </div>
    </motion.header>
  );
}
