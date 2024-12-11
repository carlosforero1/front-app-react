import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AgregarEstudiante = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const navigate = useNavigate();

    const handleAgregar = () => {
        axios.post('/api/estudiantes', { nombre, correo })
            .then(() => navigate('/estudiantes'))
            .catch((error) => console.error('Error al agregar estudiante:', error));
    };

    return (
        <div>
            <h2>Agregar Estudiante</h2>
            <form>
                <div className="mb-3">
                    <label>Nombre</label>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Correo</label>
                    <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleAgregar}>Agregar</button>
            </form>
        </div>
    );
};

export default AgregarEstudiante;
