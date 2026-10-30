# Design Spec — Portofolio Dhimas

Dokumen ini adalah acuan desain dan implementasi untuk website portofolio personal.
Bisa dipakai langsung sebagai konteks untuk coding agent (opencode, Hermes, Claude Code, dll.) atau dibaca manual.

Teks yang berupa `[ganti ...]` adalah placeholder. Isi dengan data aslimu.

---

## 1. Ringkasan

| Hal | Keputusan |
|---|---|
| Tujuan | Memperkenalkan Dhimas ke recruiter, dosen, dan sesama developer dalam satu halaman |
| Halaman | Single page dengan 5 section: Home, About, Experience, Projects, Contacts |
| Karakter | Modern, bersih, terang, ada sentuhan blur dan gerakan halus |
| Momen utama | Lanyard 3D interaktif di Home (bisa ditarik, dilempar, dibalik) |
| Mode | Light (default) dan Dark (abu-abu, bukan hitam penuh) |
| Bahasa | Indonesia (default) dan English (toggle) |

Kata kunci rasa: **bersih, hidup, ringan, tenang**. Semua gerakan harus terasa mengalir dan tidak pernah patah.

---

## 2. Prinsip Desain

1. **Satu hal yang diingat orang: lanyard.** Semua elemen lain dibuat tenang supaya lanyard menjadi pusat perhatian.
2. **Light mode bukan hitam-putih.** Latar off-white dingin, teks navy gelap, aksen biru. Tidak ada `#000` dan tidak ada `#FFF` polos sebagai latar.
3. **Dark mode adalah abu-abu.** Latar charcoal `#1F2227`, bukan `#000`. Kontras tetap nyaman dibaca.
4. **Gerakan punya satu bahasa.** Semua animasi memakai easing dan durasi yang sama (lihat bagian Motion) supaya terasa satu keluarga.
5. **Blur dipakai dengan tujuan.** Blur menunjukkan kedalaman (navbar kaca, orb di belakang) dan fokus (teks muncul dari blur menjadi tajam). Bukan hiasan acak.
6. **Hindari gaya template.** Jangan pakai label huruf besar kecil di atas setiap judul, jangan tambahkan `→` di semua tombol, jangan jadikan semua konten kartu identik dengan bayangan abu-abu yang sama.
7. **Hormati pengguna.** `prefers-reduced-motion` dan fallback tanpa WebGL wajib ada.

---

## 3. Tech Stack (Rekomendasi)

| Kebutuhan | Pilihan |
|---|---|
| Framework | **Next.js (App Router)** atau **Vite + React**, TypeScript |
| Styling | Tailwind CSS + CSS variables untuk token tema |
| Animasi UI | **Framer Motion** (layout, shared element, presence) |
| Animasi scroll | **GSAP + ScrollTrigger** |
| Smooth scroll | **Lenis** (disinkronkan dengan GSAP ticker) |
| 3D lanyard | **@react-three/fiber**, **@react-three/drei**, **@react-three/rapier**, **meshline** |
| Ikon | `lucide-react` (stroke tipis, konsisten) |
| Form kontak | Formspree atau Resend (pilih salah satu) |
| Deploy | Vercel atau Cloudflare Pages |

Catatan: Lenis memegang scroll, GSAP ScrollTrigger membaca posisi dari Lenis, Framer Motion dipakai untuk interaksi komponen. Jangan campur dua sistem scroll.

---

## 4. Design Tokens

### 4.1 Warna

**Light mode (default)**

| Token | Hex | Fungsi |
|---|---|---|
| `--bg` | `#F4F7FC` | Latar halaman (off-white kebiruan) |
| `--surface` | `#FFFFFF` | Kartu, panel |
| `--surface-2` | `#EAF0FA` | Chip, input, hover halus |
| `--ink` | `#101B33` | Teks utama (navy gelap, bukan hitam) |
| `--ink-muted` | `#55627D` | Teks sekunder |
| `--line` | `#D9E2F1` | Garis tipis, border |
| `--accent` | `#2F6BFF` | Warna aksen utama (biru) |
| `--accent-strong` | `#1D4FD8` | Hover/active |
| `--accent-soft` | `#DCE8FF` | Latar tag, highlight |
| `--glow` | `rgba(47,107,255,.28)` | Orb blur dan glow |

**Dark mode (abu-abu)**

| Token | Hex | Fungsi |
|---|---|---|
| `--bg` | `#1F2227` | Latar halaman (charcoal) |
| `--surface` | `#2A2D33` | Kartu, panel |
| `--surface-2` | `#343840` | Chip, input, hover |
| `--ink` | `#E9ECF1` | Teks utama |
| `--ink-muted` | `#A3AAB7` | Teks sekunder |
| `--line` | `#3C414A` | Garis tipis |
| `--accent` | `#6E9BFF` | Aksen (biru lebih terang agar kontras) |
| `--accent-strong` | `#8FB2FF` | Hover/active |
| `--accent-soft` | `#2C3A5C` | Latar tag, highlight |
| `--glow` | `rgba(110,155,255,.22)` | Orb blur dan glow |

Aturan: kontras teks utama terhadap latar minimal WCAG AA (4.5:1). Aksen biru tidak dipakai untuk paragraf panjang.

### 4.2 CSS variables

```css
:root {
  --bg: #F4F7FC;
  --surface: #FFFFFF;
  --surface-2: #EAF0FA;
  --ink: #101B33;
  --ink-muted: #55627D;
  --line: #D9E2F1;
  --accent: #2F6BFF;
  --accent-strong: #1D4FD8;
  --accent-soft: #DCE8FF;
  --glow: rgba(47, 107, 255, .28);

  --ease-out: cubic-bezier(.22, 1, .36, 1);
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);
  --radius-sm: 10px;
  --radius-md: 18px;
  --radius-lg: 28px;
}

[data-theme="dark"] {
  --bg: #1F2227;
  --surface: #2A2D33;
  --surface-2: #343840;
  --ink: #E9ECF1;
  --ink-muted: #A3AAB7;
  --line: #3C414A;
  --accent: #6E9BFF;
  --accent-strong: #8FB2FF;
  --accent-soft: #2C3A5C;
  --glow: rgba(110, 155, 255, .22);
}
```

### 4.3 Tipografi

| Peran | Font | Catatan |
|---|---|---|
| Display / judul | **Bricolage Grotesque** (600–700) | Karakter hangat dan modern, sedikit quirky |
| Body / UI | **Instrument Sans** (400–600) | Bersih dan mudah dibaca |
| Kode (hanya di caret typing dan potongan teknis) | **JetBrains Mono** | Dipakai sangat terbatas |

Skala (fluid dengan `clamp`):

| Level | Ukuran | Line-height | Letter-spacing |
|---|---|---|---|
| Hero | `clamp(3rem, 8vw, 6.5rem)` | 1.0 | -0.03em |
| H2 (judul section) | `clamp(2rem, 4.5vw, 3.5rem)` | 1.1 | -0.02em |
| H3 | `1.5rem` | 1.25 | -0.01em |
| Body | `1.0625rem` | 1.65 | 0 |
| Small | `.875rem` | 1.5 | 0 |

Panjang baris paragraf maksimal 70 karakter (`max-width: 68ch`). Teks rata kiri, kecuali judul besar di Contacts yang boleh center.

### 4.4 Spacing, radius, bayangan

- Skala spasi: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 72 / 112 / 160 px.
- Padding vertikal section: `clamp(80px, 12vw, 160px)`.
- Container: `max-width: 1200px`, padding horizontal `clamp(20px, 5vw, 48px)`.
- Radius bertingkat: chip `999px`, tombol `999px`, kartu kecil `18px`, kartu besar `28px`. Jangan satu radius untuk semua.
- Bayangan di light mode: biru tipis, contoh `0 20px 50px -20px rgba(47,107,255,.25)`. Di dark mode: pakai border `--line` dan glow, bukan bayangan hitam.

---

## 5. Motion System

Satu bahasa gerak untuk semua section.

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `ease-out` | `cubic-bezier(.22,1,.36,1)` | Elemen muncul, reveal |
| `ease-in-out` | `cubic-bezier(.65,0,.35,1)` | Transisi tema, loader keluar |
| `dur-fast` | 200 ms | Hover, tombol |
| `dur-base` | 500 ms | Reveal teks, kartu |
| `dur-slow` | 800–1000 ms | Loader, tema, hero choreography |
| `stagger` | 60–90 ms | Antar kata atau antar kartu |
| Spring UI | `stiffness 120, damping 18` | Drag, indikator nav, toggle |

**Pola reveal standar (blur-in):**
`opacity 0 → 1`, `translateY 24px → 0`, `filter: blur(12px) → blur(0)`, `ease-out`, `dur-base`.
Dipakai untuk judul, paragraf, dan kartu. Judul dipecah per kata dengan stagger.

**Aturan:**
- Reveal dijalankan sekali per elemen (tidak berulang saat scroll naik-turun), kecuali timeline yang memang terikat posisi scroll.
- Hanya animasikan `transform`, `opacity`, dan `filter`. Jangan animasikan `width`, `height`, `top`, `left`.
- Gunakan `will-change` hanya selama animasi berjalan.
- Jika `prefers-reduced-motion: reduce`: matikan stagger, blur, parallax, dan typing. Ganti dengan fade 200 ms. Lanyard diganti kartu statis.

---

## 6. Loading Screen

Tujuan: menutupi pemuatan model 3D dan font, sekaligus jadi pembuka yang berkesan.

**Urutan:**
1. Layar penuh `--bg`. Monogram **D** digambar dengan stroke SVG (`stroke-dashoffset`), warna `--accent`.
2. Angka persentase `0 → 100` di bawah monogram, tabular numerals, terikat ke progres asli (`useProgress` dari drei untuk aset lanyard + `document.fonts.ready`).
3. Durasi minimal 1,4 detik supaya tidak berkedip jika aset sudah ter-cache.
4. Saat 100%: monogram membesar sedikit lalu seluruh layar **terangkat ke atas** (`translateY -100%`, `ease-in-out`, 900 ms) sambil blur 0 → 16px dan opacity memudar.
5. Setelah loader selesai, hero choreography dimulai (bagian 8).

**Aturan:**
- Tampil sekali per sesi (`sessionStorage`). Kunjungan berikutnya dalam sesi yang sama: lewati.
- Scroll dikunci (`lenis.stop()`) selama loading dan dibuka setelah selesai.
- Reduced motion: cukup fade pendek.
- Jika aset gagal dimuat lebih dari 8 detik, loader tetap menutup dan lanyard memakai fallback.

---

## 7. Toggle Light / Dark Mode

**Perilaku:**
- Default mengikuti `prefers-color-scheme`. Pilihan pengguna disimpan di `localStorage`.
- Atribut `data-theme` di `<html>`.
- Script inline kecil di `<head>` membaca tema sebelum render supaya tidak ada kedipan putih.

**Animasi transisi (utama):** circular reveal dari posisi tombol toggle memakai **View Transitions API**. Lingkaran tema baru membesar dari tombol sampai menutupi layar, durasi 700 ms, `ease-in-out`.

```ts
export async function toggleTheme(origin: { x: number; y: number }) {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";

  const apply = () => {
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  if (!document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("theme-fade");
    apply();
    setTimeout(() => document.documentElement.classList.remove("theme-fade"), 450);
    return;
  }

  const radius = Math.hypot(
    Math.max(origin.x, innerWidth - origin.x),
    Math.max(origin.y, innerHeight - origin.y)
  );

  const t = document.startViewTransition(apply);
  await t.ready;

  document.documentElement.animate(
    { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`,
                 `circle(${radius}px at ${origin.x}px ${origin.y}px)`] },
    { duration: 700, easing: "cubic-bezier(.65,0,.35,1)",
      pseudoElement: "::view-transition-new(root)" }
  );
}
```

```css
::view-transition-old(root),
::view-transition-new(root) { animation: none; mix-blend-mode: normal; }

/* Fallback untuk browser tanpa View Transitions */
.theme-fade *, .theme-fade *::before, .theme-fade *::after {
  transition: background-color .4s var(--ease-in-out),
              color .4s var(--ease-in-out),
              border-color .4s var(--ease-in-out) !important;
}
```

**Tombol toggle:** ikon matahari dan bulan yang berubah bentuk (morph) dengan rotasi dan scale, spring. Letaknya di navbar, ukuran 40px, bulat, latar `--surface-2`.

**Dampak ke 3D:** warna latar scene transparan (mengikuti CSS), intensitas cahaya dan environment lanyard di-lerp ke nilai tema baru selama 600 ms. Warna kartu dan tali mengikuti token aksen.

---

## 8. Section: Home

### 8.1 Layout

```
┌────────────────────────────────────────────────────────────┐
│  [D]        Home  About  Experience  Projects  Contacts   ◐ ID│  ← navbar kaca
│                                                  │ tali      │
│  Hai aku                                         │           │
│  Dhimas!▌                                      ┌─┴──┐        │
│                                                │CARD│ ← lanyard
│  Informatics Student                           │    │   bisa di-drag
│  yang suka [membangun web▌]                    └────┘        │
│                                                              │
│  [Lihat Projects]   [Unduh CV]                               │
│                                                              │
│        ○ scroll                                              │
└────────────────────────────────────────────────────────────┘
```

- Desktop: teks di kiri (kolom 7), lanyard di kanan (kolom 5). Tali menggantung dari atas viewport, kartu berada di sekitar tengah-kanan.
- Mobile: lanyard di atas (tinggi sekitar 55vh), teks di bawahnya.
- Latar: 2–3 orb blur biru yang melayang pelan (bagian 13).

### 8.2 Teks dan typing

- Judul: **"Hai aku Dhimas!"** (dua baris di layar sempit). Diketik huruf demi huruf dengan kecepatan sekitar 55 ms per huruf dan variasi acak ±20 ms supaya terasa manusiawi.
- Caret berkedip berwarna `--accent`. Setelah selesai mengetik, caret tetap berkedip pelan lalu berpindah ke baris subjudul.
- Subjudul: "Informatics Student yang suka `[bidang]`". Bagian dalam kurung berputar antar beberapa frasa dengan efek ketik lalu hapus, jeda 1,8 detik.
  - Contoh: `membangun web`, `mengotomasi hal membosankan`, `mengulik keamanan siber`, `[ganti sesuai minatmu]`.
- Reduced motion: teks langsung tampil penuh tanpa mengetik.

### 8.3 Choreography saat pertama tampil (satu momen terorkestrasi)

1. Loader terangkat.
2. Tali lanyard **jatuh dari atas** dan kartu berayun sampai tenang (fisika asli, bukan animasi buatan).
3. Judul mulai diketik.
4. Subjudul dan tombol muncul dengan blur-in, stagger 90 ms.
5. Navbar turun dari atas.

### 8.4 Tombol

- Primer: "Lihat Projects", pill biru solid, teks putih, hover naik 2px dan glow melebar.
- Sekunder: "Unduh CV", pill outline `--line`, hover latar `--surface-2`.
- Efek magnetik halus: tombol sedikit mengikuti kursor dalam radius 60px (hanya desktop).

---

## 9. Komponen Lanyard (Interaktif)

### 9.1 Konsep

Kartu ID digantung pada tali (lanyard) yang bereaksi seperti benda nyata. Pengunjung bisa menarik, melempar, memutar, dan membalik kartu.

### 9.2 Spesifikasi

| Aspek | Detail |
|---|---|
| Teknologi | React Three Fiber + Rapier (physics) + meshline (tali) |
| Titik tambat | Tetap di atas viewport, sedikit di luar layar |
| Tali | 3–4 segmen `RopeJoint`, satu `SphericalJoint` ke kartu. Tali digambar dengan `MeshLine` bertekstur |
| Teks di tali | Diulang: `DHIMAS • INFORMATICS • PORTFOLIO •` (warna putih di atas biru) |
| Kartu | Rasio 1 : 1,4, sudut membulat, ketebalan tipis, klip logam di atas |
| Sisi depan | Foto `[ganti]`, nama "Dhimas", peran "Informatics Student", strip gradasi biru dengan kilau halus yang bergeser mengikuti sudut kartu |
| Sisi belakang | QR code ke website/LinkedIn, teks "Open to collaborate", ID unik bergaya `DHM-2026` |
| Drag | Pointer capture pada kartu. Saat ditarik kursor berubah jadi `grabbing`. Saat dilepas, kartu mengayun balik dengan damping |
| Flip | Klik dua kali atau tombol kecil "Balik kartu" untuk memutar 180° dengan spring |
| Idle | Ayunan sangat kecil setiap beberapa detik agar terasa hidup |
| Kamera | Perspektif ringan, `fov 25`, posisi tetap |
| Cahaya | Ambient lembut + 1 directional + environment preset `studio` |

### 9.3 Interaksi dan scroll

- Canvas ditaruh di belakang teks dengan `pointer-events: none`. Hanya mesh kartu yang menerima pointer, sehingga teks dan tombol tetap bisa diklik.
- Di perangkat sentuh: hanya area kartu yang menangkap gestur drag. Area lain tetap bisa dipakai scroll halaman (`touch-action: pan-y` pada wrapper).
- Saat pengguna scroll ke bawah, kartu sedikit berayun mengikuti kecepatan scroll (impuls kecil ke physics).

### 9.4 Reaksi terhadap tema

- Light: kartu putih bersih dengan aksen biru, cahaya terang.
- Dark: kartu `--surface` abu-abu dengan aksen biru terang dan sedikit emissive, cahaya lebih redup.
- Perpindahan di-lerp, tidak langsung loncat.

### 9.5 Performa dan fallback

- Muat komponen secara lazy (`dynamic import`, `Suspense`) dan jangan blok loader lebih dari yang perlu.
- `dpr={[1, 2]}`; di mobile `[1, 1.5]`.
- Hentikan physics dan render saat Home keluar dari viewport (`IntersectionObserver` + `frameloop="never"` atau `demand`).
- Model kartu: GLB di bawah 500 KB, tekstur di bawah 1 MB total (WebP/KTX2).
- **Fallback** jika tidak ada WebGL, perangkat sangat lemah, atau reduced motion: kartu statis (gambar/HTML) dengan efek tilt 3D mengikuti pointer memakai Framer Motion, tali digambar dengan SVG.

### 9.6 Kerangka kode

```tsx
// components/lanyard/Lanyard.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Band } from "./Band";

export default function Lanyard() {
  return (
    <div className="lanyard-wrap">
      <Canvas
        camera={{ position: [0, 0, 13], fov: 25 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
```

`Band` berisi: satu `RigidBody` tetap (anchor), tiga `RigidBody` tali, satu `RigidBody` kartu, joint di antaranya, `MeshLine` untuk tali, dan handler drag. Acuan implementasi: komponen Lanyard dari React Bits (berbasis contoh kartu Vercel). Sesuaikan material, warna, dan isi kartu dengan desain ini.

---

## 10. Smooth Scrolling

- **Lenis**: `lerp: 0.085`, `smoothWheel: true`, `wheelMultiplier: 0.9`. Touch memakai scroll native supaya terasa natural.
- Sinkron dengan GSAP:

```ts
const lenis = new Lenis({ lerp: 0.085 });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

- Klik menu navbar memanggil `lenis.scrollTo(section, { duration: 1.4, easing: easeInOutCubic, offset: -80 })`.
- Tombol "scroll" di Home juga memakai `scrollTo`.
- Indikator progres scroll: garis tipis biru 2px di paling atas layar, `scaleX` mengikuti progres.
- Reduced motion: matikan Lenis, pakai scroll native.

---

## 11. Navbar

- Pill melayang di tengah atas (`top: 16px`), latar `--surface` dengan opacity 70%, `backdrop-filter: blur(16px) saturate(1.4)`, border `--line`.
- Menu: Home, About, Experience, Projects, Contacts.
- **Indikator aktif** berupa pill biru muda yang meluncur antar menu (Framer Motion `layoutId`) mengikuti section yang sedang terlihat (`IntersectionObserver`).
- Di kanan: toggle bahasa (ID/EN) dan toggle tema.
- Saat scroll ke bawah, navbar mengecil sedikit (padding dan blur menyesuaikan). Saat scroll ke atas, kembali normal.
- Mobile: tombol menu membuka panel layar penuh dengan latar blur, tautan muncul dengan stagger.

---

## 12. Section: About

### Layout

```
┌──────────────────────────────────────────────┐
│  Tentang aku                                 │
│                                              │
│  ┌────────────┐   Paragraf singkat tentang   │
│  │   FOTO     │   siapa kamu, apa yang kamu  │
│  │ (blur-in)  │   kerjakan, dan apa yang     │
│  └────────────┘   sedang kamu pelajari.      │
│                                              │
│  Fakta singkat:  Kampus · Fokus · Status     │
│                                              │
│  Skills (marquee 2 baris, arah berlawanan)   │
│  [React] [Laravel] [TypeScript] [Python] ... │
└──────────────────────────────────────────────┘
```

### Konten

- Foto dengan bingkai radius besar dan orb biru blur di belakangnya.
- Paragraf pendek (3–5 kalimat), ditulis dengan suara pribadi, bukan daftar kata kunci.
- Tiga fakta cepat (kampus, bidang fokus, kondisi saat ini seperti "terbuka untuk magang").
- **Skills marquee**: dua baris chip berjalan berlawanan arah, melambat saat di-hover. Tiap chip punya ikon teknologi. Isi dengan stack yang benar-benar kamu pakai: `[ganti]`.

### Animasi

- Paragraf: teks dipecah per baris, tiap baris blur-in saat masuk viewport.
- Foto: `clip-path` terbuka dari bawah ke atas lalu blur ke tajam.
- Fakta cepat: angka atau kata kunci naik dengan stagger.

---

## 13. Elemen Blur (Aspek Visual)

| Elemen | Detail |
|---|---|
| **Orb ambient** | 2–3 lingkaran biru `--glow`, `filter: blur(90–120px)`, ukuran 320–520px, melayang pelan (translate acak 20–40px, 14–22 detik, loop). Ada di Home, About, dan Contacts |
| **Navbar kaca** | `backdrop-filter: blur(16px)` |
| **Blur-in teks** | Teks mulai dari `blur(12px)` menjadi tajam saat reveal |
| **Progressive blur tepi** | Gradasi blur di tepi atas dan bawah viewport (mask linear-gradient) supaya konten yang di-scroll terasa memudar halus |
| **Hover kartu proyek** | Gambar sedikit blur dan zoom, panel kaca naik menampilkan deskripsi singkat |
| **Modal dan menu mobile** | Latar `backdrop-filter: blur(20px)` dengan lapisan gelap tipis |
| **Parallax orb** | Orb bergerak berlawanan arah scroll dengan kecepatan 0,2× |

**Aturan performa blur:**
- Radius blur besar hanya untuk elemen statis atau yang digerakkan lewat `transform`.
- Di mobile kurangi jumlah orb menjadi 2 dan radius menjadi 60px.
- Jangan menumpuk `backdrop-filter` di atas `backdrop-filter`.
- Orb diberi `pointer-events: none` dan `aria-hidden="true"`.

---

## 14. Section: Experience (Timeline)

### Layout

```
Desktop                                   Mobile
                                          
   2026 ─────●───────────────┐             ●─┐
              │   ┌────────┐ │             │ │  Kartu
              │   │ Kartu  │◄┘             │ └─────────
   2025 ──────●   └────────┘               ●─┐
        ┌────────┐ │                       │ │  Kartu
        │ Kartu  │◄┤                       │ └─────────
        └────────┘ │
   2024 ──────●────┘
              ▼  garis terisi biru mengikuti scroll
```

- Desktop: garis vertikal di tengah, kartu bergantian kiri dan kanan. Mobile: garis di kiri, kartu satu kolom.
- Urutan dari terbaru ke terlama.

### Perilaku

1. **Garis progres**: garis dasar abu-abu tipis (`--line`). Di atasnya garis biru terisi mengikuti scroll (`scaleY` dengan `scrub: true` dan sedikit lerp supaya halus).
2. **Titik (node)**: awalnya outline abu-abu. Saat garis mencapai titik, node terisi biru, membesar 1,0 → 1,25 → 1,0 dengan ring glow melebar sekali.
3. **Kartu**: masuk dari samping (kiri/kanan sesuai posisi) dengan blur-in saat node aktif.
4. **Fokus aktif**: kartu yang sedang di tengah layar tampil penuh. Kartu lain sedikit meredup (opacity 0,55) dan blur 1px, kembali tajam saat didekati.
5. **Chip tanggal** menempel (sticky) berdekatan dengan garis di desktop agar konteks waktu selalu terlihat.

### Isi kartu

- Judul peran dan nama organisasi.
- Rentang waktu.
- 2–3 poin pencapaian yang spesifik dan terukur jika memungkinkan.
- Tag teknologi.

### Data awal (placeholder, isi dengan pengalaman aslimu)

| Periode | Peran | Organisasi |
|---|---|---|
| `[2026 – sekarang]` | `[ganti]` | `[ganti]` |
| `[2025]` | `[ganti]` | `[ganti]` |
| `[2024]` | `[ganti, mis. kepanitiaan / lomba / organisasi]` | `[ganti]` |
| `[2023]` | Mulai kuliah Informatika | `[ganti]` |

Pengalaman tidak harus pekerjaan formal. Proyek kampus, lomba, kepanitiaan, asisten praktikum, dan kontribusi open source layak masuk.

---

## 15. Section: Projects

### Layout

```
┌──────────────────────────────────────────────────────┐
│  Projects                                            │
│  [Semua] [Web] [Mobile] [Security] [Lainnya]  ← filter│
│                                                      │
│  ┌──────────────────────┐  ┌────────────┐            │
│  │  Proyek unggulan     │  │  Proyek 2  │            │
│  │  (besar)             │  └────────────┘            │
│  │                      │  ┌────────────┐            │
│  └──────────────────────┘  │  Proyek 3  │            │
│  ┌────────────┐ ┌────────┐ └────────────┘            │
│  │ Proyek 4   │ │ Proy 5 │                           │
│  └────────────┘ └────────┘                           │
└──────────────────────────────────────────────────────┘
```

- Grid bento: satu proyek unggulan berukuran besar, sisanya berbagai ukuran. Ukuran kartu mengikuti pentingnya proyek, bukan seragam.
- Filter berupa chip. Saat filter berubah, kartu berpindah dengan animasi `layout` (Framer Motion) dan yang tidak cocok memudar keluar.

### Kartu proyek

- Cover (screenshot atau mockup), judul, deskripsi 1 kalimat, tag teknologi, tautan **Live** dan **Repo**.
- Hover desktop: cover zoom pelan, panel kaca naik dengan ringkasan dan tombol.
- Tilt 3D halus (maks 4°) mengikuti kursor.

### Detail proyek

- Klik membuka **modal dengan shared layout transition**: kartu mengembang menjadi panel detail (cover besar, masalah, solusi, peran, teknologi, hasil, tautan).
- Tutup dengan Esc, klik latar, atau tombol tutup. Fokus dikembalikan ke kartu asal.
- Latar modal memakai blur.

### Data awal (placeholder)

Isi 4–6 proyek. Contoh struktur:

```json
{
  "slug": "nama-proyek",
  "title": "[Nama proyek]",
  "summary": "[Satu kalimat: apa yang dibuat dan untuk siapa]",
  "category": ["web"],
  "stack": ["Laravel", "Tailwind"],
  "cover": "/projects/nama-proyek.webp",
  "links": { "live": "https://...", "repo": "https://github.com/..." },
  "featured": true,
  "role": "[Peranmu]",
  "outcome": "[Hasil nyata: pengguna, performa, nilai, penghargaan]"
}
```

---

## 16. Section: Contacts

### Layout

```
┌──────────────────────────────────────────────┐
│                                              │
│        Yuk ngobrol.                          │  ← judul besar, center
│        Terbuka untuk magang & kolaborasi.    │
│                                              │
│   [ halo@domainmu.com  ⧉ salin ]             │
│                                              │
│   GitHub   LinkedIn   Instagram   Email      │
│                                              │
│   ┌──────────────────────────────┐           │
│   │ Nama                         │  (opsional)│
│   │ Email                        │           │
│   │ Pesan                        │           │
│   │              [Kirim pesan]   │           │
│   └──────────────────────────────┘           │
│                                              │
│  © 2026 Dhimas · Dibuat dengan [stack]       │
└──────────────────────────────────────────────┘
```

### Perilaku

- Tombol email: klik menyalin ke clipboard. Teks berubah menjadi "Tersalin" dengan animasi morph ikon salin menjadi centang, kembali setelah 2 detik.
- Tautan sosial: ikon dengan hover magnetik dan label yang meluncur keluar.
- Form: validasi inline, tombol berubah status (idle, mengirim dengan spinner, terkirim dengan centang). Toast muncul dari bawah dengan blur-in. Jika gagal, pesan menjelaskan apa yang salah dan cara memperbaikinya.
- Honeypot field untuk anti-spam.
- Orb blur besar di belakang judul, bereaksi halus terhadap kursor.
- Kartu lanyard kecil (versi miniatur, opsional) bisa muncul lagi di sudut sebagai easter egg.

---

## 17. Tambahan yang Direkomendasikan

Hal-hal yang menurutku kamu butuhkan di luar permintaan awal, diurutkan dari paling penting.

**Wajib**
1. **Tombol Unduh CV** (PDF) di Home dan Contacts. Recruiter hampir selalu mencarinya.
2. **Responsif penuh** dari 360px sampai layar lebar, termasuk lanyard versi mobile.
3. **Fallback lanyard** untuk perangkat tanpa WebGL dan untuk reduced motion.
4. **SEO dan Open Graph**: title, description, `og:image` (gambar kartu lanyard yang menarik), favicon monogram D, `sitemap.xml`, `robots.txt`.
5. **Aksesibilitas**: fokus keyboard terlihat jelas (ring biru), tautan "Lewati ke konten", `aria-label` pada tombol ikon, urutan heading benar, kontras AA.
6. **Skills marquee** di About agar stack teknologi langsung terbaca.

**Sangat disarankan**
7. **Toggle bahasa ID/EN**. Recruiter dan dosen bisa membaca dalam bahasa yang cocok. Simpan di `localStorage`, isi teks dari file `i18n/id.json` dan `i18n/en.json`.
8. **Indikator progres scroll** di atas layar.
9. **Halaman 404** bertema lanyard (kartu jatuh dan berayun) dengan tombol kembali ke Home.
10. **Section Achievements / Sertifikat** singkat di bawah Experience (lomba, sertifikasi, penghargaan) jika kamu punya. Bisa berupa baris kompak, tidak perlu section besar.
11. **Analytics ringan tanpa cookie** (Plausible atau Umami) untuk melihat dari mana pengunjung datang, tanpa banner cookie.
12. **Favicon dinamis**: ganti warna mengikuti tema.

**Opsional (kalau waktu ada)**
13. **Command palette** (`Ctrl/Cmd + K`) untuk lompat antar section, ganti tema, salin email.
14. **Kursor kustom** halus (dot biru yang membesar di atas elemen interaktif), hanya desktop.
15. **Blog atau catatan belajar** sebagai halaman terpisah.
16. **Statistik GitHub** (kontribusi atau repo terbaru) yang diambil lewat API.

---

## 18. Responsif

| Breakpoint | Lebar | Penyesuaian |
|---|---|---|
| `sm` | ≥ 640px | Tipografi naik, tombol sebaris |
| `md` | ≥ 768px | About dua kolom, timeline mulai bergantian |
| `lg` | ≥ 1024px | Home dua kolom, grid proyek bento penuh |
| `xl` | ≥ 1280px | Container maksimal 1200px |

- Mobile: lanyard di atas teks, orb dikurangi, navbar menjadi menu layar penuh, efek magnetik dan tilt dimatikan.
- Target sentuh minimal 44 × 44 px.

---

## 19. Performa

| Target | Nilai |
|---|---|
| Lighthouse Performance (mobile) | ≥ 85 |
| LCP | < 2,5 detik (teks hero, bukan canvas) |
| CLS | < 0,05 |
| Total JS awal | < 250 KB gzip, 3D dimuat lazy |
| Gambar | WebP/AVIF, `loading="lazy"`, ukuran eksplisit |
| Font | `font-display: swap`, subset Latin, preload font display |

Lainnya: kompres model 3D (Draco/Meshopt), hentikan render 3D saat tidak terlihat, batasi jumlah elemen yang di-blur bersamaan.

---

## 20. Struktur Folder (Next.js)

```
/app
  layout.tsx            // font, metadata, script tema, provider
  page.tsx              // menyusun semua section
  not-found.tsx
/components
  /layout   Navbar.tsx  ThemeToggle.tsx  LangToggle.tsx  ScrollProgress.tsx
  /loader   Loader.tsx
  /lanyard  Lanyard.tsx  Band.tsx  LanyardFallback.tsx
  /sections Home.tsx  About.tsx  Experience.tsx  Projects.tsx  Contacts.tsx
  /ui       TypeWriter.tsx  BlurReveal.tsx  Magnetic.tsx  Marquee.tsx  Orb.tsx
/data       experience.ts  projects.ts  skills.ts
/i18n       id.json  en.json
/lib        lenis.ts  theme.ts  motion.ts
/public     /models/card.glb  /textures/  /projects/  cv-dhimas.pdf  og.png
/styles     globals.css      // token warna + tema
```

---

## 21. Konten Awal (Placeholder)

| Bagian | Teks |
|---|---|
| Judul hero | Hai aku Dhimas! |
| Subjudul | Informatics Student yang suka `[bidang]` |
| About (pembuka) | `[2–3 kalimat tentang siapa kamu dan apa yang sedang kamu kerjakan]` |
| Judul Contacts | Yuk ngobrol. |
| Sub Contacts | Terbuka untuk magang dan kolaborasi. |
| Tombol | Lihat Projects, Unduh CV, Salin email, Kirim pesan |

Gaya tulisan: kalimat kasual tapi rapi, kata kerja aktif, tidak berlebihan. Tombol menjelaskan aksi yang terjadi ("Unduh CV", bukan "Klik di sini").

---

## 22. Urutan Pengerjaan

1. Setup proyek, token warna, tipografi, tema light/dark + script anti-kedip.
2. Lenis + GSAP sinkron, navbar, indikator aktif, progres scroll.
3. Komponen UI dasar: `BlurReveal`, `TypeWriter`, `Magnetic`, `Orb`, `Marquee`.
4. Toggle tema dengan circular reveal.
5. Home (teks + typing) dengan lanyard fallback statis dulu.
6. Lanyard 3D penuh dan integrasi tema.
7. Loader yang terhubung ke progres aset.
8. About, lalu Experience (timeline), Projects (filter + modal), Contacts.
9. i18n, SEO, aksesibilitas, 404.
10. Audit performa dan uji di perangkat nyata (HP kelas menengah).

---

## 23. Checklist Penerimaan

**Visual**
- [ ] Light mode memakai latar off-white kebiruan, teks navy, aksen biru. Tidak ada hitam atau putih polos sebagai latar.
- [ ] Dark mode berwarna abu-abu charcoal, bukan hitam penuh.
- [ ] Orb blur, navbar kaca, dan blur-in teks terlihat konsisten di kedua mode.

**Gerakan**
- [ ] Loader tampil, terikat progres aset, lalu terangkat halus.
- [ ] Hero: lanyard jatuh, judul diketik, elemen lain muncul berurutan.
- [ ] Toggle tema memakai circular reveal tanpa kedipan, fallback fade berfungsi.
- [ ] Smooth scroll berjalan di semua section dan tersinkron dengan animasi scroll.
- [ ] Timeline terisi mengikuti scroll, node menyala, kartu fokus bergantian.
- [ ] Setiap section punya animasi masuk yang halus dan seragam.

**Lanyard**
- [ ] Kartu bisa ditarik, dilempar, dan kembali berayun natural.
- [ ] Kartu bisa dibalik, sisi belakang menampilkan QR dan info.
- [ ] Teks dan tombol di sekitar lanyard tetap bisa diklik.
- [ ] Di mobile, scroll halaman tidak terganggu.
- [ ] Fallback tampil benar saat WebGL mati atau reduced motion aktif.

**Kualitas**
- [ ] Keyboard bisa menjelajahi seluruh situs dengan fokus terlihat.
- [ ] `prefers-reduced-motion` dihormati.
- [ ] Skor Lighthouse sesuai target di bagian Performa.
- [ ] Semua placeholder `[ganti ...]` sudah diisi.

---

## 24. Prompt Singkat untuk Coding Agent

> Bangun portofolio sesuai `design.md`. Mulai dari langkah 1–5 pada bagian "Urutan Pengerjaan", pastikan token warna light/dark, typing hero "Hai aku Dhimas!", smooth scroll Lenis, dan toggle tema dengan circular reveal berfungsi. Pakai lanyard fallback statis dulu, lanjutkan ke lanyard 3D setelah halaman dasar stabil. Jangan menambah dependensi di luar bagian "Tech Stack" tanpa bertanya.
