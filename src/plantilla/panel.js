// Panel.js
import React from "react";
import { Link } from "react-router-dom";

const Panel = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">Listado de Usuarios</Link></li>
        <li><Link to="/agregar">Agregar Usuario</Link></li>
        {/* Puedes agregar más enlaces aquí */}
      </ul>
    </aside>
  );
};

export default Panel;
