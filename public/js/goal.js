async function renderGoal() {
  const container = document.getElementById('goal-content');
  try {
    const result = await hitungGoal();
    
    container.innerHTML = `
      <div class="result-box">
        <h3>📊 Goal Programming - Alokasi Optimal</h3>
        <div>Total Unit: ${result.totalUnit.toLocaleString('id')} unit</div>
        <div>Total Biaya: Rp ${result.totalBiaya.toLocaleString('id')}</div>
        <div>Rata-rata Cacat: ${result.avgCacat.toFixed(3)}%</div>
        <div>Rata-rata Tepat Waktu: ${result.avgWaktu.toFixed(2)}%</div>
      </div>
      
      <h3>Alokasi Pembelian per Supplier</h3>
      <div class="table-container">
        <table>
          <thead><tr><th>Supplier</th><th>Alokasi (unit)</th><th>Persentase</th></tr></thead>
          <tbody>
            ${Object.entries(result.alloc).map(([kode, jumlah]) => {
              const pct = result.totalUnit > 0 ? (jumlah / result.totalUnit * 100) : 0;
              return `
                <tr>
                  <td>${kode}</td>
                  <td>${jumlah.toLocaleString('id')}</td>
                  <td>
                    <div class="score-bar">
                      <div class="score-fill" style="width: ${pct}%">${pct.toFixed(1)}%</div>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
      
      <div class="info-panel" style="margin-top: 20px;">
        <h3>Target Goal Programming</h3>
        <p>Total Kebutuhan: ${result.targets.totalUnit.toLocaleString('id')} unit</p>
        <p>Anggaran Maks: Rp ${result.targets.maxBiaya.toLocaleString('id')}</p>
        <p>Cacat Maks: ${result.targets.maxCacat}%</p>
        <p>Tepat Waktu Min: ${result.targets.minWaktu}%</p>
      </div>
    `;
  } catch (error) {
    container.innerHTML = `<div class="error">Error: ${error.message}</div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('goal-content')) renderGoal();
});