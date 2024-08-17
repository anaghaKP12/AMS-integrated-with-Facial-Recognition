// src/components/StudentAttendanceReport.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentAttendanceReport = () => {
  const { studentId } = useParams();
  const [attendanceData, setAttendanceData] = useState({});
  
  useEffect(() => {
    fetchStudentAttendance();
  }, [studentId]);

  const fetchStudentAttendance = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/attendance/student/${studentId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setAttendanceData(response.data[0]);
    } catch (error) {
      console.error('Error fetching student attendance:', error);
    }
  };

  const calculatePercentage = () => {
    if (attendanceData.classes && attendanceData.Attended) {
      return ((attendanceData.Attended / attendanceData.classes) * 100).toFixed(2);
    }
    return 'N/A';
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">ATTENDANCE REPORT</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Classes Held:</span>
            <span className="text-gray-800">{attendanceData.classes || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Classes Attended:</span>
            <span className="text-gray-800">{attendanceData.Attended || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Attendance Percentage:</span>
            <span className="text-gray-800">{calculatePercentage()}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceReport;
