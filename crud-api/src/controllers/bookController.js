const Book = require("../models/Book");

exports.getAll = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.getOne = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ msg: "No encontrado" });
  res.json(book);
};

exports.create = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

exports.update = async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ msg: "No encontrado" });
  res.json(updated);
};

exports.remove = async (req, res) => {
  const deleted = await Book.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ msg: "No encontrado" });
  res.json({ msg: "Libro eliminado" });
};
