# 🌴 Solusi Sawit Nusantara - Official Landing Page

Website Landing Page modern, persuasif, responsif mobile, dan siap di-deploy langsung ke **GitHub Pages** untuk rangkaian produk **Solusi Sawit Nusantara** (Paket Kombo Pupuk Kocor: Pelarut Pupuk Kimia 1 Kg + Biang Kocor 1 Liter).

---

## 🚀 Fitur Unggulan Website

1. **High-Converting Copywriting**:
   - Menyoroti pesan utama: *Hemat Pupuk Kimia 50% + Janjang Buah Padat Bernas + Rp 395.000 untuk 2 Hektar + Bayar di Tempat (COD)*.
2. **Kalkulator Interaktif Penghematan Pupuk**:
   - Petani dapat menggeser luas lahan sawit (1 – 20 Hektar) untuk melihat kalkulasi real-time uang yang dihemat.
   - Tombol sekali klik untuk langsung memasukkan jumlah paket ke formulir pemesanan.
3. **Formulir Checkout Cepat Langsung ke WhatsApp**:
   - Memasukkan nama, nomor WA, alamat lengkap kebun, dan jumlah paket.
   - Otomatis membuat format pesan WhatsApp COD yang rapi dan terstruktur saat diklik.
4. **SOP 3 Langkah Aplikasi Praktis**:
   - Panduan infografis resmi: Drum 200 Liter Air ➔ Botol Takar 1,5 Liter ➔ Siram Piringan Pohon.
   - Peringatan agronomis: Larangan mencampur dengan herbisida (racun rumput).
5. **Interactive Accordion FAQ**:
   - Menjawab keraguan petani seputar dosis, cara aplikasi, garansi keaslian produk, dan sistem bayar COD.
6. **Social Proof & Urgency Alert**:
   - Floating pop-up notifikasi pesanan petani dari berbagai daerah (Riau, Sumut, Kalbar, Kalteng, dll) untuk meningkatkan kepercayaan pembeli.
   - Banner hitung mundur (countdown timer) promo subsidi ongkir.

---

## 📂 Struktur File

```
solusi-sawit-nusantara/
├── index.html                   # Halaman utama landing page
├── README.md                    # Petunjuk penggunaan dan deploy
├── assets/
│   ├── css/
│   │   └── style.css            # Custom CSS & font import
│   ├── js/
│   │   └── app.js               # Logic kalkulator, form WA, countdown, & FAQ
│   └── images/
│       ├── logo.webp              # Logo resmi bulat emas (WebP - 43 KB)
│       ├── hero-sawit-combo.webp   # Foto kombo di kebun sawit (WebP - 244 KB)
│       ├── produk-transparan.webp # Foto produk background transparan (WebP - 107 KB)
│       ├── favicon.svg            # Favicon resmi
│       └── raw_originals/         # Backup berkas gambar mentah resolusi tinggi
```

---

## 📲 Kontak & Media Sosial Resmi

* **WhatsApp CS**: `+62 858-1576-8319` (tersimpan di `CONFIG.whatsappNumber` pada `assets/js/app.js`)
* **Facebook Resmi**: [Solusi Sawit Nusantara](https://web.facebook.com/profile.php?id=61594555095749)

Jika ingin mengganti nomor di masa mendatang, cukup sesuaikan nilai `whatsappNumber` pada file `assets/js/app.js`:

```javascript
const CONFIG = {
  whatsappNumber: "6285815768319", // Nomor WhatsApp aktif (format 62...)
  facebookUrl: "https://web.facebook.com/profile.php?id=61594555095749",
  ...
};
```

---

## 🌐 Cara Deploy ke GitHub Pages (3 Langkah Mudah)

Karena proyek ini menggunakan HTML & Tailwind CSS murni tanpa perlu build tool (Node.js/Webpack), Anda cukup melakukan push ke repositori GitHub:

1. **Inisialisasi Git dan Commit**:
   ```bash
   git init
   git add .
   git commit -m "feat: landing page Solusi Sawit Nusantara siap deploy"
   ```

2. **Hubungkan ke Repositori GitHub**:
   ```bash
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git branch -M main
   git push -u origin main
   ```

3. **Aktifkan GitHub Pages**:
   - Buka halaman repositori di GitHub.
   - Masuk ke tab **Settings** ➔ **Pages**.
   - Pada bagian **Build and deployment**, pilih Source: **Deploy from a branch**.
   - Pilih Branch: **main** dan folder **/(root)**, lalu klik **Save**.
   - Dalam 1-2 menit, website Anda sudah aktif di: `https://USERNAME.github.io/NAMA-REPO/`.
