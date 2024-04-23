const fs = require('fs');
const path = require('path');
const db = require('../config/db');
const qrCode = require('qrcode')

exports.genQRCode = async (req, res) => {
    try {
        
        const result = await db.query('SELECT url_temp FROM customers ORDER BY RANDOM() LIMIT 1');
        const urlData = result.rows[0].url_temp; 
        
        // Generate QR code
        qrCode.toBuffer(urlData, async (err, qrCodeBuffer) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            // Send the generated QR code as a response
            res.setHeader('Content-Disposition', 'attachment; filename=qrcode.png');
            res.type('image/png').send(qrCodeBuffer);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}