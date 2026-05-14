import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Search, Tag, ArrowLeft, BookOpen } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import AmbientBackground from "@/components/site/AmbientBackground";
import { getPublishedPosts, getCategories } from "@/lib/blog-store";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Axiotta Technologies" },
      {
        name: "description",
        content:
          "Insights on NPA recovery, fintech compliance, and AI-driven debt resolution from the Axiotta team.",
      },
    ],
  }),
  component: BlogIndex,
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  Technology: "bg-primary/10 text-primary border-primary/20",
  Compliance: "bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20",
  Strategy: "bg-accent-gold/10 text-accent-gold border-accent-gold/20",
  General: "bg-muted text-muted-foreground border-border",
  All: "bg-foreground text-background border-foreground",
};

function BlogIndex() {
  const allPosts = getPublishedPosts();
  const categories = getCategories();
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = allPosts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = query.toLowerCase();
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchQ;
  });

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AmbientBackground />
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 pt-32 pb-24">
        {/* Back to home */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </motion.a>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5 text-primary-glow" />
            {allPosts.length} article{allPosts.length !== 1 ? "s" : ""}
          </div>
          <h1 className="text-5xl font-bold tracking-tight">
            Axiotta{" "}
            <span
              className="gradient-text bg-[length:200%_200%]"
              style={{ backgroundImage: "var(--gradient-text)" }}
            >
              Insights
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">
            Expert perspectives on NPA recovery, compliance, and the future of fintech.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                    active
                      ? (CATEGORY_COLORS[cat] ?? "bg-foreground text-background border-foreground")
                      : "border-border bg-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="h-8 rounded-xl border border-border bg-muted/50 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 w-48"
            />
          </div>
        </motion.div>

        {/* Post grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center text-muted-foreground"
            >
              No articles found. Try a different search or category.
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((post, i) => (
                <motion.a
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ y: -5 }}
                  className="group flex flex-col rounded-2xl border border-border bg-card shadow-card transition-all hover:shadow-elegant overflow-hidden"
                >
                  {/* Cover */}
                  <div className="relative h-36 bg-gradient-to-br from-primary/15 via-accent-emerald/10 to-transparent">
                    <div className="absolute inset-0 grid-bg opacity-20" />
                    <span
                      className={`absolute bottom-3 left-3 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS.General
                      }`}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="mt-1.5 flex-1 text-xs text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-0.5 rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                          >
                            <Tag className="h-2.5 w-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Meta */}
                    <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border pt-3">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} min read
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
