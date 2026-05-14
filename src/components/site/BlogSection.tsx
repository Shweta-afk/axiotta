import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag, BookOpen } from "lucide-react";
import { getPublishedPosts } from "@/lib/blog-store";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  Technology: "bg-primary/10 text-primary",
  Compliance: "bg-accent-emerald/10 text-accent-emerald",
  Strategy: "bg-accent-gold/10 text-accent-gold",
  General: "bg-muted text-muted-foreground",
};

export default function BlogSection() {
  const posts = getPublishedPosts().slice(0, 3);

  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section id="blog" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5 text-primary-glow" />
              Insights &amp; Expertise
            </div>
            <h2 className="text-4xl font-bold tracking-tight">
              From the{" "}
              <span
                className="gradient-text bg-[length:200%_200%]"
                style={{ backgroundImage: "var(--gradient-text)" }}
              >
                Axiotta Blog
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Deep dives on recovery technology, compliance, and the future of fintech debt resolution.
            </p>
          </div>
          <a
            href="/blog"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            All articles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Featured post — takes 2 columns */}
          <motion.a
            href={`/blog/${featured.slug}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all hover:shadow-elegant lg:col-span-2"
          >
            {/* Gradient cover */}
            <div className="relative h-52 bg-gradient-to-br from-primary/20 via-accent-emerald/10 to-transparent">
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="absolute bottom-4 left-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    CATEGORY_COLORS[featured.category] ?? CATEGORY_COLORS.General
                  }`}
                >
                  {featured.category}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                {featured.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>{formatDate(featured.publishedAt)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {featured.readingTime} min read
                </span>
              </div>
            </div>
          </motion.a>

          {/* Remaining posts — stack vertically */}
          <div className="flex flex-col gap-6">
            {rest.map((post, i) => (
              <motion.a
                key={post.id}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
                whileHover={{ y: -3 }}
                className="group flex flex-1 flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-elegant"
              >
                <span
                  className={`mb-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS.General
                  }`}
                >
                  {post.category}
                </span>
                <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="mt-1.5 flex-1 text-xs text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingTime} min
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
