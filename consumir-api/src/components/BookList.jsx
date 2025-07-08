export default function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) return <p>No hay libros.</p>;

  return (
    <ul>
      {books.map((book) => (
        <li key={book._id}>
          <strong>{book.title}</strong> - {book.author}{" "}
          <button id="btnEdit" onClick={() => onEdit(book)}>Editar</button>{" "}
          <button id="btnRemove" onClick={() => onDelete(book._id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}
