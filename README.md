# Mi mapa de países

Proyecto base: mapa mundial interactivo donde puedes hacer clic en cualquier país
y guardar una nota de texto libre sobre él. Los datos se guardan en una base de
datos real (SQLite) en el backend, así que persisten aunque cierres el navegador
o cambies de dispositivo (una vez lo despliegues en un servidor).

## Estructura

```
pais-mapa/
├── backend/     -> API en Node.js + Express + SQLite
└── frontend/    -> App en React + Vite + react-simple-maps
```

## Cómo arrancarlo en local

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Esto levanta la API en `http://localhost:4000`. La primera vez creará
automáticamente el archivo `data.db` (tu base de datos).

### 2. Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite te dará una URL (normalmente `http://localhost:5173`). Ábrela en el navegador.

## Cómo funciona

- El mapa se pinta con `react-simple-maps`, usando datos geográficos públicos
  (world-atlas) que se cargan desde un CDN — no necesitas descargar ningún
  archivo de mapa a mano.
- Al hacer clic en un país, se abre un panel lateral donde escribes tu nota.
- Al pulsar "Guardar", el frontend llama a `PUT /api/countries/:code` en el
  backend, que guarda (o actualiza) la fila correspondiente en SQLite.
- Los países que ya tienen una nota se pintan en azul en el mapa.

## Próximos pasos que puedes añadir tú mismo

- **Autenticación**: si quieres que cada usuario tenga sus propias notas,
  añade login (por ejemplo con JWT) y una columna `user_id` en la tabla.
- **Campos estructurados**: además del texto libre, podrías añadir columnas
  como `visitado` (boolean), `valoracion` (1-5), `fecha_visita`, etc.
- **Subir imágenes**: guardar fotos asociadas a cada país (necesitarías
  almacenamiento de archivos, por ejemplo con `multer` + una carpeta `uploads/`).
- **Desplegar**: el backend puede ir en Render/Railway/Fly.io (con SQLite o
  migrando a PostgreSQL), y el frontend en Vercel/Netlify.
