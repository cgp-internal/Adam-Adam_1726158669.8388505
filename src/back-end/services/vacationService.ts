import { getDB } from '../db/vacations.db';

let db: any;

const initializeDBConnection = async () => {
  await import('../db/vacations.db').then((mod) => {
    mod.initializeDB();
    db = mod.getDB();
  });
};

const createVacation = async (title: string, description: string, startDate: Date, endDate: Date) => {
  await initializeDBConnection();
  const stmt = db.prepare('INSERT INTO vacations (title, description, startDate, endDate) VALUES (?, ?, ?, ?)');
  const result = stmt.run(title, description, startDate, endDate);
  return result.lastID;
};

const getVacations = async () => {
  await initializeDBConnection();
  const stmt = db.prepare('SELECT * FROM vacations');
  const result = stmt.all();
  return result;
};

const getVacation = async (id: number) => {
  await initializeDBConnection();
  const stmt = db.prepare('SELECT * FROM vacations WHERE id = ?');
  const result = stmt.get(id);
  return result;
};

const updateVacation = async (id: number, title: string, description: string, startDate: Date, endDate: Date) => {
  await initializeDBConnection();
  const stmt = db.prepare('UPDATE vacations SET title = ?, description = ?, startDate = ?, endDate = ? WHERE id = ?');
  const result = stmt.run(title, description, startDate, endDate, id);
  return result.changes;
};

const deleteVacation = async (id: number) => {
  await initializeDBConnection();
  const stmt = db.prepare('DELETE FROM vacations WHERE id = ?');
  const result = stmt.run(id);
  return result.changes;
};

export { createVacation, getVacations, getVacation, updateVacation, deleteVacation };