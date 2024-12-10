import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListadoInscripciones = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchInscripciones = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/inscripciones");
        setInscripciones(response.data);
        setLoading(false); 
      } catch (error) {
        setError("Error al cargar las inscripciones.");
        setLoading(false);
        console.error("Error al obtener las inscripciones:", error);
      }
    };

    fetchInscripciones();
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Puedes poner un spinner o mensaje de carga aquí
  }

  if (error) {
    return <div>{error}</div>; // Si hay un error, muestra el mensaje
  }

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
          {inscripciones.length > 0 ? (
            inscripciones.map((inscripcion) => (
              <tr key={inscripcion.id}>
                <td>{inscripcion.id}</td>
                <td>{inscripcion.estudiante ? inscripcion.estudiante.nombre : 'No disponible'}</td>
                <td>{inscripcion.materia ? inscripcion.materia.nombre : 'No disponible'}</td>
                <td>{inscripcion.fechaInscripcion || 'Fecha no disponible'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No hay inscripciones disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoInscripciones;
