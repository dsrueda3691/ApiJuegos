const express = require("express");
const app = express();
const port = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Cargar juegos desde el archivo JSON
const juegos = require("./juegos.json");

// Ruta para obtener todos los juegos
app.get("/juegos", (req, res) => {
  res.json(juegos); // Devuelve todos los juegos como JSON
});

// Ruta para obtener un juego por ID
app.get("/juegos/:id", (req, res) => {
  // Buscar el juego por ID
  const juego = juegos.find((j) => j.id === parseInt(req.params.id));

  // Si el juego no existe, devuelve un error 404
  if (!juego) {
    return res.status(404).send({ mensaje: "Juego no encontrado" });
  }

  // Devuelve el juego encontrado
  res.json(juego);
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`API ejecutándose en http://localhost:${port}/juegos/`);
});
