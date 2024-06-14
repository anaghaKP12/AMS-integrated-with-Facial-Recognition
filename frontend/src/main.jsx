import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import StudentDetailsForm from './components/StudentDetailsForm.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AttendancePage from './components/AttendancePage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  <Routes>
      <Route path="/" element={<App />} />
      <Route path="/student" element={<StudentDetailsForm />} />
      <Route path="/attendance" element={<AttendancePage />} />
  </Routes>
</Router>
)
