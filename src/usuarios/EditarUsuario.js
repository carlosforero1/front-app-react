import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditarUsuario() {
    
    let navegacion = useNavigate();
    
    const urlBase = "http://localhost:8080/sn-app/usuarios";

    const {id} = useParams();

    const [usuarios, setUsuarios] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        contrasena: "",
        tipo_usuario: "",
        codigo: ""
    });

    const onInputChange = (e) => {
        setUsuarios({...usuarios, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        cargarUsuario();
    },[])

    const cargarUsuario = async () => {
        const resultado = await axios.get(`${urlBase}/${id}`)
        setUsuarios(resultado.data);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
    
        await axios.post(urlBase, usuarios);
        navegacion('/');
    }

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h2>Editar Usuario</h2>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">nombre</label>
                    <input type="text" className="form-control" name="nombre"  value={usuarios.nombre} onChange={onInputChange} />
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
                    <input type="number" className="form-control" name="codigo" value={usuarios.codigo} onChange={onInputChange} />
                </div>

                <button type="submit" className="btn btn-primary">Guardar</button>
                <button href="/" className="btn btn-primary">regresar</button>
                
            </form>
        </div>
    )
}
