const jwt = require("jsonwebtoken");
const User = require("../models/User");

const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2h" });

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ msg: "Usuario creado", id: user._id });
  } catch (err) {
    res.status(400).json({ msg: "Error al registrar", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ msg: "Credenciales inválidas" });
  }

  res.json({ token: genToken(user._id) });
};
