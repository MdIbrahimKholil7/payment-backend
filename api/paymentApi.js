const express = require('express');
const { order, api_key, paymentVerification } = require('../controllers/orderController');
const router = express.Router()


router.post('/checkout',order)
router.post('/payment-verification',paymentVerification)
router.get('/key',api_key)
module.exports = router