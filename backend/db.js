const mysql = require('mysql2');

const db = mysql.createConnection ({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'eventhub',  
});

db.connect((err) => {
    if (err) {
        console.log('Koneksi database gagal :', err);
        return;
    }
    console.log('Database berhasil terhubung');
});

module.exports = db;