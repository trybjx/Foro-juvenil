import express from "express";
import path from "path";

const app = express();

// Middleware para JSON y URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger simple para /api
app.use((req, res, next) => {
  const start = Date.now();
  const originalJson = res.json;
  res.json = function (body) {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms :: ${JSON.stringify(body)}`);
    }
    return originalJson.apply(res, arguments);
  };
  next();
});

// Endpoint de ejemplo
app.get("/api/hello", (req, res) => {
  res.json({ message: "Bienvenido a tu foro 🎯" });
});

// Servir frontend estático desde client/
app.use(express.static(path.join(process.cwd(), "client")));

// Catch-all para frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "client", "index.html"));
});

// Manejo de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
  console.error(err);
});

// Escuchar puerto dinámico en 0.0.0.0 para Render
const port = parseInt(process.env.PORT || "5000", 10);
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});