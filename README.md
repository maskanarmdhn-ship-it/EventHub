# EventHub

## Deskripsi
EventHub adalah aplikasi manajemen event berbasis web yang memungkinkan pengguna melakukan login, mengelola data event, serta melihat statistik jumlah event dan total kuota.

---

## Anggota Kelompok

| Nama | NIM | Tugas |
|------|-----|-------|
| Dhani | 2024520020 | Analisis kebutuhan sistem, perancangan database, pembuatan frontend menggunakan Svelte, pembuatan backend menggunakan Express.js, integrasi API, implementasi autentikasi (login & register), CRUD Event, dashboard statistik, validasi form, pengujian aplikasi, dokumentasi proyek, serta deployment ke GitHub. |
| Kevin | 2024520084 | Membantu penyempurnaan antarmuka (UI), penyesuaian tampilan dashboard, perbaikan warna, tata letak, serta penyempurnaan beberapa tombol pada aplikasi. |

---

## Teknologi

- Svelte
- Express.js
- MySQL
- Bootstrap
- SweetAlert2
- Axios

---

## Struktur Folder

frontend/
backend/

---

## Database

Tabel:

- users
- event

atau bisa tambahkan gambar ERD.

---

## Endpoint API

### Register

POST /register

Body

{
    "nama":"",
    "email":"",
    "password":""
}

Response

{
    "message":"Register berhasil"
}

---

### Login

POST /login

Body

{
    "email":"",
    "password":""
}

Response

{
    "token":"..."
}

---

### Get Event

GET /event

---

### Tambah Event

POST /event

---

### Update Event

PUT /event/:id

---

### Hapus Event

DELETE /event/:id

---

## Cara Menjalankan

Backend

cd backend
npm install
node server.js

Frontend

cd frontend
npm install
npm run dev