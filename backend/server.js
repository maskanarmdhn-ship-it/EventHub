const express = require('express');
const cors = require('cors');
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
    const sql = 'select * from user';

    db.query(sql, (err, result) => {
        if (err) {
            return;
        }

        res.json(result);
    });
});

app.post('/register', (req, res) => {
    const {nama, email, password} = req.body;
    const sql = `
            insert into user (nama, email, password)
            values (?, ?, ?)
            `;
    db.query(sql, [nama, email, password], (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        res.json({
            message: 'Register berhasil'
        });
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server berjalan di port ${PORT}`);
});