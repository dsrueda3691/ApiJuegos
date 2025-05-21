const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, 'juegos.json');

// Helper para leer los juegos del archivo JSON
const readJuegos = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo de juegos:', error);
        return [];
    }
};

// Helper para escribir los juegos en el archivo JSON
const writeJuegos = (juegos) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(juegos, null, 2), 'utf8');
    } catch (error) {
        console.error('Error al escribir el archivo de juegos:', error);
    }
};

// Rutas de la API

// Obtener todos los juegos (GET)
app.get('/juegos', (req, res) => {
    const juegos = readJuegos();
    res.json(juegos);
});

// Obtener un juego por ID (GET)
app.get('/juegos/:id', (req, res) => {
    const juegos = readJuegos();
    const idJuego = parseInt(req.params.id);
    const juego = juegos.find(j => j.id === idJuego);

    if (juego) {
        res.json(juego);
    } else {
        res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
});

// Crear un nuevo juego (POST)
app.post('/juegos', (req, res) => {
    const juegos = readJuegos();
    const nuevoJuego = req.body;

    // Asignar un nuevo ID (simple, para entornos de desarrollo)
    const newId = juegos.length > 0 ? Math.max(...juegos.map(j => j.id)) + 1 : 1;
    nuevoJuego.id = newId;

    juegos.push(nuevoJuego);
    writeJuegos(juegos);
    res.status(201).json(nuevoJuego);
});

// Actualizar un juego existente (PUT)
app.put('/juegos/:id', (req, res) => {
    let juegos = readJuegos();
    const idJuego = parseInt(req.params.id);
    const datosActualizados = req.body;

    let juegoEncontrado = false;
    juegos = juegos.map(juego => {
        if (juego.id === idJuego) {
            juegoEncontrado = true;
            // Aseguramos que el ID no cambie si se envía en el body
            return { ...juego, ...datosActualizados, id: juego.id };
        }
        return juego;
    });

    if (!juegoEncontrado) {
        return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }

    writeJuegos(juegos);
    res.json({ mensaje: 'Juego actualizado correctamente' });
});

// Eliminar un juego (DELETE)
app.delete('/juegos/:id', (req, res) => {
    let juegos = readJuegos();
    const idJuego = parseInt(req.params.id);

    const initialLength = juegos.length;
    juegos = juegos.filter(juego => juego.id !== idJuego);

    if (juegos.length === initialLength) {
        return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }

    writeJuegos(juegos);
    res.json({ mensaje: 'Juego eliminado correctamente' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API de juegos Ejecutandose en http://localhost:${port}`);
});