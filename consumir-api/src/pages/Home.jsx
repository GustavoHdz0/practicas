import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import NavBar from "../components/NavBar";
import BookList from "../components/BookList";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch(() => alert("Erro al cargar libros"));
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const remove = async (id) => {
    if (!window.confirm("¿Eliminar libro?")) return;
    await api.delete(`/books/${id}`);
    setBooks(books.filter((book) => book._id !== id));
  };

  const edit = (book) => navigate(`/edit/${book._id}`, { state: book });

  return (
    <div className="container">
      <NavBar />
      <h2>Libros</h2>
      <input
        placeholder="Buscar por título"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <BookList books={filteredBooks} onEdit={edit} onDelete={remove} />
    </div>
  );
}
