import { createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, User, Share2 } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import AmbientBackground from "@/components/site/AmbientBackground";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog-store";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPostBySlug(params.slug);
    return {
      meta: post
        ? [
            { title: `${post.title} — Axiotta Blog` },
            { name: "description", content: post.excerpt },
            { property: "og:title", content: post.title },
            { property: "og:description", content: post.excerpt },
            { property: "og:type", content: "article" },
          ]
        : [{ title: "Post not found — Axiotta Blog" }],
    };
  },
  component: BlogPost,
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  Technology: "bg-primary/10 text-primary",
  Compliance: "bg-accent-emerald/10 text-accent-emerald",
  Strategy: "bg-accent-gold/10 text-accent-gold",
  General: "bg-muted text-muted-foreground",
};

function BlogPost() {
  const { slug } = Route.useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main className="relative min-h-screen overflow-hidden">
        <AmbientBackground />
        <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center px-4">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-muted-foreground">This article doesn't exist or has been removed.</p>
          <a
            href="/blog"
            className="mt-2 inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  // Related posts (same category, excluding current)
  const related = getPublishedPosts()
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: post!.title, text: post!.excerpt, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AmbientBackground />
      <Navbar />

      <div className="mx-auto max-w-3xl px-4 pt-32 pb-24">
        {/* Back */}
        <motion.a
          href="/blog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All articles
        </motion.a>

        {/* Category */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium ${
            CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS.General
          }`}
        >
          {post.category}
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl font-bold leading-tight tracking-tight md:text-5xl"
        >
          {post.title}
        </motion.h1>

        {/* Meta bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 flex flex-wrap items-center gap-5 border-b border-border pb-6 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" /> {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {post.readingTime} min read
          </span>
          <button
            onClick={handleShare}
            className="ml-auto flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs transition-colors hover:bg-accent"
          >
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
        </motion.div>

        {/* Excerpt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-6 text-lg text-muted-foreground leading-relaxed"
        >
          {post.excerpt}
        </motion.p>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="blog-content mt-8 text-base leading-relaxed text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-10 flex flex-wrap gap-2 border-t border-border pt-8"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
              >
                <Tag className="h-3 w-3" /> {tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-accent-emerald/5 to-transparent p-8 text-center"
        >
          <h3 className="text-xl font-semibold">Ready to transform your recovery operations?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Talk to our team and see how Axiotta's platform can work for your institution.
          </p>
          <a
            href="/#contact"
            className="mt-5 inline-flex items-center gap-2 rounded-xl gradient-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:scale-105"
          >
            Request Consultation
          </a>
        </motion.div>

        {/* Related posts */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-16"
          >
            <h3 className="mb-6 text-lg font-semibold">More in {post.category}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <a
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-elegant hover:-translate-y-1"
                >
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {r.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.excerpt}</p>
                  <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {r.readingTime} min read
                  </p>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  );
}
