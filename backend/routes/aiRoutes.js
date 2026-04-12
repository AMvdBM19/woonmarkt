const express = require('express');
const router = express.Router();
const { improveDescription, aiSearch } = require('../controllers/aiController');

router.post('/improve-description', improveDescription);
router.post('/search', aiSearch);

module.exports = router;
