const express = require('express');
const router = express.Router();
const feedback = require('../controller/feedback.controller')
const paginate = require('../middleware/paginate.middleware')
const feedbackModel = require('../model/feedback.model');

router.post('/' , feedback.sendFeedback);
router.get('/' , paginate(feedbackModel), feedback.getFeedback);

module.exports = router;