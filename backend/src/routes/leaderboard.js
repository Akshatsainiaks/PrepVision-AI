const express = require('express');
const router = express.Router();
const { getGlobal } = require('../controllers/leaderboardController');

router.get('/', getGlobal);

module.exports = router;
