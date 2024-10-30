const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

let books = [
    { id: 1, title: 'abc', author: 'abc' },
    { id: 2, title: 'xyz', author: 'xyz' }
]

//READ
app.get('/books', (req, res) => {
    res.json(books);
});

//CREATE
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
    };
    books.push(newBook);
    res.json(newBook);
});

//UPDATE
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (book) {
        book.title = req.body.title;
        book.author = req.body.author;
        res.json(book);
    }
    else
        res.status(404).json({ message: 'update: Book not found' })
});

//DELETE
app.delete('/books/:id', (req, res) => {
    books = books.filter(book => book.id !== parseInt(req.params.id));
    res.status(404).send(books);
});


app.listen(port, () => {
    console.log(`Server run on http://localhost:${port}...`)
})