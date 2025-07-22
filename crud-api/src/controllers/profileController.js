const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener el perfil", error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { username, email, phoneNumber, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {username, email, phoneNumber, address},
      { new: true, runValidators: true, select: "-password"}
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar", error: err.message });
  }
};
