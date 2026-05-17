import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { RichTextEditor } from "@/components/site/RichTextEditor";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  Lock,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Save,
  FileText,
  Settings,
  Loader2,
} from "lucide-react";
import logo from "@/images/axiotta-logo-r.png";
import {
  getAllPostsFn,
  createPostFn,
  updatePostFn,
  deletePostFn,
  type BlogPost,
  type CreatePostInput,
} from "@/lib/blog-api";
import {
  isAdminLoggedIn,
  adminLogin,
  adminLogout,
  changeAdminPassword,
} from "@/lib/blog-store";

export const Route = createFileRoute("/admin/blog")({
  head: () => ({ meta: [{ title: "Blog Admin — Axiotta" }] }),
  component: AdminBlog,
});

// ── helpers ───────────────────────────────────────────────────
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const CATEGORIES = ["Technology", "Compliance", "Strategy", "General", "Product", "News"];

const emptyForm: CreatePostInput = {
  title: "",
  excerpt: "",
  content: "",
  category: "General",
  tags: "",
  author: "Axiotta Team",
  published: false,
};

// ── Login Screen ──────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (adminLogin(password)) {
      onLogin();
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 flex flex-col items-center gap-3">
          <img src={logo} alt="Axiotta" className="h-14 w-auto" />
          <p className="text-sm text-muted-foreground">Blog Admin Panel</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="mb-6 flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Owner Access</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">Password</label>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter admin password"
                className="w-full rounded-xl border border-border bg-muted/50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            {error && (
              <p className="flex items-center gap-1.5 text-xs text-destructive">
                <XCircle className="h-3.5 w-3.5" /> {error}
              </p>
            )}
            <button
              type="submit"
              className="mt-1 w-full rounded-xl gradient-primary py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>

          <p className="mt-5 text-center text-[11px] text-muted-foreground">
            Default password: <code className="rounded bg-muted px-1 py-0.5">axiotta2025</code>
            <br />
            Change it in Settings after logging in.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ── Post Editor ───────────────────────────────────────────────
function PostEditor({
  initial,
  onSave,
  onCancel,
}: {
  initial: CreatePostInput;
  onSave: (data: CreatePostInput) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<CreatePostInput>(initial);
  const [preview, setPreview] = useState(false);

  function set<K extends keyof CreatePostInput>(key: K, value: CreatePostInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{initial.title ? "Edit Post" : "New Post"}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setPreview((p) => !p)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs transition-colors hover:bg-accent"
          >
            {preview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {preview ? "Edit" : "Preview"}
          </button>
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs transition-colors hover:bg-accent"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="inline-flex items-center gap-1.5 rounded-xl gradient-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-glow transition-all hover:scale-105"
          >
            <Save className="h-3.5 w-3.5" /> Save
          </button>
        </div>
      </div>

      {preview ? (
        /* ── Preview ── */
        <div className="rounded-2xl border border-border bg-card p-8">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary">
            {form.category}
          </span>
          <h1 className="mt-3 text-3xl font-bold">{form.title || "Untitled"}</h1>
          <p className="mt-3 text-muted-foreground">{form.excerpt}</p>
          <div
            className="blog-content mt-6 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: form.content || "<p>No content yet.</p>" }}
          />
        </div>
      ) : (
        /* ── Form ── */
        <div className="grid gap-5">
          {/* Title */}
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Title *</label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Your blog post title…"
              className="w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">
              Excerpt (shown in listing) *
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={2}
              placeholder="A short summary of the post…"
              className="w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Content */}
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Content *</label>
            <RichTextEditor
              value={form.content}
              onChange={(html) => set("content", html)}
              placeholder="Write your full article here… Use the toolbar above for formatting. Paste or drag images directly."
            />
            <p className="mt-1 text-[10px] text-muted-foreground">
              Tip: Paste images directly from your clipboard, or drag & drop them into the editor. Use the image button to insert by URL.
            </p>
          </div>

          {/* Row: Category + Author */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Category</label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Author</label>
              <input
                value={form.author}
                onChange={(e) => set("author", e.target.value)}
                placeholder="Axiotta Team"
                className="w-full rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">
              Tags (comma-separated)
            </label>
            <input
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
              placeholder="AI, Recovery, Compliance"
              className="w-full rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Publish toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => set("published", !form.published)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                form.published ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform mt-0.5 ${
                  form.published ? "translate-x-5.5" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className="text-sm">
              {form.published ? (
                <span className="text-accent-emerald font-medium">Published — visible to readers</span>
              ) : (
                <span className="text-muted-foreground">Draft — not visible to readers</span>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Settings panel ────────────────────────────────────────────
function SettingsPanel() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function handleChange(e: React.FormEvent) {
    e.preventDefault();
    if (next !== confirm) {
      setMsg({ type: "err", text: "New passwords don't match." });
      return;
    }
    if (next.length < 8) {
      setMsg({ type: "err", text: "Password must be at least 8 characters." });
      return;
    }
    const ok = changeAdminPassword(current, next);
    if (ok) {
      setMsg({ type: "ok", text: "Password changed successfully." });
      setCurrent("");
      setNext("");
      setConfirm("");
    } else {
      setMsg({ type: "err", text: "Current password is incorrect." });
    }
  }

  return (
    <div className="max-w-md">
      <h2 className="mb-6 text-lg font-semibold">Change Admin Password</h2>
      <form onSubmit={handleChange} className="flex flex-col gap-4">
        {[
          { label: "Current Password", value: current, set: setCurrent },
          { label: "New Password", value: next, set: setNext },
          { label: "Confirm New Password", value: confirm, set: setConfirm },
        ].map(({ label, value, set }) => (
          <div key={label}>
            <label className="mb-1 block text-xs text-muted-foreground">{label}</label>
            <input
              type="password"
              value={value}
              onChange={(e) => {
                set(e.target.value);
                setMsg(null);
              }}
              className="w-full rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        ))}
        {msg && (
          <p
            className={`flex items-center gap-1.5 text-xs ${
              msg.type === "ok" ? "text-accent-emerald" : "text-destructive"
            }`}
          >
            {msg.type === "ok" ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
            {msg.text}
          </p>
        )}
        <button
          type="submit"
          className="mt-1 w-fit rounded-xl gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:scale-105"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

// ── Main Admin Panel ──────────────────────────────────────────
function AdminPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"posts" | "settings">("posts");
  const [editing, setEditing] = useState<{ id?: string; form: CreatePostInput } | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      const data = await getAllPostsFn();
      setPosts(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, []);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  function handleLogout() {
    adminLogout();
    window.location.reload();
  }

  async function handleSave(data: CreatePostInput) {
    if (!data.title.trim() || !data.content.trim()) {
      showToast("Title and content are required.", false);
      return;
    }
    try {
      if (editing?.id) {
        await updatePostFn({ data: { id: editing.id, ...data } });
        showToast("Post updated successfully.");
      } else {
        await createPostFn({ data });
        showToast("Post created successfully.");
      }
      setEditing(null);
      await refresh();
    } catch {
      showToast("Failed to save post. Please try again.", false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    try {
      await deletePostFn({ data: id });
      showToast("Post deleted.");
      await refresh();
    } catch {
      showToast("Failed to delete post.", false);
    }
  }

  async function handleTogglePublish(post: BlogPost) {
    try {
      await updatePostFn({ data: { id: post.id, tags: post.tags.join(", "), published: !post.published } });
      showToast(post.published ? "Post unpublished." : "Post published.");
      await refresh();
    } catch {
      showToast("Failed to update post.", false);
    }
  }

  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.length - publishedCount;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Axiotta" className="h-10 w-auto" />
            <span className="text-sm font-semibold text-muted-foreground">/ Blog Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setView("posts"); setEditing(null); }}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs transition-colors ${
                view === "posts" ? "bg-accent font-medium" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <FileText className="h-3.5 w-3.5" /> Posts
            </button>
            <button
              onClick={() => { setView("settings"); setEditing(null); }}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs transition-colors ${
                view === "settings" ? "bg-accent font-medium" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Settings className="h-3.5 w-3.5" /> Settings
            </button>
            <a
              href="/blog"
              target="_blank"
              className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs transition-colors hover:bg-accent"
            >
              <Eye className="h-3.5 w-3.5" /> View Blog
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed right-4 top-20 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-white shadow-elegant ${
              toast.ok ? "bg-accent-emerald" : "bg-destructive"
            }`}
          >
            {toast.ok ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        {view === "settings" ? (
          <SettingsPanel />
        ) : editing ? (
          <PostEditor
            initial={editing.form}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Total Posts", value: posts.length, color: "text-foreground" },
                { label: "Published", value: publishedCount, color: "text-accent-emerald" },
                { label: "Drafts", value: draftCount, color: "text-accent-gold" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-card px-6 py-4 shadow-card"
                >
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className={`mt-1 text-3xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Header + New button */}
            <div className="mb-5 flex items-center justify-between">
              <h1 className="text-xl font-semibold">All Posts</h1>
              <button
                onClick={() => setEditing({ form: emptyForm })}
                className="inline-flex items-center gap-2 rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:scale-105"
              >
                <PlusCircle className="h-4 w-4" /> New Post
              </button>
            </div>

            {/* Post list */}
            {loading ? (
              <div className="py-24 text-center text-muted-foreground flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" /> Loading posts…
              </div>
            ) : posts.length === 0 ? (
              <div className="py-24 text-center text-muted-foreground">
                No posts yet.{" "}
                <button
                  onClick={() => setEditing({ form: emptyForm })}
                  className="text-primary underline underline-offset-2"
                >
                  Create your first post
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {posts
                  .sort(
                    (a, b) =>
                      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                  )
                  .map((post) => (
                    <motion.div
                      key={post.id}
                      layout
                      className="rounded-2xl border border-border bg-card shadow-card overflow-hidden"
                    >
                      {/* Row */}
                      <div className="flex items-center gap-4 px-5 py-4">
                        {/* Status dot */}
                        <span
                          className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                            post.published ? "bg-accent-emerald" : "bg-muted-foreground/40"
                          }`}
                        />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-medium text-sm text-foreground">
                            {post.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {post.category} · {formatDate(post.updatedAt)} ·{" "}
                            {post.published ? (
                              <span className="text-accent-emerald">Published</span>
                            ) : (
                              <span>Draft</span>
                            )}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex shrink-0 items-center gap-1.5">
                          <button
                            onClick={() => handleTogglePublish(post)}
                            title={post.published ? "Unpublish" : "Publish"}
                            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          >
                            {post.published ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              setEditing({
                                id: post.id,
                                form: {
                                  title: post.title,
                                  excerpt: post.excerpt,
                                  content: post.content,
                                  category: post.category,
                                  tags: post.tags.join(", "),
                                  author: post.author,
                                  published: post.published,
                                },
                              })
                            }
                            title="Edit"
                            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            title="Delete"
                            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              setExpandedId(expandedId === post.id ? null : post.id)
                            }
                            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent"
                          >
                            {expandedId === post.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expanded excerpt */}
                      <AnimatePresence>
                        {expandedId === post.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-border px-5 py-4 text-sm text-muted-foreground"
                          >
                            <p className="mb-2 line-clamp-3">{post.excerpt}</p>
                            {post.published && (
                              <a
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                              >
                                <Eye className="h-3 w-3" /> View live post
                              </a>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Root component with auth gate ─────────────────────────────
function AdminBlog() {
  const [loggedIn, setLoggedIn] = useState(() => isAdminLoggedIn());

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return <AdminPanel />;
}
