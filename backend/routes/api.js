const express = require('express');
const router = express.Router();
const apiGenereate = require('../controllers/generate');


router.post('/generate', apiGenereate.generate);
router.get('/query', apiGenereate.previewData);
router.delete('/remove', apiGenereate.removeData);

module.exports = router;
