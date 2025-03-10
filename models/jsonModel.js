const Database = require('better-sqlite3');
const db = new Database('./database/appJson.db');
const jsonModel = {};

try {
    db.exec(`
        CREATE TABLE IF NOT EXISTS json (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT UNIQUE,
            data TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME
        )
    `);
} catch (error) {
    console.error(error.message);
}

jsonModel.insertJson = async (description, data) => {
    const stmt = db.prepare('INSERT INTO json (description, data) VALUES (?, ?)');
    const info = stmt.run(description, data);
    return info.changes > 0;
};

jsonModel.getJson = async (id) => {
    const stmt = db.prepare(`SELECT data FROM json WHERE id = ?`);    
    return stmt.all(id);
};

jsonModel.updateJson = async (id, data) => {
    const stmt = db.prepare(`UPDATE json SET data = ? WHERE id = ?`);
    const info = stmt.run(data, id)
    return info.changes > 0;
};

jsonModel.getAll = async () => {
    const stmt = db.prepare(`SELECT id, description FROM json`);
    return stmt.all();
}

module.exports = jsonModel;