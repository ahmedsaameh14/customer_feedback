const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  translatedText: {
    type: String,
  },
  sentiment: {
    type: String,
  },
  language: {
    type: String,
  },
});

module.exports = mongoose.model("feedback", feedbackSchema);
