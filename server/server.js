const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MongoDB URI is not defined in .env file.");
  process.exit(1);
}

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define the Mongoose schema for the form data
const formSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['bloom', 'animal'],
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
    default: Date.now,
  },
});

// Create a Mongoose model based on the schema
const Observation = mongoose.model('Observation', formSchema); // Correct model definition

// API endpoint to handle form submissions
app.post('/api/submit-observation', async (req, res) => {
  console.log("POST request attempt - vanvan");
  console.log("Request Body:", req.body);
  try {
    console.log("Inside try block");
    const { type, location, description, date } = req.body;
    // const newObservation = new mongoose.model('Observation', new mongoose.Schema({})); // REMOVE this line
    console.log("Before save");
    const savedObservation = await Observation({ // Use the correct Observation model
      type,
      location,
      description,
      date,
    }).save();
    console.log("After save");
    res.status(201).json({ message: 'Observation submitted successfully', data: savedObservation });
    console.log("After response sent");
  } catch (error) {
    console.error('Error submitting observation:', error);
    console.log("Inside catch block");
    res.status(500).json({ message: 'Failed to submit observation', error: error.message });
  }
  console.log("Route end");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
