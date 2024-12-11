import React, { useState, useEffect } from "react";
import axios from "axios";

const NotaTable = () => {
  const [notas, setNotas] = useState([]);
  const [newNota, setNewNota] = useState({ fecha: "", nota: "", tipo: "" });

  useEffect(() => {
    fetchNotas();
  }, []);


  const fetchNotas = async () => {
      try {
          const response = await axios.get('/api/notas');
          console.log(response.data);
      } catch (error) {
          console.error("Error al obtener las notas:", error);
      }
  };
    
  

  const createNota = async () => {
    await axios.post("/api/notas", newNota);
    setNewNota({ fecha: "", nota: "", tipo: "" });
    fetchNotas();
  };

  const updateNota = async (id, updatedNota) => {
    await axios.put(`/api/notas/${id}`, updatedNota);
    fetchNotas();
  };

  const deleteNota = async (id) => {
    await axios.delete(`/api/notas/${id}`);
    fetchNotas();
  };

  return (
    <div>
      <h1>Notas</h1>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nota</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota) => (
            <tr key={nota.id}>
              <td>
                <input
                  type="date"
                  value={nota.fecha}
                  onChange={(e) =>
                    updateNota(nota.id, { ...nota, fecha: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={nota.nota}
                  onChange={(e) =>
                    updateNota(nota.id, { ...nota, nota: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={nota.tipo}
                  onChange={(e) =>
                    updateNota(nota.id, { ...nota, tipo: e.target.value })
                  }
                />
              </td>
              <td>
                <button onClick={() => deleteNota(nota.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Crear Nota</h2>
      <input
        type="date"
        value={newNota.fecha}
        onChange={(e) => setNewNota({ ...newNota, fecha: e.target.value })}
      />
      <input
        type="number"
        value={newNota.nota}
        onChange={(e) => setNewNota({ ...newNota, nota: e.target.value })}
      />
      <input
        type="text"
        value={newNota.tipo}
        onChange={(e) => setNewNota({ ...newNota, tipo: e.target.value })}
      />
      <button onClick={createNota}>Crear</button>
    </div>
  );
};

export default NotaTable;
