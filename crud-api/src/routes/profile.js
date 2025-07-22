const router = require("express").Router();
const auth = require("../middleware/auth");
const ctrl = require("../controllers/profileController");

router.use(auth);

router.get("/", ctrl.getProfile);
router.put("/", ctrl.update);

module.exports = router;