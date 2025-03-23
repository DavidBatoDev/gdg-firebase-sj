import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignupScreen'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </Router>
  )
}

export default App