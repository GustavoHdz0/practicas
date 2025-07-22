const router = require("express").Router();
const { register, login, getMe, recoverPassword } = require("../controllers/authControlles");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getMe);
router.post("/recover-password", recoverPassword);

module.exports = router;
