# Point Gate - Top Up & Voucher Game Profesional

Point Gate adalah sebuah prototipe antarmuka web (front-end) interaktif untuk platform layanan top-up game, pembelian voucher digital, dan isi ulang pulsa. Proyek ini dirancang dengan antarmuka yang modern, responsif, dan memberikan pengalaman pengguna (UX) yang mulus layaknya aplikasi produksi nyata.

## 🚀 Fitur Utama

- **Katalog Produk Digital:** Menyediakan berbagai pilihan top-up untuk game populer (Mobile Legends, Free Fire, Valorant, dll), voucher digital, dan pulsa.
- **Dark Mode & Light Mode:** Dukungan tema gelap dan terang yang terintegrasi penuh dan disimpan melalui *local storage*.
- **Sistem Transaksi Interaktif:** Simulasi alur checkout yang mendetail, mulai dari input User ID, pemilihan nominal, hingga konfirmasi pesanan.
- **Simulasi Payment Gateway:** Menyediakan berbagai simulasi metode pembayaran termasuk QRIS, Virtual Account, E-Wallet, dan Retail dengan instruksi pembayaran dan *countdown timer*.
- **Flash Sale & Promo:** Dilengkapi dengan fitur hitung mundur (countdown) untuk penawaran waktu terbatas.
- **Kalkulator Budget:** Fitur pencarian item yang disesuaikan dengan ketersediaan budget pengguna.
- **Manajemen Akun & Poin Loyalitas:** Simulasi pendaftaran dan login pengguna, riwayat transaksi, penyimpanan ID Game, serta sistem pengumpulan dan penggunaan poin loyalitas.
- **Leaderboard:** Menampilkan peringkat pengguna berdasarkan total transaksi top-up terbanyak.

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi web standar tanpa *dependency* eksternal yang berat untuk memastikan performa yang cepat:

- **HTML5:** Struktur semantik web.
- **CSS3:** Styling menggunakan CSS murni dengan implementasi *CSS Variables* untuk manajemen tema dan responsivitas layout (Grid & Flexbox).
- **JavaScript (Vanilla):** Menangani seluruh logika interaksi UI, manipulasi DOM, simulasi basis data, kalkulasi harga, dan manajemen *state* menggunakan `localStorage`.
- **FontAwesome:** Digunakan untuk ikon antarmuka.
- **Google Fonts (Poppins):** Tipografi utama platform.

## 💻 Cara Penggunaan

Karena proyek ini berjalan sepenuhnya di sisi klien (Client-Side), Anda dapat langsung menjalankannya tanpa memerlukan konfigurasi server khusus.

1. Clone repositori ini ke komputer lokal Anda:
   `git clone [https://github.com/username-anda/point-gate.git](https://github.com/ApipppX/Point-Gate-Top-Up.git)`
2. Buka folder proyek tersebut.
3. Klik ganda pada file `index.html` untuk membukanya di browser (Chrome, Firefox, Safari, Edge, dll).
4. (Opsional) Gunakan ekstensi seperti *Live Server* di VS Code untuk pengalaman pengembangan yang lebih baik.

## 🔮 Rencana Pengembangan (Roadmap)

Ke depannya, antarmuka ini dirancang untuk dapat diintegrasikan dengan sistem *back-end* yang nyata. Rencana pengembangannya meliputi:
- Pemisahan arsitektur menjadi *Views* dan *Controllers* menggunakan framework PHP seperti CodeIgniter 4.
- Integrasi database relasional (MySQL) untuk menyimpan data produk, pengguna, dan transaksi secara persisten.
- Pembuatan API untuk menghubungkan sistem dengan payment gateway sungguhan dan penyedia layanan top-up.

## 👨‍💻 Pengembang

**Muhammad Afif**  
NIM: 15240135  
Universitas Bina Sarana Informatika (UBSI) Kampus BSD

Proyek ini dikembangkan sebagai bentuk eksplorasi dan portofolio dalam pengembangan antarmuka web dan *front-end engineering*.
