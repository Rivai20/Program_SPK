let currentSuppliers = [];
let currentKriteria = [];

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  event.target.classList.add('active');
  
  if (pageId === 'dashboard') loadDashboard();
  if (pageId === 'supplier') loadSuppliers();
  if (pageId === 'kriteria') loadKriteria();
  if (pageId === 'bobot') loadBobotForm();
}

async function loadDashboard() {
  try {
    const suppliers = await getSuppliers();
    const kriteria = await getKriteria();
    const saw = await hitungSAW();
    
    document.getElementById('total-supplier').textContent = suppliers.length;
    document.getElementById('total-kriteria').textContent = kriteria.length;
    document.getElementById('metode-terbaik').textContent = saw.ranked[0]?.nama || '-';
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

async function loadSuppliers() {
  try {
    currentSuppliers = await getSuppliers();
    const tbody = document.getElementById('supplier-tbody');
    tbody.innerHTML = currentSuppliers.map(s => `
      <tr>
        <td>${s.id}</td>
        <td>${s.kode}</td>
        <td>${s.nama}</td>
        <td>Rp ${s.harga.toLocaleString('id')}</td>
        <td>${s.cacat}%</td>
        <td>${s.waktu}%</td>
        <td>${s.jarak} km</td>
        <td>
          <button class="btn-edit" onclick="editSupplier(${s.id})">Edit</button>
          <button class="btn-delete" onclick="hapusSupplier(${s.id})">Hapus</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading suppliers:', error);
  }
}

async function loadKriteria() {
  try {
    currentKriteria = await getKriteria();
    const tbody = document.getElementById('kriteria-tbody');
    tbody.innerHTML = currentKriteria.map(k => `
      <tr>
        <td>${k.id}</td>
        <td>${k.kode}</td>
        <td>${k.nama}</td>
        <td><span class="chip ${k.sifat === 'cost' ? 'chip-cost' : 'chip-benefit'}">${k.sifat}</span></td>
        <td>${k.bobot_saw}%</td>
        <td>${k.bobot_smart}%</td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading kriteria:', error);
  }
}

function loadBobotForm() {
  const container = document.getElementById('bobot-form');
  container.innerHTML = currentKriteria.map((k, i) => `
    <div class="bobot-item">
      <label>${k.kode} - ${k.nama}</label>
      <div>
        <label style="margin-right: 10px;">SAW:</label>
        <input type="number" id="saw-${k.id}" value="${k.bobot_saw}" min="0" max="100">
      </div>
      <div>
        <label style="margin-right: 10px;">SMART:</label>
        <input type="number" id="smart-${k.id}" value="${k.bobot_smart}" min="0" max="100">
      </div>
    </div>
  `).join('');
}

async function saveBobot() {
  try {
    for (const k of currentKriteria) {
      const sawVal = parseInt(document.getElementById(`saw-${k.id}`).value) || 0;
      const smartVal = parseInt(document.getElementById(`smart-${k.id}`).value) || 0;
      await updateBobot(k.id, sawVal, smartVal);
    }
    alert('Bobot berhasil disimpan!');
    await loadKriteria();
  } catch (error) {
    alert('Gagal menyimpan bobot: ' + error.message);
  }
}

let editingSupplierId = null;

function openSupplierModal() {
  editingSupplierId = null;
  document.getElementById('modal-title').textContent = 'Tambah Supplier';
  document.getElementById('supplier-id').value = '';
  document.getElementById('supplier-kode').value = '';
  document.getElementById('supplier-nama').value = '';
  document.getElementById('supplier-harga').value = '';
  document.getElementById('supplier-cacat').value = '';
  document.getElementById('supplier-waktu').value = '';
  document.getElementById('supplier-jarak').value = '';
  document.getElementById('supplierModal').style.display = 'block';
}

function closeSupplierModal() {
  document.getElementById('supplierModal').style.display = 'none';
}

function editSupplier(id) {
  const supplier = currentSuppliers.find(s => s.id === id);
  if (supplier) {
    editingSupplierId = id;
    document.getElementById('modal-title').textContent = 'Edit Supplier';
    document.getElementById('supplier-id').value = supplier.id;
    document.getElementById('supplier-kode').value = supplier.kode;
    document.getElementById('supplier-nama').value = supplier.nama;
    document.getElementById('supplier-harga').value = supplier.harga;
    document.getElementById('supplier-cacat').value = supplier.cacat;
    document.getElementById('supplier-waktu').value = supplier.waktu;
    document.getElementById('supplier-jarak').value = supplier.jarak;
    document.getElementById('supplierModal').style.display = 'block';
  }
}

async function saveSupplier() {
  const data = {
    kode: document.getElementById('supplier-kode').value,
    nama: document.getElementById('supplier-nama').value,
    harga: parseFloat(document.getElementById('supplier-harga').value),
    cacat: parseFloat(document.getElementById('supplier-cacat').value),
    waktu: parseFloat(document.getElementById('supplier-waktu').value),
    jarak: parseFloat(document.getElementById('supplier-jarak').value)
  };
  
  try {
    if (editingSupplierId) {
      await updateSupplier(editingSupplierId, data);
    } else {
      await createSupplier(data);
    }
    closeSupplierModal();
    await loadSuppliers();
    alert('Data supplier berhasil disimpan!');
  } catch (error) {
    alert('Gagal menyimpan: ' + error.message);
  }
}

async function hapusSupplier(id) {
  if (confirm('Yakin ingin menghapus supplier ini?')) {
    try {
      await deleteSupplier(id);
      await loadSuppliers();
      alert('Supplier berhasil dihapus!');
    } catch (error) {
      alert('Gagal menghapus: ' + error.message);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadDashboard();
});