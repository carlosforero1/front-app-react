import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navegacion from './componentes/comunes/navegacion';
import ListadoEstudiantes from './componentes/estudiantes/ListadoEstudiantes';
import Inicio from './componentes/Inicio';
import AgregarEstudiante from './componentes/estudiantes/AgregarEstudiante';
import ListadoInscripciones from './componentes/inscripciones/ListadoInscripciones';
import Login from './componentes/inicioSesion/login';
import Register from './componentes/inicioSesion/registro';
import Biblioteca from './componentes/recurso/biblioteca';
import Menu from './componentes/administrador/menu';
import ListadoLibros from './componentes/administrador/libro/libroList';
import Contactos from './componentes/recurso/contactos';
import Carreras from './componentes/comunes/carreras';
import Calendario from './componentes/recurso/calendario';
import Admin from './componentes/administrador/navegacion/admin';
import Nota from './componentes/administrador/nota/listarNota';
import Navbar from './componentes/administrador/navegacion/nave';


import Curso from './componentes/recurso/curso';
import Materias from './componentes/recurso/materias';

function App() {
  const [role, setRole] = useState(null);

  // Verifica el rol del usuario almacenado en localStorage al montar el componente
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  return (
    <BrowserRouter>
      {/* Muestra el Navbar solo si el usuario es administrador */}
      {role === "admin" && <Navbar />}

      <Navegacion />
      <div className="container mt-4">
        <Routes>
          <Route exact path="/" element={<Inicio />} />
          <Route path="/estudiantes" element={<ListadoEstudiantes />} />
          <Route path="/estudiantes/agregar" element={<AgregarEstudiante />} />
          <Route path="/inscripciones" element={<ListadoInscripciones />} />
          <Route path="/inicioSesion" element={<Login />} />
          <Route path="/recurso/biblioteca" element={<Biblioteca />} />
          <Route path="/inicioSesion/register" element={<Register />} />
          <Route path="/admin/menu" element={<Menu />} />
          <Route path="/list/libro" element={<ListadoLibros />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/carreras" element={<Carreras />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/notas" element={<Nota />} />

          <Route path="/curso" element={<Curso />} />
          <Route path="/materia" element={<Materias />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
