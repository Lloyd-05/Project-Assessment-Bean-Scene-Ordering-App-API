const swaggerDocs = require("./Swagger");

const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const env = require('dotenv').config();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const app = express();

app.use(cors());

app.use(express.json());

// Simple request logger to help debug Swagger requests
// app.use((req, res, next) => {
//   console.log(`--> ${req.method} ${req.originalUrl}`);
//   if (Object.keys(req.body || {}).length) console.log('    body:', JSON.stringify(req.body));
//   next();
// });

swaggerDocs(app);

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});

// Improved error handler (shows stack in non-production)
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const payload = { message: err.message || 'Something broke!' };
  if (process.env.NODE_ENV !== 'production') payload.stack = err.stack;
  res.status(status).json(payload);
});