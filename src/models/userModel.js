const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;