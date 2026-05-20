import { Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700", "900"] });

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Left — branding */}
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span
              className={`${orbitron.className} text-sm font-black tracking-[0.12em] uppercase`}
              style={{
                color: "#e8f4ff",
                textShadow: "0 0 12px rgba(147,197,253,0.8), 0 0 28px rgba(99,102,241,0.4)",
              }}
            >
              Sumukh
            </span>
            <p className="font-mono text-[11px] text-muted-foreground">
              ML Engineer · San Francisco, CA
            </p>
          </div>

          {/* Center — quick links */}
          <div className="flex items-center gap-6 font-mono text-xs text-muted-foreground">
            {["About", "Projects", "Skills", "Experience", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right — socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/sumukh-ramagiri-1a70363b3/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a
              href="mailto:ramagirisumukh3@gmail.com"
              aria-label="Email"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-border/40 pt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="font-mono text-[11px] text-muted-foreground">
            © {year} Sumukh Ramagiri. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            Built with{" "}
            <span className="text-emerald-400">Next.js</span>
            {" · "}
            <span className="text-blue-400">TypeScript</span>
            {" · "}
            <span className="text-violet-400">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
