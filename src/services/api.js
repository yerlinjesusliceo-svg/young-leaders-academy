// API configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = {
  // Auth endpoints
  register: async (data) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    return response.json()
  },

  verifyTechnical: async (password) => {
    const response = await fetch(`${API_URL}/technical/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    return response.json()
  },

  // Student endpoints
  getStudent: async (userId) => {
    const token = localStorage.getItem('user_token')
    const response = await fetch(`${API_URL}/students/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.json()
  },

  updateStudent: async (userId, data) => {
    const token = localStorage.getItem('user_token')
    const response = await fetch(`${API_URL}/students/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return response.json()
  },

  // Modules
  getModules: async (specialization) => {
    const response = await fetch(`${API_URL}/modules?specialization=${specialization}`)
    return response.json()
  },

  // Activities
  getActivities: async (specialization) => {
    const response = await fetch(`${API_URL}/activities?specialization=${specialization}`)
    return response.json()
  },

  completeActivity: async (studentId, activityId) => {
    const token = localStorage.getItem('user_token')
    const response = await fetch(`${API_URL}/students/${studentId}/activities/${activityId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return response.json()
  },

  // Technical dashboard
  getTechnicalDashboard: async () => {
    const token = localStorage.getItem('technical_token')
    const response = await fetch(`${API_URL}/technical/dashboard`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.json()
  },

  getAllStudents: async () => {
    const token = localStorage.getItem('technical_token')
    const response = await fetch(`${API_URL}/technical/students`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.json()
  },

  getStudentForTechnical: async (studentId) => {
    const token = localStorage.getItem('technical_token')
    const response = await fetch(`${API_URL}/technical/students/${studentId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.json()
  },

  updateStudentByTechnical: async (studentId, data) => {
    const token = localStorage.getItem('technical_token')
    const response = await fetch(`${API_URL}/technical/students/${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }
}

export default api