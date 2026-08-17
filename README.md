# 🇮🇩 Pustaka Busana Nusantara

Pustaka Busana Nusantara adalah aplikasi web ensiklopedia interaktif dan edukatif yang merangkum pakaian adat tradisional dari **38 provinsi** di Indonesia. Aplikasi ini dibuat menggunakan teknologi web murni (HTML5, CSS3, dan Vanilla JavaScript) tanpa dependensi eksternal berat, sehingga sangat cepat, responsif, dan dapat dijalankan langsung di peramban (browser) mana pun secara offline.

---

## ✨ Fitur Utama

1. **Eksplorasi Lengkap (38 Provinsi)**: 
   Database lengkap pakaian adat beserta detail nama, wilayah pulau, deskripsi mendalam, filosofi & makna pakaian, komponen detail (misal: hiasan kepala, senjata), dan konteks penggunaannya.
2. **Ilustrasi SVG Dinamis**:
   Gambar representasi pakaian adat dihasilkan secara prosedural melalui kode JavaScript berbentuk vektor SVG berkualitas tinggi. Mengeliminasi ketergantungan pada gambar eksternal dan menjaga tampilan tetap tajam di layar resolusi tinggi (Retina/4K).
3. **Peta Interaktif Kepulauan**:
   Peta digital wilayah kepulauan Indonesia dalam format SVG interaktif. Klik wilayah pulau (Sumatera, Jawa, Bali/Nusra, Kalimantan, Sulawesi, Maluku, Papua) untuk langsung menyaring daftar baju adat di bawahnya.
4. **Kuis Adat Nusantara**:
   Game edukasi mini tebak-tebakan dengan 10 pertanyaan acak untuk menguji wawasan pengguna seputar pakaian adat tradisional nusantara, lengkap dengan indikator skor akhir dan medali penghargaan.
5. **Sistem Favorit Lokal**:
   Simpan pakaian adat yang Anda sukai ke dalam daftar Favorit pribadi. Data disimpan secara persisten di perangkat Anda menggunakan `localStorage` peramban.
6. **Desain Premium & Aksesibel**:
   Antarmuka modern bertema warisan budaya hangat (*warm paper heritage*) menggunakan tipografi premium *Playfair Display* dan *Inter*, dilengkapi transisi halus, tata letak fluid responsif untuk ponsel/tablet, dan modal detail informasi.

---

## 📁 Struktur Berkas

```text
baju-tradisional-nusantara/
├── index.html     - Struktur HTML utama halaman, tab menu, dan modal detail
├── styles.css     - Sistem desain CSS, palet warna regional, kuis, dan peta
├── data.js        - Database statis 38 pakaian adat provinsi Indonesia (format array)
├── app.js         - Kontroler frontend, generator gambar SVG, sistem filter & kuis
└── README.md      - Dokumentasi proyek repository
```

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini bersifat statis penuh, sehingga Anda **tidak memerlukan instalasi server backend apa pun**.

### Cara A: Langsung Buka File (Paling Mudah)
1. Kloning atau unduh repository ini.
2. Klik ganda pada berkas `index.html` untuk membukanya langsung di peramban web pilihan Anda (Google Chrome, Mozilla Firefox, Safari, Edge, dll.).

### Cara B: Menggunakan Local Server (Untuk Pengembang)
Jika Anda menggunakan VS Code atau memiliki Node.js/Python di sistem Anda:
* **Python**: Jalankan `python3 -m http.server 8000` di terminal folder ini, lalu buka `http://localhost:8000`.
* **Node.js (npx)**: Jalankan `npx http-server` atau `npx serve`, lalu buka tautan lokal yang disediakan.
* **VS Code**: Klik kanan `index.html` dan pilih *Open with Live Server*.

---

## 🎨 Palet Warna Regional

Tiap wilayah kepulauan memiliki palet warna representatif yang menghiasi antarmuka kartu pakaian adat:
* **Sumatera**: Merah Crimson Tua (`#A83232`) & Emas Antik
* **Jawa**: Biru Indigo Keraton (`#2A475E`) & Cokelat Batik
* **Bali & Nusra**: Saffron Kuning Jingga (`#D18D1F`)
* **Kalimantan**: Cokelat Serat Kayu Hutan (`#825A38`)
* **Sulawesi**: Ungu Royal Sutra (`#6A3E85`)
* **Maluku**: Merah Cengkih & Hijau Toska Laut (`#0D7373`)
* **Papua**: Jingga Tanah Liat / Oker (`#B25A2C`)

---

## 🤝 Kontribusi

Proyek ini dibuat sebagai pustaka pengetahuan terbuka. Jika Anda ingin melengkapi deskripsi pakaian adat, menambahkan ilustrasi detail, atau menyempurnakan fitur peta interaktif:
1. Fork repositori ini.
2. Buat cabang baru (`git checkout -b feature/OptimasiBaju`).
3. Lakukan commit perubahan Anda (`git commit -m 'Menambahkan detail aksesori Baju Kurung'`).
4. Push ke cabang tersebut (`git push origin feature/OptimasiBaju`).
5. Buat Pull Request.

---

*Mari lestarikan kekayaan budaya Indonesia melalui inovasi teknologi digital!* 🇲🇨
