import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../administrador/navegacion/nave';

const ListadoEstudiantes = () => {
    const [libro, setLibros] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/libros')
            .then((response) => setLibros(response.data))
            .catch((error) => console.error('Error al obtener estudiantes:', error));
    }, []);

    return (
        <div>
             <Navbar />
            <h2>Listado de Estudiantes</h2>
            <Link to="/estudiantes/agregar" className="btn btn-primary">Agregar Estudiante</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Autor</th>
                        <th>Género</th>
                        <th>Título</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {libro.map((libro) => (
                        <tr key={libro.id}>
                            <td>{libro.id}</td>
                            <td>{libro.autor}</td>
                            <td>{libro.genero}</td>
                            <td>{libro.titulo}</td>
                            <td>
                                <Link to={`/estudiantes/editar/${libro.id}`} className="btn btn-warning">Editar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListadoEstudiantes;
