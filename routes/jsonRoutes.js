const express = require('express');
const router = express.Router();
const jsonController = require('../controllers/jsonController');

router.get('/real', jsonController.getAll);
router.get('/real/:id', jsonController.getJson);
router.post('/real/insert', jsonController.insertJson);
router.post('/real/update', jsonController.updateJson);

module.exports = router;