import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Stripe from 'stripe';
import Order from './models/order';

dotenv.config();

const stripeClient = Stripe(process.env.STRIPE_SECRET_KEY);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

const app = express();

app.use(express.json());

app.get('/orders', async (_, res) => {
  const orders = await Order.find();

  res.send({ orders });
});

app.post('/commit-order', async (req, res) => {
  const { token, totalCents, cart } = req.body;

  try {
    const { id, payment_method, payment_method_details } = await stripeClient.charges.create({
      amount: totalCents,
      source: token.id,
      currency: 'usd',
    });

    const order = new Order({
      totalCents,
      transactionId: id,
      paymentDetails: {
        id: payment_method,
        cardType: payment_method_details.card.brand,
        last4: payment_method_details.card.last4,
      },
      tokenId: token.id,
      cartItems: Object.values(cart),
    });

    await order.save();

    res.send({ success: true, message: 'Order successfully purchased!', order });
  } catch (err) {
    res.status(404).send({ success: false, message: err.message });
  }
});

app.listen(4000, () => console.log('App is listening on port 4000'));
