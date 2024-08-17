import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import StudentDetailsForm from './components/StudentDetailsForm.jsx'
import LoginPage from './components/LoginPage.jsx';
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AttendancePage from './components/AttendancePage.jsx'
import SignupPage from './components/signupPage.jsx';
import ClassDetails from './components/ClassDetailsForm.jsx';
import StudentAttendanceReport from './components/StudentAttendanceReport.jsx';
import FaceRecogntion from './components/FaceRecognition.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<App />} />
      <Route path="/student" element={<StudentDetailsForm />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/class" element={<ClassDetails />} />
      <Route path="/student/:studentId" element={<StudentAttendanceReport />} />
      <Route path="/face_recog" element={<FaceRecogntion />} />
  </Routes>
</Router>
)
