const swaggerDocs = require("./Swagger");
const swaggerUI = require("swagger-ui-express");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors")
const mongoose = require("mongoose");
const env = require('dotenv').config();
const menuWatcher = require("./watchers/menuWatcher");
const ApplicationLog = require("./ApplicationLog");

ApplicationLog();

const app = express();

app.use(express.json());


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(helmet());
app.use(cors({  allowedHeaders: ['Authorization', 'Content-Type']
}));


// Simple request logger to help debug Swagger requests
// app.use((req, res, next) => {
//   console.log(`--> ${req.method} ${req.originalUrl}`);
//   if (Object.keys(req.body || {}).length) console.log('    body:', JSON.stringify(req.body));
//   next();
// });

// swaggerDocs(app);

const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const tableRoutes = require("./routes/tableRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

app.use("/api/menu-items", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/menu-categories", categoryRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);


// Improved error handler (shows stack in non-production)
app.use((err, req, res, next) => {

  console.error(err.stack);
  
  const status = err.status || 500;

  const payload = { message: err.message || 'Something broke!' };

  if (process.env.NODE_ENV !== 'production') payload.stack = err.stack;
  res.status(status).json(payload);
});

mongoose //Connecting to MongooDB using Mongose with added success and error handling.
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🍃 MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

menuWatcher(); // Start the menu change stream watcher