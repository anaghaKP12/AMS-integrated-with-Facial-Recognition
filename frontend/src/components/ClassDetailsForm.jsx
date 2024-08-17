import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import ImageComponent from './ImageComponent';
import HeaderComponent from './HeaderComponent';

const ClassDetails = () => {
    const [classData, setClassData] = useState({
        div: '',
        semester: '',
        subject: '',
        dayOfWeek: '',
        startTime: '',
        endTime: ''
    });

    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchClasses();
        }
    }, [navigate]);

    const fetchClasses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/classes', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching class data:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setClassData({ ...classData, [name]: value });
    };

    const handleSubmit = async (event) => {
        console.log("before axios");
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/classes', classData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            console.log("After axios");
            fetchClasses();
            resetForm();
        } catch (error) {
            console.error('Error submitting class data:', error);
        }
    };

    const handleDelete = async (classId) => {
        try {
            await axios.delete(`http://localhost:5000/api/classes/${classId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            fetchClasses();
        } catch (error) {
            console.error('Error deleting class data:', error);
        }
    };

    const resetForm = () => {
        setClassData({
            div: '',
            semester: '',
            subject: '',
            dayOfWeek: '',
            startTime: '',
            endTime: ''
        });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="app">
                <div className="top-images">
                    <ImageComponent src="/img/image.png" width="400px" height="150px" />
                    <ImageComponent src="/img/jssstulogo.png" width="525px" height="130px" />
                    <ImageComponent src="/img/1559273310phprF5vLT.jpeg" width="500px" height="150px" />
                </div>
                <HeaderComponent title="CLASS DETAILS" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Class</label>
                            <input
                                type="text"
                                name="div"
                                value={classData.div}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Semester</label>
                            <input
                                type="text"
                                name="semester"
                                value={classData.semester}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={classData.subject}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Day of the Week</label>
                            <input
                                type="text"
                                name="dayOfWeek"
                                value={classData.dayOfWeek}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Time</label>
                            <input
                                type="time"
                                name="startTime"
                                value={classData.startTime}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">End Time</label>
                            <input
                                type="time"
                                name="endTime"
                                value={classData.endTime}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                    >
                        Save
                    </button>
                </form>
                <div className="overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Class
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Semester
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subject
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Day
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Start Time
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    End Time
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Array.isArray(classes) && classes.map((classItem, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap">{classItem.div}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{classItem.semester}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{classItem.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{classItem.dayOfWeek}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{classItem.startTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{classItem.endTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleDelete(classItem._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;
