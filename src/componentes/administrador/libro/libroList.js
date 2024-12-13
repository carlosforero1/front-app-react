import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";

const LibrosCrud = () => {
  const [libros, setLibros] = useState([]); // Lista de libros
  const [modal, setModal] = useState(false); // Control del modal para crear/editar
  const [modalVer, setModalVer] = useState(false); // Control del modal para ver detalles
  const [libroSeleccionado, setLibroSeleccionado] = useState(null); // Libro seleccionado para ver
  const [form, setForm] = useState({
    id: null,
    titulo: "",
    autor: "",
    editorial: "",
    anio_publicacion: "",
    genero: "",
    copias_disponibles: "",
  }); // Datos del formulario

  // Obtener los libros desde el backend
  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/libros");
        setLibros(response.data); // Establecer la lista de libros
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      }
    };
    fetchLibros();
  }, []);

  // Manejar la apertura/cierre de los modales
  const toggleModal = () => setModal(!modal);
  const toggleModalVer = () => setModalVer(!modalVer);

  // Manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    try {
      const payload = { ...form };
      
      if (form.id) {
        const response = await axios.put(`http://localhost:8080/api/libros/${form.id}`, payload);

        // Actualizamos el estado de libros
        setLibros((prev) => {
          return prev.map((libro) => 
            libro.id === form.id ? { ...libro, ...response.data } : libro
          );
        });
      
      } else {
        // Crear un nuevo libro
        const response = await axios.post("http://localhost:8080/api/libros", payload);
        setLibros([...libros, response.data]);
      }

      toggleModal();
      resetForm(); // Limpiar el formulario después de guardar
    } catch (error) {
      console.error("Error al guardar el libro:", error);
    }
  };

  // Eliminar un libro
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/libros/${id}`);
      setLibros(libros.filter((libro) => libro.id !== id));
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  };

  // Abrir el formulario para editar un libro
  const handleEdit = (libro) => {
    setForm({
      id: libro.id,
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      anio_publicacion: libro.anio_publicacion,
      genero: libro.genero,
      copias_disponibles: libro.copias_disponibles,
    });
    toggleModal();
  };

  // Ver detalles de un libro
  const handleVer = (libro) => {
    setLibroSeleccionado(libro);
    toggleModalVer();
  };

  // Limpiar el formulario
  const resetForm = () => {
    setForm({
      id: null,
      titulo: "",
      autor: "",
      editorial: "",
      anio_publicacion: "",
      genero: "",
      copias_disponibles: "",
    });
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Libros</h1>
      <Button color="primary" onClick={() => { 
        resetForm();
        toggleModal(); 
      }}>
        Nuevo Libro
      </Button>
      <Table striped className="mt-4">
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
              <td colSpan="8" className="text-center">No hay libros disponibles</td>
            </tr>
          ) : (
            libros.map((libro) => (
              <tr key={libro.id}>
                <td>{libro.id}</td>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>{libro.genero}</td>
                <td>
                  <Button color="info" onClick={() => handleVer(libro)}>Ver</Button>
                  <Button color="warning" onClick={() => handleEdit(libro)}>Editar</Button>
                  <Button color="danger" onClick={() => handleDelete(libro.id)} className="ml-2">Eliminar</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal para agregar/editar libro */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{form.id ? "Editar Libro" : "Nuevo Libro"}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="titulo">Título</Label>
              <Input type="text" name="titulo" id="titulo" value={form.titulo} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="autor">Autor</Label>
              <Input type="text" name="autor" id="autor" value={form.autor} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="editorial">Editorial</Label>
              <Input type="text" name="editorial" id="editorial" value={form.editorial} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="anio_publicacion">Año de Publicación</Label>
              <Input type="number" name="anio_publicacion" id="anio_publicacion" value={form.anio_publicacion} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="genero">Género</Label>
              <Input type="text" name="genero" id="genero" value={form.genero} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="copias_disponibles">Copias Disponibles</Label>
              <Input type="number" name="copias_disponibles" id="copias_disponibles" value={form.copias_disponibles} onChange={handleChange} required />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>{form.id ? "Actualizar" : "Guardar"}</Button>
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      {/* Modal para ver detalles */}
      <Modal isOpen={modalVer} toggle={toggleModalVer}>
        <ModalHeader toggle={toggleModalVer}>Detalles del Libro</ModalHeader>
        <ModalBody>
          {libroSeleccionado && (
            <div>
              <p><strong>ID:</strong> {libroSeleccionado.id}</p>
              <p><strong>Título:</strong> {libroSeleccionado.titulo}</p>
              <p><strong>Autor:</strong> {libroSeleccionado.autor}</p>
              <p><strong>Editorial:</strong> {libroSeleccionado.editorial}</p>
              <p><strong>Año de Publicación:</strong> {libroSeleccionado.anio_publicacion}</p>
              <p><strong>Género:</strong> {libroSeleccionado.genero}</p>
              <p><strong>Copias Disponibles:</strong> {libroSeleccionado.copias_disponibles}</p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModalVer}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default LibrosCrud;
