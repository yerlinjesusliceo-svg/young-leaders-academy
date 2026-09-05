import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import StudentProfile from './pages/StudentProfile'
import TechnicalLogin from './pages/TechnicalLogin'
import TechnicalDashboard from './pages/TechnicalDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('technical_token')
  }

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>
  }

  return (
    <BrowserRouter>
      <Navigation user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<ProtectedRoute user={user} component={<StudentDashboard user={user} />} />} />
        <Route path="/profile" element={<ProtectedRoute user={user} component={<StudentProfile user={user} />} />} />
        <Route path="/technical" element={<TechnicalLogin />} />
        <Route path="/technical/dashboard" element={<ProtectedRoute technical={true} component={<TechnicalDashboard />} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App