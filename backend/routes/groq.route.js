const express = require('express');
const router = express.Router();
const {askWorkoTn } = require('../controllers/Groq.controller');

router.post('/ask-workoTn', askWorkoTn);

module.exports = router;