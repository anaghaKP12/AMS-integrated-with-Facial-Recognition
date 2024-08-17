// models/Schedule.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  div: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    ref: 'Schedule',
    required: true,
  },
  std_id: {
    type: String,
    ref: 'student',
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  Attended: {
    type: Number,
    default: 0, 
  },
  classes: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
