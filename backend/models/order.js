import { Schema, model } from 'mongoose';

const OrderSchema = new Schema(
  {
    totalCents: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
    paymentDetails: {
      id: {
        type: String,
        required: true,
      },
      last4: {
        type: String,
        required: true,
      },
      cardType: {
        type: String,
        required: true,
      },
    },
    cartItems: [
      {
        priceCents: {
          type: Number,
          required: true,
        },
        id: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Order = model('Order', OrderSchema);

export default Order;
