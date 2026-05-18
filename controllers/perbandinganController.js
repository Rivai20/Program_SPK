const MetodeSPK = require('../models/MetodeSPK');

exports.perbandingan = async (req, res) => {
  try {
    const saw = await MetodeSPK.hitungSAW();
    const smart = await MetodeSPK.hitungSMART();
    const profile = await MetodeSPK.hitungProfileMatching();
    const goal = await MetodeSPK.hitungGoalProgramming();
    
    const perbandingan = {
      saw: saw.ranked.map(r => ({ kode: r.kode, nama: r.nama, skor: r.skor, ranking: r.ranking })),
      smart: smart.ranked.map(r => ({ kode: r.kode, nama: r.nama, skor: r.skor, ranking: r.ranking })),
      profile: profile.map(r => ({ kode: r.kode, nama: r.nama, skor: r.skor, ranking: r.ranking })),
      goal: []
    };
    
    const goalRanked = goal.alloc;
    res.json({ success: true, data: perbandingan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};