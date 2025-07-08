import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <Link to="/home">Inicio</Link>
      <Link to="/add">Nuevo Libro</Link>
      <button onClick={logout}>Salir</button>
    </nav>
  );
}
