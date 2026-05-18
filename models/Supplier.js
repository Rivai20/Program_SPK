const db = require('../config/database');

class Supplier {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM suppliers ORDER BY id');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM suppliers WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { kode, nama, harga, cacat, waktu, jarak } = data;
    const [result] = await db.query(
      'INSERT INTO suppliers (kode, nama, harga, cacat, waktu, jarak) VALUES (?, ?, ?, ?, ?, ?)',
      [kode, nama, harga, cacat, waktu, jarak]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { kode, nama, harga, cacat, waktu, jarak } = data;
    const [result] = await db.query(
      'UPDATE suppliers SET kode = ?, nama = ?, harga = ?, cacat = ?, waktu = ?, jarak = ? WHERE id = ?',
      [kode, nama, harga, cacat, waktu, jarak, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM suppliers WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Supplier;