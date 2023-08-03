const Database = require('better-sqlite3');
const db = new Database('foobar.db', { verbose: console.log });
// const stmt = db.prepare('SELECT id, age FROM users');
const insert = db.prepare(`INSERT INTO Persons (LastName,FirstName)
VALUES (@LastName, @FirstName)`);

const insertMany = db.transaction((cats) => {
    for (const cat of cats) insert.run(cat);
  });
  
  insertMany([
    { LastName: 'Joey', FirstName: '2' },
    { LastName: 'Sally', FirstName: '4' },
    { LastName: 'Junior', FirstName: '1' },
  ]);