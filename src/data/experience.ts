export interface ExperienceItem {
  id: string;
  role: {
    id: string;
    en: string;
  };
  organization: string;
  location: string;
  period: {
    id: string;
    en: string;
  };
  type: "work" | "education";
  highlights: {
    id: string[];
    en: string[];
  };
  tags: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "bank-mega",
    role: {
      id: "Security Operation Center (SOC) Intern",
      en: "Security Operation Center (SOC) Intern",
    },
    organization: "PT Bank Mega Tbk",
    location: "Jakarta, Indonesia",
    period: {
      id: "Juni 2026 – Juli 2026",
      en: "June 2026 – July 2026",
    },
    type: "work",
    highlights: {
      id: [
        "Mengoperasikan solusi Endpoint Detection and Response (EDR) untuk memantau, mendeteksi, dan menginvestigasi anomali keamanan pada endpoint perbankan.",
        "Mendalami penerapan Endpoint Privilege Management (EPM) dengan prinsip least privilege guna menekan risiko eskalasi hak akses istimewa.",
        "Mempelajari alur penanganan insiden tim SOC mulai dari pemantauan alert, triase keparahan, hingga prosedur eskalasi ancaman.",
      ],
      en: [
        "Operated Endpoint Detection and Response (EDR) tooling to monitor, detect, and investigate security anomalies across banking endpoints.",
        "Studied Endpoint Privilege Management (EPM) least-privilege enforcement to minimize credential escalation risks.",
        "Observed SOC incident triage procedures, alert prioritization, and formal threat response escalation flows.",
      ],
    },
    tags: ["Cybersecurity", "SOC", "EDR", "EPM", "Least Privilege", "Incident Response"],
  },
  {
    id: "bank-danamon",
    role: {
      id: "Visual Content Creator (Freelance)",
      en: "Visual Content Creator (Freelance)",
    },
    organization: "PT Bank Danamon Indonesia Tbk",
    location: "Rembang, Jawa Tengah",
    period: {
      id: "Juni 2025 – Agustus 2025",
      en: "June 2025 – August 2025",
    },
    type: "work",
    highlights: {
      id: [
        "Memproduksi materi visual kreatif dan materi promosi untuk mendukung kampanye Live Branch Transformation Rembang.",
        "Berkolaborasi dengan tim event dan marketing untuk merancang display fisik, backdrop acara, aset media sosial, dan slide presentasi bisnis.",
        "Menghasilkan aset digital beresolusi tinggi dengan konsistensi visual identitas korporat Danamon.",
      ],
      en: [
        "Produced creative visual branding and promotional media supporting the Live Branch Transformation campaign in Rembang.",
        "Collaborated with marketing and events teams to produce physical staging displays, event backdrops, and social media collateral.",
        "Delivered high-resolution digital visual assets strictly aligned with corporate brand guidelines.",
      ],
    },
    tags: ["Visual Design", "Creative Production", "Branding", "Corporate Media"],
  },
  {
    id: "undip-informatics",
    role: {
      id: "S1 Informatika (IPK: 3,74 / 4,00)",
      en: "B.Sc. in Informatics (GPA: 3.74 / 4.00)",
    },
    organization: "Universitas Diponegoro",
    location: "Semarang, Jawa Tengah",
    period: {
      id: "Agustus 2024 – Sekarang",
      en: "August 2024 – Present",
    },
    type: "education",
    highlights: {
      id: [
        "Mendalami fondasi ilmu komputer: Jaringan Komputer, Keamanan & Jaminan Informasi, Dasar Pemrograman, Organisasi Arsitektur Komputer, dan Sistem Operasi.",
        "Aktif merancang proyek pemrograman mandiri dan berbasis kelompok pada platform web, desktop, dan otomasi cerdas.",
      ],
      en: [
        "Focusing on computer science fundamentals: Computer Networks, Information Security, Computer Architecture, and Operating Systems.",
        "Actively developing standalone software engineering projects spanning full-stack web, desktop systems, and automation.",
      ],
    },
    tags: ["Informatics", "Computer Networks", "Cybersecurity", "Operating Systems"],
  },
];
