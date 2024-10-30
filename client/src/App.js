import { useEffect, useState } from 'react';

import './App.css';

function App() {

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editingBook, setEditingBook] = useState();

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const response = await fetch("http://localhost:5000/books");
    const data = await response.json();
    setBooks(data);
  };

  const addBook = async () => {
    const response = await fetch("http://localhost:5000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author }),
    });
    const data = await response.json();
    setBooks([...books, data]);
    setTitle('');
    setAuthor('');
  };

  const updateBook = async (id) => {
    const response = await fetch(`http://localhost:5000/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author }),
    });
    const data = await response.json();
    setBooks(books.map((book) => (book.id === id ? data : book)));
    setEditingBook(null);
    setTitle('');
    setAuthor('');
  };

  const deleteBook = async (id) => {
    
    const response = await fetch(`http://localhost:5000/books/${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    setBooks(data);
  };

  const editBook = async (book) => {
    setEditingBook(book)
    setTitle(book.title);
    setAuthor(book.author);
  }

  return (
    <div className="App">
      <h1>Books List</h1>
      <input type='text' onBlur={(e) => { setTitle(e.target.value) }} placeholder={title ? title : 'Title'} ></input>
      <input type='text' onBlur={(e) => { setAuthor(e.target.value) }} placeholder='Author'></input>
      {editingBook ? (
        <button onClick={() => updateBook(editingBook.id)}>Update Book</button>
      ) : (
        <button onClick={addBook}>Add Book</button>
      )}
      {books.map((book, index) => (
        <div key={index} className='book'>
          <span>
            <strong>{book.title}</strong> by {book.author}
          </span>
          <span>
            <button onClick={() => editBook(book)}>Edit</button>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </span>
        </div>
      ))}
    </div>
  );
}

export default App;
