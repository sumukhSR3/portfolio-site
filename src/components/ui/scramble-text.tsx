"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function ScrambleText({
  text,
  className,
  duration = 1200,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    let frame = 0;
    const totalFrames = duration / 16;
    let interval: NodeJS.Timeout;

    const scramble = () => {
      let output = "";
      for (let i = 0; i < text.length; i++) {
        if (frame / totalFrames > i / text.length) {
          output += text[i];
        } else {
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayed(output);
      frame++;
      
      if (frame > totalFrames) {
        clearInterval(interval);
        setDisplayed(text);
      }
    };

    interval = setInterval(scramble, 16);
    return () => clearInterval(interval);
  }, [text, duration]);

  return <span className={cn(className)}>{displayed}</span>;
}
