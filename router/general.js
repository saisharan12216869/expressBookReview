const express = require('express');
let books = require("../data/booksdb.js");

const public_users = express.Router();

// Get all books
public_users.get('/', async (req, res) => {
  res.json(books);
});

// Get book by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  res.json(books[req.params.isbn]);
});

// Get books by author
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  const result = [];

  Object.values(books).forEach(book => {
    if (book.author === author) result.push(book);
  });

  res.json(result);
});

// Get books by title
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  const result = [];

  Object.values(books).forEach(book => {
    if (book.title === title) result.push(book);
  });

  res.json(result);
});

// Get book review
public_users.get('/review/:isbn', async (req, res) => {
  res.json(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
