const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  genre: [{
    type: String
  }],
  contentType: {
    type: String,
    enum: ['movie', 'tvshow', 'series', 'live'],
    required: true
  },
  poster: {
    type: String,
    default: null
  },
  thumbnail: {
    type: String,
    default: null
  },
  banner: {
    type: String,
    default: null
  },
  duration: {
    type: Number
  },
  releaseDate: {
    type: Date
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  language: [{
    type: String
  }],
  subtitles: [{
    type: String
  }],
  cast: [{
    name: String,
    role: String
  }],
  director: [{
    type: String
  }],
  producer: [{
    type: String
  }],
  videoQuality: {
    type: String,
    enum: ['SD', 'HD', 'FHD', '4K'],
    default: 'HD'
  },
  videoUrl: {
    type: String,
    required: true
  },
  hlsUrl: {
    type: String
  },
  country: {
    type: String
  },
  ageRating: {
    type: String,
    enum: ['U', 'UA', 'A', 'S'],
    default: 'UA'
  },
  source: {
    serviceName: {
      type: String,
      enum: ['jiotv', 'airtelxtream', 'tataplay'],
      required: true
    },
    externalId: String
  },
  seasons: [{
    seasonNumber: Number,
    episodes: [{
      episodeNumber: Number,
      title: String,
      description: String,
      videoUrl: String,
      hlsUrl: String,
      duration: Number,
      releaseDate: Date
    }]
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Content', contentSchema);
