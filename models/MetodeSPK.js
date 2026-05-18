const db = require('../config/database');

class MetodeSPK {
  static async hitungSAW() {
    const suppliers = await db.query('SELECT * FROM suppliers');
    const kriteria = await db.query('SELECT * FROM kriteria');
    
    const values = suppliers[0].map(s => [s.harga, s.cacat, s.waktu, s.jarak]);
    const mins = [];
    const maxs = [];
    
    for (let j = 0; j < 4; j++) {
      let minVal = Math.min(...values.map(r => r[j]));
      let maxVal = Math.max(...values.map(r => r[j]));
      mins.push(minVal);
      maxs.push(maxVal);
    }
    
    const R = values.map(row => row.map((x, j) => {
      const sifat = kriteria[0][j].sifat;
      if (sifat === 'cost') return mins[j] / x;
      return x / maxs[j];
    }));
    
    const W = kriteria[0].map(k => k.bobot_saw);
    const V = R.map(row => row.reduce((s, r, j) => s + W[j] * r, 0));
    
    const ranked = suppliers[0].map((s, i) => ({
      ...s,
      skor: V[i],
      ranking: i + 1
    })).sort((a, b) => b.skor - a.skor);
    
    ranked.forEach((r, idx) => r.ranking = idx + 1);
    
    return { R, V, ranked };
  }

  static async hitungSMART() {
    const suppliers = await db.query('SELECT * FROM suppliers');
    const kriteria = await db.query('SELECT * FROM kriteria');
    
    const values = suppliers[0].map(s => [s.harga, s.cacat, s.waktu, s.jarak]);
    const mins = [];
    const maxs = [];
    
    for (let j = 0; j < 4; j++) {
      let minVal = Math.min(...values.map(r => r[j]));
      let maxVal = Math.max(...values.map(r => r[j]));
      mins.push(minVal);
      maxs.push(maxVal);
    }
    
    const totalW = kriteria[0].reduce((s, k) => s + k.bobot_smart, 0);
    const W = kriteria[0].map(k => k.bobot_smart / totalW);
    
    const U = values.map(row => row.map((x, j) => {
      if (maxs[j] === mins[j]) return 1;
      const sifat = kriteria[0][j].sifat;
      if (sifat === 'cost') return (maxs[j] - x) / (maxs[j] - mins[j]);
      return (x - mins[j]) / (maxs[j] - mins[j]);
    }));
    
    const scores = U.map(row => row.reduce((s, u, j) => s + W[j] * u, 0));
    
    const ranked = suppliers[0].map((s, i) => ({
      ...s,
      skor: scores[i],
      ranking: i + 1
    })).sort((a, b) => b.skor - a.skor);
    
    ranked.forEach((r, idx) => r.ranking = idx + 1);
    
    return { U, scores, ranked };
  }

  static async hitungProfileMatching() {
    const suppliers = await db.query('SELECT * FROM suppliers');
    
    const pmFactors = [
      { target: 2, tipe: 'core' }, { target: 4, tipe: 'core' },
      { target: 3, tipe: 'secondary' }, { target: 3, tipe: 'secondary' },
      { target: 95, tipe: 'core' }, { target: 4, tipe: 'core' },
      { target: 4, tipe: 'secondary' }, { target: 3, tipe: 'secondary' },
      { target: 5, tipe: 'core' }, { target: 4, tipe: 'core' },
      { target: 4, tipe: 'secondary' }, { target: 3, tipe: 'secondary' }
    ];
    
    const pmValues = {
      'S1': [4,3,4,3,98,4,4,3,4,3,4,3],
      'S2': [3,2,3,3,92,3,3,3,3,4,3,4],
      'S3': [5,4,4,3,96,4,4,4,5,3,4,3],
      'S4': [4,3,3,3,97,5,4,4,4,4,3,3],
      'S5': [4,3,4,4,94,3,3,3,3,3,4,4]
    };
    
    const convertGap = (gap) => {
      const a = Math.abs(gap);
      if (a === 0) return 5.0;
      if (a === 1) return 4.5;
      if (a === 2) return 3.5;
      if (a === 3) return 2.5;
      if (a === 4) return 1.5;
      return 0.5;
    };
    
    const results = suppliers[0].map(s => {
      const vals = pmValues[s.kode];
      if (!vals) return null;
      const gaps = vals.map((v, i) => v - pmFactors[i].target);
      const bobot = gaps.map(g => convertGap(g));
      
      const aspekScores = [
        (bobot[0] * 0.6 + bobot[1] * 0.4) * 0.35 + (bobot[2] * 0.6 + bobot[3] * 0.4) * 0.35 + (bobot[4] * 0.65 + bobot[5] * 0.35) * 0.3,
        (bobot[4] * 0.7 + bobot[5] * 0.3) * 0.35 + (bobot[6] * 0.7 + bobot[7] * 0.3) * 0.35 + (bobot[8] * 0.65 + bobot[9] * 0.35) * 0.3,
        (bobot[8] * 0.65 + bobot[9] * 0.35) * 0.35 + (bobot[10] * 0.65 + bobot[11] * 0.35) * 0.35
      ];
      
      const total = aspekScores[0] + aspekScores[1] + aspekScores[2];
      return { ...s, skor: total, gaps, bobot, aspekScores };
    }).filter(Boolean).sort((a, b) => b.skor - a.skor);
    
    results.forEach((r, idx) => r.ranking = idx + 1);
    return results;
  }

  static async hitungGoalProgramming() {
    const suppliers = await db.query('SELECT * FROM suppliers');
    const targets = { totalUnit: 10000, maxBiaya: 500000000, maxCacat: 2.0, minWaktu: 95 };
    const kapasitas = { 'S1': 4000, 'S2': 3500, 'S3': 5000, 'S4': 3000, 'S5': 4500 };
    
    const sorted = [...suppliers[0]].sort((a, b) => a.harga - b.harga);
    let alloc = {};
    let remaining = targets.totalUnit;
    
    sorted.forEach(s => {
      const kap = kapasitas[s.kode] || 0;
      const take = Math.min(kap, remaining);
      alloc[s.kode] = take;
      remaining -= take;
      if (remaining <= 0) remaining = 0;
    });
    
    let totalBiaya = 0, totalCacat = 0, totalWaktu = 0, totalUnit = 0;
    suppliers[0].forEach(s => {
      const u = alloc[s.kode] || 0;
      totalBiaya += u * s.harga;
      totalCacat += u * s.cacat;
      totalWaktu += u * s.waktu;
      totalUnit += u;
    });
    
    const avgCacat = totalUnit > 0 ? totalCacat / totalUnit : 0;
    const avgWaktu = totalUnit > 0 ? totalWaktu / totalUnit : 0;
    
    return { alloc, totalBiaya, avgCacat, avgWaktu, totalUnit, targets, kapasitas };
  }
}

module.exports = MetodeSPK;