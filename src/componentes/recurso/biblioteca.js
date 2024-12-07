import React, { useState } from "react";

function Biblioteca() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books] = useState([
    { id: 1, title: "Cien Años de Soledad", author: "Gabriel García Márquez" },
    { id: 2, title: "Don Quijote de la Mancha", author: "Miguel de Cervantes" },
    { id: 3, title: "1984", author: "George Orwell" },
    { id: 4, title: "El Principito", author: "Antoine de Saint-Exupéry" },
    { id: 5, title: "Crónica de una Muerte Anunciada", author: "Gabriel García Márquez" },
  ]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="library-page">
      <header className="text-center">
        <h1>Biblioteca Virtual</h1>
        <p>Encuentra tus libros favoritos desde cualquier lugar</p>
      </header>

      <div className="search-bar text-center my-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="book-list container">
        {filteredBooks.length > 0 ? (
          <div className="row">
            {filteredBooks.map((book) => (
              <div key={book.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">Autor: {book.author}</p>
                    <button className="btn btn-primary">Leer Más</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No se encontraron libros.</p>
        )}
      </div>
    </div>
  );
}

export default Biblioteca;
