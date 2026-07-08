const Database = require('better-sqlite3');
const path = require('path');

// El archivo data.db se crea automáticamente la primera vez que arranca el servidor.
// Ahí es donde vive TODA tu información, de forma persistente.
const db = new Database(path.join(__dirname, 'data.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS countries (
    code TEXT PRIMARY KEY,      -- código numérico ISO del país (viene del mapa)
    name TEXT,                  -- nombre del país
    note TEXT,                  -- tu texto libre / nota
    updated_at TEXT             -- última vez que se editó
  )
`);

module.exports = db;
