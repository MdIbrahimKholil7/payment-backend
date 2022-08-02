const Razorpay = require('razorpay');
const instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })

exports.order = async(req, res) => {
    const options = {
        amount: 50000,  // amount in the smallest currency unit
        currency: "INR"
      };
      console.log(instance)
      instance.orders.create(options, function(err, order) {
        console.log(order);
      });
      res.status({
        message:true
      })
}
