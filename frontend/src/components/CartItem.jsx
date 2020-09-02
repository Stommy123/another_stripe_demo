import React from 'react';
import { convertCentsToDollars } from '../utils';

const CartItem = ({ name, priceCents, quantity, handleRemoveFromCart }) => {
  const total = priceCents * quantity;

  return (
    <div className='cart-item item'>
      <p>{name}</p>
      <p>
        ${convertCentsToDollars(priceCents)} * {quantity} = ${convertCentsToDollars(total)}
      </p>
      <button onClick={handleRemoveFromCart}>Remove</button>
    </div>
  );
};

export default CartItem;
