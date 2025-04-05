// import React from "react";
// import Swal from "sweetalert2";
// import "../css/EventCard.css";

// const EventCard = ({ event, onAddToCart }) => {
//   const handleClick = () => {
//     onAddToCart(event);
//     Swal.fire({
//       title: "¡Añadido!",
//       text: `"${event.title}" fue agregado al carrito`,
//       icon: "success",
//       confirmButtonText: "OK",
//       timer: 2000,
//       timerProgressBar: true,
//     });
//   };

//   // Manejo seguro del path de la imagen
//  function formatDay(dateString) {
//     if (!dateString) return "Próximamente";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("es-AR", { weekday: "short" }); // ej: "sáb."
//   }

//   function formatDayNumber(dateString) {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.getDate().toString().padStart(2, "0"); // ej: "05"
//   }

//   function formatYear(dateString) {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.getFullYear(); // ej: "2025"
//   }

//   // Manejo seguro del path de la imagen
//   const imageUrl = event?.imagePath?.startsWith("http")
//     ? event.imagePath
//     : "https://via.placeholder.com/300x200?text=Sin+imagen";

//   return (
//     <div className="event-card">
//       <img
//         src={imageUrl}
//         alt={event?.title || "Evento sin título"}
//         className="event-image"
//       />
//       <h3 className="event-title">{event?.title || "Sin título"}</h3>
//       <p className="event-provider">
//         Proveedor: {event?.provider || "No figura"}
//       </p>
//       <p className="event-provider">
//         Categoria: {event?.category || "No figura"}
//       </p>
//       <p className="event-price">🎟️ Precio: {event?.price || "No figura"}</p>

//       <div style={{ textAlign: "center", lineHeight: "1.2" }}>
//         <div style={{ color: "#00bcd4", fontSize: "14px" }}>
//           {formatDay(event?.date)}
//         </div>
//         <div style={{ color: "red", fontSize: "48px", fontWeight: "bold" }}>
//           {formatDayNumber(event?.date)}
//         </div>
//         <div style={{ color: "#00bcd4", fontWeight: "bold", fontSize: "14px" }}>
//           de {formatYear(event?.date)}
//         </div>
//       </div>

//       <button onClick={handleClick} className="buy-button">
//         Añadir al Carrito
//       </button>
//     </div>
//   );
// };

// export default EventCard;



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

  function formatDay(dateString) {
    if (!dateString) return "Próximamente";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", { weekday: "short" });
  }

  function formatDayNumber(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.getDate().toString().padStart(2, "0");
  }

  function formatYear(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.getFullYear();
  }

  const imageUrl = event?.imagePath?.startsWith("http")
    ? event.imagePath
    : "https://via.placeholder.com/300x200?text=Sin+imagen";

  const handleShare = () => {
    const url = window.location.href; // podés reemplazar con un link personalizado al evento
    const mensaje = `Te comparto este enlace: ${url} — "${event.title}"`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappURL, "_blank");
  };

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
      <p className="event-price">🎟️ Precio: {event?.price || "No figura"}</p>

      <div style={{ textAlign: "center", lineHeight: "1.2" }}>
        <div style={{ color: "#00bcd4", fontSize: "14px" }}>
          {formatDay(event?.date)}
        </div>
        <div style={{ color: "red", fontSize: "48px", fontWeight: "bold" }}>
          {formatDayNumber(event?.date)}
        </div>
        <div style={{ color: "#00bcd4", fontWeight: "bold", fontSize: "14px" }}>
          de {formatYear(event?.date)}
        </div>
      </div>

      <button onClick={handleClick} className="buy-button">
        Añadir al Carrito
      </button>

      <button onClick={handleShare} className="share-button">
        📲 Compartir por WhatsApp
      </button>
    </div>
  );
};

export default EventCard;

