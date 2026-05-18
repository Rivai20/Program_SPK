const Supplier = require('../models/Supplier');

exports.getAllSupplier = async (req, res) => {
  try {
    const suppliers = await Supplier.getAll();
    res.json({ success: true, data: suppliers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.getById(req.params.id);
    if (supplier) {
      res.json({ success: true, data: supplier });
    } else {
      res.status(404).json({ success: false, message: 'Supplier tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createSupplier = async (req, res) => {
  try {
    const id = await Supplier.create(req.body);
    res.json({ success: true, data: { id, ...req.body } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const affected = await Supplier.update(req.params.id, req.body);
    if (affected > 0) {
      res.json({ success: true, message: 'Supplier berhasil diupdate' });
    } else {
      res.status(404).json({ success: false, message: 'Supplier tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    const affected = await Supplier.delete(req.params.id);
    if (affected > 0) {
      res.json({ success: true, message: 'Supplier berhasil dihapus' });
    } else {
      res.status(404).json({ success: false, message: 'Supplier tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};