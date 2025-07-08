import { useNavigate } from "react-router-dom";
import api from "../services/api";
import NavBar from "../components/NavBar";
import BookForm from "../components/BookForm";

export default function AddBook() {
  const navigate = useNavigate();

  const create = async (book) => {
    await api.post("/books", book);
    navigate("/home");
  };

  return (
    <div className="container">
      <NavBar />
      <h2>Nuevo Libro</h2>
      <BookForm onSubmit={create} />
    </div>
  );
}
