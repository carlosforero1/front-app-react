import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ListadoUsuarios() {

    const urlbase = "http://localhost:8080/sn-app/usuarios"
    const [usuarios, setUsuarios] = useState([]);
    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        const resul = await axios.get(urlbase);
        console.log("Resultado");
        console.log(resul.data);
        setUsuarios(resul.data);
    }

    const eliminarUsuario = async (id) => {
        await axios.delete(`${urlbase}/${id}`);
        cargarUsuarios();
    }
    const TipoUsuario = (tipo) => {
        if (tipo === 1) return "Estudiante";
        if (tipo === 2) return "Profesor";
        return "Inactivo"; 
    }
    
      
    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h2>Tabla de usuarios</h2>
            </div>
            <div className="d-flex justify-content-end mb-3">
                <Link type='button' className='btn btn-success btn-sm me-3' to="/agregar">Agregar Estudiante</Link>
            </div>
            <table className="table table-striped table-hover align-middle">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Correo</th>
                        <th scope="col">tipo usuario</th>
                        <th scope='col'>Codigo</th>
                        <th scope='col'>Acciones</th>       

                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((usuario, indice) => (
                            <tr key={indice}>
                                <th scope="row">{usuario.id}</th>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.correo}</td>
                                <td>{TipoUsuario(usuario.tipo_usuario)}</td>
                                <td>{usuario.codigo}</td>
                                <td className="txt-center">
                                    <div>
                                        <Link to={`/editar/${usuario.id}`} className='btn btn-warning btn-sm me-3'>Editar</Link>
                                        <button onClick={() => eliminarUsuario(usuario.id)} className='btn btn-danger btm-sm me-3'>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
