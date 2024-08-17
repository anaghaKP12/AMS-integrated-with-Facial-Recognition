import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from './ButtonComponent';
import ImageComponent from './ImageComponent';
import HeaderComponent from './HeaderComponent';

const FaceRecognition = ()=>{
    const [currentClass,setcurrentClass] = useState({});
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

      const fetchCurrentClass = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/attendance', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          console.log("Insode fetch current class")
            console.log(response.data)
            setcurrentClass(response.data);
        } catch (error) {
            console.error('Error fetching class data:', error);
        }
    };

    const handleFaceDetector = async () => {
        try {
            
            const response = await axios.post('http://127.0.0.1:5000/api/recognize_face');
            console.log("Face detector response: ",response);
            const studentId = response.data.id;
            const status = response.data.status;
            if (response.data) {
                alert(`Recognized Student ID`);
            } else {
                alert('No face recognized');
            }
            const subject = currentClass.subject;
            const div = currentClass.div;
            const semester = currentClass.semester;
            console.log("StiudentId:",studentId)

            const attResponse = await axios.post('http://localhost:5000/api/attendance', {
              subject,
              div,
              semester,
              studentId,
              date,
              status
            }, {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            console.log("Response data: ",attResponse.data);
          alert('Attendance marked successfully');
        } catch (error) {
            console.error('Error detecting face:', error);
            alert('Error detecting face');
        }
    };
    return(
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
                  <ButtonComponent text="Face Detector" onClick={handleFaceDetector} />
                  </div>
                  
    )
}
export default FaceRecognition;