```typescript
import sqlite3 from 'sqlite3';

let db: sqlite3.Database;

const initializeDB = () => {
  db = new sqlite3.Database('vacations.db', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to the SQLite database.');
      createTables();
    }
  });
};

const createTables = () => {
  const vacationsTable = `
    CREATE TABLE IF NOT EXISTS vacations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      startDate DATE,
      endDate DATE
    );
  `;

  db.run(vacationsTable, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Vacations table created.');
    }
  });
};

const getDB = () => db;

export { initializeDB, getDB };
```

Please note that this implementation assumes a basic setup for an SQLite database in a Node.js environment. You may need to adjust it according to your specific requirements.