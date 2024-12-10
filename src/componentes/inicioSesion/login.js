import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css'; // Añadir archivo CSS para estilizar el formulario

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Usuarios predefinidos
  const users = [
    { username: "admin", password: "123", role: "admin" },
    { username: "estudiante", password: "123", role: "estudiante" },
    { username: "profesor", password: "123", role: "profesor" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("role", user.role);

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "estudiante") {
        navigate("/estudiantes");
      } else if (user.role === "profesor") {
        navigate("/profesor");
      }
    } else {
      setErrorMessage("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario"
              required
            />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-btn">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
