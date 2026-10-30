# 02: Pixel Segmented Chassis untuk Navigasi, Bahasa, & Tema

**What to build:** Wadah kontrol sasis piksel modular untuk toggle bahasa, toggle tema Minecraft Redstone Lamp, dan tautan navigasi utama, lengkap dengan feedback suara 8-bit sintetis Web Audio API dan indikator kurung siku monospace (`[ID]` / `[EN]`).

**Blocked by:** 01: Fondasi Tipografi Retro-HUD & Kursor Game 8-Bit

**Status:** resolved

- [x] Toggle bahasa berwujud sasis piksel bertingkat dengan indikator aktif berformat `[ID]` dan `[EN]`.
- [x] Tombol Redstone Lamp memiliki sasis bersudut tajam tanpa radius melengkung dengan lampu LED indikator berwujud piksel kotak.
- [x] Tautan navigasi desktop memiliki teks uppercase font piksel dengan garis indikator aktif bersudut tajam.
- [x] Klik pada tombol kontrol memicu audio blip 8-bit halus yang mematuhi preferensi bisu (mute) global.
- [x] Transisi tema sirkular (View Transitions API) tetap berjalan mulus tanpa error.

## Answer

Diimplementasikan pada `LangToggle.tsx`, `ThemeToggle.tsx`, dan `Navbar.tsx`. Sasis modular bertingkat dengan bracket monospace `[ID]`/`[EN]`, Redstone Lamp `rounded-none` dengan LED kotak, dan suara audio blip Web Audio API terintegrasi penuh.
