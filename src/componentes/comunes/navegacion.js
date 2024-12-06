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
                            <Link className="nav-link" to="/estudiantes">Estudiantes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/inscripciones">Inscripciones</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navegacion;
