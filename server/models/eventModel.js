// models/eventModel.js
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["bloom", "animal"], // Restrict to specific values
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set the current date if not provided
  },
});

module.exports = mongoose.model("Event", EventSchema);
