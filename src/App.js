import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Navegacion from "./plantilla/navegacion";
import ListadoUsuarios from "./usuarios/ListadoUsuarios";
import AgregarUsuario from "./usuarios/AgregarUsuario";
import EditarUsuario from "./usuarios/EditarUsuario";
import Panel from "./plantilla/panel";


function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navegacion />
        <Panel />
        <Routes>
          <Route exact path="/" element={<ListadoUsuarios />} /> 
          <Route exact path="/agregar" element={<AgregarUsuario />}></Route>
          <Route exact path="/editar/:id" element={<EditarUsuario/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
