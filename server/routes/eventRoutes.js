// routes/eventRoutes.js
const express = require("express");
const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const router = express.Router();

router.get("/", getAllEvents); // Fetch all events
router.post("/", createEvent); // Create a new event
router.put("/:id", updateEvent); // Update an event by ID
router.delete("/:id", deleteEvent); // Delete an event by ID

module.exports = router;
