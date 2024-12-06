import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListadoEstudiantes = () => {
    const [estudiantes, setEstudiantes] = useState([]);

    useEffect(() => {
        axios.get('/api/estudiantes')
            .then((response) => setEstudiantes(response.data))
            .catch((error) => console.error('Error al obtener estudiantes:', error));
    }, []);

    return (
        <div>
            <h2>Listado de Estudiantes</h2>
            <Link to="/estudiantes/agregar" className="btn btn-primary">Agregar Estudiante</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantes.map((estudiante) => (
                        <tr key={estudiante.id}>
                            <td>{estudiante.id}</td>
                            <td>{estudiante.nombre}</td>
                            <td>{estudiante.correo}</td>
                            <td>
                                <Link to={`/estudiantes/editar/${estudiante.id}`} className="btn btn-warning">Editar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListadoEstudiantes;
