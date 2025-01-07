import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const LibroTable = () => {
  const [libros, setLibros] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedLibro, setSelectedLibro] = useState(null);
  const [error, setError] = useState(null);

  // Cargar los libros al iniciar el componente
  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/libros");
        setLibros(response.data);
      } catch (error) {
        setError("Error al obtener los libros.");
        console.error("Error al obtener los libros:", error);
      }
    };

    fetchLibros();
  }, []);

  const toggleModal = (libro) => {
    setSelectedLibro(libro);
    setModal(!modal);
  };

  return (
    <div className="container mt-4">
      <h1>Lista de Libros</h1>

      {/* Mostrar error si ocurre */}
      {error && <div className="alert alert-danger">{error}</div>}

      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No hay libros disponibles</td>
            </tr>
          ) : (
            libros.map((libro) => (
              <tr key={libro.id}>
                <td>{libro.id}</td>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>{libro.genero}</td>
                <td>
                  <Button color="info" onClick={() => toggleModal(libro)}>Ver</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal para mostrar los detalles del libro */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Detalles del Libro</ModalHeader>
        <ModalBody>
          {selectedLibro ? (
            <div>
              <h3>{selectedLibro.titulo}</h3>
              <p><strong>Autor:</strong> {selectedLibro.autor}</p>
              <p><strong>Editorial:</strong> {selectedLibro.editorial || 'No disponible'}</p>
              <p><strong>Año de Publicación:</strong> {selectedLibro.anio_publicacion}</p>
              <p><strong>Género:</strong> {selectedLibro.genero}</p>
              <p><strong>Copias Disponibles:</strong> {selectedLibro.copias_disponibles}</p>

              {selectedLibro.imagen && (
                <img src={selectedLibro.imagen} alt={selectedLibro.titulo} className="img-fluid" />
              )}
            </div>
          ) : (
            <p>Cargando detalles...</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default LibroTable;
