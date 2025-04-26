const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");

const PORT = 5000;
const uri = "mongodb+srv://vanshikaturkar:SyCBJfwiHzQPPdpu@bloom-watch.wyfzubg.mongodb.net/"; // Replace with your MongoDB connection string

// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the connection fails
  }
}

connectToDatabase();

// Start the Node Express server
const app = express();

// Middleware
app.use(cors()); // Enable cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/events", eventRoutes); // Mount event routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start listening
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
