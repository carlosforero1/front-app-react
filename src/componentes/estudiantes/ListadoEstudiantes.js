import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";

const UsuariosCrud = () => {
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
  const [modal, setModal] = useState(false); // Control del modal para crear/editar
  const [modalVer, setModalVer] = useState(false); // Control del modal para ver detalles
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Usuario seleccionado para ver
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    codigo: "",
    nombreUsuario: "",
    activo: true,
    rol: "", // ID del rol asociado
  }); // Datos del formulario

  // Obtener los usuarios desde el backend
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/usuarios");
        setUsuarios(response.data); // Establecer la lista de usuarios
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    fetchUsuarios();
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
      const payload = { ...form, rol: parseInt(form.rol, 10) };
      
      if (form.id) {
        // Actualización de un usuario
        const response = await axios.put(`http://localhost:8080/api/usuarios/${form.id}`, payload);

        // Actualizamos el estado de usuarios
        setUsuarios((prev) => {
          return prev.map((usuario) => 
            usuario.id === form.id ? { ...usuario, ...response.data } : usuario
          );
        });
      
      } else {
        // Crear un nuevo usuario
        const response = await axios.post("http://localhost:8080/api/usuarios", payload);
        setUsuarios([...usuarios, response.data]);
      }

      toggleModal();
      resetForm(); // Limpiar el formulario después de guardar
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  };

  // Eliminar un usuario
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/usuarios/${id}`); // Cambiar PUT por DELETE
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  // Abrir el formulario para editar un usuario
  const handleEdit = (usuario) => {
    setForm({
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      contrasena: "", // No mostrar la contraseña
      codigo: usuario.codigo,
      nombreUsuario: usuario.nombreUsuario,
      activo: usuario.activo,
      rol: usuario.rol ? usuario.rol.toString() : "", // Convertir el rol a string
    });
    toggleModal();
  };

  // Ver detalles de un usuario
  const handleVer = (usuario) => {
    setUsuarioSeleccionado(usuario);
    toggleModalVer();
  };

  // Limpiar el formulario
  const resetForm = () => {
    setForm({
      id: null,
      nombre: "",
      apellido: "",
      correo: "",
      contrasena: "",
      codigo: "",
      nombreUsuario: "",
      activo: true,
      rol: "",
    });
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Usuarios</h1>
      <Button color="primary" onClick={() => { 
        resetForm();
        toggleModal(); 
      }}>
        Nuevo Usuario
      </Button>
      <Table striped className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No hay usuarios disponibles</td>
            </tr>
          ) : (
            usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.correo}</td>
                <td>
                  {usuario.rol === 1
                    ? "Admin"
                    : usuario.rol === 2
                    ? "Estudiante"
                    : usuario.rol === 3
                    ? "Profesor"
                    : "Sin rol"}
                </td>
                <td>
                  <Button color="info" onClick={() => handleVer(usuario)}>Ver</Button>
                  <Button color="warning" onClick={() => handleEdit(usuario)}>Editar</Button>
                  <Button color="danger" onClick={() => handleDelete(usuario.id)} className="ml-2">Eliminar</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal para agregar/editar usuario */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{form.id ? "Editar Usuario" : "Nuevo Usuario"}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input type="text" name="nombre" id="nombre" value={form.nombre} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="apellido">Apellido</Label>
              <Input type="text" name="apellido" id="apellido" value={form.apellido} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="correo">Correo</Label>
              <Input type="email" name="correo" id="correo" value={form.correo} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="contra">Contraseña</Label>
              <Input 
    type="password" 
    name="contrasena" 
    id="contrasena" 
    value={form.contrasena} 
    onChange={handleChange} 
    required 
  />
            </FormGroup>
            <FormGroup>
              <Label for="codigo">Código</Label>
              <Input type="number" name="codigo" id="codigo" value={form.codigo} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="nombreUsuario">Nombre de Usuario</Label>
              <Input type="text" name="nombreUsuario" id="nombreUsuario" value={form.nombreUsuario} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="rol">Rol</Label>
              <Input
                type="select"
                name="rol"
                id="rol"
                value={form.rol}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Selecciona un rol</option>
                <option value="1">Admin</option>
                <option value="2">Estudiante</option>
                <option value="3">Profesor</option>
              </Input>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="activo" checked={form.activo} onChange={(e) => setForm({ ...form, activo: e.target.checked })} />
                Activo
              </Label>
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
        <ModalHeader toggle={toggleModalVer}>Detalles del Usuario</ModalHeader>
        <ModalBody>
          {usuarioSeleccionado && (
            <div>
              <p><strong>ID:</strong> {usuarioSeleccionado.id}</p>
              <p><strong>Nombre:</strong> {usuarioSeleccionado.nombre}</p>
              <p><strong>Apellido:</strong> {usuarioSeleccionado.apellido}</p>
              <p><strong>Correo:</strong> {usuarioSeleccionado.correo}</p>
              <p><strong>Contraseña:</strong> {usuarioSeleccionado.contrasena}</p>
              <p><strong>Código:</strong> {usuarioSeleccionado.codigo}</p>
              <p><strong>Rol:</strong> {usuarioSeleccionado.rol === 1 ? "Admin" : usuarioSeleccionado.rol === 2 ? "Estudiante" : usuarioSeleccionado.rol === 3 ? "Profesor" : "Sin rol"}</p>
              <p><strong>Activo:</strong> {usuarioSeleccionado.activo ? "Sí" : "No"}</p>
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

export default UsuariosCrud;
