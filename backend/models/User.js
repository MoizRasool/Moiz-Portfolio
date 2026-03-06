const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Boht zaroori: 'User' (singular) aur mongoose.model (singular)
module.exports = mongoose.model('User', UserSchema);
