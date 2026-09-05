import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ user, technical, component }) {
  if (technical) {
    const technicalToken = localStorage.getItem('technical_token')
    if (!technicalToken) {
      return <Navigate to="/technical" />
    }
    return component
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return component
}

export default ProtectedRoute