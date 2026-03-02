// const express = require('express');
// const router = express.Router();
// const { getGlobal } = require('../controllers/leaderboardController');

// router.get('/', getGlobal);

// module.exports = router;


//next acc claude code
const express = require("express");
const router = express.Router();
const { getGlobal } = require("../controllers/leaderboardController");
const authOptional = require("../middlewares/authOptional");

// Optional auth — works for guests too, but returns myRank if logged in
router.get("/", authOptional, getGlobal);

module.exports = router;