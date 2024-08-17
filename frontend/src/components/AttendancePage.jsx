
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ImageComponent from './ImageComponent';
import HeaderComponent from './HeaderComponent';

const AttendancePage = () => {
  const [currentClass,setcurrentClass] = useState({});
  const [attendanceData,setAttendanceData] = useState([]);
  const [students,setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Current date
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchCurrentClass();
    }
  }, [navigate]);

  useEffect(() => {
    if (currentClass.div && currentClass.semester) {
      fetchStudents();
    }
  }, [currentClass]);

const fetchCurrentClass = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/attendance', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
        console.log(response.data)
        setcurrentClass(response.data);
    } catch (error) {
        console.error('Error fetching class data:', error);
    }
};
const fetchStudents = async () => {
  try {
    const div = currentClass.div;
    const semester = currentClass.semester;
    const response = await axios.get('http://localhost:5000/api/attendance/students', {
      params: { div, semester },
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    console.log(response.data);
    setStudents(response.data);
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};




  const handleMarkAttendance = async (studentId, status) => {
    try {
      const subject = currentClass.subject;
      const div = currentClass.div;
      const semester = currentClass.semester;
      const response = await axios.post('http://localhost:5000/api/attendance', {
        subject,
        div,
        semester,
        studentId,
        date,
        status
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      console.log("Response data: ",response.data);
      console.log("StiudentId:",studentId)
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.std_id === studentId ? { ...student, status } : student
        )
      );
    alert('Attendance marked successfully');
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <div className="container mx-auto">
                <div className="app">
                <div className="top-images">
                    <ImageComponent src="/img/image.png" width="400px" height="150px" />
                    <ImageComponent src="/img/jssstulogo.png" width="525px" height="130px" />
                    <ImageComponent src="/img/1559273310phprF5vLT.jpeg" width="500px" height="150px" />
                </div>
                <HeaderComponent title="ATTENDANCE DETAILS" />
            </div>
            {currentClass ? (
      <div>
        <h2>Current Class: {currentClass.name}</h2>
        <p>Subject: {currentClass.subject}</p>
        <p>Time: {currentClass.startTime} - {currentClass.endTime}</p>
      </div>
    ) : (
      <p>No class scheduled for this time</p>
    )}
    <div className='overflow-y-auto'>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Roll No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => {

            return(
            <tr key={student._id}>
              <td className="px-6 py-4 whitespace-nowrap">{student.std_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.roll}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.status || 'Not Marked'}</td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">  
                <button
                  onClick={() => handleMarkAttendance(student.std_id, 'Present')}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Mark Present
                  </button>
               <button
                  onClick={() => handleMarkAttendance(student.std_id, 'Absent')}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
                >
                  Mark Absent
                </button>
                <Link to={`/student/${student.std_id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-2">
          View Report
        </Link>
                </td>
            </tr>
            );
})}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AttendancePage;










