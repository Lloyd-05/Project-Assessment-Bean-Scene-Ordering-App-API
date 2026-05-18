const express = require("express");
const mongoose = require("mongoose");
const env = require('dotenv').config();


const app = express();
app.use(express.json());

app.use("./Models/Menu", require("./routes/menuRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🍃 MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ DB Connection Error:", err));


const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});