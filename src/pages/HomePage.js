// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import '../css/HomePage.css';
import img1 from '../images/person3.png';
import img2 from '../images/person2.png';
import img3 from '../images/person1.png';

import EventCard from '../components/EventCard';

const sliderImages = [img1, img3, img2];

const frases = [
  'Espectáculos únicos',
  'Lo que necesitás para disfrutar',
  'Una experiencia fácil y confiable',
  'Disfrutá sin preocuparte',
];

const eventosPorPagina = 6;

const HomePage = ({ carrito, setCarrito }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [eventos, setEventos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/eventos");
        const data = await res.json();
        setEventos(data);
      } catch (err) {
        console.error("Error al cargar eventos:", err);
      }
    };

    fetchEventos();
  }, []);

  const handleAgregarAlCarrito = (evento) => {
    setCarrito([...carrito, evento]);
  };

  // Lógica de paginación
  const indiceUltimo = paginaActual * eventosPorPagina;
  const indicePrimero = indiceUltimo - eventosPorPagina;
  const eventosActuales = eventos.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(eventos.length / eventosPorPagina);

  const irAPagina = (nro) => setPaginaActual(nro);
  const siguiente = () => paginaActual < totalPaginas && setPaginaActual(paginaActual + 1);
  const anterior = () => paginaActual > 1 && setPaginaActual(paginaActual - 1);

  return (
    <div className="homepage">
      <div className="slider">
        <img
          key={currentSlide}
          src={sliderImages[currentSlide]}
          alt={`slide-${currentSlide}`}
          className="slider-image"
        />
        <div className="slider-text-overlay">
          <h2>Shows en Vivo</h2>
          <p key={currentSlide} className="slider-phrase">
            {frases[currentSlide % frases.length]}
          </p>
        </div>
      </div>

      <div className="event-section">
        <h2 className="section-title">Eventos Destacados</h2>
        <div className="event-grid">
          {eventosActuales.map((event) => (
            <EventCard
              key={event._id}
              event={{
                ...event,
                image: `http://localhost:5000/${event.imagePath}`,
              }}
              onAddToCart={handleAgregarAlCarrito}
            />
          ))}
        </div>

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="paginacion">
            <button onClick={anterior} disabled={paginaActual === 1}>◀ Anterior</button>
            {[...Array(totalPaginas)].map((_, i) => (
              <button
                key={i}
                onClick={() => irAPagina(i + 1)}
                className={paginaActual === i + 1 ? "pagina-activa" : ""}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={siguiente} disabled={paginaActual === totalPaginas}>
              Siguiente ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
