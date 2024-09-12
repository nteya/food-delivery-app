const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// MongoDB connection URI
const MONGO_URI = 'mongodb+srv://nteyantsika:ntsika1@cluster0.bgid8.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('Failed to connect to MongoDB', err));

// Simple route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Define port
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



