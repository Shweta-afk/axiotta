// =============================================================
// blog-api.ts  —  Server functions backed by Cloudflare D1
// All blog reads/writes go through here; NO localStorage.
// =============================================================
import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

// ── Types ─────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  published: boolean;
  readingTime: number;
}

export interface CreatePostInput {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;        // comma-separated string from form
  author: string;
  published: boolean;
}

// ── Row shape coming out of D1 ─────────────────────────────────
interface DbRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;           // JSON string
  author: string;
  cover_image: string | null;
  published: number;      // 0 or 1
  reading_time: number;
  published_at: string;
  updated_at: string;
}

function rowToPost(r: DbRow): BlogPost {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    category: r.category,
    tags: JSON.parse(r.tags ?? "[]"),
    author: r.author,
    coverImage: r.cover_image ?? undefined,
    published: r.published === 1,
    readingTime: r.reading_time,
    publishedAt: r.published_at,
    updatedAt: r.updated_at,
  };
}

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

// ── Server functions ───────────────────────────────────────────

export const getAllPostsFn = createServerFn({ method: "GET" }).handler(async () => {
  const { results } = await (env as unknown as Env).DB
    .prepare("SELECT * FROM posts ORDER BY updated_at DESC")
    .all<DbRow>();
  return results.map(rowToPost);
});

export const getPublishedPostsFn = createServerFn({ method: "GET" }).handler(async () => {
  const { results } = await (env as unknown as Env).DB
    .prepare("SELECT * FROM posts WHERE published = 1 ORDER BY published_at DESC")
    .all<DbRow>();
  return results.map(rowToPost);
});

export const getPostBySlugFn = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const row = await (env as unknown as Env).DB
      .prepare("SELECT * FROM posts WHERE slug = ? AND published = 1")
      .bind(slug)
      .first<DbRow>();
    return row ? rowToPost(row) : null;
  });

export const createPostFn = createServerFn({ method: "POST" })
  .inputValidator((input: CreatePostInput) => input)
  .handler(async ({ data }) => {
    const db = (env as unknown as Env).DB;
    const baseSlug = slugify(data.title);
    let slug = baseSlug;
    let counter = 1;
    while (true) {
      const existing = await db
        .prepare("SELECT id FROM posts WHERE slug = ?")
        .bind(slug)
        .first();
      if (!existing) break;
      slug = `${baseSlug}-${counter++}`;
    }
    const now = new Date().toISOString();
    const id = `${Date.now()}`;
    const tags = JSON.stringify(
      data.tags.split(",").map((t) => t.trim()).filter(Boolean)
    );
    await db
      .prepare(
        `INSERT INTO posts (id, slug, title, excerpt, content, category, tags, author, published, reading_time, published_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        id, slug, data.title.trim(), data.excerpt.trim(), data.content.trim(),
        data.category.trim() || "General", tags,
        data.author.trim() || "Axiotta Team",
        data.published ? 1 : 0,
        readingTime(data.content),
        now, now
      )
      .run();
    const row = await db.prepare("SELECT * FROM posts WHERE id = ?").bind(id).first<DbRow>();
    return row ? rowToPost(row) : null;
  });

export const updatePostFn = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string } & Partial<CreatePostInput>) => input)
  .handler(async ({ data }) => {
    const db = (env as unknown as Env).DB;
    const { id, ...fields } = data;
    const now = new Date().toISOString();
    const sets: string[] = ["updated_at = ?"];
    const values: unknown[] = [now];

    if (fields.title !== undefined) {
      sets.push("title = ?", "slug = ?");
      values.push(fields.title.trim(), slugify(fields.title));
    }
    if (fields.excerpt !== undefined) { sets.push("excerpt = ?"); values.push(fields.excerpt.trim()); }
    if (fields.content !== undefined) {
      sets.push("content = ?", "reading_time = ?");
      values.push(fields.content.trim(), readingTime(fields.content));
    }
    if (fields.category !== undefined) { sets.push("category = ?"); values.push(fields.category.trim()); }
    if (fields.tags !== undefined) {
      sets.push("tags = ?");
      values.push(JSON.stringify(fields.tags.split(",").map((t) => t.trim()).filter(Boolean)));
    }
    if (fields.author !== undefined) { sets.push("author = ?"); values.push(fields.author.trim()); }
    if (fields.published !== undefined) { sets.push("published = ?"); values.push(fields.published ? 1 : 0); }

    values.push(id);
    await db.prepare(`UPDATE posts SET ${sets.join(", ")} WHERE id = ?`).bind(...values).run();
    const row = await db.prepare("SELECT * FROM posts WHERE id = ?").bind(id).first<DbRow>();
    return row ? rowToPost(row) : null;
  });

export const deletePostFn = createServerFn({ method: "POST" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    await (env as unknown as Env).DB
      .prepare("DELETE FROM posts WHERE id = ?")
      .bind(id)
      .run();
    return { ok: true };
  });

export const getCategoriesFn = createServerFn({ method: "GET" }).handler(async () => {
  const { results } = await (env as unknown as Env).DB
    .prepare("SELECT DISTINCT category FROM posts WHERE published = 1")
    .all<{ category: string }>();
  return ["All", ...results.map((r) => r.category)];
});
