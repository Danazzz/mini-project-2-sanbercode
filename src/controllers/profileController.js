const Profile = require('../models/profileModel');

// Create a new profile
const createProfile = async (req, res) => {
  try {
    const { name, gender, age } = req.body;

    const newProfile = new Profile({ name, gender, age });
    await newProfile.save();

    res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all profiles
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json({ profiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a profile by ID
const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    res.json({ profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update profile
const updateProfileById = async (req, res) => {
  try {
    const { name, gender, age } = req.body;

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      { name, gender, age },
      { new: true }
    );

    if (!updatedProfile) return res.status(404).json({ message: 'Profile not found' });

    res.json({ message: 'Profile updated successfully', profile: updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a profile by ID
const deleteProfileById = async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
    if (!deletedProfile) return res.status(404).json({ message: 'Profile not found' });

    res.json({ message: 'Profile deleted successfully', profile: deletedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createProfile, getAllProfiles, getProfileById, updateProfileById, deleteProfileById };
