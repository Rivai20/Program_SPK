async function renderSMART() {
  const container = document.getElementById('smart-content');
  try {
    const result = await hitungSMART();
    
    container.innerHTML = `
      <div class="result-box">
        <h3>🏆 Supplier Terbaik (SMART) 🏆</h3>
        <div class="stat-value" style="font-size: 1.8em;">${result.ranked[0].nama}</div>
        <div>Skor: ${result.ranked[0].skor.toFixed(4)}</div>
      </div>
      
      <h3>Nilai Utility</h3>
      <div class="table-container">
        <table>
          <thead>
            <tr><th>Supplier</th><th>C1 (Harga)</th><th>C2 (Cacat)</th><th>C3 (Waktu)</th><th>C4 (Jarak)</th></tr>
          </thead>
          <tbody>
            ${result.U.map((row, i) => `
              <tr>
                <td>${result.ranked.find(r => r.id === i+1)?.kode || '-'}</td>
                ${row.map(u => `<td>${u.toFixed(4)}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <h3>Hasil Perankingan</h3>
      <div class="table-container">
        <table class="ranking-table">
          <thead><tr><th>Ranking</th><th>Kode</th><th>Nama Supplier</th><th>Skor Akhir</th></tr></thead>
          <tbody>
            ${result.ranked.map((r, idx) => `
              <tr class="${idx === 0 ? 'rank-1' : ''}">
                <td><strong>${idx + 1}</strong></td>
                <td>${r.kode}</td>
                <td>${r.nama}</td>
                <td>${r.skor.toFixed(4)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (error) {
    container.innerHTML = `<div class="error">Error: ${error.message}</div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('smart-content')) renderSMART();
});