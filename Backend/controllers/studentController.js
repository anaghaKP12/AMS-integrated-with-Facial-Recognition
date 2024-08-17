const Student = require('../models/student');

// Add a new student
exports.addStudent = async (req, res) => {
    const student = new Student(req.body);
    console.log(student);
    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getStudents = async (req, res) => {
    const studentID = req.params.id;
    try {
        const student = await Student.findOne({ std_id: studentID });
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
    console.log(req.params.id);
    try {
        const student = await Student.findOne({ std_id: req.params.id });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        await Student.deleteOne({ std_id: req.params.id });
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
