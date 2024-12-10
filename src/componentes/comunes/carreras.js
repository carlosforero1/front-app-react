import React from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import './carreras.css';

const carreras = [
  { title: 'Ingeniería Informática', desc: 'Aprende a construir soluciones tecnológicas para los retos del futuro.', icon: 'fa-laptop-code', color: '#007bff' },
  { title: 'Medicina', desc: 'Formamos profesionales comprometidos con la salud y la vida.', icon: 'fa-heartbeat', color: '#28a745' },
  { title: 'Administración de Empresas', desc: 'Desarrolla habilidades para liderar organizaciones exitosas.', icon: 'fa-briefcase', color: '#ffc107' },
  { title: 'Diseño Gráfico', desc: 'Crea experiencias visuales únicas y efectivas.', icon: 'fa-paint-brush', color: '#17a2b8' },
  { title: 'Psicología', desc: 'Entiende el comportamiento humano y ayuda a superar retos.', icon: 'fa-brain', color: '#6f42c1' },
  { title: 'Arquitectura', desc: 'Diseña espacios que mejoren la vida de las personas.', icon: 'fa-building', color: '#fd7e14' },
  { title: 'Economía', desc: 'Analiza problemas financieros y propone soluciones innovadoras.', icon: 'fa-chart-line', color: '#dc3545' },
  { title: 'Ingeniería Ambiental', desc: 'Trabaja en soluciones sostenibles para proteger el medio ambiente.', icon: 'fa-leaf', color: '#28a745' },
  { title: 'Derecho', desc: 'Defiende la justicia y construye un mejor futuro.', icon: 'fa-gavel', color: '#007bff' }
];

const Carreras = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Carreras Disponibles</h2>
      <Row>
        {carreras.map((carrera, index) => (
          <Col sm="12" md="4" lg="3" key={index} className="mb-4">
            <Card>
              <CardBody>
                <CardTitle tag="h5">
                  <i className={`fa ${carrera.icon}`} style={{ color: carrera.color, marginRight: '10px' }}></i>
                  {carrera.title}
                </CardTitle>
                <CardText>{carrera.desc}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Carreras;
