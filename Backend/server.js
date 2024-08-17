// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
app.use(cors());
app.use(express.json());

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '..','frontend')));

// Serve index.html as the entry point for all routes

// MongoDB Connection
const mongoURI = 'mongodb+srv://anaghakp281:y1F8ti9QMFAmiVoF@cluster0.yclxmwp.mongodb.net/face_recognizer';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});
app.use('/api/students', studentRoutes);
app.use('/api/auth',require('./routes/authRoutes'))
app.use('/api/classes',require('./routes/schedule'))
app.use('/api/attendance',require('./routes/attendanceRoutes'))

// app.use('/api/photos', photoRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
