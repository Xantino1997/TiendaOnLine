import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Restablecer.css";

const RestablecerPassword = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleEnviarCodigo = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/reset-password-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(data.message);
        setCodigoEnviado(true);
      } else {
        setMensaje("❌ " + data.message);
      }
    } catch (error) {
      console.error("Error al solicitar restablecimiento:", error);
      setMensaje("❌ Error de red o servidor.");
    }
  };

  const handleVerificarCodigo = (e) => {
    e.preventDefault();
    // Podés hacer una validación con backend si querés acá.
    if (token.trim().length > 0) {
      // Redirige a la pantalla de cambio de contraseña con email y token
      navigate(`/reset-password?token=${token}&email=${email}`);
    } else {
      setMensaje("⚠️ Ingresá el código recibido por correo.");
    }
  };

  return (
    <div className="register-container">
      <h2>Restablecer Contraseña</h2>

      {!codigoEnviado ? (
        <form onSubmit={handleEnviarCodigo} className="register-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar código</button>
        </form>
      ) : (
        <form onSubmit={handleVerificarCodigo} className="register-form">
          <p>📧 Revisá tu correo y colocá el código recibido:</p>
          <input
            type="text"
            placeholder="Código recibido"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
          <button type="submit">Verificar código</button>
        </form>
      )}

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default RestablecerPassword;
