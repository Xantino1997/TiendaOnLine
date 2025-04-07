import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/ResetPassword.css";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMensaje("❌ Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("✅ Contraseña restablecida correctamente. Redirigiendo al login...");
        setTimeout(() => navigate("/login"), 3000); // Redirige al login después de 3 segundos
      } else {
        setMensaje("❌ " + data.message);
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setMensaje("❌ Error de red o servidor.");
    }
  };

  return (
    <div className="register-container">
      <h2>Establecer Nueva Contraseña</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Cambiar contraseña</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default ResetPassword;
