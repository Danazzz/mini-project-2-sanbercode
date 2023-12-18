const Book = require('../models/bookModel');
const Genre = require('../models/genreModel');

// Create a new book
const createBook = async (req, res) => {
  try {
    const { title, author, description, genres } = req.body;

    const newBook = new Book({ title, author, description, genres });
    await newBook.save();

    await Genre.updateMany({ _id: { $in: genres } }, { $push: { books: newBook._id } });

    res.status(201).json({ message: 'Book created successfully', book: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('genres');
    res.json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a book by ID with its genres
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('genres');
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json({ book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a book by ID
const updateBookById = async (req, res) => {
  try {
    const { title, author, description, genres } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, genres },
      { new: true }
    );

    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });

    // Update genres to include this book
    await Genre.updateMany(
      { _id: { $in: genres } },
      { $push: { books: updatedBook._id } }
    );

    res.json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a book by ID
const deleteBookById = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });

    // Remove book from genres
    await Genre.updateMany({ _id: { $in: deletedBook.genres } }, { $pull: { books: deletedBook._id } });

    res.json({ message: 'Book deleted successfully', book: deletedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createBook, getAllBooks, getBookById, updateBookById, deleteBookById };
