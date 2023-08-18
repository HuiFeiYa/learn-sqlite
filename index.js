const db = require('better-sqlite3')('shop.db', { verbose: console.log });

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT UNIQUE,
    birthdate DATE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

db.exec(createTableQuery); // 执行创建表的SQL语句

