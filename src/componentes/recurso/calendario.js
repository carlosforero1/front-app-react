import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendario.css';

const CalendarioAcademico = () => {
  const [date, setDate] = useState(new Date());
  const [eventDetails, setEventDetails] = useState("");

  const eventos = {
    '2024-01-10': {
      title: 'Inicio de Clases',
      description: 'Comienzo de clases para el semestre 2024.'
    },
    '2024-03-15': {
      title: 'Vacaciones de Medio Semestre',
      description: 'Semana de descanso para estudiantes y profesores.'
    },
    '2024-05-01': {
      title: 'Exámenes Parciales',
      description: 'Evaluación de mitad de semestre.'
    },
    '2024-08-10': {
      title: 'Semana Cultural',
      description: 'Actividades culturales y artísticas organizadas por la universidad.'
    },
    '2024-09-23': {
      title: 'Día del Estudiante',
      description: 'Celebración en honor al Día del Estudiante.'
    },
    '2024-12-10': {
      title: 'Exámenes Finales',
      description: 'Últimos exámenes del semestre 2024.'
    },
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const event = eventos[newDate.toISOString().split('T')[0]]; // Obtiene la fecha en formato YYYY-MM-DD
    if (event) {
      setEventDetails(`${event.title}: ${event.description}`);
    } else {
      setEventDetails("No hay eventos programados para esta fecha.");
    }
  };

  return (
    <div className="calendario-container">
      <h2>Calendario Académico 2024</h2>
      <div className="calendario">
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileClassName={({ date, view }) => {
            // Destacar los días con eventos
            const dateString = date.toISOString().split('T')[0];
            return eventos[dateString] ? 'highlight' : null;
          }}
        />
        <div className="event-details">
          <h3>Detalles del Evento</h3>
          <p>{eventDetails}</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarioAcademico;
