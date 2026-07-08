const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db"); // Asegúrate de que db.js use module.exports

const app = express();

app.use(cors());
app.use(express.json());

// 1. Servir archivos estáticos del frontend
// Ajusta la ruta si es necesario para llegar a tu carpeta 'dist'
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// --- TUS RUTAS DE API ---
app.get("/api/countries", (req, res) => {
  const rows = db.prepare("SELECT * FROM countries").all();
  res.json(rows);
});

app.get("/api/countries/:code", (req, res) => {
  const row = db
    .prepare("SELECT * FROM countries WHERE code = ?")
    .get(req.params.code);
  res.json(row || null);
});

app.put("/api/countries/:code", (req, res) => {
  const { code } = req.params;
  const { name, note } = req.body;
  const now = new Date().toISOString();

  db.prepare(
    `
    INSERT INTO countries (code, name, note, updated_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(code) DO UPDATE SET
      name = excluded.name,
      note = excluded.note,
      updated_at = excluded.updated_at
  `,
  ).run(code, name, note, now);

  res.json({ code, name, note, updated_at: now });
});

app.delete("/api/countries/:code", (req, res) => {
  db.prepare("DELETE FROM countries WHERE code = ?").run(req.params.code);
  res.json({ ok: true });
});

// 2. Catch-all para React (debe ir al final)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Backend escuchando en http://localhost:${PORT}`),
);
