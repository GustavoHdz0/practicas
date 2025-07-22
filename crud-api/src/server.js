require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");

const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const profileRoutes = require("./routes/profile")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(logger);

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/profile", profileRoutes)

app.get("/", (req, res) => res.send("CRUD API Funcionando"));

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
