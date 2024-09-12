import { db } from './db/users.db';

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

class UserService {
  async registerUser(username: string, password: string, email: string): Promise<User> {
    const INSERT_USER_SQL = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;
    const params = [username, password, email];
    return new Promise((resolve, reject) => {
      db.run(INSERT_USER_SQL, params, function(err) {
        if (err) {
          reject(err);
        } else {
          const userId = this.lastID;
          resolve({ id: userId, username, password, email });
        }
      });
    });
  }

  async loginUser(username: string, password: string): Promise<User | null> {
    const SELECT_USER_SQL = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const params = [username, password];
    return new Promise((resolve, reject) => {
      db.get(SELECT_USER_SQL, params, (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          resolve(row);
        } else {
          resolve(null);
        }
      });
    });
  }
}

const userService = new UserService();

export { userService };