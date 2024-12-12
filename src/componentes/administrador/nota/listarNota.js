import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";

const NotasCrud = () => {
  const [notas, setNotas] = useState([]); 
  const [modal, setModal] = useState(false); 
  const [modalVer, setModalVer] = useState(false);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null); 
  const [form, setForm] = useState({
    id: null,
    estudianteId: null, 
    nota: "",
    fecha: "",
    tipo: "",
  });

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/notas");
        setNotas(response.data); 
      } catch (error) {
        console.error("Error al obtener las notas:", error);
      }
    };
    fetchNotas();
  }, []);

  const toggleModal = () => setModal(!modal);
  const toggleModalVer = () => setModalVer(!modalVer);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        inscripcionEstudiante: {
          estudiante: {
            id: form.estudianteId,  
          },
        },
      };
  
      if (form.id) {
        const response = await axios.put(`http://localhost:8080/api/notas/${form.id}`, payload);
        
   
        setNotas((prev) =>
          prev.map((nota) =>
            nota.id === form.id
              ? {
                  ...nota,
                  ...response.data, 
                  inscripcionEstudiante: {
                    ...nota.inscripcionEstudiante,
                    estudiante: nota.inscripcionEstudiante.estudiante,
                  },
                }
              : nota
          )
        );
      } else {
        const response = await axios.post("http://localhost:8080/api/notas", payload);
        setNotas([...notas, response.data]);
      }
      toggleModal();
      setForm({ id: null, estudianteId: null, nota: "", fecha: "", tipo: "" });
    } catch (error) {
      console.error("Error al guardar la nota:", error);
    }
  };
  

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/notas/${id}`);
      setNotas(notas.filter((nota) => nota.id !== id));
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
    }
  };

  const handleEdit = (nota) => {
    setForm({
      id: nota.id,
      estudianteId: nota.inscripcionEstudiante.estudiante.id,
      nota: nota.nota,
      fecha: nota.fecha,
      tipo: nota.tipo,
    });
    toggleModal();
  };


  const handleVer = (nota) => {
    setNotaSeleccionada(nota); 
    toggleModalVer();
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Notas</h1>
      <Button color="primary" onClick={() => { setForm({ id: null, estudianteId: null, nota: "", fecha: "", tipo: "" }); toggleModal(); }}>
        Nueva Nota
      </Button>
      <Table striped className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Estudiante</th>
            <th>Nota</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {notas.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No hay notas disponibles</td>
            </tr>
          ) : (
            notas.map((nota) => (
              <tr key={nota.id}>
                <td>{nota.id}</td>
                <td>{`${nota.inscripcionEstudiante.estudiante.nombre} ${nota.inscripcionEstudiante.estudiante.apellido}`}</td>
                <td>{nota.nota}</td>
                <td>{nota.fecha}</td>
                <td>
                  <Button color="info" onClick={() => handleVer(nota)}>Ver</Button>
                  <Button color="warning" onClick={() => handleEdit(nota)}>Editar</Button>
                  <Button color="danger" onClick={() => handleDelete(nota.id)} className="ml-2">Eliminar</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{form.id ? "Editar Nota" : "Nueva Nota"}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="estudianteId">ID Estudiante</Label>
              <Input
                type="number"
                name="estudianteId"
                id="estudianteId"
                value={form.estudianteId || ""}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="nota">Nota</Label>
              <Input type="number" name="nota" id="nota" value={form.nota} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="fecha">Fecha</Label>
              <Input type="date" name="fecha" id="fecha" value={form.fecha} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="tipo">Tipo</Label>
              <Input type="text" name="tipo" id="tipo" value={form.tipo || ""} onChange={handleChange} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>{form.id ? "Actualizar" : "Guardar"}</Button>
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>

     
      <Modal isOpen={modalVer} toggle={toggleModalVer}>
        <ModalHeader toggle={toggleModalVer}>Detalles de la Nota</ModalHeader>
        <ModalBody>
          {notaSeleccionada && (
            <div>
              <p><strong>ID Nota:</strong> {notaSeleccionada.id}</p>
              <p><strong>Estudiante:</strong> {`${notaSeleccionada.inscripcionEstudiante.estudiante.nombre} ${notaSeleccionada.inscripcionEstudiante.estudiante.apellido}`}</p>
              <p><strong>Correo:</strong> {notaSeleccionada.inscripcionEstudiante.estudiante.correo}</p>
              <p><strong>Nota:</strong> {notaSeleccionada.nota}</p>
              <p><strong>Fecha:</strong> {notaSeleccionada.fecha}</p>
              <p><strong>Tipo:</strong> {notaSeleccionada.tipo || "No especificado"}</p>
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

export default NotasCrud;