const express = require('express');
const router = express.Router();
const kriteriaController = require('../controllers/kriteriaController');

router.get('/', kriteriaController.getAllKriteria);
router.put('/:id', kriteriaController.updateBobot);

module.exports = router;