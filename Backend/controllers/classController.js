const Schedule = require('../models/Schedule');

// Add a new class
exports.addClass = async (req, res) => {
    console.log("Hello")
    const newClass = new Schedule({
        ...req.body,
        userId: req.user.id
    });
    try {
        const savedClass = await newClass.save();
        res.status(201).json(savedClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all classes for the logged-in faculty
exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Schedule.find({ userId: req.user.id });
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific class by ID
exports.getClass = async (req, res) => {
    const classId = req.params.id;
    try {
        const classData = await Schedule.findOne({ _id: classId, userId: req.user.id });
        if (classData) {
            res.status(200).json(classData);
        } else {
            res.status(404).json({ message: 'Class not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a class by ID
exports.deleteClass = async (req, res) => {
    try {
        const classData = await Schedule.findOne({ _id: req.params.id, userId: req.user.id });
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }
        await Schedule.deleteOne({ _id: req.params.id, userId: req.user.id });
        res.json({ message: 'Class deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
