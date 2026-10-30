# 03: Stepped Pixel Card Framing & Modal Arkade untuk Proyek & Casework

**What to build:** Pembaruan antarmuka kartu proyek dan studi kasus perbankan menjadi wadah piksel bersudut tegas dengan bayangan offset padat fisik (`shadow-[4px_4px_0px_var(--line)]`), filter kategori segmented `▶ [Kategori]`, dan modal detail proyek bergaya dialog arkade retro.

**Blocked by:** 01: Fondasi Tipografi Retro-HUD & Kursor Game 8-Bit

**Status:** resolved

- [x] Filter kategori proyek menggunakan segmented chassis dengan penanda panah aktif `▶ [Kategori]` dan efek audio blip.
- [x] Seluruh kartu proyek dan studi kasus industri Bank Mega menggunakan sudut tajam (`rounded-none`) dan bayangan solid offset.
- [x] Hover kartu menghasilkan transisi bayangan ke warna aksen tanpa layout shift.
- [x] Dialog modal detail proyek berpenampilan boks arkade retro dengan bingkai cover bersudut tegas dan tombol tautan berfont piksel.
- [x] Seluruh chip teknologi pada kartu dan modal memiliki sudut tajam dan bayangan piksel micro.

## Answer

Diimplementasikan pada `Projects.tsx` dan `Casework.tsx`. Filter segmented dengan indikator `▶`, kartu bersudut tajam dengan `shadow-[4px_4px_0px_var(--line)]` & hover aksen, serta modal dialog arkade retro dengan tombol tautan berfont piksel dan bayangan solid.
