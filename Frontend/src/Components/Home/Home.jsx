import React from "react";
import { ArrowRight, FileText, MessageSquare, Search, Sparkles, Zap } from "lucide-react";
import { BackgroundBeams } from "../ui/background-beams";
import FeatureCard from "@/components/ui/FeatureCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const features = [
  {
    icon: MessageSquare,
    title: "Chat with PDFs",
    description: "Have natural conversations with your documents. Ask anything and get precise, contextual answers.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Find exactly what you need across hundreds of pages in seconds with semantic search.",
  },
  {
    icon: Sparkles,
    title: "Key Insights",
    description: "Automatically extract summaries, key points, and actionable insights from any document.",
  },
  {
    icon: FileText,
    title: "Multi-Document",
    description: "Upload multiple PDFs and cross-reference information across all your documents seamlessly.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background antialiased">
      <BackgroundBeams />

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 md:px-16 lg:px-24">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/10">
            <Zap className="h-4 w-4 text-primary" strokeWidth={2} />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">Briefly</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Log in
            </Button>
          </Link>
          <Link to="/login">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center px-6 pt-24 pb-20 md:pt-36 md:pb-28">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary/40 px-4 py-1.5 text-[13px] text-muted-foreground backdrop-blur-md"
        >
          <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Powered by Gemini
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-2xl text-center font-display text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Your documents,
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-glow-cyan bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
            made conversational
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-5 max-w-md text-center text-[15px] leading-relaxed text-muted-foreground md:text-base md:max-w-lg"
        >
          Ask questions, extract insights, and interact with your PDFs through natural conversation. Built for researchers, students, and professionals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex items-center gap-3"
        >
          <Link to="/login">
            <Button size="lg" className="gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 px-6">
              Start for free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground">
            See how it works
          </Button>
        </motion.div>
      </section>
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="text-[13px] font-medium uppercase tracking-widest text-primary/70">Features</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Everything you need
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </section>
      <footer className="relative z-10 border-t border-border/30 px-6 py-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <span className="text-[13px] text-muted-foreground/50">© 2026 Briefly AI</span>
          <div className="flex items-center gap-4 text-[13px] text-muted-foreground/50">
            <a href="#" className="hover:text-muted-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-muted-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
