const express = require('express');
const router = express.Router();
const upload = require('../config/config');
const { updateZipbbFile, clearZipbbFile } = require('../controllers/updateZipbbController');

router.post('/update-zipbb', upload.single('file'), updateZipbbFile);
router.post('/clear-zipbb', clearZipbbFile);

module.exports = router;
