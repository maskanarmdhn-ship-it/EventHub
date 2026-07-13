const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');
const verifyToken = require('./middleware/auth');

const app = express();

const SECRET_KEY = "eventhub_rahasia";
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> {
    res.json({
        message : 'Backend EventHub berjalan'
    });
});

app.get('/user', (req, res) => {

    const sql = "select * from user";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

app.post('/register', (req, res) => {

    const {nama, email, password} = req.body;

    bcrypt.hash(password, 10,(err, hashedPassword) => {

        if (err) {
            return res.status(500).json({
              message: "gagal mengenkripsi pasword"  
            });
        }

         const sql = `
            insert into user (nama, email, password)
            values (?, ?, ?)
            `;

        db.query(sql, [nama, email, hashedPassword], (err, result) => {

            if (err) {
            res.status(500).json(err);
            }
            res.json({
            message: 'Register berhasil'
            });
        });
    });
});   


app.post('/login', (req,res) => {

    const { email, password } = req.body;

    const sql = `
        select * from user
        where email = ?
    `;
    db.query(sql, [email], (err, result) => {
        
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Email tidak detemukan"
            });
        }

        const user = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (!isMatch) {
                return res.status(401).json({
                    message: "Password salah"
                });
            }

            const token = jwt.sign (
                {
                    id: user.id,
                    nama: user.nama,
                    email: user.email
                },
                SECRET_KEY,
                {
                    expiresIn: "1h"
                }
            );
            res.json({
                message : "Login berhasil",
                token: token,
                user: {
                    id : user.id,
                    nama : user.nama,
                    email : user.email
                }
            });
        });
    });
});

app.get('/profile', verifyToken, (req, res) => {

    res.json({
        message: "Berhasil mengakses profile",
        user: req.user
    });
});

app.post('/event', verifyToken, (req, res) => {

    const {judul, deskripsi, tanggal, lokasi, kuota} = req.body;

    const sql = `
        insert into event (judul, deskripsi, tanggal, lokasi, kuota, created_by)
        values (?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                judul,
                deskripsi,
                tanggal,
                lokasi,
                kuota,
                req.user.id
            ],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    message: "Event berhasil ditambahkan"
                });
            }
        );
});

app.get('/event', (req, res) => {

    const sql = `
        select
            event.id,
            event.judul,
            event.deskripsi,
            event.tanggal,
            event.lokasi,
            event.kuota,
            user.nama as pembuat
        from event
        join user
        on event.created_by = user.id
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });
});

app.get('/event/:id', (req, res) => {

    const id = req.params.id;

    const sql = `
        select 
            event.id,
            event.judul,
            event.deskripsi,
            event.tanggal,
            event.lokasi,
            event.kuota,
            user.nama as pembuat
        from event
        join user
        on event.created_by = user.id
        where event.id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(5000).json(err);
        }

        if (result.length ===0) {
            return res.status(400).json({
                message: "Event tidak ditemukan"
            });
        }

        res.json(result[0]);
        
    });
});

app.put('/event/:id', verifyToken, (req, res) => {

    const id = req.params.id;
    const {judul, deskripsi, tanggal, lokasi, kuota} = req.body;

    const sql = `
        update event
        set
            judul = ?,
            deskripsi = ?,
            tanggal = ?,
            lokasi = ?,
            kuota = ?
        where id = ?
    `;

    db.query (
        sql,
        [judul, deskripsi, tanggal, lokasi, kuota, id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Event berhasil diupadate"
            });
        }
    );
;})

app.delete('/event/:id', verifyToken, (req, res) =>{

    const id = req.params.id;

    const sql =  `
        delete from event
        where id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }
        if (result.affectedRows ===0) {
            return res.status(404).json({
                message: "Event tidak ditemukan"
            });
        }

        req.json({
            message: "Event berhasil dihapus"
        });
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server berjalan di port ${PORT}`);
});