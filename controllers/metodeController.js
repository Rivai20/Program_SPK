const MetodeSPK = require('../models/MetodeSPK');

exports.hitungSAW = async (req, res) => {
  try {
    const result = await MetodeSPK.hitungSAW();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.hitungSMART = async (req, res) => {
  try {
    const result = await MetodeSPK.hitungSMART();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.hitungProfileMatching = async (req, res) => {
  try {
    const result = await MetodeSPK.hitungProfileMatching();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.hitungGoalProgramming = async (req, res) => {
  try {
    const result = await MetodeSPK.hitungGoalProgramming();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};