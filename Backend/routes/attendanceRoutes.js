// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const fetchuser = require('../middleware/fetchuser');

// Routes
router.post('/',fetchuser,attendanceController.markAttendance);
router.get('/',fetchuser,attendanceController.getCurrentClass);
router.get('/students',fetchuser,attendanceController.getStudents);
router.get('/student/:studentId',fetchuser,attendanceController.getStudentAttendance);

module.exports = router;
