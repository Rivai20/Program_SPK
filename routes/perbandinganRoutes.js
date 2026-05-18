const express = require('express');
const router = express.Router();
const perbandinganController = require('../controllers/perbandinganController');

router.get('/', perbandinganController.perbandingan);

module.exports = router;