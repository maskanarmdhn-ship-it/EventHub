const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> {
    res.json({
        message : 'Backend EventHub berjalan'
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server berjalan di port ${PORT}`);
});