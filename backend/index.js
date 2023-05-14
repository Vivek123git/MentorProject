const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const mentor = require('./userSchema.js');

const app = express();

app.use(cors());

app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb+srv://mentorProject:mentor123@cluster0.hqirbyj.mongodb.net/MentorProjectr?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define API routes for your data

app.get('/data', async (req, res) => {
    try {
      const data = await mentor.find();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

app.get('/mentor', async (req, res) => {
  try {
    const searchQuery = req.query.search;
console.log(searchQuery,"sdvs")
    const results = await mentor.aggregate([
      {
        $match: {
          $or: [
            { companyName: { $regex: searchQuery, $options: 'i' } },
            { primaryText: { $regex: searchQuery, $options: 'i' } },
            { headline: { $regex: searchQuery, $options: 'i' } },
            { description: { $regex: searchQuery, $options: 'i' } },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          companyName: 1,
          primaryText: 1,
          headline: 1,
          description: 1,
          image: 1,
        },
      },
    ]);

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start the server
app.listen(2000, () => {
  console.log('Server started on port 2000');
});
