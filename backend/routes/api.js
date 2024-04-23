const express = require('express');
const router = express.Router();
const apiGenereate = require('../controllers/generate');
const apiQRCode = require('../controllers/qrcode');

router.post('/generate', apiGenereate.generate);
router.get('/query', apiGenereate.previewData);
router.delete('/remove', apiGenereate.removeData);
router.get('/genqrcode', apiQRCode.genQRCode);

module.exports = router;
