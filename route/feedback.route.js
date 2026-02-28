const express = require('express');
const router = express.Router();
const feedback = require('../controller/feedback.controller')

router.post('/' , feedback.sendFeedback);
router.get('/' , feedback.getFeedback);

module.exports = router;