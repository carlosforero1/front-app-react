import React from 'react';
import './contactos.css';

const Contactos = () => {
  return (
    <div className="contactos">
      <h2>Contactos de Emergencia</h2>
      <ul>
        <li>
          <strong>Emergencias Generales (Ambulancia, Bomberos, Policía):</strong> <a href="tel:+112">112</a>
        </li>
        <li>
          <strong>Centro de Información y Emergencias:</strong> <a href="tel:+123456789">+123 456 789</a>
        </li>
        <li>
          <strong>Departamento de Salud:</strong> <a href="tel:+987654321">+987 654 321</a>
        </li>
      </ul>
    </div>
  );
};

const RedesSociales = () => {
  return (
    <div className="redes">
      <h2>Redes Sociales</h2>
      <ul>
        <li>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="facebook-icon.png" alt="Facebook" /> Facebook
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="twitter-icon.png" alt="Twitter" /> Twitter
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="instagram-icon.png" alt="Instagram" /> Instagram
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="linkedin-icon.png" alt="LinkedIn" /> LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Contactos de Emergencia y Redes Sociales</h1>
      </header>

      <Contactos />
      <RedesSociales />

      <footer className="inicio-footer">
        <p>© 2024 Universidad Central. Todos los derechos reservados.</p>
        <p>Contacto: info@universidadcentral.edu | Tel: +57 123 456 7890</p>
      </footer>
    </div>
  );
};

export default App;
