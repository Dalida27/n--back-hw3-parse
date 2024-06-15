const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
  title: String,
  price: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Ad', AdSchema);
