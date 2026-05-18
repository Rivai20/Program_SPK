async function renderProfile() {
  const container = document.getElementById('profile-content');
  try {
    const results = await hitungProfile();
    
    container.innerHTML = `
      <div class="result-box">
        <h3>🏆 Supplier Terbaik (Profile Matching) 🏆</h3>
        <div class="stat-value" style="font-size: 1.8em;">${results[0].nama}</div>
        <div>Skor: ${results[0].skor.toFixed(4)}</div>
      </div>
      
      <h3>Hasil Perankingan</h3>
      <div class="table-container">
        <table class="ranking-table">
          <thead><tr><th>Ranking</th><th>Kode</th><th>Nama Supplier</th><th>Skor Akhir</th></tr></thead>
          <tbody>
            ${results.map((r, idx) => `
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
  if (document.getElementById('profile-content')) renderProfile();
});