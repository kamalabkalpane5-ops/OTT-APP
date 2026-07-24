const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, phone, profilePicture } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, phone, profilePicture, updatedAt: new Date() },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add to watchlist
router.post('/watchlist/add', authMiddleware, async (req, res) => {
  try {
    const { contentId } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $addToSet: { watchlist: { contentId } } },
      { new: true }
    ).select('-password');

    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove from watchlist
router.post('/watchlist/remove', authMiddleware, async (req, res) => {
  try {
    const { contentId } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { watchlist: { contentId } } },
      { new: true }
    ).select('-password');

    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get watchlist
router.get('/watchlist', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('watchlist.contentId');
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update continue watching
router.post('/continue-watching', authMiddleware, async (req, res) => {
  try {
    const { contentId, progress } = req.body;
    
    const user = await User.findById(req.userId);
    
    const existingIndex = user.continueWatching.findIndex(
      w => w.contentId.toString() === contentId
    );

    if (existingIndex > -1) {
      user.continueWatching[existingIndex].progress = progress;
      user.continueWatching[existingIndex].watchedAt = new Date();
    } else {
      user.continueWatching.push({ contentId, progress, watchedAt: new Date() });
    }

    await user.save();
    res.json(user.continueWatching);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get continue watching
router.get('/continue-watching', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('continueWatching.contentId');
    res.json(user.continueWatching);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
