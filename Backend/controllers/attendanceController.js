
const {Types: {ObjectId}} = require('mongoose');
const Attendance = require('../models/Attendance');
const Schedule = require('../models/Schedule');
const Student = require('../models/student');
// Add a new class
exports.markAttendance = async (req, res) => {
    const { div,semester,subject, studentId, date, status } = req.body;
    const userId = req.user.id;
  try{
      let attendance = await Attendance.findOne({
        userId: new ObjectId(userId),
        div: div,
        semester: semester,
        subject: subject,
        std_id: studentId,
      });
      if (attendance) {
        // Update attendance
        if (status === 'Present') {
          attendance.Attended += 1;
        }
        attendance.classes += 1;
        attendance.status = status;
        console.log("Attendance after incrementing: ",attendance);
        await attendance.save();
      } else {
        // Create new attendance record
        attendance = new Attendance({
          userId,
          div: div,
          semester: semester,
          subject: subject,
          std_id: studentId,
          date,
          status,
          Attended: status === 'Present' ? 1 : 0,
          classes: 1
        });
        await attendance.save();
    }
    res.json(attendance);
}catch(err){
    console.error(err);
    res.status(500).json({message: err.message });
}
}
// Helper function to convert numeric day to string representation
const getDayOfWeekString = (day) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day];
};
// Get all classes for the logged-in faculty
exports.getCurrentClass = async (req, res) => {
    try {
        console.log("Inside get current class")
        const now = new Date();
        const dayOfWeek = getDayOfWeekString(now.getDay());
        const currentTime = now.toTimeString().substr(0, 5);

       
        const query = {
            userId: new ObjectId(req.user.id),
            dayOfWeek,
            startTime: { $lte: currentTime },
            endTime: { $gte: currentTime },
        };
        // Find the current class
        const currentClass = await Schedule.findOne(query);
         if(currentClass)
        res.json(currentClass);
    else
    res.status(404).json({ message: 'No class scheduled for this time' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// Get a specific class by ID
exports.getStudents = async (req, res) => {
    console.log("Inside getStudents");
    try {
        const { div, semester } = req.query;

        const students = await Student.find({ div: div, semester });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.getStudentAttendance = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const attendance = await Attendance.find({ std_id: studentId }); // Adjust query based on your schema
    if (!attendance) {
      return res.status(404).json({ message: 'No attendance records found for this student.' });
    }

    res.json(attendance);
  } catch (error) {
    console.error('Error fetching student attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};