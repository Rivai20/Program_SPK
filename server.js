const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const supplierRoutes = require('./routes/supplierRoutes');
const kriteriaRoutes = require('./routes/kriteriaRoutes');
const metodeRoutes = require('./routes/metodeRoutes');
const perbandinganRoutes = require('./routes/perbandinganRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/supplier', supplierRoutes);
app.use('/api/kriteria', kriteriaRoutes);
app.use('/api/metode', metodeRoutes);
app.use('/api/perbandingan', perbandinganRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});