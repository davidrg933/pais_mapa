const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Obtener todas las notas guardadas (para pintar el mapa con colores)
app.get('/api/countries', (req, res) => {
  const rows = db.prepare('SELECT * FROM countries').all();
  res.json(rows);
});

// Obtener la nota de un país concreto
app.get('/api/countries/:code', (req, res) => {
  const row = db.prepare('SELECT * FROM countries WHERE code = ?').get(req.params.code);
  res.json(row || null);
});

// Crear o actualizar la nota de un país (upsert)
app.put('/api/countries/:code', (req, res) => {
  const { code } = req.params;
  const { name, note } = req.body;
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO countries (code, name, note, updated_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(code) DO UPDATE SET
      name = excluded.name,
      note = excluded.note,
      updated_at = excluded.updated_at
  `).run(code, name, note, now);

  res.json({ code, name, note, updated_at: now });
});

// Borrar la nota de un país
app.delete('/api/countries/:code', (req, res) => {
  db.prepare('DELETE FROM countries WHERE code = ?').run(req.params.code);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend escuchando en http://localhost:${PORT}`));
