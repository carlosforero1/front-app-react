import React from 'react';
import { Link } from 'react-router-dom';

const Navegacion = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Inicio</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">       
                        <li className="nav-item">
                            <Link className="nav-link" to="/inicioSesion">iniciar sesion</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contactos">Contactos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/carreras">Carreras</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/calendario">Calendario</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/estudiantes">Pruebas</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navegacion;
