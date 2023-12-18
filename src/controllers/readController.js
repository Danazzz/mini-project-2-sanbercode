const Read = require('../models/readModel');

// Start reading a book
const startReading = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;

    const existingRead = await Read.findOne({ user: userId, book: bookId, endDate: null });
    if (existingRead) {
      return res.status(400).json({ error: 'User is already reading this book' });
    }

    const newRead = new Read({ user: userId, book: bookId });
    await newRead.save();

    res.status(201).json({ message: 'User started reading the book', read: newRead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Finish reading a book
const finishReading = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;

    const ongoingRead = await Read.findOne({ user: userId, book: bookId, endDate: null });
    if (!ongoingRead) {
      return res.status(404).json({ error: 'No ongoing read found for this book' });
    }

    ongoingRead.endDate = Date.now();
    await ongoingRead.save();

    res.json({ message: 'User finished reading the book', read: ongoingRead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all reading activities for the user
const getAllReadActivities = async (req, res) => {
  try {
    const userId = req.user._id;

    const readActivities = await Read.find({ user: userId, endDate: { $ne: null } })
      .populate('book', 'title author description')
      .sort({ startDate: 'desc' });

    res.json({ readActivities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { startReading, finishReading, getAllReadActivities };
