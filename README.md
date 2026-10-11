# Acca — Neo-Brutalism Portfolio

Portofolio interaktif bergaya Neo-Brutalism untuk persona **Acca**, Frontend Engineer
yang fokus pada micro-interaction & design system di domain edtech, berbasis di
Makassar. Dibangun mengikuti sistem desain di Bagian 1 prompt (token warna, tipografi,
border/shadow/radius) dan spesifikasi section di Bagian 2.

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`, token warna & tipe di `src/index.css`)
- Framer Motion (scroll reveal, hover, magnetic buttons, accordion)
- Lucide React (ikon)
- React Intersection Observer (trigger animasi & counter sekali saat masuk viewport)
- React CountUp (statistik About section)
- Embla Carousel (testimonial slider)

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build Produksi

```bash
npm run build
npm run preview
```

Hasil build ada di folder `dist/`.

## Struktur Folder

```
src/
  components/
    ui/        -> BrutalistCard, SignatureMark, SectionHeading, MagneticButton, StatCounter, ThemeToggle
    sections/  -> Navbar, Hero, About, Skills, Journey, Projects, Testimonials, FAQ, Contact, Footer
  hooks/       -> useTheme, useMagnetic, useReducedMotionSafe
  data/
    site-config.ts  -> SATU file pusat semua data personal, project, skill, journey, testimonial, FAQ
  lib/         -> utils.ts (className helper + peta warna aksen)
  index.css    -> semua design token (warna, tipe, border/shadow/radius, dark mode)
```

## Mengganti Data Personal

Semua konten (nama, bio, social links, project, skill, journey, testimoni, FAQ) ada di
satu file: `src/data/site-config.ts`. Ubah di sana saja — komponen tidak menyimpan
data hardcode.

## Signature Element

Elemen tanda tangan situs ini adalah **marker underline** — coretan spidol kasar (SVG
path custom) yang "digambar" saat kata kunci scroll masuk viewport. Muncul di Hero,
setiap `SectionHeading`, dan judul Featured Project.

## Fitur

- Dark/light mode toggle (ikon matahari/bulan, tersimpan di localStorage, default ke `prefers-color-scheme`)
- Hormat pada `prefers-reduced-motion`
- Kontras warna AA-safe pada aksen kuning & hijau
- Responsif penuh: mobile, tablet, desktop
- Form kontak dengan validasi inline (tanpa backend — silakan sambungkan ke endpoint/Formspree/API sendiri di `src/components/sections/Contact.tsx`)

## Catatan

- Ikon GitHub/LinkedIn/Instagram memakai `lucide-react@0.383.0` yang dipin secara
  eksplisit (versi lebih baru menghapus ikon brand tersebut).
- Foto profil memakai frame monogram (huruf "A") sebagai placeholder — ganti dengan
  foto asli di `src/components/sections/Hero.tsx` bila tersedia.
