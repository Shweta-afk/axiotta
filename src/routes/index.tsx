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
      { title: "Axiotta Technologies — Smart Recovery Management Solutions" },
      { name: "description", content: "Fast, legal and efficient debt, loan and NPA recovery for banks, NBFCs and fintechs." },
      { property: "og:title", content: "Axiotta Technologies — Smart Recovery Management Solutions" },
      { property: "og:description", content: "Fast, legal and efficient debt, loan and NPA recovery for banks, NBFCs and fintechs." },
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
      <Clients />
      <BlogSection />
      <About />
      <Contact />
      <Careers />
      <Footer />
    </main>
  );
}
