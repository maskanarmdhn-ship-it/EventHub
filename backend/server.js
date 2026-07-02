const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');


const app = express();

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

            if (!isMatch) {
                return res.status(401).json({
                    message: "Password salah"
                });
            }
            res.json({
                message : 'Login berhasil',
                user: {
                    id : user.id,
                    nama : user.nama,
                    email : user.email
                }
            });
        });
    });
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server berjalan di port ${PORT}`);
});