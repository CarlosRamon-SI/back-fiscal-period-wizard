const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/real', dataController.getAll);
router.get('/real/:id', dataController.getData);
router.post('/real/insert', dataController.insertData);
router.post('/real/update', dataController.updateData);

module.exports = router;