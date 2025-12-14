const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const qCtrl = require('../controllers/questionController');

router.post('/', auth, qCtrl.uploadQuestion);
router.get('/', qCtrl.getByCompanyRole);
router.post('/:id/upvote', auth, qCtrl.upvote);

module.exports = router;
