const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;