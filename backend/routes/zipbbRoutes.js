// routes/zipbbRoutes.js

const express = require('express');
const router = express.Router();
const { getZipbbContent, runZipbb, getScriptsData } = require('../controllers/zipbbController');

router.get('/get-zipbb-content', getZipbbContent);
router.post('/run-zipbb', runZipbb);
router.get('/get-scripts-data', getScriptsData);

module.exports = router;
