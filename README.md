# Cecil — Cerita Kecil 🧸📖

Web app frontend-only untuk melatih fokus, mendengarkan, dan pemahaman
bacaan anak lewat kartu cerita pendek yang dapat digeser (swipe) seperti
kartu fisik. Orang tua membaca cerita pada kartu, lalu membacakan
pertanyaannya kepada anak.

## Tentang ✨

Cecil membantu melatih kemampuan mendengarkan, fokus, mengingat informasi
pendek, pemahaman bahasa, dan kemampuan menjawab pertanyaan berdasarkan
informasi yang didengar. Cecil bukan aplikasi ujian — pengalamannya
dirancang terasa seperti bermain dengan kartu cerita fisik 🃏: satu kartu
utama di tengah, kartu berikutnya mengintip di belakang, dan dapat digeser
ke segala arah (kiri, kanan, atas, atau bawah) dengan mouse atau sentuhan
untuk berpindah kartu.

Tingkat kesulitan cerita (Mudah 🟢/Sedang 🟡/Sulit 🔴) dapat dipilih lewat
kontrol di header: semakin tinggi tingkatnya, semakin banyak fakta yang
dikemas dalam satu cerita dan semakin banyak pertanyaan yang diajukan.
Cecil juga tersedia dalam Bahasa Indonesia 🇮🇩 dan Inggris 🇬🇧, sehingga
orang tua bisa memilih bahasa yang sesuai dengan kebutuhan latihan anak.

Cerita dan pertanyaan pada setiap kartu digenerate secara acak dan
langsung di browser (tanpa backend, database, atau API eksternal) 🎲,
dengan jumlah kartu yang tidak dibatasi.

Setiap kartu juga punya tombol untuk membacakan ceritanya (text-to-speech)
🔊 langsung dari browser, lengkap dengan pilihan suara jika perangkat
menyediakan lebih dari satu voice untuk bahasa yang aktif.

## Tech stack 🛠️

- SvelteKit + Svelte 5 (runes) + TypeScript
- Tailwind CSS v4
- [`@lucide/svelte`](https://lucide.dev) untuk ikon
- `@sveltejs/adapter-static` untuk deploy statis ke GitHub Pages
- Cerita dan pertanyaan digenerate 100% di browser (template + word bank),
  tanpa backend/API eksternal
- Web Speech API (`SpeechSynthesisUtterance`) untuk membacakan cerita,
  tanpa API key atau backend

## Menjalankan secara lokal 🚀

```sh
npm install
npm run dev -- --open
```

## Build 📦

```sh
npm run build
npm run preview   # pratinjau hasil build
```

## Cek kualitas kode ✅

```sh
npm run check   # svelte-check + type checking
npm run lint     # prettier --check + eslint
npm run format   # prettier --write
```

## Deployment 🌐

Repo ini sudah dilengkapi GitHub Actions workflow
(`.github/workflows/deploy.yml`) yang men-build dan men-deploy situs ke
GitHub Pages setiap push ke `main`. Workflow otomatis mengatur base path
(`/<nama-repo>`) lewat env var `BASE_PATH` saat build.

Aktifkan GitHub Pages di **Settings → Pages → Source: GitHub Actions** pada
repo ini agar workflow dapat men-deploy.
