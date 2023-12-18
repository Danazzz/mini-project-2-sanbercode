const mongoose = require('mongoose');

const readSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  startDate: { type: Date, default: Date.now, required: true },
  endDate: { type: Date },
});

const Read = mongoose.model('Read', readSchema);

module.exports = Read;