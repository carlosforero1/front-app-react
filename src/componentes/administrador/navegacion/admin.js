// Admin.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './nave';

const Admin = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    navigate("/login");  // Redirige a login si no es admin
  }

  return (
    <div>
      <Navbar />
      <h1>Bienvenido a la página de Admin</h1>
      {/* Contenido específico para el admin */}
    </div>
  );
};

export default Admin;
