const express = require('express');
const { order, api_key, paymentVerification, getTransaction } = require('../controllers/orderController');
const router = express.Router()


router.post('/checkout',order)
router.post('/payment-verification',paymentVerification)
router.get('/key',api_key)
router.get('/get-transaction',getTransaction)
module.exports = router