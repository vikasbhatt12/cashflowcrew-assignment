const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// @route   GET /api/ideas
// @desc    Get all ideas (with pagination, search, sorting)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (req.query.search) {
      query = {
        $or: [
          { title: { $regex: req.query.search, $options: 'i' } },
          { author: { $regex: req.query.search, $options: 'i' } }
        ]
      };
    }

    let sort = {};
    if (req.query.sort === 'upvotes') {
      sort = { upvotes: -1, createdAt: -1 };
    } else {
      // Default to newest
      sort = { createdAt: -1 };
    }

    const ideas = await Idea.find(query).sort(sort).skip(skip).limit(limit);
    const total = await Idea.countDocuments(query);

    res.json({
      success: true,
      count: ideas.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: ideas
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   POST /api/ideas
// @desc    Create a new idea
router.post('/', async (req, res) => {
  try {
    const { title, description, author } = req.body;
    
    // Server-side validation
    if (!title || !description || !author) {
      return res.status(400).json({ success: false, error: 'Please provide title, description, and author' });
    }

    const idea = await Idea.create({
      title,
      description,
      author
    });

    res.status(201).json({
      success: true,
      data: idea
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   PATCH /api/ideas/:id/upvote
// @desc    Increment upvotes for an idea
router.patch('/:id/upvote', async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true, runValidators: true }
    );

    if (!idea) {
      return res.status(404).json({ success: false, error: 'Idea not found' });
    }

    res.json({
      success: true,
      data: idea
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   DELETE /api/ideas/:id
// @desc    Delete an idea
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);

    if (!idea) {
      return res.status(404).json({ success: false, error: 'Idea not found' });
    }

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
