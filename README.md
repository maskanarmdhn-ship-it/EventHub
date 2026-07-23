# EventHub

## Deskripsi
EventHub adalah aplikasi manajemen event berbasis web yang memungkinkan pengguna melakukan login, mengelola data event, serta melihat statistik jumlah event dan total kuota.

---

## Anggota Kelompok

| Nama | NIM | Tugas |
|------|-----|-------|
| Kevin | xxxx | Backend, Database |
| Nama Kamu | xxxx | Frontend, Integrasi API |

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