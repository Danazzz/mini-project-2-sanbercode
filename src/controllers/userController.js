const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Profile = require('../models/profileModel');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('profile');
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('profile');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update user
const updateUserById = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId).populate('profile');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username;
    user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const userId = req.user._id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    await Profile.findByIdAndDelete(deletedUser.profile);

    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllUsers, getUserById, updateUserById, deleteUserById };
