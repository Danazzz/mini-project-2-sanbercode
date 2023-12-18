const Genre = require('../models/genreModel');

// Create a new genre
const createGenre = async (req, res) => {
  try {
    const { name } = req.body;

    const newGenre = new Genre({ name });
    await newGenre.save();

    res.status(201).json({ message: 'Genre created successfully', genre: newGenre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all genres
const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json({ genres });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a genre by ID
const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).json({ message: 'Genre not found' });

    res.json({ genre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update genre
const updateGenreById = async (req, res) => {
  try {
    const { name } = req.body;

    const updatedGenre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedGenre) return res.status(404).json({ message: 'Genre not found' });

    res.json({ message: 'Genre updated successfully', genre: updatedGenre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a genre by ID
const deleteGenreById = async (req, res) => {
  try {
    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
    if (!deletedGenre) return res.status(404).json({ message: 'Genre not found' });

    res.json({ message: 'Genre deleted successfully', genre: deletedGenre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createGenre, getAllGenres, getGenreById, updateGenreById, deleteGenreById };
