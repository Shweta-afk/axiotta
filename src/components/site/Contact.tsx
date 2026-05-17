import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { submitContact } from "@/lib/contact-api";

const trustStats = [
  { value: "₹1,200 Cr+", label: "NPA recovered" },
  { value: "50+", label: "Lender clients" },
  { value: "95%", label: "Compliance rate" },
];

const steps = [
  "Submit the form — takes 90 seconds",
  "A strategist reviews your portfolio profile",
  "You get a tailored recovery plan within 24 hrs",
];

type Status = "idle" | "loading" | "ok" | "err";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("loading");
    setErrMsg("");

    try {
      await submitContact({
        data: {
          name: fd.get("name") as string,
          company: fd.get("company") as string,
          email: fd.get("email") as string,
          phone: fd.get("phone") as string,
          message: fd.get("message") as string,
        },
      });
      setStatus("ok");
      formRef.current?.reset();
    } catch (err: unknown) {
      setErrMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email us at partners@verisolve.in"
      );
      setStatus("err");
    }
  }

  return (
    <section id="contact" className="relative py-0 overflow-hidden">
      <div className="relative bg-foreground">
        {/* Background texture */}
        <div className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 60% at 15% 50%, oklch(0.55 0.2 250 / 0.18) 0%, transparent 60%), " +
              "radial-gradient(ellipse 50% 50% at 85% 20%, oklch(0.62 0.16 162 / 0.12) 0%, transparent 55%), " +
              "radial-gradient(ellipse 40% 60% at 80% 90%, oklch(0.55 0.2 250 / 0.1) 0%, transparent 50%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-28 md:py-36">
          <div className="grid items-start gap-16 lg:grid-cols-[1fr_480px]">

            {/* ── Left: copy + trust ── */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">
                <motion.span
                  className="h-2 w-2 rounded-full bg-[oklch(0.74_0.13_162)]"
                  animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                Recovery team available now
              </div>

              <h2 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">
                Start recovering<br />
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, oklch(0.7 0.18 230), oklch(0.74 0.13 162))" }}>
                  faster today
                </span>
              </h2>
              <p className="mt-5 max-w-md text-base text-white/55 leading-relaxed">
                Talk to a recovery strategist. We'll respond within one business day with a tailored recovery plan for your portfolio.
              </p>

              <div className="mt-10 flex flex-wrap gap-6">
                {trustStats.map((s) => (
                  <div key={s.label} className="border-l-2 border-[oklch(0.55_0.2_250)] pl-4">
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-white/45 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-5">
                  What happens next
                </p>
                <ul className="space-y-4">
                  {steps.map((s, i) => (
                    <motion.li
                      key={s}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                      className="flex items-start gap-3 text-sm text-white/65"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/8 text-[10px] font-bold text-white/50 mt-0.5">
                        {i + 1}
                      </span>
                      {s}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 space-y-3.5 text-sm text-white/50">
                <a href="mailto:partners@verisolve.in" className="flex items-center gap-3 hover:text-white/80 transition-colors">
                  <Mail className="h-4 w-4 text-[oklch(0.65_0.18_230)]" />
                  partners@verisolve.in
                </a>
                <a href="tel:+919152285233" className="flex items-center gap-3 hover:text-white/80 transition-colors">
                  <Phone className="h-4 w-4 text-[oklch(0.65_0.18_230)]" />
                  +91 91522 85233
                </a>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[oklch(0.65_0.18_230)]" />
                  BKC, Mumbai · Bengaluru · Delhi NCR
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-[oklch(0.65_0.18_230)]" />
                  Mon–Sat, 9 AM – 7 PM IST
                </div>
              </div>
            </div>

            {/* ── Right: form card ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-primary/15 blur-2xl" />

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="relative rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl p-8 space-y-5"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">Request a consultation</h3>
                  <p className="mt-1 text-xs text-white/40">No commitment. Response within 24 hours.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <DarkField label="Name" name="name" required />
                  <DarkField label="Company" name="company" required />
                </div>
                <DarkField label="Work email" name="email" type="email" required />
                <DarkField label="Phone" name="phone" required />

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/50">
                    How can we help?
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-primary/60 focus:bg-white/8"
                    placeholder="Tell us about your portfolio…"
                  />
                </div>

                {/* Status messages */}
                {status === "ok" && (
                  <div className="flex items-center gap-2.5 rounded-xl bg-[oklch(0.74_0.13_162/0.15)] border border-[oklch(0.74_0.13_162/0.3)] px-4 py-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[oklch(0.74_0.13_162)]" />
                    <p className="text-sm font-medium text-[oklch(0.74_0.13_162)]">
                      Thank you — we'll be in touch within 24 hours.
                    </p>
                  </div>
                )}

                {status === "err" && (
                  <div className="flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
                    <AlertCircle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
                    <p className="text-sm text-red-300">{errMsg}</p>
                  </div>
                )}

                {status !== "ok" && (
                  <motion.button
                    whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                    whileTap={{ scale: status === "loading" ? 1 : 0.97 }}
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-semibold text-white shadow-glow transition-opacity disabled:opacity-70"
                    style={{ background: "linear-gradient(135deg, oklch(0.55 0.2 250), oklch(0.7 0.18 230))" }}
                  >
                    {status === "loading" ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                    ) : (
                      <>
                        Request Consultation
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.span>
                      </>
                    )}
                  </motion.button>
                )}

                <p className="text-center text-[11px] text-white/25">
                  By submitting you agree to our privacy policy. We never spam.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DarkField({
  label, name, type = "text", required = false,
}: {
  label: string; name: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-white/50">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-primary/60 focus:bg-white/8"
      />
    </div>
  );
}
