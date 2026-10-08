# API de Juegos 🎮

API REST simple construida con **Express.js** para gestionar un catálogo de juegos. Los datos se almacenan en un archivo JSON (`juegos.json`).

## Descripción

CRUD completo de juegos: listar, obtener por ID, crear, actualizar y eliminar. Ideal como proyecto de aprendizaje de APIs REST con Node.js.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/juegos` | Obtener todos los juegos |
| `GET` | `/juegos/:id` | Obtener un juego por ID |
| `POST` | `/juegos` | Crear un nuevo juego |
| `PUT` | `/juegos/:id` | Actualizar un juego |
| `DELETE` | `/juegos/:id` | Eliminar un juego |

## Tecnologías

- Node.js
- Express 5
- CORS
- Almacenamiento en archivo JSON

## Cómo ejecutarlo

```bash
npm install
node index.js
```

La API quedará disponible en: `http://localhost:3000`

### Ejemplo de uso

```bash
# Listar juegos
curl http://localhost:3000/juegos

# Crear un juego
curl -X POST http://localhost:3000/juegos \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Celeste", "genero": "Plataformas"}'
```

## Estructura

```
index.js          # Servidor y rutas
juegos.json       # Base de datos en archivo
package.json
```

> **Nota:** El directorio `node_modules` no debería estar en el repositorio. Agrégalo a `.gitignore` si aún no lo está.

## Autor

Daniel Rueda — [GitHub](https://github.com/dsrueda3691)
