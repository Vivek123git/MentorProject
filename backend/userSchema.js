const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  primaryText: { type: String, required: true },
  headline: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Ad = mongoose.model('mentors', adSchema);

module.exports = Ad;
