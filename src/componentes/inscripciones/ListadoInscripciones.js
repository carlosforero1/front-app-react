import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListadoInscripciones = () => {
    const [inscripciones, setInscripciones] = useState([]);

    useEffect(() => {
        axios.get('/sn-app/inscripciones')
            .then((response) => setInscripciones(response.data))
            .catch((error) => console.error('Error al obtener inscripciones:', error));
    }, []);

    return (
        <div>
            <h2>Listado de Inscripciones</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Estudiante</th>
                        <th>Materia</th>
        
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {inscripciones.map((inscripcion) => (
                        <tr key={inscripcion.id}>
                            <td>{inscripcion.id}</td>
                            <td>{inscripcion.estudiante.nombre}</td>
                            <td>{inscripcion.materia.nombre}</td>
                            <td>{inscripcion.fechaInscripcion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListadoInscripciones;
