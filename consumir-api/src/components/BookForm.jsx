import { useState } from "react";

export default function BookForm({ initial = {}, onSubmit }) {
  const [book, setBook] = useState({
    title: initial.title || "",
    author: initial.author || "",
    isbn: initial.isbn || "",
    description: initial.description || "",
    available: initial.available ?? true,
  });

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setBook({ ...book, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(book);
      }}
    >
      <input
        name="title"
        placeholder="Titulo"
        value={book.title}
        onChange={handle}
        required
      />
      <input
        name="author"
        placeholder="Autor"
        value={book.author}
        onChange={handle}
        required
      />
      <input
        name="isbn"
        placeholder="ISBN"
        value={book.isbn}
        onChange={handle}
      />
      <textarea
        name="description"
        placeholder="Descripcion"
        value={book.description}
        onChange={handle}
      />
      <label>
        Disponible
        <input
          type="checkbox"
          name="available"
          checked={book.available}
          onChange={handle}
        />
      </label>
      <button id="btnEdit" type="submit">Guardar</button>
    </form>
  );
}
