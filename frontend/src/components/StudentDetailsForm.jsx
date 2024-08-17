import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageComponent from './ImageComponent';
import HeaderComponent from './HeaderComponent';
import '../index.css'

const StudentDetails = () => {
    const [studentData, setStudentData] = useState({
        dep: '',
        course: '',
        year: '',
        semester: '',
        std_id: '',
        std_name: '',
        div: '',
        roll: '',
        gender: '',
        dob: '',
        email: '',
        phone: '',
        address: '',
        faculty: '',
        photo: 'Yes'
    });

    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setStudentData({ ...studentData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/students', studentData);
            fetchStudents();
            resetForm();
        } catch (error) {
            console.error('Error submitting student data:', error);
        }
    };
    const handleDelete = async (std_id) => {
        try {
            await axios.delete(`http://localhost:5000/api/students/${std_id}`);
            fetchStudents();
            resetForm();
        } catch (error) {
            console.error('Error deleting student data:', error);
        }
    };
    const handlePhoto = async (id) => {
        try {
            console.log(id)
            const response = await axios.post('http://127.0.0.1:5000/api/generate_dataset', { id });
            console.log(response.data);
            alert('Generating data sets completed!!!');
          } catch (error) {
            console.error('Error generating dataset:', error);
            alert('Error generating dataset');
          }
    };
    
    const handleRowClick = (student) => {
        setStudentData({
            dep: student.dep,
            course: student.course,
            year: student.year,
            semester: student.semester,
            std_id: student.std_id,
            std_name: student.std_name,
            div: student.div,
            roll: student.roll,
            gender: student.gender,
            dob: student.dob,
            email: student.email,
            phone: student.phone,
            address: student.address,
            faculty: student.faculty,
            photo: student.photo
        });
    };
    
    const resetForm = () => {
        setStudentData({
            dep: '',
            course: '',
            year: '',
            semester: '',
            std_id: '',
            std_name: '',
            div: '',
            roll: '',
            gender: '',
            dob: '',
            email: '',
            phone: '',
            address: '',
            faculty: '',
            photo: 'Yes'
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
                <HeaderComponent title="STUDENT DETAILS" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Department</label>
                            <input
                                type="text"
                                name="dep"
                                value={studentData.dep}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Course</label>
                            <input
                                type="text"
                                name="course"
                                value={studentData.course}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Year</label>
                            <input
                                type="text"
                                name="year"
                                value={studentData.year}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Semester</label>
                            <input
                                type="text"
                                name="semester"
                                value={studentData.semester}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Student ID</label>
                            <input
                                type="text"
                                name="std_id"
                                value={studentData.std_id}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="std_name"
                                value={studentData.std_name}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Section</label>
                            <input
                                type="text"
                                name="div"
                                value={studentData.div}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Register Number</label>
                            <input
                                type="text"
                                name="roll"
                                value={studentData.roll}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <input
                                type="text"
                                name="gender"
                                value={studentData.gender}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={studentData.dob}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={studentData.email}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={studentData.phone}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={studentData.address}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Faculty</label>
                            <input
                                type="text"
                                name="faculty"
                                value={studentData.faculty}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Photo Sample</label>
                            <div className="mt-1 flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="photo"
                                        value="Yes"
                                        checked={studentData.photo === 'Yes'}
                                        onChange={handleInputChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Yes</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="photo"
                                        value="No"
                                        checked={studentData.photo === 'No'}
                                        onChange={handleInputChange}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">No</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                    >
                        Save
                    </button>
                    <button onClick={()=>{handleDelete(studentData.std_id)}}
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                    >
                        Delete
                    </button>
                    <button onClick={()=>{handlePhoto(studentData.std_id)}}
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                        >
                        Take photo
                    </button>
                </form>
                <div>
                <div className="overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Department
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Course
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Year
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Semester
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Student ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Section
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Register Number
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Gender
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date of Birth
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Faculty
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Photo Sample
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
    {Array.isArray(students) && students.map((student, index) => (
        <tr 
            key={index} 
            className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} 
            onClick={() => handleRowClick(student)}
        >
            <td className="px-6 py-4 whitespace-nowrap">{student.dep}</td>
            <td className="px-6 py-4 whitespace-nowrap">{student.course}</td>
            <td className="px-6 py-4 whitespace-nowrap">{student.year}</td>
            <td className="px-6 py-4 whitespace-nowrap">{student.semester}</td>
            <td className="px-6 py-4 whitespace-nowrap">{student.std_id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{student.std_name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{student.div}</td>
            <td className="px-6 py-4 whitespace-nowrap">{student.roll}</td>
            <td className="px-6 py-4 whitespace-nowrap">{student.gender}</td>
            <td className="px-6 py-4 whitespace-nowrap">{student.dob}</td>
            <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{student.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap">{student.address}</td>
            <td className="px-6 py-4 whitespace-nowrap">{student.faculty}</td>
            <td className="px-6 py-4 whitespace-nowrap">{student.photo}</td>
        </tr>
    ))}
</tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;

