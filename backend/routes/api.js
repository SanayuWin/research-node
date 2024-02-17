const express = require('express');
const router = express.Router();
const apiGenereate = require('../controllers/generate');


router.get('/generate', apiGenereate.generate);
router.get('/query', apiGenereate.previewData);
router.get('/remove', apiGenereate.removeData);

module.exports = router;
