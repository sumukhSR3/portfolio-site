"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { InferenceDashboard } from "@/components/ui/inference-dashboard";

import profileImg from "../../../public/images/profile.png";
import awsCertImg from "../../../public/images/aws-certified-machine-learning-engineer-associate.png";

const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "LLM Pipelines", value: "50+" },
  { label: "Models Deployed", value: "30+" },
  { label: "Lines of Code", value: "∞" },
];

export function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="// about"
          title="Building AI That Ships"
          description="Not just research — production systems that scale."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image + Terminal */}
          <FadeIn direction="left">
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl border border-border/50 neon-glow">
                <Image
                  src={profileImg}
                  alt="Sumukh Ramagiri"
                  width={600}
                  height={600}
                  className="w-full aspect-square object-cover"
                  priority
                />
              </div>

              {/* Inference Metrics Dashboard */}
              <InferenceDashboard />
            </div>
          </FadeIn>

          {/* Bio + Stats */}
          <FadeIn direction="right" delay={0.2}>
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I&apos;m Sumukh Ramagiri, an AI/ML Engineer based in San Francisco. I
                  specialize in building scalable AI and Generative AI systems, particularly
                  LLMs and RAG pipelines.
                </p>
                <p>
                  My work focuses on developing low-latency inference systems and improving 
                  performance across production environments. From optimizing dynamic batching 
                  with vLLM to deploying robust microservices on AWS and Kubernetes.
                </p>
                <p>
                  With 5+ years of experience, I&apos;ve engineered everything from distributed 
                  LLM evaluation frameworks to scalable demand forecasting pipelines, always 
                  focusing on reliable, high-impact AI solutions.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold gradient-text">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-xs font-mono text-muted-foreground">
                          {stat.label}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Certifications */}
              <div className="mt-2">
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">Certifications</p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm px-4 py-3 transition-all hover:border-primary/30 hover:neon-glow">
                    <Image
                      src={awsCertImg}
                      alt="AWS Certified Machine Learning Engineer – Associate"
                      width={48}
                      height={48}
                      className="h-12 w-12 object-contain"
                    />
                    <div>
                      <p className="text-sm font-semibold leading-tight">AWS Certified</p>
                      <p className="text-xs text-muted-foreground">Machine Learning Engineer</p>
                      <p className="font-mono text-[10px] text-primary mt-0.5">Associate · Amazon Web Services</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
