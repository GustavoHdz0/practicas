const Product = require("../models/Product");

exports.getAll = async (req, res) => {
  const products = await Product.find({ userId: req.user.id });
  res.json(products);
};

exports.getOne = async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });
  if (!product) return res.status(404).json({ msg: "No encontrado" });
  res.json(product);
};

exports.create = async (req, res) => {
  const { name, description, image } = req.body;
  const product = await Product.create({
    name,
    description,
    image,
    userId: req.user.id,
  });
  res.status(201).json(product);
};

exports.update = async (req, res) => {
  const updated = await Product.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ msg: "No encontrado" });
  res.json(updated);
};

exports.remove = async (req, res) => {
  const deleted = await Product.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });
  if (!deleted) return res.status(404).json({ msg: "No encontrado" });
  res.json({ msg: "Producto eliminado" });
};
