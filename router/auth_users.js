const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("../data/booksdb.js");

const authenticated = express.Router();
let users = [];

// Register user
authenticated.post('/register', (req, res) => {
  users.push(req.body);
  res.json({ message: "User registered successfully" });
});

// Login user
authenticated.post('/login', (req, res) => {
  const token = jwt.sign(req.body, 'secret');
  res.json({ token });
});

// Add or update review
authenticated.put('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;

  books[isbn].reviews["sai"] = review;

  res.json({
    message: "Review added",
    reviews: books[isbn].reviews
  });
});


// Delete review
authenticated.delete('/review/:isbn', (req, res) => {
  delete books[req.params.isbn].reviews["user"];
  res.json({ message: "Review deleted" });
});

module.exports.authenticated = authenticated;
