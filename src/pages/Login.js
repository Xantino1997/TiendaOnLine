import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importá esto
import "../css/Login.css";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 👈 Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("admin", data.user.admin); // 👈 guardamos si es admin
      setIsLoggedIn(true);
      navigate("/"); // 👈 Redirige a HomePage
    } else {
      alert(data.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Contraseña</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Ingresar</button>

        <div className="register-link">
          ¿No tenés cuenta? <a href="/register">Registrate acá</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
