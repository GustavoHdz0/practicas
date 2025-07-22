const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendTemporaryPassword } = require("../utils/mailer");
const bcrypt = require("bcryptjs");

const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2h" });

exports.register = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, address, userPfp } =
      req.body;
    const user = await User.create({
      username,
      email,
      password,
      phoneNumber,
      address,
      userPfp,
    });
    res.status(201).json({ msg: "Usuario creado", id: user._id });
  } catch (err) {
    res.status(400).json({ msg: "Error al registrar", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ msg: "Usuario no encontrado" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    res.json({ token: genToken(user._id) });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
  res.json({ user });
};

exports.recoverPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const tempPass = Math.random().toString(36).slice(-8);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(tempPass, salt);
    
    await User.updateOne({ email: email.toLowerCase() }, { password: hashedPassword });

    await sendTemporaryPassword(email, tempPass);

    console.log("Contraseña guardada (hash):", user.password);

    res.json({ message: "Se envio una contraseña temporal al correo." });
  } catch (error) {
    console.error("Error en recoverPassword: ", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};
