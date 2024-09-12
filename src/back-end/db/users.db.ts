import sqlite3 from 'sqlite3';

const dbFilePath = './users.db';

const db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log(`Connected to the SQLite database: ${dbFilePath}`);
    createTablesIfNotExists();
  }
});

const createTablesIfNotExists = () => {
  const createUserTableSql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      email TEXT NOT NULL
    );
  `;
  db.run(createUserTableSql, (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    }
  });
};

export { db };