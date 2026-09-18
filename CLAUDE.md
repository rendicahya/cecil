# CLAUDE.md

# Cecil — Cerita Kecil

Cecil adalah web app frontend-only untuk membuat latihan fokus dan
pemahaman bacaan sederhana bagi anak.

Cecil digunakan oleh orang tua. Orang tua membaca cerita yang tampil pada
kartu kepada anak, kemudian membacakan pertanyaan yang ada di kartu kepada
anak.

Nama aplikasi:
**Cecil — Cerita Kecil**

---

## Tujuan Produk

Cecil membantu melatih:

- kemampuan mendengarkan
- fokus dan perhatian
- mengingat informasi pendek
- pemahaman bahasa
- kemampuan menjawab pertanyaan berdasarkan informasi yang didengar

Cecil bukan aplikasi ujian. Pengalaman harus terasa seperti bermain dengan
kartu cerita.

Pengguna utama adalah orang tua, sedangkan anak adalah orang yang
mendengarkan dan menjawab.

---

# Tech Stack

Gunakan:

- SvelteKit
- TypeScript
- Tailwind CSS
- Lucide untuk icon
- GitHub Pages untuk deployment

Untuk interaksi swipe:

1. Cari terlebih dahulu apakah ada library JavaScript yang cocok untuk
   membuat physical/card-stack interaction.
2. Gunakan library tersebut jika memberikan pengalaman yang baik dan tidak
   menambah kompleksitas yang tidak perlu.
3. Jika tidak ada library yang cocok, implementasikan interaksi kartu dengan
   Svelte dan pointer/touch events.

Jangan menggunakan backend.

Jangan membutuhkan database atau API eksternal untuk fitur utama.

Semua generator cerita berjalan di browser.

---

# Prinsip Utama

Prioritaskan:

1. UX yang sederhana
2. tampilan playful dan hangat
3. kartu terasa seperti kartu fisik
4. teks cerita mudah dibaca
5. interaksi swipe yang natural
6. kode sederhana dan mudah dikembangkan

Hindari over-engineering.

Jangan menambahkan library hanya karena library tersebut populer.

---

# Konsep Utama UI

Elemen utama aplikasi adalah **stack of story cards**.

Jangan membuatnya terlihat seperti image carousel.

Kartu harus terasa seperti objek fisik yang dapat diambil dan digeser.

Visual yang diinginkan:

- satu kartu utama berada di tengah
- kartu berikutnya berada sedikit di belakang
- kartu belakang sedikit terlihat
- kartu memiliki rounded corners
- terdapat subtle border dan shadow
- terdapat depth antara kartu depan dan belakang
- kartu dapat di-drag dengan mouse atau touch
- kartu sedikit berotasi ketika sedang di-drag
- kartu berikutnya bergerak naik/membesar secara halus ketika kartu depan
  digeser
- setelah swipe berhasil, kartu berpindah dengan animasi yang natural

Jangan menggunakan gambar penuh sebagai isi kartu.

Fokus visual adalah typography, whitespace, ilustrasi/dekorasi kecil, dan
physical-card interaction.

---

# Struktur Kartu

Setiap kartu minimal memiliki:

```text
┌──────────────────────────────┐
│                              │
│        CERITA KECIL          │
│                              │
│  Lala membawa sebuah         │
│  keranjang dan naik kereta   │
│  ke rumah nenek.             │
│                              │
│  ──────────────────────────  │
│                              │
│  Pertanyaan                  │
│                              │
│  1. Siapa yang pergi ...?    │
│  2. Apa yang dibawa Lala?    │
│  3. Bagaimana Lala pergi?   │
│  4. Ke mana Lala pergi?     │
│                              │
└──────────────────────────────┘
```

# Card Generation

Jumlah kartu tidak dibatasi.

Jangan menggunakan array dengan jumlah kartu tetap seperti 10 atau 20 kartu
sebagai batas aplikasi.

Kartu dapat terus dibuat selama pengguna meminta kartu baru.

Gunakan lazy generation jika memungkinkan:

- generate kartu ketika dibutuhkan
- tidak perlu membuat ribuan kartu sekaligus
- jangan membuat seluruh kemungkinan kombinasi di awal

Generator harus mampu menghasilkan kombinasi cerita baru secara terus-menerus.

Setiap kartu memiliki ID unik agar dapat dikelola dengan baik oleh card
stack.

---

# Card Colors

Setiap kartu harus memiliki warna yang dapat berbeda dari kartu sebelumnya.

Gunakan curated palette dengan warna pastel/playful yang harmonis.

Contoh palette:

- cream
- peach
- yellow
- mint
- sky blue
- lavender
- pink

Jangan menggunakan warna secara benar-benar random dari seluruh color space.

Warna kartu dipilih dari palette yang sudah ditentukan.

Hindari dua kartu berturut-turut menggunakan warna yang sama jika masih
tersedia warna lain.

Warna harus tetap memberikan kontras yang cukup untuk teks.

Dark mode tidak berarti warna kartu harus menjadi gelap seluruhnya.
Kartu tetap dapat menggunakan warna playful dengan penyesuaian contrast
dan typography yang sesuai.

Warna merupakan bagian dari identitas visual Cecil dan harus terasa seperti
tumpukan kartu cerita yang berwarna-warni.
