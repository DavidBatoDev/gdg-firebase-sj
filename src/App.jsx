import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignupScreen'
import AdminSignUpScreen from './screens/AdminSignupScreen'
import EventsScreen from './screens/EventsScreen'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/admin-signup" element={<AdminSignUpScreen />} />
        <Route path="/events" element={<EventsScreen />} />
      </Routes>
    </Router>
  )
}

export default App