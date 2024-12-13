import React from 'react';
import './inicio.css';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/recurso/biblioteca'); 
  };
  const handleNavigation2 = () => {
    navigate('/calendario'); 
  };

  return (
    
    <div className="inicio">

      <header className="inicio-header">
        <h1>Universidad De Caldas</h1>
        <p>Formando líderes del mañana con excelencia académica</p>
      </header>

      <section className="careers-section">
        <div className="container mt-5">
          <h1 className="text-center mb-4">Nuestras Carreras</h1>
          <div id="carrerasCarousel" className="carousel slide" data-bs-ride="carousel">


            <div className="carousel-inner">
              {[
                { title: 'Ingeniería Informática', desc: 'Aprende a construir soluciones tecnológicas para los retos del futuro.' },
                { title: 'Medicina', desc: 'Formamos profesionales comprometidos con la salud y la vida.' },
                { title: 'Administración de Empresas', desc: 'Desarrolla habilidades para liderar organizaciones exitosas.' },
                { title: 'Diseño Gráfico', desc: 'Crea experiencias visuales únicas y efectivas.' },
                { title: 'Psicología', desc: 'Entiende el comportamiento humano y ayuda a superar retos.' },
                { title: 'Arquitectura', desc: 'Diseña espacios que mejoren la vida de las personas.' },
                { title: 'Economía', desc: 'Analiza problemas financieros y propone soluciones innovadoras.' },
                { title: 'Ingeniería Ambiental', desc: 'Trabaja en soluciones sostenibles para proteger el medio ambiente.' },
                { title: 'Derecho', desc: 'Defiende la justicia y construye un mejor futuro.' },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                >
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carrerasCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carrerasCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </div>
      </section>

      <section className="events-section">
        <h2>Eventos Destacados</h2>
        <ul>
          <li>
            <strong>Feria de Emprendimiento:</strong> 15 de diciembre, 10:00 AM
          </li>
          <li>
            <strong>Concierto de Navidad:</strong> 20 de diciembre, 6:00 PM
          </li>
          <li>
            <strong>Semana de la Ciencia:</strong> Enero 2024
          </li>
        </ul>
      </section>

      <section className="students-resources">
        <h2>Recursos para Estudiantes</h2>

        <div className="container text-center">
          <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
            <div className="resource-box">
              <h3>Biblioteca Virtual</h3>
              <p>Accede a libros, artículos y más desde cualquier lugar.</p>
              <button onClick={handleNavigation} className="btn btn-primary">Explorar</button>
            </div>
          
            <div className="resource-box">
              <h3>Calendario Académico</h3>
              <p>Revisa las fechas importantes del semestre.</p>
              <button className="btn btn-primary" onClick={handleNavigation2}>Ver Calendario</button>
            </div>
          </div>
        </div>
      </section>


      <footer className="inicio-footer">
        <p>© 2024 Universidad Central. Todos los derechos reservados.</p>
        <p>Contacto: info@universidadcentral.edu | Tel: +57 123 456 7890</p>
      </footer>
    </div>
  );
};

export default Inicio;
