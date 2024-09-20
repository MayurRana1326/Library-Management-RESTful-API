const express = require('express');
const router = express.Router();
const { validate } = require("express-validation");
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/book.controller');
const { getBookSchema, bookSchema, getBooksSchema, updateBookSchema, deleteBookSchema } = require('../validations/book.validation');
const { verifyToken } = require("./../middlewares/auth.middleware");



// GET all books
router.get('/', verifyToken, validate(getBooksSchema), getBooks);

// GET book by ID
router.get('/:id', verifyToken, validate(getBookSchema), getBookById);

// POST create a new book
router.post('/', verifyToken, validate(bookSchema), createBook);

// PUT update a book
router.put('/:id', verifyToken, validate(updateBookSchema), updateBook);

// DELETE remove a book
router.delete('/:id', verifyToken, validate(deleteBookSchema), deleteBook);

module.exports = router;