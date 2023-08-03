const db = require('better-sqlite3')('foobar.db', { verbose: console.log });

const row = db.prepare('SELECT * FROM users WHERE id = ?').get(1);
console.log(row);