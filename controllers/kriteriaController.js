const Kriteria = require('../models/Kriteria');

exports.getAllKriteria = async (req, res) => {
  try {
    const kriteria = await Kriteria.getAll();
    res.json({ success: true, data: kriteria });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBobot = async (req, res) => {
  try {
    const { bobot_saw, bobot_smart } = req.body;
    const affected = await Kriteria.updateBobot(req.params.id, bobot_saw, bobot_smart);
    if (affected > 0) {
      res.json({ success: true, message: 'Bobot berhasil diupdate' });
    } else {
      res.status(404).json({ success: false, message: 'Kriteria tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};