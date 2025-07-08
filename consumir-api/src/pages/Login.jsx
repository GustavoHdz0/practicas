import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      onAuth();
      navigate("/home");
    } catch {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submit}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" type="password" />
          <button type="submit">Entrar</button>
      </form>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
    </div>
  );
}
