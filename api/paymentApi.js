const express = require('express');
const { order } = require('../controllers/orderController');
const router = express.Router()


router.post('/checkout',order)

module.exports = router