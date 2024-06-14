import React from 'react';
import axios from 'axios';
import ImageComponent from './components/ImageComponent';
import ButtonComponent from './components/ButtonComponent';
import HeaderComponent from './components/HeaderComponent';
import { Link } from 'react-router-dom';
import './styles.css';

const App = () => {
    const handleTrainFace = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/train_classifier');
            console.log(response.data);
            alert('Training completed');
        } catch (error) {
            console.error('Error training classifier:', error);
            alert('Error training classifier');
        }
    };
    const handleFaceDetector = async () => {
        try {
            console.log("Inside function")
            const response = await axios.post('http://127.0.0.1:5000/api/recognize_face');
            console.log(response.data);
            if (response.data) {
                alert(`Recognized Student ID`);
            } else {
                alert('No face recognized');
            }
        } catch (error) {
            console.error('Error detecting face:', error);
            alert('Error detecting face');
        }
    };
    return (
        <div className="app bg-gray-100 h-full">
            <div className="top-images flex justify-center items-center mb-6">
                <ImageComponent src="/img/image.png" width="400px" height="150px" />
                <ImageComponent src="/img/jssstulogo.png" width="525px" height="130px" />
                <ImageComponent src="/img/1559273310phprF5vLT.jpeg" width="500px" height="150px" />
            </div>
            <HeaderComponent title="ATTENDANCE SYSTEM USING FACE RECOGNITION" />
            <div className="buttons grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="button-group bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
                    <ImageComponent src="/img/cartoon.png" width="200px" height="200px" />
                    <Link to="/student">
                        <ButtonComponent text="Student Details" onClick={() => handleButtonClick('student-details')} />
                    </Link>
                </div>
                <div className="button-group bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
                    <ImageComponent src="/img/Main-1.jpg" width="200px" height="200px" />
                    <ButtonComponent text="Face Detector" onClick={handleFaceDetector} />
                </div>
                <div className="button-group bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
                    <ImageComponent src="/img/attendence.jpg" width="200px" height="200px" />
                    <Link to="/attendance">
                    <ButtonComponent text="Attendance" onClick={() => handleButtonClick('attendance')} />
                    </Link>
                </div>
                <div className="button-group bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
                    <ImageComponent src="/img/trainface3.jpg" width="200px" height="200px" />
                    <ButtonComponent text="Train Face" onClick={() => handleTrainFace('train-face')} />
                </div>
            </div>
        </div>
    );
};

export default App;
