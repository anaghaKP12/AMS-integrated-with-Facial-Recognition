// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  dep: String,
  course: String,
  year: String,
  semester: String,
  std_id: String,
  std_name: String,
  div: String,
  roll: String,
  gender: String,
  dob: String,
  email: String,
  phone: String,
  address: String,
  faculty: String,
  photo: String,
});

module.exports = mongoose.model('Student', studentSchema);
