const db = require('better-sqlite3')('shop.db', { verbose: console.log });
const insertDataQuery = `
  INSERT INTO users (username, email, birthdate) VALUES (?, ?, ?);
`;

const insertDataStmt = db.prepare(insertDataQuery);

const userData = {
  username: 'john_doe',
  email: 'john@example.com',
  birthdate: '1990-05-15'
};

insertDataStmt.run(userData.username, userData.email, userData.birthdate);
db.close(); // 关闭数据库连接
