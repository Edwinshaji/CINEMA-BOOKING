import express from 'express'
import Razorpay from 'razorpay'
import crypto from 'crypto'

const router = express.Router();

// Use your Test Mode keys
const razorpay = new Razorpay({
  key_id: 'rzp_test_Z1hEUMT3BVScDc',
  key_secret: 'AgtzP9lh3DWqzWqE82qs9HVc'
});

// Create order
router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount , 
    currency: 'INR',
    receipt: `receipt_order_${Math.random() * 1000}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment signature
router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(sign.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    return res.json({ success: true });
  } else {
    return res.status(400).json({ success: false });
  }
});

export default  router;
