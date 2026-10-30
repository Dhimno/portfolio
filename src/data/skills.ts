export interface SkillGroup {
  category: {
    id: string;
    en: string;
  };
  items: {
    name: string;
    level?: string;
  }[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: {
      id: "Bahasa Pemrograman",
      en: "Programming Languages",
    },
    items: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Python" },
      { name: "PHP" },
      { name: "Rust" },
      { name: "Java" },
      { name: "C / C++" },
      { name: "SQL" },
    ],
  },
  {
    category: {
      id: "Framework & Ekosistem",
      en: "Frameworks & Ecosystem",
    },
    items: [
      { name: "Next.js" },
      { name: "React" },
      { name: "Laravel" },
      { name: "Tauri v2" },
      { name: "Tailwind CSS" },
      { name: "Node.js" },
      { name: "Three.js / R3F" },
      { name: "Framer Motion" },
    ],
  },
  {
    category: {
      id: "Sistem, Jaringan & Keamanan",
      en: "Systems, Networks & Security",
    },
    items: [
      { name: "Linux / Armbian" },
      { name: "Docker" },
      { name: "Tailscale" },
      { name: "SOC / EDR & EPM" },
      { name: "Cisco Packet Tracer" },
      { name: "n8n Automation" },
      { name: "Git & GitHub" },
    ],
  },
  {
    category: {
      id: "Kreatif & Desain",
      en: "Creative & Design",
    },
    items: [
      { name: "Figma" },
      { name: "Adobe Premiere Pro" },
      { name: "After Effects" },
      { name: "Photoshop" },
    ],
  },
];

export const marqueeSkills = [
  "TypeScript",
  "Next.js",
  "React",
  "Tailwind CSS",
  "Laravel",
  "Rust & Tauri",
  "Python",
  "Linux & Docker",
  "Cybersecurity",
  "Three.js",
  "n8n Automation",
  "Git",
  "Figma",
];

export interface Certification {
  title: string;
  issuer: string;
  year: string;
}

export const certifications: Certification[] = [
  {
    title: "Membangun Aplikasi Gen AI dengan Microsoft Azure",
    issuer: "Dicoding Indonesia",
    year: "2026",
  },
  {
    title: "Penerapan Data Science dengan Microsoft Fabric",
    issuer: "Dicoding Indonesia",
    year: "2026",
  },
  {
    title: "Introduction to Large Language Models & Build an AI Agent",
    issuer: "IBM SkillsBuild",
    year: "2026",
  },
  {
    title: "Belajar Machine Learning untuk Pemula",
    issuer: "Dicoding Indonesia",
    year: "2026",
  },
  {
    title: "Fundamental Pemrosesan Data & Python",
    issuer: "Dicoding Indonesia",
    year: "2026",
  },
  {
    title: "Database Design Specialist",
    issuer: "Oracle Academy",
    year: "2025",
  },
];
