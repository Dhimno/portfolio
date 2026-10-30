# 04: Node Garis Waktu Retro & Form Kontak Mekanikal

**What to build:** Transformasi garis waktu pengalaman karier dan formulir kontak menjadi sistem piksel retro dengan node kotak berbayangan aksen, bullet point sorotan kotak, input field bersudut tegas, dan tombol kirim dengan efek tekanan mekanis.

**Blocked by:** 01: Fondasi Tipografi Retro-HUD & Kursor Game 8-Bit

**Status:** resolved

- [x] Node milestone garis waktu berbentuk bujur sangkar piksel dengan border aksen dan bayangan solid.
- [x] Poin sorotan (highlights) pengalaman menggunakan bullet kotak piksel alih-alih lingkaran bulat.
- [x] Formulir kontak memiliki input teks dan area pesan bersudut tajam dengan bayangan offset solid.
- [x] Tombol kirim pesan memiliki font piksel dengan animasi tekanan fisik (`active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_var(--ink)]`).
- [x] Tombol salin email memberikan umpan balik visual yang jelas dengan border piksel.

## Answer

Diimplementasikan pada `Experience.tsx` dan `Contacts.tsx`. Node pengalaman bujur sangkar dengan `shadow-[2px_2px_0px_var(--accent)]`, bullet point kotak, serta form kontak bersudut tajam dengan submit button mekanikal berbayangan padat.
