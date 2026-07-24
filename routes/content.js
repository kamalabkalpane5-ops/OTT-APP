const express = require('express');
const Content = require('../models/Content');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all content with filtering
router.get('/', async (req, res) => {
  try {
    const { genre, contentType, language, page = 1, limit = 20 } = req.query;
    
    let filter = { isAvailable: true };
    
    if (genre) filter.genre = { $in: genre.split(',') };
    if (contentType) filter.contentType = contentType;
    if (language) filter.language = { $in: language.split(',') };

    const skip = (page - 1) * limit;
    
    const content = await Content.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Content.countDocuments(filter);

    res.json({
      data: content,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get trending content
router.get('/trending', async (req, res) => {
  try {
    const content = await Content.find({ isAvailable: true })
      .sort({ views: -1 })
      .limit(20);
    
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get content by ID
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Increment views
    content.views += 1;
    await content.save();

    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search content
router.get('/search/query', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const results = await Content.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { genre: { $regex: q, $options: 'i' } }
      ],
      isAvailable: true
    }).limit(50);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get content by genre
router.get('/genre/:genre', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const content = await Content.find({
      genre: req.params.genre,
      isAvailable: true
    })
      .skip(skip)
      .limit(parseInt(limit));

    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
