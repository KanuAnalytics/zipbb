const express = require('express');
const router = express.Router();
const upload = require('../config/config');
const { uploadZipbbFile } = require('../controllers/uploadController');

router.post('/upload-zipbb', upload.single('file'), uploadZipbbFile);

module.exports = router;
