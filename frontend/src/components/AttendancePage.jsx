import React, { useState,useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import ImageComponent from './ImageComponent';
import HeaderComponent from './HeaderComponent';
import '../index.css'

const AttendancePage = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [id, setId] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('Present');
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        const now = new Date();
        setDate(now.toISOString().split('T')[0]);
        setTime(now.toTimeString().split(' ')[0].slice(0, 5));
    }, []);
    const handleStudentIDKeyPress = (e) => {
        if (e.key === 'Enter' && id.trim() !== '') {
            console.log("key pressed")
            fetchStudentDetails(id);
        }
    };
    const fetchStudentDetails = async (studentID) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/students/${studentID}`);
            const { roll, std_name, dep } = response.data;
            setRollNo(roll);
            setName(std_name);
            setDepartment(dep);
        } catch (error) {
            console.error('Error fetching student details:', error);
        }
    };
    const handleImportCSV = (event) => {
        const file = event.target.files[0];
        setFileName(file.name); // Save the file name for later export
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            setAttendanceData(jsonData);
        };
        reader.readAsBinaryString(file);
    };

    const handleExportCSV = () => {
        const worksheet = XLSX.utils.json_to_sheet(attendanceData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
        XLSX.writeFile(workbook, fileName || 'attendance.xlsx'); // Use the imported file name or a default name
    };

    const handleReset = () => {
        setAttendanceData([]);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newRecord = {
            ID: id,
            "Roll No": rollNo,
            Name: name,
            Department: department,
            Time: time,
            Date: date,
            Status: status
        };
        setAttendanceData([...attendanceData, newRecord]);
        setId('');
        setRollNo('');
        setName('');
        setDepartment('');
        setTime('');
        setDate('');
        setStatus('Present');
    };

    return (
        <>          <div className="app">
        <div className="top-images">
            <ImageComponent src="/img/image.png" width="400px" height="150px" />
            <ImageComponent src="/img/jssstulogo.png" width="525px" height="130px" />
            <ImageComponent src="/img/1559273310phprF5vLT.jpeg" width="500px" height="150px" />
        </div>
        <HeaderComponent title="ATTENDANCE" />
    </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-bold mb-4">Mark Attendance</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">ID:</label>
                        <input 
                            type="text" 
                            value={id} 
                            onChange={(e) => setId(e.target.value)} 
                            onKeyDown={handleStudentIDKeyPress}
                            className="w-full px-3 py-2 border rounded-lg"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Roll No:</label>
                        <input 
                            type="text" 
                            value={rollNo} 
                            onChange={(e) => setRollNo(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name:</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Department:</label>
                        <input 
                            type="text" 
                            value={department} 
                            onChange={(e) => setDepartment(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Time:</label>
                        <input 
                            type="time" 
                            value={time} 
                            onChange={(e) => setTime(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Date:</label>
                        <input 
                            type="date" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Submit</button>
                </form>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-bold mb-4">Attendance Records</h2>
                <div className="mb-4">
                    <input type="file" onChange={handleImportCSV} className="mb-2" />
                    <button onClick={handleExportCSV} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2">Export CSV</button>
                    <button onClick={handleReset} className="bg-red-500 text-white px-4 py-2 rounded-lg">Reset</button>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Roll No</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Department</th>
                            <th className="border px-4 py-2">Time</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((record, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{record.ID}</td>
                                <td className="border px-4 py-2">{record['Roll No']}</td>
                                <td className="border px-4 py-2">{record.Name}</td>
                                <td className="border px-4 py-2">{record.Department}</td>
                                <td className="border px-4 py-2">{record.Time}</td>
                                <td className="border px-4 py-2">{record.Date}</td>
                                <td className="border px-4 py-2">{record.Status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default AttendancePage;
