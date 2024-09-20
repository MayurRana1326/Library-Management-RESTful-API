const Book = require("./../models/book.model");
const { getSuccessResponse } = require("../utils/response.util");

// Get all books
exports.getBooks = async (req, res, next) => {
  try {
    const { skip, limit } = req.query;
    const books = await Book.find().skip(skip || 0).limit(limit || 20);
    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
      return res.status(200).json(getSuccessResponse("Book details fetched successfully.", book));
    } catch (error) {
      next(error);
    }
};

// Add new book
exports.createBook = async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body);
    return res.status(201).json(getSuccessResponse("Book added successfully.", newBook));
  } catch (error) {
    next(error);
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json(getSuccessResponse("Book details updated successfully.",updatedBook));
  } catch (error) {
    next(error);
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json(getSuccessResponse("Book deleted successfully.", book));
  } catch (error) {
    next(error);
  }
};
