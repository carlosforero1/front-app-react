import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function Biblioteca() {
  const [books, setBooks] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/libros"); 
        console.log(response.data);
        setBooks(response.data);
      } catch (error) {
        console.error("Error al cargar los libros", error);
      }
    };
    fetchBooks();
  }, []);

  const toggleModal = (book) => {
    setSelectedBook(book); 
    setModal(!modal);
  };

  return (
    <div className="library-page">
      <header className="text-center">
        <h1>Biblioteca Virtual</h1>
        <p>Encuentra tus libros favoritos desde cualquier lugar</p>
      </header>

      <div className="book-list container">
        {books.length >= 0 ? (
          <div className="row">
            {books.map((book) => (
              <div key={book.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5> 
                    <p className="card-text">Autor: {book.author}</p> 
                    <Button color="primary" onClick={() => toggleModal(book)}>
                      Leer Más
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No se encontraron libros.</p>
        )}
      </div>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Detalles del Libro</ModalHeader>
        <ModalBody>
          {selectedBook ? (
            <div>
              <h3>{selectedBook.title}</h3>
              <p><strong>Autor:</strong> {selectedBook.author}</p>
              <p><strong>Editorial:</strong> {selectedBook.editorial}</p>
              <p><strong>Año de Publicación:</strong> {selectedBook.anio_publicacion}</p>
              <p><strong>Género:</strong> {selectedBook.genero}</p>
              <p><strong>Copias Disponibles:</strong> {selectedBook.copias_disponibles}</p>
        
              {selectedBook.image && (
                <img src={selectedBook.image} alt={selectedBook.title} className="img-fluid" />
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
}

export default Biblioteca;
