import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignupScreen'
import AdminSignUpScreen from './screens/AdminSignupScreen'
import EventsScreen from './screens/EventsScreen'
import AdminEventScreen from './screens/AdminEventScreen'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/admin-signup" element={<AdminSignUpScreen />} />
        <Route path="/admin-events" element={<AdminEventScreen />} />
        <Route path="/events" element={<EventsScreen />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default App