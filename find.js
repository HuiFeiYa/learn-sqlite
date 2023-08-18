const db = require('better-sqlite3')('shop.db', { verbose: console.log });
const data = db.prepare(`
SELECT * FROM users;
`)
console.log('data',data)