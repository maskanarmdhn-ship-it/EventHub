# 🎉 EventHub

Aplikasi manajemen event berbasis web yang dibangun menggunakan **Svelte** sebagai frontend, **Express.js** sebagai backend, dan **MySQL** sebagai database. Aplikasi ini memungkinkan pengguna melakukan registrasi, login, serta mengelola data event melalui fitur CRUD (Create, Read, Update, Delete).

---

# Deskripsi Proyek

EventHub dibuat untuk membantu pengguna dalam mengelola informasi event secara sederhana dan terpusat. Setelah berhasil login, pengguna dapat menambahkan, melihat, mengubah, dan menghapus data event. Selain itu, aplikasi juga menampilkan statistik jumlah event dan total kuota peserta sehingga memudahkan pengguna dalam memonitor data yang telah dibuat.

---

# Anggota Kelompok

| Nama | NIM | Pembagian Tugas |
|------|------|-----------------|
| **Dhani** | **2024520020** | Analisis kebutuhan sistem, perancangan database, pembuatan frontend menggunakan Svelte, pembuatan backend menggunakan Express.js, integrasi API, implementasi autentikasi (Login & Register), CRUD Event, dashboard statistik, validasi form, pengujian aplikasi, dokumentasi proyek, serta pengelolaan repositori GitHub. |
| **Kevin** | **2024520084** | Membantu penyempurnaan tampilan antarmuka (UI), penyesuaian warna, tata letak dashboard, serta perbaikan beberapa tombol pada aplikasi. |

---

# Teknologi yang Digunakan

## Frontend

- Svelte
- Vite
- Bootstrap 5
- Axios
- SweetAlert2

## Backend

- Node.js
- Express.js
- MySQL
- JSON Web Token (JWT)
- bcrypt
- dotenv
- cors

---

# Struktur Proyek

```
EventHub
│
├── frontend
│   ├── src
│   ├── public
│   ├── .env.example
│   ├── package.json
│   └── ...
│
├── backend
│   ├── .env.example
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# Dokumentasi Database

Database yang digunakan adalah **MySQL** dengan nama database:

```
eventhub
```

## Tabel Users

| Field | Tipe Data |
|--------|-----------|
| id | INT |
| nama | VARCHAR |
| email | VARCHAR |
| password | VARCHAR |

## Tabel Event

| Field | Tipe Data |
|--------|-----------|
| id | INT |
| judul | VARCHAR |
| deskripsi | TEXT |
| tanggal | DATE |
| lokasi | VARCHAR |
| kuota | INT |
| pembuat | VARCHAR |

---

## Relasi Database (Sederhana)

```
Users
------
id
nama
email
password

        │

Event
------
id
judul
deskripsi
tanggal
lokasi
kuota
pembuat
```

> Apabila tersedia, diagram ERD dapat ditambahkan pada bagian ini.

---

# Dokumentasi Endpoint API

| Method | Endpoint | Deskripsi |
|---------|----------|-----------|
| POST | `/register` | Registrasi pengguna baru |
| POST | `/login` | Login pengguna |
| GET | `/event` | Menampilkan seluruh data event |
| POST | `/event` | Menambahkan event baru |
| PUT | `/event/:id` | Mengubah data event |
| DELETE | `/event/:id` | Menghapus data event |

---

## Contoh Request Register

**POST** `/register`

```json
{
  "nama": "Dhani",
  "email": "dhani@gmail.com",
  "password": "123456"
}
```

Response

```json
{
  "message": "Register berhasil"
}
```

---

## Contoh Request Login

**POST** `/login`

```json
{
  "email": "dhani@gmail.com",
  "password": "123456"
}
```

Response

```json
{
  "token": "JWT_TOKEN"
}
```

---

## Contoh Request Tambah Event

**POST** `/event`

```json
{
  "judul": "Workshop Web",
  "deskripsi": "Belajar Svelte",
  "tanggal": "2026-07-24",
  "lokasi": "Universitas Madura",
  "kuota": 100
}
```

---

## Contoh Response Data Event

```json
[
  {
    "id": 1,
    "judul": "Workshop Web",
    "deskripsi": "Belajar Svelte",
    "tanggal": "2026-07-24",
    "lokasi": "Universitas Madura",
    "kuota": 100,
    "pembuat": "Dhani"
  }
]
```

---

# Cara Menjalankan Aplikasi

## 1. Clone Repository

```bash
git clone https://github.com/maskanarmdhn-ship-it/EventHub.git
```

---

## 2. Menjalankan Backend

Masuk ke folder backend

```bash
cd backend
```

Install dependency

```bash
npm install
```

Jalankan server

```bash
node server.js
```

Server berjalan pada:

```
http://localhost:3000
```

---

## 3. Menjalankan Frontend

Masuk ke folder frontend

```bash
cd frontend
```

Install dependency

```bash
npm install
```

Jalankan aplikasi

```bash
npm run dev
```

Frontend berjalan pada:

```
http://localhost:5173
```

---

# Konfigurasi Environment

Project ini menggunakan file konfigurasi environment yang dipisahkan menjadi:

- `backend/.env.example`
- `frontend/.env.example`

Silakan salin masing-masing file `.env.example` menjadi `.env`, kemudian sesuaikan konfigurasi sesuai lingkungan yang digunakan.

---

# Fitur Aplikasi

- Registrasi pengguna
- Login menggunakan JWT
- Dashboard aplikasi
- Menampilkan daftar event
- Menambahkan event
- Mengubah data event
- Menghapus event
- Statistik total event
- Statistik total kuota
- Validasi form input
- Konfirmasi update data
- Konfirmasi hapus data
- Logout
- Antarmuka responsif menggunakan Bootstrap
- Notifikasi menggunakan SweetAlert2

---

# Lisensi

Proyek ini dibuat sebagai tugas **Ujian Akhir Semester (UAS) Mata Kuliah Pemrograman Web** Universitas Madura.