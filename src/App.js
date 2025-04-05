import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import logo from "./images/logo.png";

import HomePage from "./pages/HomePage";
import SubidaDeEventos from "./pages/SubidaDeEventos";
import Espectaculos from "./pages/Espectaculos";
import Recitales from "./pages/Recitales";
import CenaShow from "./pages/CenaShow";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const total = carrito.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const finalizarCompra = () => {
    alert("¡Gracias por tu compra!");
    setCarrito([]);
    setMostrarCarrito(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("admin");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar
          carrito={carrito}
          setMostrarCarrito={setMostrarCarrito}
          isLoggedIn={isLoggedIn}
          logout={logout}
        />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<HomePage carrito={carrito} setCarrito={setCarrito} />}
            />
            <Route
              path="/admin/subidaDeEventos"
              element={
                <PrivateRoute adminOnly={true}>
                  <SubidaDeEventos />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/espectaculos"
              element={
                <Espectaculos
                  carrito={carrito}
                  setCarrito={setCarrito}
                  setMostrarCarrito={setMostrarCarrito}
                />
              }
            />
            <Route
              path="/cenas"
              element={
                <CenaShow
                  carrito={carrito}
                  setCarrito={setCarrito}
                  setMostrarCarrito={setMostrarCarrito}
                />
              }
            />
            <Route
              path="/recitales"
              element={
                <Recitales
                  carrito={carrito}
                  setCarrito={setCarrito}
                  setMostrarCarrito={setMostrarCarrito}
                />
              }
            />
          </Routes>
        </main>

        {mostrarCarrito && (
          <div className="carrito-modal">
            <div className="carrito-contenido">
              <h2>Carrito</h2>
              {carrito.length === 0 ? (
                <>
                  <p>Tu carrito está vacío</p>
                  <img src={logo} alt="Logo" className="logo-image" />
                </>
              ) : (
                <>
                  <div className="total-gasto"><strong>Tu Compra</strong></div>
                  <div className="total-gasto">
                    <strong>Gasto total:</strong> ${total.toFixed(2)}
                  </div>
                  <img src={logo} alt="Logo" className="logo-image" />
                  <ul className="carrito-lista">
                    {carrito.map((item, index) => (
                      <li key={index} className="carrito-item">
                        <img
                          src={item.image || `${item.imagePath}`}
                          alt={item.title}
                          className="carrito-img"
                        />
                        <div className="carrito-detalles">
                          <strong>{item.title}</strong>
                          <p>{item.date}</p>
                          <p><strong>Precio:</strong> ${item.price}</p>
                          <button onClick={() => eliminarDelCarrito(index)}>❌</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button className="finalizar-btn" onClick={finalizarCompra}>
                    Finalizar Compra
                  </button>
                </>
              )}
              <button
                className="cerrar-btn-compra"
                onClick={() => setMostrarCarrito(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </Router>
  );
}

export default App;
