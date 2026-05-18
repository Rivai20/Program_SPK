const express = require('express');
const router = express.Router();
const metodeController = require('../controllers/metodeController');

router.get('/saw', metodeController.hitungSAW);
router.get('/smart', metodeController.hitungSMART);
router.get('/profile', metodeController.hitungProfileMatching);
router.get('/goal', metodeController.hitungGoalProgramming);

module.exports = router;