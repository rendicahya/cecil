# Cecil — Cerita Kecil

Web app frontend-only untuk melatih fokus, mendengarkan, dan pemahaman
bacaan anak lewat kartu cerita pendek yang dapat digeser (swipe) seperti
kartu fisik. Orang tua membaca cerita pada kartu, lalu membacakan
pertanyaannya kepada anak.

Lihat [`CLAUDE.md`](./CLAUDE.md) untuk visi produk dan spesifikasi lengkap.

## Tech stack

- SvelteKit + Svelte 5 (runes) + TypeScript
- Tailwind CSS v4
- [`@lucide/svelte`](https://lucide.dev) untuk ikon
- `@sveltejs/adapter-static` untuk deploy statis ke GitHub Pages
- Cerita dan pertanyaan digenerate 100% di browser (template + word bank),
  tanpa backend/API eksternal

## Menjalankan secara lokal

```sh
npm install
npm run dev -- --open
```

## Build

```sh
npm run build
npm run preview   # pratinjau hasil build
```

## Cek kualitas kode

```sh
npm run check   # svelte-check + type checking
npm run lint     # prettier --check + eslint
npm run format   # prettier --write
```

## Deployment

Repo ini sudah dilengkapi GitHub Actions workflow
(`.github/workflows/deploy.yml`) yang men-build dan men-deploy situs ke
GitHub Pages setiap push ke `main`. Workflow otomatis mengatur base path
(`/<nama-repo>`) lewat env var `BASE_PATH` saat build.

Aktifkan GitHub Pages di **Settings → Pages → Source: GitHub Actions** pada
repo ini agar workflow dapat men-deploy.
