"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700", "900"] });

const links = [
  { label: "About",      href: "#about" },
  { label: "Projects",   href: "#projects" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  // Track scroll progress + active section
  useEffect(() => {
    const onScroll = () => {
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(totalH > 0 ? (window.scrollY / totalH) * 100 : 0);
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer to highlight active section
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-border/40 bg-background/85 backdrop-blur-2xl shadow-[0_1px_30px_oklch(0_0_0/25%)]"
          : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute left-0 top-0 h-[2px] bg-gradient-to-r from-violet-500 via-blue-400 to-violet-500"
        style={{ width: `${scrollPct}%` }}
        transition={{ ease: "linear" }}
      />

      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2">
          <div className="relative h-7 w-7">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 opacity-80 blur-[4px] group-hover:opacity-100 transition-opacity" />
            <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-white text-xs font-black">
              SR
            </div>
          </div>
          <span
            className={`${orbitron.className} text-sm font-black tracking-[0.12em] uppercase`}
            style={{
              color: "#e8f4ff",
              textShadow: "0 0 12px rgba(147,197,253,0.8), 0 0 28px rgba(99,102,241,0.4)",
            }}
          >
            Sumukh
          </span>
        </a>

        {/* Desktop nav — pill group */}
        <div className="hidden md:flex items-center rounded-full border border-border/40 bg-card/40 backdrop-blur-md px-1 py-1 gap-0.5">
          {links.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 outline-none"
                style={{ color: isActive ? "white" : undefined }}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-blue-500"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? "text-white" : "text-muted-foreground hover:text-foreground"}`}>
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="mailto:ramagirisumukh3@gmail.com"
            className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary transition-all hover:bg-primary/20 hover:border-primary/70 hover:shadow-[0_0_16px_oklch(0.72_0.22_290/30%)]"
          >
            Hire me
          </a>
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </nav>

      {/* Mobile menu — slide + fade */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-b border-border/40 bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto max-w-6xl flex flex-col gap-1 px-6 py-4">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    active === link.href
                      ? "bg-primary/15 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <span className="font-mono text-primary/60 mr-2 text-xs">{String(i + 1).padStart(2, "0")}.</span>
                  {link.label}
                </motion.a>
              ))}
              <a
                href="mailto:ramagirisumukh3@gmail.com"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary text-center"
              >
                Hire me →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
