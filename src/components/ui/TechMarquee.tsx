"use client";

import React from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiTailwindcss,
  SiRust,
  SiDocker,
  SiLinux,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiFigma,
  SiCplusplus,
  SiCloudflare,
  SiNodedotjs,
  SiArduino,
  SiUbuntu,
} from "react-icons/si";

interface TechItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}

const row1: TechItem[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

const row2: TechItem[] = [
  { name: "Rust", icon: SiRust, color: "#DEA584" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },
  { name: "Ubuntu", icon: SiUbuntu, color: "#E95420" },
  { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "Arduino", icon: SiArduino, color: "#00878F" },
];

function MarqueeTrack({
  items,
  reverse = false,
  speed = 32,
}: {
  items: TechItem[];
  reverse?: boolean;
  speed?: number;
}) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-1.5 select-none [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className={`flex items-center gap-3.5 w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${speed}s` }}
      >
        {repeated.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] text-xs sm:text-sm font-semibold shadow-xs hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 cursor-default group"
            >
              <span className="w-5 h-5 flex items-center justify-center text-current group-hover:scale-110 transition-transform">
                <IconComp className="w-4 h-4" />
              </span>
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <div className="w-full space-y-3 py-4">
      {/* Row 1 moving left */}
      <MarqueeTrack items={row1} speed={28} reverse={false} />
      {/* Row 2 moving right */}
      <MarqueeTrack items={row2} speed={30} reverse={true} />
    </div>
  );
}
