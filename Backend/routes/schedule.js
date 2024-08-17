// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const fetchuser = require('../middleware/fetchUser');

// Routes
router.post('/',fetchuser,classController.addClass);
router.get('/',fetchuser,classController.getAllClasses);
router.get('/:id',fetchuser,classController.getClass);
router.delete('/:id',fetchuser, classController.deleteClass);

module.exports = router;
