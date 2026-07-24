const express = require('express');
const axios = require('axios');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// JioTV Service Integration
router.post('/jiotv/login', authMiddleware, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Call JioTV API to authenticate
    const response = await axios.post(
      `${process.env.JIOTV_BASE_URL}/auth/login`,
      { username, password },
      { headers: { 'x-api-key': process.env.JIOTV_API_KEY } }
    );

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $addToSet: {
          subscribedServices: {
            serviceName: 'jiotv',
            serviceId: response.data.userId,
            username,
            token: response.data.token
          }
        }
      },
      { new: true }
    );

    res.json({ message: 'JioTV connected', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to connect JioTV', details: err.message });
  }
});

// AirtelXtream Service Integration
router.post('/airtel/login', authMiddleware, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Call AirtelXtream API to authenticate
    const response = await axios.post(
      `${process.env.AIRTEL_BASE_URL}/auth/login`,
      { username, password },
      { headers: { 'x-api-key': process.env.AIRTEL_API_KEY } }
    );

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $addToSet: {
          subscribedServices: {
            serviceName: 'airtelxtream',
            serviceId: response.data.userId,
            username,
            token: response.data.token
          }
        }
      },
      { new: true }
    );

    res.json({ message: 'AirtelXtream connected', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to connect AirtelXtream', details: err.message });
  }
});

// Tata Play Service Integration
router.post('/tataplay/login', authMiddleware, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Call Tata Play API to authenticate
    const response = await axios.post(
      `${process.env.TATAPLAY_BASE_URL}/auth/login`,
      { username, password },
      { headers: { 'x-api-key': process.env.TATAPLAY_API_KEY } }
    );

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $addToSet: {
          subscribedServices: {
            serviceName: 'tataplay',
            serviceId: response.data.userId,
            username,
            token: response.data.token
          }
        }
      },
      { new: true }
    );

    res.json({ message: 'Tata Play connected', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to connect Tata Play', details: err.message });
  }
});

// Get subscribed services
router.get('/subscribed', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.subscribedServices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Disconnect service
router.post('/disconnect/:serviceName', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { subscribedServices: { serviceName: req.params.serviceName } } },
      { new: true }
    );

    res.json({ message: 'Service disconnected', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
