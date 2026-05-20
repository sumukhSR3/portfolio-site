"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowUpRight, Zap } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: "ramagirisumukh3@gmail.com",
    href: "mailto:ramagirisumukh3@gmail.com",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "sumukh-ramagiri",
    href: "https://linkedin.com/in/sumukh-ramagiri-1a70363b3/",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: null,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(203) 619-1742",
    href: "tel:+12036191742",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="// contact"
          title="Let's Ship Something Real"
          description="Not just ideas — production-grade AI systems. Let's talk."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left — statement */}
          <FadeIn direction="left">
            <div className="space-y-8">
              {/* Big tagline block */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
                  <Zap className="h-3 w-3" />
                  Open to new opportunities
                </div>
                <h3 className="text-3xl font-extrabold tracking-tight leading-tight">
                  Got an inference problem?{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                    I've solved it before.
                  </span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you're scaling LLM serving to thousands of users, reducing hallucinations in RAG pipelines, or building ML infrastructure from the ground up — I bring 5+ years of production experience to the table.
                </p>
              </div>

              {/* Availability badge */}
              <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 flex items-center gap-4">
                <div className="relative flex h-3 w-3 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Currently Available</p>
                  <p className="text-xs font-mono text-muted-foreground">
                    Responding within 24 hours
                  </p>
                </div>
                <a
                  href="mailto:ramagirisumukh3@gmail.com"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "ml-auto bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
                  )}
                >
                  Send a message <ArrowUpRight className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Right — contact cards */}
          <FadeIn direction="right" delay={0.15}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contactCards.map((card, i) => {
                const Icon = card.icon;
                const inner = (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={card.href ? { scale: 1.02 } : {}}
                    className={cn(
                      "group rounded-xl border p-5 backdrop-blur-sm transition-all",
                      card.bg,
                      card.href ? "cursor-pointer hover:shadow-lg" : "cursor-default"
                    )}
                  >
                    <div className={cn("mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-background/40", card.color)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="mb-0.5 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                      {card.label}
                    </p>
                    <p className="text-sm font-semibold break-all leading-tight flex items-center gap-1">
                      {card.value}
                      {card.href && (
                        <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      )}
                    </p>
                  </motion.div>
                );

                return card.href ? (
                  <a key={card.label} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div key={card.label}>{inner}</div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
