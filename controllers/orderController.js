const Razorpay = require('razorpay');
const crypto = require("crypto");
const orderSchema=require('../model/orderSchema');
const { default: mongoose } = require('mongoose');
const Order= new mongoose.model('order',orderSchema)
const instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })

exports.order = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR"
  };

  const order = await instance.orders.create(options);
  res.send(order)
}

exports.paymentVerification = async (req, res) => {
  console.log('from body', req.body)
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body.response || {}
    let body = razorpay_order_id + "|" + razorpay_payment_id;


    const expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET )
      .update(body.toString())
      .digest('hex');
    console.log("sig received ", razorpay_signature);
    console.log("sig generated ", expectedSignature);


    if (expectedSignature === razorpay_signature) {
      const order=new Order({
        email:req.body.email,
        transactionId:razorpay_payment_id
      })
      const result=await order.save()
      console.group(result)
      res.send({
        success: true,
        razorpay_order_id,
       
      })
    }else{
      res.send({
        success:false
      })
    }

  } catch (error) {
    console.log(error)
  }
}

exports.api_key = async (req, res) => {
  try {
    res.send({ key: process.env.RAZORPAY_API_KEY_ID })
    console.log(process.env.RAZORPAY_API_KEY_ID)
  } catch (error) {
    console.log(error)
  }
}