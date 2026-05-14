// =============================================================
// blog-store.ts
// Simple in-memory blog store with localStorage persistence.
// Owner writes via /admin/blog. Readers see /blog and /blog/:slug
// =============================================================

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;       // markdown-ish plain text / HTML string
  coverImage?: string;   // URL or data-uri
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;   // ISO string
  updatedAt: string;
  published: boolean;
  readingTime: number;   // minutes
}

// ── seed data (shown on first load) ──────────────────────────
const SEED_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "ai-powered-npa-recovery",
    title: "How AI is Transforming NPA Recovery in India",
    excerpt:
      "Discover how machine-learning models are cutting average time-to-recovery by 40% while keeping every step RBI-compliant.",
    content: `<p>Non-Performing Assets (NPAs) remain one of the most pressing challenges for Indian banks, NBFCs, and fintechs. Traditional recovery methods are slow, paper-heavy, and often legally fragile. Artificial intelligence is changing that equation dramatically.</p>

<h2>Predictive Risk Scoring</h2>
<p>Modern AI models ingest hundreds of data signals — repayment history, bureau scores, cash-flow patterns, even behavioural metadata — to produce a real-time risk score for each borrower account. This lets recovery teams triage intelligently: high-propensity payers receive digital nudges, while complex cases are routed to specialist agents immediately.</p>

<h2>Automated Compliance Guardrails</h2>
<p>RBI's FMRG guidelines require specific notice timelines, language standards, and channel protocols. AI-driven workflow engines enforce these guardrails automatically, generating audit-ready logs for every interaction — eliminating the compliance risk that sinks manual operations.</p>

<h2>Results We're Seeing</h2>
<p>Across our client portfolio, AI-assisted recovery has delivered a 38% reduction in Days-Past-Due (DPD) and a 95%+ legal compliance rate. The technology doesn't replace field agents — it makes each agent 3× more effective by surfacing the right action at the right moment.</p>

<p>If you'd like to explore what an AI-native recovery stack could look like for your institution, <a href="/#contact">reach out to our team</a>.</p>`,
    category: "Technology",
    tags: ["AI", "NPA", "Recovery", "Fintech"],
    author: "Axiotta Team",
    publishedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    published: true,
    readingTime: 4,
  },
  {
    id: "2",
    slug: "rbi-fmrg-compliance-guide-2025",
    title: "RBI FMRG Compliance: A Practical Guide for Recovery Teams",
    excerpt:
      "A plain-language breakdown of the Fair Market Related Guidelines — what your recovery operation must do to stay on the right side of the regulator.",
    content: `<p>The Reserve Bank of India's Fair Market Related Guidelines (FMRG) set the floor for ethical recovery practice. Non-compliance isn't just a reputational risk — it can lead to regulatory action, licence suspension, and civil liability. Here's what every recovery manager needs to know.</p>

<h2>Notice Requirements</h2>
<p>Before initiating any outreach, lenders must issue a formal demand notice with a minimum seven-day response window. The notice must be in the borrower's preferred language (if declared), reference the specific account, and clearly state the outstanding amount inclusive of all charges.</p>

<h2>Contact Hour Restrictions</h2>
<p>Agent contact is permitted only between 07:00 and 19:00 local time. Calls outside this window, regardless of consent, are a per-se violation. Automated diallers must carry timezone intelligence to enforce this.</p>

<h2>Documentation and Audit Trails</h2>
<p>Every communication — SMS, email, call, physical notice — must be logged with timestamps, content summaries, and agent IDs. Audit records must be retained for a minimum of five years. Cloud-based case management systems make this tractable; spreadsheets do not.</p>

<h2>How Axiotta Helps</h2>
<p>Our platform was built compliance-first. Every workflow has FMRG guardrails baked in, and our reporting module produces regulator-ready audit packages on demand. <a href="/#contact">Book a demo</a> to see it in action.</p>`,
    category: "Compliance",
    tags: ["RBI", "Compliance", "FMRG", "Regulation"],
    author: "Axiotta Legal Desk",
    publishedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    published: true,
    readingTime: 5,
  },
  {
    id: "3",
    slug: "debt-recovery-digital-channels",
    title: "Digital Channels Are Winning the Recovery Race — Here's Why",
    excerpt:
      "WhatsApp, email, and app-based nudges are outperforming phone calls in settlement rate. The data tells a clear story.",
    content: `<p>For decades, the telephone call dominated debt recovery. Field agents and call-centre agents were the primary touch-points. In 2024 and 2025, that dynamic has reversed — and the data is striking.</p>

<h2>Why Digital Wins</h2>
<p>Borrowers increasingly prefer async communication. A WhatsApp message can be read at a convenient moment; a phone call demands immediate attention and often triggers defensive reactions. Our A/B tests across 50,000+ recovery contacts show digital-first outreach achieves a 22% higher promise-to-pay rate compared to call-first sequences.</p>

<h2>The Channel Stack That Works</h2>
<p>The highest-performing recovery journeys layer channels intelligently: an initial SMS with a payment link, followed by a WhatsApp message 48 hours later if unpaid, an in-app notification at day 5, and a human call only at day 8. This sequence respects borrower preferences while maximising resolution speed.</p>

<h2>Personalisation Is the Differentiator</h2>
<p>Generic messages convert poorly. Personalised messages — referencing the borrower's name, the specific loan product, and the exact amount due — convert 3× better. Modern CRM platforms make this personalisation automatic, not manual.</p>

<p>Axiotta's platform orchestrates these multi-channel journeys automatically, with full FMRG compliance at every step. <a href="/#contact">Get in touch</a> to learn more.</p>`,
    category: "Strategy",
    tags: ["Digital", "WhatsApp", "Recovery Strategy", "Fintech"],
    author: "Axiotta Team",
    publishedAt: new Date(Date.now() - 21 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 21 * 86400000).toISOString(),
    published: true,
    readingTime: 4,
  },
];

// ── storage key ───────────────────────────────────────────────
const STORAGE_KEY = "axiotta_blog_posts";
const ADMIN_PASS_KEY = "axiotta_admin_pass";
const DEFAULT_ADMIN_PASSWORD = "axiotta2025"; // owner should change via admin panel

// ── helpers ───────────────────────────────────────────────────
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readingTime(content: string): number {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function loadPosts(): BlogPost[] {
  if (typeof localStorage === "undefined") return SEED_POSTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_POSTS));
      return SEED_POSTS;
    }
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return SEED_POSTS;
  }
}

function savePosts(posts: BlogPost[]): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// ── public API ────────────────────────────────────────────────

export function getAllPosts(): BlogPost[] {
  return loadPosts();
}

export function getPublishedPosts(): BlogPost[] {
  return loadPosts()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return loadPosts().find((p) => p.slug === slug && p.published);
}

export function getPostById(id: string): BlogPost | undefined {
  return loadPosts().find((p) => p.id === id);
}

export function getCategories(): string[] {
  const cats = new Set(loadPosts().filter((p) => p.published).map((p) => p.category));
  return ["All", ...Array.from(cats)];
}

export interface CreatePostInput {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  author: string;
  published: boolean;
}

export function createPost(input: CreatePostInput): BlogPost {
  const posts = loadPosts();
  const baseSlug = slugify(input.title);
  let slug = baseSlug;
  let counter = 1;
  while (posts.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${counter++}`;
  }
  const now = new Date().toISOString();
  const post: BlogPost = {
    id: `${Date.now()}`,
    slug,
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    content: input.content.trim(),
    category: input.category.trim() || "General",
    tags: input.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    author: input.author.trim() || "Axiotta Team",
    publishedAt: now,
    updatedAt: now,
    published: input.published,
    readingTime: readingTime(input.content),
  };
  savePosts([...posts, post]);
  return post;
}

export function updatePost(id: string, input: Partial<CreatePostInput>): BlogPost | undefined {
  const posts = loadPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  const existing = posts[idx];
  const updated: BlogPost = {
    ...existing,
    ...(input.title !== undefined && { title: input.title.trim(), slug: slugify(input.title) }),
    ...(input.excerpt !== undefined && { excerpt: input.excerpt.trim() }),
    ...(input.content !== undefined && {
      content: input.content.trim(),
      readingTime: readingTime(input.content),
    }),
    ...(input.category !== undefined && { category: input.category.trim() }),
    ...(input.tags !== undefined && {
      tags: input.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }),
    ...(input.author !== undefined && { author: input.author.trim() }),
    ...(input.published !== undefined && { published: input.published }),
    updatedAt: new Date().toISOString(),
  };
  posts[idx] = updated;
  savePosts(posts);
  return updated;
}

export function deletePost(id: string): boolean {
  const posts = loadPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  savePosts(filtered);
  return true;
}

// ── admin auth ────────────────────────────────────────────────
export function checkAdminPassword(password: string): boolean {
  if (typeof localStorage === "undefined") return password === DEFAULT_ADMIN_PASSWORD;
  const stored = localStorage.getItem(ADMIN_PASS_KEY) ?? DEFAULT_ADMIN_PASSWORD;
  return password === stored;
}

export function changeAdminPassword(current: string, next: string): boolean {
  if (!checkAdminPassword(current)) return false;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(ADMIN_PASS_KEY, next);
  }
  return true;
}

export function isAdminLoggedIn(): boolean {
  if (typeof sessionStorage === "undefined") return false;
  return sessionStorage.getItem("axiotta_admin_session") === "1";
}

export function adminLogin(password: string): boolean {
  if (!checkAdminPassword(password)) return false;
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem("axiotta_admin_session", "1");
  }
  return true;
}

export function adminLogout(): void {
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.removeItem("axiotta_admin_session");
  }
}
