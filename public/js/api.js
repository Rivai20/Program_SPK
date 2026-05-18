const API_BASE = 'http://localhost:3000/api';

async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

async function getSuppliers() {
  return apiCall('/supplier');
}

async function createSupplier(data) {
  return apiCall('/supplier', { method: 'POST', body: JSON.stringify(data) });
}

async function updateSupplier(id, data) {
  return apiCall(`/supplier/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

async function deleteSupplier(id) {
  return apiCall(`/supplier/${id}`, { method: 'DELETE' });
}

async function getKriteria() {
  return apiCall('/kriteria');
}

async function updateBobot(id, bobot_saw, bobot_smart) {
  return apiCall(`/kriteria/${id}`, { method: 'PUT', body: JSON.stringify({ bobot_saw, bobot_smart }) });
}

async function hitungSAW() {
  return apiCall('/metode/saw');
}

async function hitungSMART() {
  return apiCall('/metode/smart');
}

async function hitungProfile() {
  return apiCall('/metode/profile');
}

async function hitungGoal() {
  return apiCall('/metode/goal');
}

async function getPerbandingan() {
  return apiCall('/perbandingan');
}