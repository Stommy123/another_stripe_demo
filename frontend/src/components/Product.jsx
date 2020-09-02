import React from 'react';
import { convertCentsToDollars } from '../utils';

const Product = ({ name, priceCents, handleAddToCart }) => (
  <div className='product item'>
    <p>{name}</p>
    <p>${convertCentsToDollars(priceCents)}</p>
    <button onClick={handleAddToCart}>Add to cart!</button>
  </div>
);

export default Product;
