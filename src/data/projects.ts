export interface Project {
  slug: string;
  title: string;
  summary: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  category: ("web" | "desktop" | "system" | "automation" | "localization")[];
  stack: string[];
  cover: string;
  links: {
    live?: string;
    repo?: string;
  };
  featured: boolean;
  role: {
    id: string;
    en: string;
  };
  outcome?: {
    id: string;
    en: string;
  };
}

export const projects: Project[] = [
  {
    slug: "reservasi-fasilitas-kampus",
    title: "Wiyata — Reservasi Fasilitas Kampus",
    summary: {
      id: "Platform terpadu peminjaman sarana prasarana kampus dan pelaporan fasilitas Undip Tembalang dengan pencegahan konflik jadwal real-time.",
      en: "Unified platform for campus facility booking and issue reporting at Diponegoro University with real-time schedule conflict prevention.",
    },
    description: {
      id: "Dikembangkan untuk mengatasi inefisiensi birokrasi peminjaman ruang kelas, aula, laboratorium, dan sarana olahraga di Kampus Tembalang. Mengimplementasikan arsitektur multi-peran (Civitas, Petugas, Admin), kalender ketersediaan real-time, verifikasi terstruktur, dan desain institusional modern Undip.",
      en: "Built to eliminate bureaucratic friction in booking lecture halls, laboratories, and sports venues across Tembalang Campus. Implements multi-role workflows (Students/Faculty, Staff, Admin), real-time schedule validation, and clean institutional UI.",
    },
    category: ["web"],
    stack: ["Laravel 11", "PHP 8.2", "MySQL", "Tailwind CSS", "Pest"],
    cover: "/projects/rom-01.webp",
    links: {
      repo: "https://github.com/PPK-06/reservasi-fasilitas-kampus",
    },
    featured: true,
    role: {
      id: "Full-stack Developer & Backend Architect",
      en: "Full-stack Developer & Backend Architect",
    },
    outcome: {
      id: "Menyederhanakan alur birokrasi manual 3 tahap menjadi sistem digital real-time dengan validasi otomatis anti-double booking.",
      en: "Streamlined a 3-stage manual approval workflow into a real-time digital system with automated double-booking prevention.",
    },
  },
  {
    slug: "dynamic-pill",
    title: "Dynamic Pill — Desktop Dynamic Island",
    summary: {
      id: "Aplikasi desktop overlay Dynamic Island interaktif berbasis Rust dan Tauri v2 dengan jendela melayang transparan.",
      en: "Interactive desktop Dynamic Island overlay application built with Rust and Tauri v2 featuring transparent floating windows.",
    },
    description: {
      id: "Menghadirkan pengalaman interaksi Dynamic Island ke sistem desktop dengan window transparan borderless yang selalu berada di atas (always-on-top). Dilengkapi integrasi timer bersuara, penyesuaian posisi presisi, dan arsitektur native ringan berkat Tauri v2.",
      en: "Brings the fluid Dynamic Island experience to desktop environments with borderless transparent always-on-top windows. Features audio-synced timers, precision positioning controls, and minimal memory footprint powered by Tauri v2.",
    },
    category: ["desktop"],
    stack: ["Rust", "Tauri v2", "HTML5", "CSS3", "JavaScript"],
    cover: "/projects/rom-02.webp",
    links: {
      repo: "https://github.com/Dhimno/Dynamic-Pill",
    },
    featured: false,
    role: {
      id: "Desktop Application Developer",
      en: "Desktop Application Developer",
    },
    outcome: {
      id: "Mencapai latensi render instan dengan footprint memori sangat rendah (<30 MB RAM) berkat fondasi Rust native.",
      en: "Achieved instant rendering latency with an ultra-low memory footprint (<30 MB RAM) leveraging native Rust.",
    },
  },
  {
    slug: "homelab-jarvis",
    title: "Homelab Server & IoT Automation",
    summary: {
      id: "Infrastruktur server rumahan 24/7 berbasis Amlogic S905X ARM64 dengan orkestrasi Docker, otomasi n8n, dan asisten Telegram bot.",
      en: "24/7 self-hosted ARM64 homelab server powered by Amlogic S905X with Docker orchestration, n8n workflows, and Telegram bot assistant.",
    },
    description: {
      id: "Membangun sistem server mini hemat daya menggunakan STB bekas yang di-flash dengan Armbian Server. Mengelola berbagai layanan mandiri seperti AdGuard Home (DNS sinkhole), Samba NAS, Firefly III (manajemen keuangan), otomasi IoT pintar (pemutus AC terjadwal), dan bot Telegram pribadi melalui n8n.",
      en: "Engineered an ultra-efficient mini server setup repurposing an ARM64 TV box running Armbian Server. Hosts self-managed microservices including AdGuard Home DNS sinkhole, Samba NAS, Firefly III finance tracking, custom smart IoT automations, and private Telegram bots via n8n.",
    },
    category: ["system", "automation"],
    stack: ["Linux (Armbian)", "Docker", "CasaOS", "n8n", "Tailscale", "Python"],
    cover: "/projects/rom-03.webp",
    links: {},
    featured: false,
    role: {
      id: "System Administrator & DevOps Enthusiast",
      en: "System Administrator & DevOps Enthusiast",
    },
    outcome: {
      id: "Berjalan 24/7 dengan konsumsi daya di bawah 5 Watt dan akses remote terenkripsi via jaringan mesh Tailscale.",
      en: "Runs 24/7 with under 5 Watts power consumption and encrypted zero-trust remote access via Tailscale mesh VPN.",
    },
  },
  {
    slug: "ft-bot-undip",
    title: "FT-Bot-UNDIP — Registrasi Cerdas",
    summary: {
      id: "Otomasi pemantauan slot dan pendaftaran cerdas dengan prioritas lokasi, penanganan captcha, dan antarmuka kontrol interaktif.",
      en: "Smart registration bot and slot monitoring engine featuring priority location routing, captcha handling, and live control panel.",
    },
    description: {
      id: "Dikembangkan untuk mengotomatiskan pendaftaran pada portal Undip yang memiliki kuota sangat terbatas dan waktu war tinggi. Mengintegrasikan loader berbasis Cloudflare Workers, panel HUD dengan countdown presisi, antrean prioritas lokasi, serta mekanisme retry cerdas.",
      en: "Developed to automate high-demand slot booking on university portals with aggressive quotas and race conditions. Integrates Cloudflare Workers loaders, real-time HUD countdown panels, location prioritization, and fault-tolerant retry handling.",
    },
    category: ["automation", "web"],
    stack: ["JavaScript", "Cloudflare Workers", "Userscript API", "DOM API"],
    cover: "/projects/rom-04.webp",
    links: {
      repo: "https://github.com/Dhimno/FT-Bot-UNDIP",
    },
    featured: false,
    role: {
      id: "Automation Engineer & Script Developer",
      en: "Automation Engineer & Script Developer",
    },
  },
  {
    slug: "outerwilds-indonesia",
    title: "Outer Wilds Localization & GUI Installer",
    summary: {
      id: "Mod lokalisasi bahasa Indonesia komprehensif untuk Outer Wilds (3.700+ baris teks) disertai aplikasi GUI installer mandiri.",
      en: "Comprehensive Indonesian localization mod for Outer Wilds (3,700+ strings) featuring a standalone Python GUI installer.",
    },
    description: {
      id: "Penerjemahan mendalam 3.729 baris lore kosmologis, dialog naratif, dan entri komputer kapal dengan menjaga 100% akurasi petunjuk teka-teki ilmiah. Dilengkapi Voice Matrix per karakter (Gabbro, Chert, Slate) dan aplikasi desktop installer otomatis berbasis Python Tkinter.",
      en: "Full localization of 3,729 lines of cosmic lore, ship logs, and narrative dialogue maintaining 100% scientific puzzle fidelity. Features a tailored character Voice Matrix and an automated Python Tkinter desktop installer.",
    },
    category: ["localization", "desktop"],
    stack: ["Python", "Tkinter", "Asset Patching", "Regex"],
    cover: "/projects/rom-05.webp",
    links: {
      repo: "https://github.com/Dhimno/OuterWilds-Indonesian-Translation",
    },
    featured: false,
    role: {
      id: "Localization Lead & Tools Developer",
      en: "Localization Lead & Tools Developer",
    },
    outcome: {
      id: "3.729 baris teks dan 24 variasi puisi kuantum terlokalisasi tanpa merusak integritas berkas biner game.",
      en: "3,729 strings and 24 quantum poem variations fully localized while preserving binary game asset integrity.",
    },
  },
  {
    slug: "himaose-portal",
    title: "HIMA OSE — Web Portal Himpunan",
    summary: {
      id: "Website profil dan portal informasi resmi Himpunan Mahasiswa Oseanografi Universitas Diponegoro.",
      en: "Official profile website and organizational portal for the Oceanography Student Association at Diponegoro University.",
    },
    description: {
      id: "Platform profil organisasi yang menyajikan visi misi, etalase program kerja divisi, informasi beasiswa & lomba, serta pusat media komunikasi publik mahasiswa Oseanografi Undip dalam antarmuka maritim yang responsif.",
      en: "Organizational landing portal presenting departmental divisions, work programs, scholarship notices, and public student media in an ocean-inspired responsive interface.",
    },
    category: ["web"],
    stack: ["HTML5", "CSS3", "JavaScript"],
    cover: "/projects/rom-06.webp",
    links: {
      repo: "https://github.com/Dhimno/HimaOSE",
    },
    featured: false,
    role: {
      id: "Frontend Web Developer",
      en: "Frontend Web Developer",
    },
  },
];
