import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navigation.css'

function Navigation({ user, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🎓</span>
          Young Leaders Academy
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Inicio</Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">Mi Área</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">Mi Perfil</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link btn-logout">Cerrar Sesión</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Iniciar Sesión</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link btn-inscribirse">Inscribirse</Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link to="/technical" className="nav-link btn-technical">Área Técnico</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation