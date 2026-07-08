const Database = require("better-sqlite3");
const path = require("path");

// Usamos process.env.DB_PATH si existe (para Render),
// si no, usamos la ruta local (para tu desarrollo en local)
const dbPath = process.env.DB_PATH || path.join(__dirname, "data.db");

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS countries (
    code TEXT PRIMARY KEY,
    name TEXT,
    note TEXT,
    updated_at TEXT
  )
`);

module.exports = db;
