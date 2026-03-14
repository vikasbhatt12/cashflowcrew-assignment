require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Root test route
app.get('/', (req, res) => {
  res.json({ message: 'IdeaSpark API is running!' });
});

// Routes
const ideas = require('./routes/ideas');
app.use('/api/ideas', ideas);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
