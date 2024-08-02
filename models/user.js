const db = require('../db');

class User {
  static async findByGoogleId(googleId) {
    const [rows] = await db.query('SELECT * FROM users WHERE googleId = ?', [googleId]);
    return rows[0];
  }

  static async create(googleId, email, name) {
    const [result] = await db.query(
      'INSERT INTO users (googleId, email, name) VALUES (?, ?, ?)',
      [googleId, email, name]
    );
    return { id: result.insertId, googleId, email, name };
  }
}

module.exports = User;
