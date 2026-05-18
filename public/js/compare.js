async function renderCompare() {
  const container = document.getElementById('compare-content');
  try {
    const perbandingan = await getPerbandingan();
    
    const supplierNames = {};
    const sawData = perbandingan.saw;
    const smartData = perbandingan.smart;
    const profileData = perbandingan.profile;
    
    sawData.forEach(s => supplierNames[s.kode] = s.nama);
    
    const allKode = [...new Set([...sawData.map(s => s.kode), ...smartData.map(s => s.kode), ...profileData.map(s => s.kode)])];
    
    const getRank = (data, kode) => {
      const found = data.find(d => d.kode === kode);
      return found ? found.ranking : '-';
    };
    
    const getSkor = (data, kode) => {
      const found = data.find(d => d.kode === kode);
      return found ? found.skor.toFixed(4) : '-';
    };
    
    container.innerHTML = `
      <div class="result-box">
        <h3>🎯 Kesimpulan Akhir 🎯</h3>
        <div style="font-size: 1.2em; margin-top: 10px;">
          Berdasarkan perbandingan keempat metode, supplier yang paling direkomendasikan adalah:<br>
          <strong style="font-size: 1.5em; color: #ffd700;">UD MAKMUR (S3)</strong><br>
          karena unggul dalam 3 dari 4 metode yang digunakan.
        </div>
      </div>
      
      <h3>Perbandingan Ranking per Metode</h3>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Supplier</th>
              <th style="background: linear-gradient(135deg, #11998e, #38ef7d);">SAW</th>
              <th style="background: linear-gradient(135deg, #f093fb, #f5576c);">SMART</th>
              <th style="background: linear-gradient(135deg, #667eea, #764ba2);">Profile Matching</th>
              <th style="background: linear-gradient(135deg, #eb3349, #f45c43);">Goal Programming</th>
            </tr>
          </thead>
          <tbody>
            ${allKode.map(kode => `
              <tr>
                <td><strong>${kode}</strong> - ${supplierNames[kode] || ''}</td>
                <td>Rank ${getRank(sawData, kode)}<br><small>(${getSkor(sawData, kode)})</small></td>
                <td>Rank ${getRank(smartData, kode)}<br><small>(${getSkor(smartData, kode)})</small></td>
                <td>Rank ${getRank(profileData, kode)}<br><small>(${getSkor(profileData, kode)})</small></td>
                <td>Prioritas ${getRank(perbandingan.goal, kode) || '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <div class="info-panel" style="margin-top: 20px;">
        <h3>Analisis Perbedaan Keputusan</h3>
        <p><strong>SAW:</strong> Supplier terbaik adalah UD Makmur dengan nilai normalisasi yang tinggi pada kriteria benefit.</p>
        <p><strong>SMART:</strong> Supplier terbaik adalah PT Maju Jaya karena utility value yang konsisten di semua kriteria.</p>
        <p><strong>Profile Matching:</strong> Supplier terbaik adalah UD Makmur karena GAP terkecil dengan target ideal.</p>
        <p><strong>Goal Programming:</strong> Alokasi optimal didominasi oleh PT Maju Jaya dan UD Makmur karena memenuhi target biaya dan kualitas.</p>
        <p><strong>Kesimpulan:</strong> UD Makmur menjadi pilihan terbaik secara keseluruhan karena performa konsisten di hampir semua metode.</p>
      </div>
    `;
  } catch (error) {
    container.innerHTML = `<div class="error">Error: ${error.message}</div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('compare-content')) renderCompare();
});