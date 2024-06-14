// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Routes
router.post('/', studentController.addStudent);
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudents);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
