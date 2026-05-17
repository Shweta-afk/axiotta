import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Problems from "@/components/site/Problems";
import AmbientBackground from "@/components/site/AmbientBackground";
import Ticker from "@/components/site/Ticker";
import Services from "@/components/site/Services";
import Stats from "@/components/site/Stats";
import IndiaMap from "@/components/site/IndiaMap";
import Process from "@/components/site/Process";
import Differentiator from "@/components/site/Differentiator";
import Showcase from "@/components/site/Showcase";
import Clients from "@/components/site/Clients";
import About from "@/components/site/About";
import Contact from "@/components/site/Contact";
import Careers from "@/components/site/Careers";
import Footer from "@/components/site/Footer";
import BlogSection from "@/components/site/BlogSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Axiotta Technologies — AI-Powered Debt Recovery for Banks & NBFCs" },
      {
        name: "description",
        content:
          "Axiotta Technologies combines AI with 500+ field agents to recover NPAs faster, smarter and fully RBI-compliant. Serving banks, NBFCs and fintechs across 120+ cities in India.",
      },
      { property: "og:title", content: "Axiotta Technologies — AI-Powered Debt Recovery" },
      {
        property: "og:description",
        content:
          "Axiotta combines AI-driven CRM with trained field agents to recover outstanding dues faster — with 100% RBI compliance and a full audit trail.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AmbientBackground />
      <Navbar />
      <Hero />
      <Ticker />
      <Problems />
      <Services />
      <Stats />
      <IndiaMap />
      <Process />
      <Differentiator />
      <Clients />
      <BlogSection />
      <About />
      <Contact />
      <Careers />
      <Footer />
    </main>
  );
}
