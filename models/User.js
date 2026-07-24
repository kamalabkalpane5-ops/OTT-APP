const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  profilePicture: {
    type: String,
    default: null
  },
  subscriptionPlan: {
    type: String,
    enum: ['free', 'basic', 'premium', 'family'],
    default: 'free'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  watchlist: [{
    contentId: mongoose.Schema.Types.ObjectId,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  continueWatching: [{
    contentId: mongoose.Schema.Types.ObjectId,
    watchedAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0
    }
  }],
  preferences: {
    language: {
      type: String,
      default: 'English'
    },
    quality: {
      type: String,
      enum: ['480p', '720p', '1080p', '4K'],
      default: '720p'
    },
    subtitle: {
      type: String,
      default: 'English'
    }
  },
  subscribedServices: [{
    serviceName: String,
    serviceId: String,
    username: String,
    token: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch(err) {
    next(err);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
