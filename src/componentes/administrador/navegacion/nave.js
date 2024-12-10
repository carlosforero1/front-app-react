// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const role = localStorage.getItem("role");

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        {role === "admin" && (
          <>
            <li><Link to="/">Dashboard Admin</Link></li>
            <li><Link to="/">Usuarios</Link></li>
            <li><Link to="/">Ajustes</Link></li>
          </>
        )}
        {role === "estudiante" && (
          <li><Link to="/cursos">Mis Cursos</Link></li>
        )}
        {role === "profesor" && (
          <li><Link to="/materias">Mis Materias</Link></li>
        )}
        <li><Link to="/perfil">Perfil</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
