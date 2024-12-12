import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole);
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole(null); 
    navigate("/inicioSesion"); 
  };

  
  if (role === "admin") {
    return (
      <nav className="navbar">
        <ul>
          <li><Link to="/materia">materias</Link></li>
          <li><Link to="/estudiantes">estudiantes</Link></li>
          <li><Link to="/notas">notas</Link></li>
          <li><Link to="/curso">curso</Link></li>
          <li><Link to="/list/libro">libros</Link></li>
          <li><button onClick={handleLogout}>Cerrar sesión</button></li>
        </ul>
      </nav>
    );
  }

  return null;
};

export default Navbar;
