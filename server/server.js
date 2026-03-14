require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const ideas = require('./routes/ideas');
app.use('/api/ideas', ideas);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '127.0.0.1', () => console.log(`Server running on http://127.0.0.1:${PORT}`));
