import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import logo from "../images/logo.png";

const Navbar = ({ carrito, setMostrarCarrito, isLoggedIn, logout }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
      </div>

      <div className={`navbar-menu ${menuAbierto ? "active" : ""}`}>
        <Link to="/" onClick={cerrarMenu}>
          Inicio
        </Link>
        <Link to="/espectaculos" onClick={cerrarMenu}>
          Espectáculos
        </Link>
        <Link to="/cenas" onClick={cerrarMenu}>
          Shows
        </Link>
        <Link to="/recitales" onClick={cerrarMenu}>
          Recitales
        </Link>

        {isLoggedIn ? (
          <>
            {localStorage.getItem("admin") === "true" && (
              <Link to="/admin/subidaDeEventos" onClick={cerrarMenu}>
                Subir Evento
              </Link>
            )}
            <button
              onClick={() => {
                cerrarMenu();
                logout();
              }}
              className="logout-btn"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={cerrarMenu}>
              Login
            </Link>
            <Link to="/register" onClick={cerrarMenu}>
              Registro
            </Link>
          </>
        )}

        <div className="cart-link" onClick={() => setMostrarCarrito(true)}>
          🛒
          {carrito.length > 0 && (
            <span className="carrito-contador">{carrito.length}</span>
          )}
        </div>
      </div>

      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
