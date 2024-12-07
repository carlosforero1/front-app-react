import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navegacion from './componentes/comunes/navegacion';
import ListadoEstudiantes from './componentes/estudiantes/ListadoEstudiantes';
import Inicio from './componentes/Inicio';
import AgregarEstudiante from './componentes/estudiantes/AgregarEstudiante';
import ListadoInscripciones from './componentes/inscripciones/ListadoInscripciones';
import Login from './componentes/inicioSesion/login';
import Register from './componentes/inicioSesion/registro';
import Biblioteca from './componentes/recurso/biblioteca';

function App() {
    return (
        <BrowserRouter>
            <Navegacion />
            <div className="container mt-4">
                <Routes>
                <Route exact path="/" element={<Inicio />} />
                    <Route exact path="/" element={<ListadoEstudiantes />} />
                    <Route path="/estudiantes" element={<ListadoEstudiantes />} />
                    <Route path="/estudiantes/agregar" element={<AgregarEstudiante />} />
                    <Route path="/inscripciones" element={<ListadoInscripciones />} />
                    <Route path="/inicioSesion" element={<Login/>} />
                    <Route path="/recurso/biblioteca" element={<Biblioteca/>}/>
                 <Route path="/inicioSesion/register" element={<Register/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
