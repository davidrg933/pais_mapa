const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs"); // Añadimos esto para manejar archivos

// Ruta donde guardaremos la DB
const dbPath = process.env.DB_PATH || path.join(__dirname, "data.db");

// --- NUEVO: Crear el directorio si no existe ---
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
// -----------------------------------------------

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
