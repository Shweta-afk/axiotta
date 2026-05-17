import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-8xl px-4">
        <div className="glass-strong rounded-2xl px-6 py-3">

          {/* Top bar */}
          <div className="flex items-center justify-between">

            {/* Logo */}
            <a href="/" className="flex shrink-0 items-center gap-3">
              <img
                src={logo}
                alt="Axiotta Technologies"
                className="h-9 w-auto sm:h-12 md:h-14"
              />
            </a>

            {/* Desktop nav links */}
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

            {/* Right side: CTA + hamburger */}
            <div className="flex shrink-0 items-center gap-3">
              <a
                href="/#contact"
                className="shrink-0 rounded-xl gradient-primary px-4 py-2 text-xs sm:px-5 sm:text-sm font-medium text-primary-foreground shadow-glow transition-all hover:scale-105"
              >
                Start Recovery
              </a>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setOpen((v) => !v)}
                className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white/5 text-foreground transition-colors hover:bg-white/10"
                aria-label="Toggle menu"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile dropdown menu */}
          <AnimatePresence>
            {open && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden md:hidden"
              >
                <div className="flex flex-col gap-1 pt-3 pb-1 border-t border-border/50 mt-3">
                  {links.map((l, i) => (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.04 }}
                      className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                    >
                      {l.label}
                    </motion.a>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.header>
  );
}
