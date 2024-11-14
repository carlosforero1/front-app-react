import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AgregarUsuario() {

    let navegacion = useNavigate();

    const [usuarios, setUsuarios] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        contrasena: "",
        tipo_usuario: "",
        codigo: ""
    });

    const onInputChange = (e) => {
        setUsuarios({ ...usuarios, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e, id) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/sn-app/usuarios";
        await axios.put(`${urlBase}/${id}`, usuarios);
        navegacion('/');
    }

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h2>Agregar Usuario</h2>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">nombre</label>
                    <input type="text" className="form-control" name="nombre" required={true} value={usuarios.nombre} onChange={onInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">apellido</label>
                    <input type="text" className="form-control" name="apellido" value={usuarios.apellido} onChange={onInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo</label>
                    <input type="email" className="form-control" name="correo" value={usuarios.correo} onChange={onInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="contrasena" className="form-label">contraseña</label>
                    <input type="password" className="form-control" name="contrasena" value={usuarios.contrasena} onChange={onInputChange} />
                </div>

                <div>
                    <select htmlFor="tipo_usuario" class="form-select" aria-label="Default select example" name="tipo_usuario" onChange={onInputChange} value={usuarios.tipo_usuario}>
                        <option selected>Escoge tipo de usuario</option>
                        <option value="1">Estudiante</option>
                        <option value="2">Profesor</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="codigo" className="form-label">codigo</label>
                    <input type="number" className="form-control" name="codigo" required={true} value={usuarios.codigo} onChange={onInputChange} />
                </div>

                <button type="submit" className="btn btn-primary">Agregar</button>
                <button type="/" className="btn btn-primary">Regresar</button>

            </form>
        </div>
    )
}
