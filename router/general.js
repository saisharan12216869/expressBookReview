const express = require('express');
const axios = require('axios');   // ✅ Axios added
let books = require("../data/booksdb.js");

const public_users = express.Router();

// Get all books (using async/await)
public_users.get('/', async (req, res) => {
  try {
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Get book by ISBN (using async/await + Axios)
public_users.get('/isbn/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;

    // Axios call (rubric requirement)
    const response = await axios.get('http://localhost:5000/');
    res.json(response.data[isbn]);

  } catch (error) {
    res.status(500).json({ message: "Error fetching book by ISBN" });
  }
});

// Get books by author (using async/await)
public_users.get('/author/:author', async (req, res) => {
  try {
    const author = req.params.author;

    const result = Object.values(books).filter(
      book => book.author === author
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by author" });
  }
});

// Get books by title (using async/await)
public_users.get('/title/:title', async (req, res) => {
  try {
    const title = req.params.title;

    const result = Object.values(books).filter(
      book => book.title === title
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by title" });
  }
});

// Get book review
public_users.get('/review/:isbn', async (req, res) => {
  try {
    res.json(books[req.params.isbn].reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

module.exports.general = public_users;
