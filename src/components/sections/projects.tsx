"use client";

import { motion } from "framer-motion";
import {
  Smile,
  Brain,
  Activity,
  BarChart,
  LayoutDashboard,
  Film,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { MagicCard } from "@/components/ui/magic-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechBadge } from "@/components/ui/tech-badge";
import { StaggerChildren, staggerItem } from "@/components/motion/stagger-children";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Smile,
  Brain,
  Activity,
  BarChart,
  LayoutDashboard,
  Film,
};

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="// projects"
          title="What I've Built"
          description="Personal projects spanning computer vision, NLP, and data science."
        />

        <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const Icon = iconMap[project.icon] ?? Brain;
            return (
              <motion.div key={project.title} variants={staggerItem} className="h-full">
                <MagicCard className="group relative h-full transition-all duration-300 hover:border-primary/40 hover:neon-glow">
                  {/* Gradient accent on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  <div className="relative flex h-full flex-col p-6">
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/50">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-base leading-tight">{project.title}</h3>
                      </div>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} on GitHub`}
                          className="shrink-0 rounded-md p-1.5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:text-foreground hover:bg-white/5"
                        >
                          <GithubIcon className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    {/* Description */}
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <TechBadge key={t}>{t}</TechBadge>
                      ))}
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
