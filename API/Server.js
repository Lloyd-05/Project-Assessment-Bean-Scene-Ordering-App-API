const express = require("express");
const mongoose = require("mongoose");
const env = require('dotenv').config();


const app = express();
app.use(express.json());

const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoute");
const tableRoutes = require("./routes/tableRoute");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🍃 MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});