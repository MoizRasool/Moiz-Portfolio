const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Project = require('./models/Project'); // 1. Isay add kiya

const app = express();
app.use(cors()); // 3. Phir CORS use karein (Ab error nahi aayega)
app.use(express.json()); // 4. Phir JSON middleware

const PORT = 5000;

// PROJECT ADD KARNE KI API
app.post('/api/projects', async (req, res) => {
    try {
        const { title, description, link, userEmail } = req.body;
        const newProject = new Project({ title, description, link, userEmail });
        await newProject.save();
        res.status(201).json({ message: "Project saved successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error saving project", error: err.message });
    }
});

// PROJECTS GET KARNE KI API
app.get('/api/projects/:email', async (req, res) => {
    try {
        const projects = await Project.find({ userEmail: req.params.email });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: "Error fetching projects" });
    }
});

app.use(express.json());

const MONGO_URI = "mongodb+srv://moizrasool18_db_user:fji2V8TksHJpGc35@cluster0.rrtjk6u.mongodb.net/portfolioDB?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
    .then(() => console.log("🚀 MongoDB Connected Successfully!"))
    .catch(err => console.error("❌ Database Connection Error:", err));

// SIGNUP API
app.post('/api/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully! 🚀" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

// LOGIN API
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

        res.json({ message: "Login Successful! Welcome Moiz. ✅" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
