import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import NavBar from "../components/NavBar";
import BookForm from "../components/BookForm";

export default function EditBook() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useState(location.state || null);

  useEffect(() => {
    if (!book) {
      api
        .get(`/books/${id}`)
        .then((res) => setBook(res.data))
        .catch(() => alert("No se pudo cargar el libro"));
    }
  }, [id, book]);

  const update = async (data) => {
    await api.put(`/books/${id}`, data);
    navigate("/home");
  };

  return (
    <div className="container">
      <NavBar />
      <h2>Editar libro</h2>
      {book && <BookForm initial={book} onSubmit={update} />}
    </div>
  );
}
