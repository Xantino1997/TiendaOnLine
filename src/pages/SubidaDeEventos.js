// src/pages/SubidaDeEventos.js
import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import "../css/SubidaDeEventos.css";
import Swal from "sweetalert2";

function SubidaDeEventos() {
  const [eventos, setEventos] = useState([]);
  const [nuevoEvento, setNuevoEvento] = useState({
    title: "",
    provider: "",
    date: "",
    price: "",
    category: "",
    image: null,
  });

  const [vistaCrear, setVistaCrear] = useState(false);
  const [eventoEditando, setEventoEditando] = useState(null);

  useEffect(() => {
    fetch("https://tienda-backend-eta.vercel.app/api/eventos")
      .then((res) => res.json())
      .then((data) => setEventos(data))
      .catch((err) => console.error("Error cargando eventos:", err));
  }, []);

  const eliminarEvento = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el evento permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://tienda-backend-eta.vercel.app/api/eventos/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: "Evento eliminado",
            text: "El evento fue eliminado correctamente",
          }).then(() => window.location.reload());
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo eliminar el evento",
          });
        }
      } catch (err) {
        console.error("Error eliminando evento:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al eliminar el evento",
        });
      }
    }
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (eventoEditando) {
      setEventoEditando({ ...eventoEditando, image });
    } else {
      setNuevoEvento({ ...nuevoEvento, image });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (eventoEditando) {
      setEventoEditando({ ...eventoEditando, [name]: value });
    } else {
      setNuevoEvento({ ...nuevoEvento, [name]: value });
    }
  };

  const guardarEvento = async () => {
    const { title, date, image, price, category } = nuevoEvento;
    if (!title || !date || !image || !price || !category) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Todos los campos son obligatorios salvo el proveedor",
      });
      return;
    }

    const formData = new FormData();
    Object.keys(nuevoEvento).forEach((key) => {
      formData.append(key, nuevoEvento[key]);
    });

    try {
      const res = await fetch("https://tienda-backend-eta.vercel.app/api/eventos", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Evento guardado",
          text: "Se guardó el evento correctamente",
        }).then(() => window.location.reload());
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo guardar el evento",
        });
      }
    } catch (err) {
      console.error("Error subiendo evento:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al guardar el evento",
      });
    }
  };

  const editarEvento = async () => {
    const { title, date, price, category } = eventoEditando;
    if (!title || !date || !price || !category) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Todos los campos son obligatorios salvo el proveedor",
      });
      return;
    }

    const formData = new FormData();
    Object.entries(eventoEditando).forEach(([key, value]) => {
      if (key === "image" && !(value instanceof File)) return;
      formData.append(key, value);
    });

    try {
      const res = await fetch(
        `https://tienda-backend-eta.vercel.app/api/eventos/${eventoEditando._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (res.ok) {
        const actualizado = await res.json();
        setEventos(
          eventos.map((e) => (e._id === actualizado._id ? actualizado : e))
        );
        setEventoEditando(null);
        Swal.fire({
          icon: "success",
          title: "Evento actualizado",
          text: "Se actualizó correctamente el evento",
        }).then(() => window.location.reload());
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar el evento",
        });
      }
    } catch (err) {
      console.error("Error actualizando evento:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al actualizar el evento",
      });
    }
  };

  return (
    <div className="subida-eventos-container">
      <h2>Eventos en marcha</h2>

      <div className="eventos-lista">
        {eventos.length === 0 ? (
          <p>No hay eventos lanzados todavía.</p>
        ) : (
          eventos.map((event) => (
            <div key={event._id} className="event-card">
              {event.imagePath ? (
                <img
                  src={`${event.imagePath.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={event.title}
                  className="event-image"
                />
              ) : (
                <p>Imagen no disponible</p>
              )}
              <h3 className="event-title">{event.title}</h3>
              <p className="event-provider">Proveedor: {event.provider}</p>
              <p className="event-date">Fecha: {event.date}</p>
              <p className="event-price"> Precio: ${event.price}</p>
              <p className="event-category"> Categoría: {event.category}</p>

              <button
                onClick={() => eliminarEvento(event._id)}
                className="delete-button"
              >
                ❌ Eliminar
              </button>

              <button
                onClick={() => {
                  setEventoEditando(event);
                  setVistaCrear(false);
                }}
                className="edit-button"
              >
                ✏️ Editar
              </button>
            </div>
          ))
        )}
      </div>

      <button onClick={() => setVistaCrear(true)} className="boton-agregar">
        ＋ Agregar Evento
      </button>

      {(vistaCrear || eventoEditando) && (
        <div className="crear-evento-form">
          <img
            src={
              eventoEditando && eventoEditando.image instanceof File
                ? URL.createObjectURL(eventoEditando.image)
                : eventoEditando && typeof eventoEditando.image === "string"
                ? `${eventoEditando.image.replace(
                    /\\/g,
                    "/"
                  )}`
                : !eventoEditando && nuevoEvento.image instanceof File
                ? URL.createObjectURL(nuevoEvento.image)
                : logo
            }
            alt="Vista previa"
            className="preview-image"
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />
          <input
            type="text"
            name="title"
            placeholder="Título del evento"
            value={eventoEditando ? eventoEditando.title : nuevoEvento.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="provider"
            placeholder="Proveedor del evento (opcional)"
            value={
              eventoEditando ? eventoEditando.provider : nuevoEvento.provider
            }
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={eventoEditando ? eventoEditando.date : nuevoEvento.date}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Precio del evento"
            value={eventoEditando ? eventoEditando.price : nuevoEvento.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Categoría del evento"
            value={
              eventoEditando ? eventoEditando.category : nuevoEvento.category
            }
            onChange={handleChange}
            required
          />

          <button
            className="guardar-button"
            onClick={eventoEditando ? editarEvento : guardarEvento}
          >
            {eventoEditando ? "Actualizar Evento" : "Guardar Evento"}
          </button>

          <button
            onClick={() => {
              setEventoEditando(null);
              setVistaCrear(false);
            }}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

export default SubidaDeEventos;
