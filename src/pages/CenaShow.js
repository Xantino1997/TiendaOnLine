import React, { useEffect, useState } from "react";
import "../css/Espectaculos.css";
import Swal from "sweetalert2";

const CenaShow = ({ carrito, setCarrito, setMostrarCarrito }) => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const eventosPorPagina = 3;

  useEffect(() => {
    fetch("https://tienda-backend-eta.vercel.app/api/eventos")
      .then((res) => res.json())
      .then((data) => {
        const filtrados = data.filter(
          (ev) => ev.category?.toLowerCase() === "cena show"
        );
        setEventos(filtrados);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al traer los eventos:", err);
        setLoading(false);
      });
  }, []);

  const agregarAlCarrito = (evento) => {
    setCarrito((prev) => [...prev, evento]);
    setMostrarCarrito(true);

    Swal.fire({
      title: "¡Añadido!",
      text: `"${evento.title}" fue agregado al carrito`,
      icon: "success",
      confirmButtonText: "OK",
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const indiceUltimo = paginaActual * eventosPorPagina;
  const indicePrimero = indiceUltimo - eventosPorPagina;
  const eventosActuales = eventos.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(eventos.length / eventosPorPagina);

  const irAPagina = (nro) => setPaginaActual(nro);
  const siguiente = () => paginaActual < totalPaginas && setPaginaActual(paginaActual + 1);
  const anterior = () => paginaActual > 1 && setPaginaActual(paginaActual - 1);

  return (
    <div className="espectaculos-container">
      <h1 style={{ color: "white" }}>🍽️ Cena Show</h1>

      {loading ? (
        <p>Cargando eventos...</p>
      ) : eventos.length === 0 ? (
        <div className="sin-eventos">
          <h2>Por ahora no hay Cena Show disponibles</h2>
          <img src="./images/HUMO.PNG" alt="Humo" className="humo-fondo" />
        </div>
      ) : (
        <>
          <div className="eventos-grid">
            {eventosActuales.map((evento, index) => (
              <div key={index} className="espectaculo-card">
                <img
                  src={`${evento.imagePath}`}
                  alt={evento.title}
                  className="espectaculo-image"
                />
                <h3 className="espectaculo-title">{evento.title}</h3>
                <p className="espectaculo-date">{evento.date}</p>
                <p className="espectaculo-price">
                  {evento.price ? `$${evento.price}` : "Gratis"}
                </p>
                <button
                  className="espectaculo-buy-button"
                  onClick={() => agregarAlCarrito(evento)}
                >
                  Agregar al Carrito 🛒
                </button>
              </div>
            ))}
          </div>

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
        </>
      )}
    </div>
  );
};

export default CenaShow;
