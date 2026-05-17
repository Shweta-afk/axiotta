import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight, Briefcase, Upload, X, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { submitApplication } from "@/lib/careers-api";
import type { ApplicationPayload } from "@/lib/careers-api";

const OPEN_ROLES = [
  "Recovery Operations Analyst",
  "Business Development Manager",
  "Compliance & Legal Officer",
  "Software Engineer",
  "Product Manager",
  "Data Scientist / ML Engineer",
  "Customer Success Manager",
  "Other / General Application",
];

const MAX_FILE_MB = 5;
const ACCEPT = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export default function Careers() {
  const [form, setForm] = useState<Omit<ApplicationPayload, "resumeBase64" | "resumeName" | "resumeMime">>({
    name: "",
    email: "",
    phone: "",
    position: OPEN_ROLES[0],
    linkedin: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setErrMsg(`Resume must be under ${MAX_FILE_MB} MB.`);
      setStatus("err");
      return;
    }
    setResumeFile(file);
    setStatus("idle");
    setErrMsg("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrMsg("Please fill in Name, Email, and Cover Letter.");
      setStatus("err");
      return;
    }
    setStatus("sending");
    setErrMsg("");

    try {
      let resumeBase64: string | undefined;
      let resumeName: string | undefined;
      let resumeMime: string | undefined;

      if (resumeFile) {
        resumeName = resumeFile.name;
        resumeMime = resumeFile.type;
        const buf = await resumeFile.arrayBuffer();
        resumeBase64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      }

      await submitApplication({
        data: { ...form, resumeBase64, resumeName, resumeMime },
      });
      setStatus("ok");
    } catch (err: unknown) {
      setErrMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
      setStatus("err");
    }
  }

  return (
    <section id="careers" className="relative py-0 overflow-hidden">
      <div className="relative bg-foreground">
        {/* Background texture */}
        <div className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 80% 20%, oklch(0.55 0.2 250 / 0.12) 0%, transparent 60%), " +
              "radial-gradient(ellipse 50% 60% at 10% 80%, oklch(0.62 0.16 162 / 0.1) 0%, transparent 55%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

      <div className="relative mx-auto max-w-6xl px-4 py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
            <Briefcase className="h-4 w-4" /> We're Hiring
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Build the future of{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, oklch(0.7 0.18 230), oklch(0.74 0.13 162))" }}>
              debt recovery
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/50">
            Join a fast-growing fintech solving one of India's biggest financial challenges. We value
            ownership, curiosity, and people who get things done.
          </p>
        </motion.div>

        {/* Open roles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {OPEN_ROLES.slice(0, -1).map((role) => (
            <div
              key={role}
              className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm font-medium text-white/80"
            >
              {role}
            </div>
          ))}
        </motion.div>

        {/* Application form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl p-8 md:p-12"
        >
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[oklch(0.62_0.16_162)]/10 blur-3xl" />

          <div className="relative">
            <h3 className="mb-6 text-xl font-semibold text-white">Apply now</h3>

            {status === "ok" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-16 text-center"
              >
                <CheckCircle className="h-14 w-14 text-[oklch(0.74_0.13_162)]" />
                <h4 className="text-xl font-semibold text-white">Application received!</h4>
                <p className="max-w-sm text-white/50">
                  Thanks for applying. Our team will review your application and reach out within 5 business days.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                {/* Row 1 */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name *" value={form.name} onChange={(v) => set("name", v)} placeholder="Priya Sharma" />
                  <Field label="Email *" type="email" value={form.email} onChange={(v) => set("email", v)} placeholder="priya@example.com" />
                </div>

                {/* Row 2 */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+91 98765 43210" />
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/50">Position *</label>
                    <select
                      value={form.position}
                      onChange={(e) => set("position", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-primary/60 focus:bg-white/8"
                    >
                      {OPEN_ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* LinkedIn */}
                <Field
                  label="LinkedIn / Portfolio URL"
                  value={form.linkedin ?? ""}
                  onChange={(v) => set("linkedin", v)}
                  placeholder="https://linkedin.com/in/your-profile"
                />

                {/* Cover letter */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/50">Cover Letter *</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Tell us about yourself, why you want to join Axiotta, and what you'd bring to the team…"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-primary/60 focus:bg-white/8 resize-none"
                  />
                </div>

                {/* Resume upload */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/50">
                    Resume (PDF or Word, max {MAX_FILE_MB} MB)
                  </label>
                  <input
                    ref={fileRef}
                    type="file"
                    accept={ACCEPT}
                    onChange={handleFile}
                    className="hidden"
                  />
                  {resumeFile ? (
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                      <Upload className="h-4 w-4 shrink-0 text-[oklch(0.7_0.18_230)]" />
                      <span className="flex-1 truncate font-medium text-white">{resumeFile.name}</span>
                      <button
                        type="button"
                        onClick={() => { setResumeFile(null); if (fileRef.current) fileRef.current.value = ""; }}
                        className="rounded-lg p-1 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 px-4 py-4 text-sm text-white/40 transition-colors hover:border-primary/60 hover:text-white/70"
                    >
                      <Upload className="h-4 w-4" /> Click to upload resume
                    </button>
                  )}
                </div>

                {/* Error */}
                {status === "err" && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400">
                    <XCircle className="h-3.5 w-3.5 shrink-0" /> {errMsg}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-primary px-5 py-3 font-medium text-primary-foreground shadow-glow disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                  ) : (
                    <>Submit Application <ArrowRight className="h-4 w-4" /></>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>{/* end relative mx-auto */}
      </div>{/* end relative bg-foreground */}
    </section>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-white/50">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-primary/60 focus:bg-white/8"
      />
    </div>
  );
}
