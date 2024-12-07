import React, { useState } from 'react';
import './auth.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    console.log('Register Attempt:', { email, password });
  };


  return (
    <div className="auth-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="auth-input">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth-input">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="auth-input">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">Registrarse</button>
      </form>
      <p className="auth-switch">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>
    </div>
  );
};

export default Register;
