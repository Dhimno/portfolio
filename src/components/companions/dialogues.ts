import { CharacterId, SpawnSlot, DialogueEvent } from "./types";

export const LOCATION_AWARE_QUOTES: Record<
  CharacterId,
  Partial<Record<"about" | "pillars" | "projects" | "experience" | "contacts" | "default", string[]>>
> = {
  dhimas: {
    about: [
      "* Halo! Senang kamu mampir ke sini. Lagi jalan-jalan santai sambil ngecek performa build.",
      "* Kalau ada bug aneh dan minim dokumentasi di internet, biasanya malah bikin penasaran buat dioprek.",
      "* Homelab di rumah masih jalan 24/7. Selama docker container ngga panik, hari aman terkendali.",
      "* Network routing, reverse proxy, dan security policy... hal-hal kecil di balik layar yang seru dirapikan.",
    ],
    pillars: [
      "* Fokus saya ada di sistem yang reliable: dari mitigasi insiden siber sampai arsitektur agent AI.",
      "* Sistem yang baik itu yang tenang dan ngga bikin panik saat traffic naik.",
    ],
    projects: [
      "* Semua proyek di sini dibangun dari masalah nyata yang pernah saya atau teman-teman hadapi.",
      "* Dari aplikasi desktop Rust/Tauri sampai bot kampus otomatis, semuanya open-source!",
    ],
    experience: [
      "* Setiap milestone di sini punya cerita troubleshooting-nya masing-masing.",
      "* Dari SOC intern sampai bangun platform digital kampus, selalu ada hal baru buat dipelajari.",
    ],
    contacts: [
      "* Punya ide proyek, diskusi seputar homelab, atau mau kolaborasi? Pintu selalu terbuka!",
      "* Email langsung atau kontak saya lewat LinkedIn dan GitHub ya!",
    ],
    default: [
      "* Halo! Selamat datang di portofolio saya.",
      "* Lagi muter-muter keliling halaman. Ada yang menarik perhatianmu?",
      "* Terima kasih sudah meluangkan waktu buat berkunjung!",
    ],
  },
  omori: {
    about: [
      "* (Omori is reading Dhimas's bio. It feels strangely comforting.)",
      "* (...Omori is pacing along the divider line quietly.)",
      "* (Everything is going to be okay.)",
    ],
    pillars: [
      "* (You stood upon the pillars. Dhimas did not succumb.)",
      "* (A quiet focus anchors these three technical foundations.)",
    ],
    projects: [
      "* (Omori peeked from behind the card. Waiting for something to happen?)",
      "* (You remembered Dhimas's code. It brings back warm memories.)",
      "* (A soothing white space surrounds this project.)",
    ],
    experience: [
      "* (You remembered Dhimas's milestones. Did you succumb?)",
      "* (Looking back at the journey fills your heart with warmth.)",
    ],
    contacts: [
      "* (Omori holds an envelope. Everything is going to be okay.)",
      "* (Ready to reach out? The door is always open.)",
    ],
    default: [
      "* (Waiting for something to happen?)",
      "* (Everything is going to be okay.)",
      "* (Dhimas did not succumb.)",
    ],
  },
  sans: {
    about: [
      "* reading about dhimas? sounds like a hard-working guy. unlike me.",
      "* self-hosting linux servers? pretty chill. i prefer self-hosting naps.",
    ],
    pillars: [
      "* guarding the cybersecurity foundations. i'm on an official 5-minute break.",
      "* security operations? don't worry, my puns are completely un-hackable.",
    ],
    projects: [
      "* nice projects. looks like dhimas put a 'skele-ton' of work into this.",
      "* wanna hear a bad time? try debugging production at 3am on a friday.",
      "* checking out the source code? you're really determined, huh.",
    ],
    experience: [
      "* look at this journey. kid's got a lot of determination.",
      "* take a break from scrolling. grab some fried snow.",
    ],
    contacts: [
      "* shoot him an email, kid. i'd do it myself but i'm bone-lazy.",
      "* got a weird bug with no solution? sounds like a job for dhimas.",
    ],
    default: [
      "* hey. nice portfolio you got here.",
      "* you look like a kid with a lot of determination.",
      "* pretty humerus stuff.",
    ],
  },
  claude: {
    about: [
      "* Dhimas loves tinkering with AI provider routing and homelab servers!",
      "* I analyzed the bio: 100% human authenticity detected.",
    ],
    pillars: [
      "* 3 core pillars: systems engineering, cybersecurity, and modular agents!",
      "* Robust architectural foundations make systems resilient to failure.",
    ],
    projects: [
      "* Peeking behind the project card! 0 memory leaks found.",
      "* I ran a code audit on this build: clean, performant, and responsive!",
      "* Need an architectural diagram for this project? I can help with that!",
    ],
    experience: [
      "* Milestone analysis: steady technical growth across internships and university.",
      "* Consistent dedication always yields compounding results.",
    ],
    contacts: [
      "* Got an interesting technical challenge? Let's brainstorm and solve it!",
      "* The best software innovations start with a simple conversation.",
    ],
    default: [
      "* Hi! Mini Claude companion online and ready to assist.",
      "* Remember to stay hydrated while hacking on code!",
    ],
  },
  steve: {
    about: [
      "* Dhimas crafted this whole layout from scratch! High durability.",
      "* Need to place some redstone repeaters around this section.",
    ],
    pillars: [
      "* These pillars have obsidian-grade blast resistance.",
      "* Testing security defenses against hostile mobs...",
    ],
    projects: [
      "* Mining through these Next.js components! Found diamond blocks!",
      "* *crafting noises* ...Crafted a diamond pickaxe!",
      "* Inspecting this bento card for hidden dungeons...",
    ],
    experience: [
      "* Milestone reached! Achievement Unlocked: [Level Up]",
      "* Placed an experience torch along this milestone path.",
    ],
    contacts: [
      "* Delivering packets via carrier pigeon... or TCP/IP!",
      "* Ready to craft a new collaboration project?",
    ],
    default: [
      "* *mining noises* ...Digging straight into the code!",
      "* Achievement Unlocked: [Explore Portfolio]",
    ],
  },
  creeper: {
    about: [
      "* ...ssss! (Admiring Dhimas's authentic bio writing!)",
    ],
    pillars: [
      "* ...ssss! (Decided not to blow up this cybersecurity firewall.)",
      "* That's a very sturdy foundation... would be a shame if... *tssss*",
    ],
    projects: [
      "* That's a very nice web layout you have there... *tssss...*",
      "* ...tsssss! (Just kidding. No explosions allowed in production!)",
      "* (The Creeper is admiring your homelab server architecture.)",
    ],
    experience: [
      "* ...ssss! (The Creeper spared your milestone achievements.)",
    ],
    contacts: [
      "* ...ssss! (Send a message before the timer runs out!)",
    ],
    default: [
      "* ...ssssssss!",
      "* *nervous hissing* (It's peaceful today.)",
    ],
  },
  dog: {
    about: [
      "* (Bark!) [The dog chewed on the bio text. It tastes like TypeScript.]",
    ],
    pillars: [
      "* (Bark!) [The dog is sleeping on the cybersecurity pillar.]",
    ],
    projects: [
      "* (Bark!) [The dog absorbed the project repository.]",
      "* (Yip!) [The dog left residue on the project card.]",
      "* (Bark!) [The dog seems pleased with the component design.]",
    ],
    experience: [
      "* (Snooze...) [The dog is sleeping peacefully on Dhimas's milestone.]",
      "* (Heavy panting... The dog is enjoying the journey.)",
    ],
    contacts: [
      "* (Bark!) [The dog pressed the copy email button with its nose.]",
      "* (Yip!) [The dog wagged its tail at your message.]",
    ],
    default: [
      "* (Bark!) [The dog absorbed the artifact.]",
      "* (Snooze...) [Peaceful sleeping sounds.]",
    ],
  },
  ralsei: {
    about: [
      "* The power of programming shines within you!",
      "* Reading about Dhimas fills my heart with friendship!",
    ],
    pillars: [
      "* Strong foundations allow us to build a kinder, safer world!",
    ],
    projects: [
      "* (Ralsei casts PACIFY on unhandled runtime exceptions!)",
      "* Every project is a story crafted with care and patience!",
    ],
    experience: [
      "* Every step in your journey brought you to this wonderful place!",
    ],
    contacts: [
      "* Sending kind messages and good ideas always brightens someone's day!",
      "* I baked a cake for anyone who sends a polite email!",
    ],
    default: [
      "* Even when things get complex, kindness and clean code will save the day!",
      "* (Ralsei smiles warmly at you.)",
    ],
  },
  papyrus: {
    about: [
      "* I, THE GREAT PAPYRUS, APPROVE OF THIS DEVELOPER'S AMBITION!",
      "* READING ABOUT DHIMAS'S HOMELAB... ALMOST AS COMPLEX AS MY PUZZLES!",
    ],
    pillars: [
      "* SYSTEM ARCHITECTURE?! A NOBLE DISCIPLINE FIT FOR A ROYAL GUARD!",
    ],
    projects: [
      "* WOWIE! THIS CODE IS NEARLY AS MAGNIFICENT AS MY MASTERPIECE SPAGHETTI!",
      "* BEHOLD! A PROJECT WORTHY OF THE HIGHEST ACCOLADES!",
    ],
    experience: [
      "* A TIMELINE OF HARD WORK! TRULY, PERSEVERANCE IS THE KEY TO GREATNESS!",
    ],
    contacts: [
      "* YOU MUST SEND A MESSAGE! PERHAPS WE CAN DISCUSS SPAGHETTI RECIPES!",
      "* I AM WAITING FOR YOUR CORRESPONDENCE, FUTURE FRIEND!",
    ],
    default: [
      "* NYEH HEH HEH! THE GREAT PAPYRUS HAS ARRIVED!",
      "* I WILL BE SO POPULAR ONCE EVERYONE SEES THIS PORTFOLIO!",
    ],
  },
  frisk: {
    about: [
      "* (Reading Dhimas's journey fills you with DETERMINATION.)",
    ],
    pillars: [
      "* (Standing upon the pillars of computer science fills you with DETERMINATION.)",
    ],
    projects: [
      "* (Testing these interactive projects fills you with DETERMINATION.)",
      "* (You reached out to inspect the code. It feels solid.)",
    ],
    experience: [
      "* (Reflecting on past milestones fills you with DETERMINATION.)",
    ],
    contacts: [
      "* (Deciding to say hello fills you with DETERMINATION.)",
    ],
    default: [
      "* (You are filled with DETERMINATION.)",
      "* (You stayed and enjoyed the pixel art.)",
    ],
  },
  enderman: {
    about: [
      "* (Vwooop... Enderman is reading the network routing notes.)",
    ],
    pillars: [
      "* (Teleporting between secure infrastructure clusters...)",
    ],
    projects: [
      "* (Vwooop... Enderman picked up a project card.)",
      "* (Don't look directly into the terminal console.)",
    ],
    experience: [
      "* (Teleporting through commit history...)",
    ],
    contacts: [
      "* (Vwooop... Leaving an ender pearl in the inbox.)",
    ],
    default: [
      "* (Vwooop...)",
      "* (Enderman respects your dark mode settings.)",
    ],
  },
  pig: {
    about: [
      "* *oink!* (The pig trotted happily along the divider line.)",
    ],
    pillars: [
      "* *snort* (The pig sniffed the infrastructure foundation.)",
    ],
    projects: [
      "* *oink!* (Looking for carrots behind the project cards!)",
      "* *snort!* (The pig gave this web app an enthusiastic nod.)",
    ],
    experience: [
      "* *oink!* (The pig rested near the milestone marker.)",
    ],
    contacts: [
      "* *oink!* (Wiggling its little tail at the email button!)",
    ],
    default: [
      "* *oink!*",
      "* *snort* (Looking for a carrot!)",
    ],
  },
};

export function getLocationAwareQuote(id: CharacterId, slot: SpawnSlot): string {
  const charQuotes = LOCATION_AWARE_QUOTES[id];
  if (!charQuotes) return "* ...";

  let category: "about" | "pillars" | "projects" | "experience" | "contacts" = "about";
  if (slot.startsWith("pillars")) category = "pillars";
  else if (slot.startsWith("projects")) category = "projects";
  else if (slot.startsWith("experience")) category = "experience";
  else if (slot.startsWith("contacts") || slot.startsWith("footer")) category = "contacts";

  const pool = charQuotes[category] || charQuotes.default || ["* ..."];
  return pool[Math.floor(Math.random() * pool.length)];
}

export const SOLO_QUOTES: Record<CharacterId, string[]> = Object.fromEntries(
  Object.entries(LOCATION_AWARE_QUOTES).map(([k, v]) => [
    k,
    [...(v.default || []), ...(v.about || []), ...(v.projects || [])],
  ])
) as Record<CharacterId, string[]>;

export const CROSS_DIALOGUES: DialogueEvent[] = [
  {
    speaker: "sans",
    text: "* hey monochrome kid, ever tried hot dogs with ketchup?",
    target: "omori",
    response: {
      speaker: "omori",
      text: "* (...Omori stared quietly at the smiling skeleton.)",
    },
  },
  {
    speaker: "claude",
    text: "* Steve, please be careful with that pickaxe around the server rack!",
    target: "steve",
    response: {
      speaker: "steve",
      text: "* But there might be redstone and diamonds behind this card!",
    },
  },
  {
    speaker: "papyrus",
    text: "* SANS! HAVE YOU BEEN WORKING ON YOUR PORTFOLIO TASKS?!",
    target: "sans",
    response: {
      speaker: "sans",
      text: "* sure have, bro. i've been testing the sleep animation for 4 hours.",
    },
  },
  {
    speaker: "ralsei",
    text: "* Omori, would you like a warm cup of hot chocolate?",
    target: "omori",
    response: {
      speaker: "omori",
      text: "* (Omori accepted the cup. Heart restored.)",
    },
  },
];
