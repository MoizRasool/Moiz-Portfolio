const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String },
    userEmail: { type: String, required: true } // Taake pata chale ye kis user ka project hai
});

module.exports = mongoose.model('Project', ProjectSchema);