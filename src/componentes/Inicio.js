
import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
    return (
        <div className="container text-center mt-5">
            <h1>Bienvenido al Sistema de Gestión Académica</h1>
            <p>Seleccione una de las opciones para continuar:</p>
            <div className="d-flex justify-content-center mt-4">
                <div className="card m-3" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Gestión de Estudiantes</h5>
                        <p className="card-text">Administre los estudiantes registrados en el sistema.</p>
                        <Link to="/estudiantes" className="btn btn-primary">Ir a Estudiantes</Link>
                    </div>
                </div>
                <div className="card m-3" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Gestión de Inscripciones</h5>
                        <p className="card-text">Administre las inscripciones de estudiantes a materias.</p>
                        <Link to="/inscripciones" className="btn btn-primary">Ir a Inscripciones</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inicio;
