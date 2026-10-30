# 01: Fondasi Tipografi Retro-HUD & Kursor Game 8-Bit

**What to build:** Standardisasi hierarki tipografi retro-arcade pada seluruh halaman portofolio, memadukan font piksel (`Silkscreen`) untuk judul, tombol, dan badge dengan font monospace (`JetBrains Mono`) untuk paragraf naratif dan log data, dilengkapi kursor panah dan pointer tangan piksel kustom berbasis 8-bit game.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Seluruh heading (`h1`, `h2`, `h3`), nama brand, dan teks tombol menggunakan font piksel Silkscreen dengan keterbacaan tinggi.
- [x] Seluruh teks paragraf tubuh, form input, dan log telemetri menggunakan font monospace JetBrains Mono.
- [x] Kursor default browser pada desktop digantikan oleh SVG 8-bit black-and-white pixel arrow.
- [x] Kursor interaktif pada tombol, tautan, tab, dan form field berubah menjadi SVG 8-bit pixel pointer hand beraksen oranye.
- [x] Tidak ada regresi pergeseran tata letak (CLS) atau pemotongan teks akibat perubahan font.

## Answer

Diimplementasikan pada `src/app/globals.css`. `--font-display` dan `--font-pixel` dihubungkan ke Silkscreen, `--font-body` dan `--font-mono` ke JetBrains Mono. Kursor SVG 8-bit arrow dan hand pointer disematkan pada aturan CSS layer base. Berhasil diverifikasi dengan zero errors.
