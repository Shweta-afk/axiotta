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
    <section id="careers" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Briefcase className="h-4 w-4" /> We're Hiring
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Build the future of <span className="gradient-text">debt recovery</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
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
              className="rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium shadow-card"
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
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-elegant md:p-12"
        >
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-foreground/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-foreground/5 blur-3xl" />

          <div className="relative">
            <h3 className="mb-6 text-xl font-semibold">Apply now</h3>

            {status === "ok" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-16 text-center"
              >
                <CheckCircle className="h-14 w-14 text-accent-emerald" />
                <h4 className="text-xl font-semibold">Application received!</h4>
                <p className="max-w-sm text-muted-foreground">
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
                    <label className="mb-1.5 block text-xs text-muted-foreground">Position *</label>
                    <select
                      value={form.position}
                      onChange={(e) => set("position", e.target.value)}
                      className="w-full rounded-xl border border-border bg-white/5 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
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
                  <label className="mb-1.5 block text-xs text-muted-foreground">Cover Letter *</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Tell us about yourself, why you want to join Axiotta, and what you'd bring to the team…"
                    className="w-full rounded-xl border border-border bg-white/5 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary resize-none"
                  />
                </div>

                {/* Resume upload */}
                <div>
                  <label className="mb-1.5 block text-xs text-muted-foreground">
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
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-primary/5 px-4 py-3 text-sm">
                      <Upload className="h-4 w-4 shrink-0 text-primary" />
                      <span className="flex-1 truncate font-medium">{resumeFile.name}</span>
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
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border px-4 py-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <Upload className="h-4 w-4" /> Click to upload resume
                    </button>
                  )}
                </div>

                {/* Error */}
                {status === "err" && (
                  <p className="flex items-center gap-1.5 text-xs text-destructive">
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
      </div>
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
      <label className="mb-1.5 block text-xs text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-white/5 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}
