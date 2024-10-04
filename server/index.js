import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user:'root',
    host: 'localhost',
    password: '12345678',
    database: 'bookdb'
});

app.get('/books', (req, res) => {
    const q = 'SELECT * FROM books';
    db.query(q, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    });
});

app.post('/books', (req, res) => {
    const title = req.body.title;
    const desc = req.body.desc;
    const cover = req.body.cover;
    const price = req.body.price;

    const q = 'INSERT INTO books (`title`, `desc`, `cover`, `price`) vALUES (?)';
    const values = [title, desc, cover, price];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);

        return res.json('book is created');
    });
});

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = 'DELETE FROM books WHERE id = ?';

    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err);

        return res.json('book is deleted');
    });
});

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const title = req.body.title;
    const desc = req.body.desc;
    const cover = req.body.cover;
    const price = req.body.price;
    
    const q = 'UPDATE books SET `title`=?, `desc`=?, `cover`=?, `price`=? WHERE id=?';
    const values = [title, desc, cover, price];
   

    db.query(q, [...values, bookId], (err, data) => {
        if(err) return res.json(err);

        return res.json('book is updated');
    });
});

app.listen(5000, () => {
    console.log("server is runnning port 5000...");
});