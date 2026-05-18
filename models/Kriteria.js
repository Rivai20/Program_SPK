const db = require('../config/database');

class Kriteria {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM kriteria ORDER BY id');
    return rows;
  }

  static async updateBobot(id, bobotSAW, bobotSMART) {
    const [result] = await db.query(
      'UPDATE kriteria SET bobot_saw = ?, bobot_smart = ? WHERE id = ?',
      [bobotSAW, bobotSMART, id]
    );
    return result.affectedRows;
  }

  static async getBobotSAW() {
    const [rows] = await db.query('SELECT kode, bobot_saw FROM kriteria');
    return rows;
  }

  static async getBobotSMART() {
    const [rows] = await db.query('SELECT kode, bobot_smart FROM kriteria');
    return rows;
  }
}

module.exports = Kriteria;