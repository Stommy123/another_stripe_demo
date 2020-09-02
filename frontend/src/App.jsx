import React, { useState } from 'react';
import axios from 'axios';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import products from './data';
import { convertCentsToDollars } from './utils';
import Product from './components/Product';
import CartItem from './components/CartItem';
import CheckoutModal from './components/CheckoutModal';

// mock card -> 4242 4242 4242 4242

const App = () => {
  const stripe = useStripe();
  const stripeElements = useElements();
  const [cart, setCart] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const totalCents = Object.values(cart).reduce((acc, { priceCents }) => acc + priceCents, 0);

  const handleAddToCart = product => {
    const productInCart = cart[product.id];
    const newQuantity = productInCart ? productInCart.quantity + 1 : 1;
    setCart({ ...cart, [product.id]: { ...product, quantity: newQuantity } });
  };

  const handleRemoveFromCart = cartItem => {
    const newCart = { ...cart };

    delete newCart[cartItem.id];

    setCart(newCart);
  };

  const handleStartCheckout = () => {
    setIsOpen(true);
  };

  const handleCancelCheckout = () => {
    setIsOpen(false);
  };

  const handleCommitOrder = async e => {
    e.preventDefault();

    const cardInputEl = stripeElements.getElement(CardElement);
    const { token } = await stripe.createToken(cardInputEl);

    const { data } = await axios.post('/commit-order', {
      token,
      totalCents,
      cart,
    });

    data.success ? toast.success(data.message) : toast.error(data.message);
    setCart({});
    setIsOpen(false);
  };

  return (
    <div className='container'>
      <div className='products content'>
        <h2>Products!</h2>
        {products.map(product => (
          <Product key={product.id} handleAddToCart={() => handleAddToCart(product)} {...product} />
        ))}
      </div>
      <div className='cart content'>
        <h2>Cart!</h2>
        {Object.values(cart).map(cartItem => (
          <CartItem
            key={cartItem.id}
            handleRemoveFromCart={() => handleRemoveFromCart(cartItem)}
            {...cartItem}
          />
        ))}
        {!!totalCents && (
          <div className='checkout'>
            <p>Your total is ${convertCentsToDollars(totalCents)}</p>
            <button onClick={handleStartCheckout}>Checkout!</button>
          </div>
        )}
      </div>
      <CheckoutModal
        handleCommitOrder={handleCommitOrder}
        handleCancelCheckout={handleCancelCheckout}
        isOpen={isOpen}
      />
    </div>
  );
};

export default App;
