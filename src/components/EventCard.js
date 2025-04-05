import React from "react";
import Swal from "sweetalert2";
import "../css/EventCard.css";

const EventCard = ({ event, onAddToCart }) => {
  const handleClick = () => {
    onAddToCart(event);
    Swal.fire({
      title: "¡Añadido!",
      text: `"${event.title}" fue agregado al carrito`,
      icon: "success",
      confirmButtonText: "OK",
      timer: 2000,
      timerProgressBar: true,
    });
  };

  // Manejo seguro del path de la imagen
  const imageUrl = event?.imagePath
    ? `https://tienda-backend-eta.vercel.app/${event.imagePath.replace(/\\/g, "/")}`
    : "https://via.placeholder.com/300x200?text=Sin+imagen";

  return (
    <div className="event-card">
      <img
        src={imageUrl}
        alt={event?.title || "Evento sin título"}
        className="event-image"
      />
      <h3 className="event-title">{event?.title || "Sin título"}</h3>
      <p className="event-provider">Proveedor: {event?.provider || "No figura"}</p>
      <p className="event-provider">Categoria: {event?.category || "No figura"}</p>
      <p className="event-price">Precio: {event?.price || "No figura"}</p>
      <strong><p className="event-date">Fecha: {event?.date || "Próximamente"}</p></strong>
      <button onClick={handleClick} className="buy-button">
        Añadir al Carrito
      </button>
    </div>
  );
};

export default EventCard;
