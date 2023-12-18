const Comment = require('../models/commentModel');

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { content, bookId } = req.body;

    const newComment = new Comment({
      content,
      user: req.user._id,
      book: bookId,
    });

    await newComment.save();
    res.status(201).json({ message: 'Comment created successfully', comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('user').populate('book');
    res.json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createComment, getAllComments };
