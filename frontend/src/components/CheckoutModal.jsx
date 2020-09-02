import React from 'react';
import StripeInput from './StripeInput';

const CheckoutModal = ({ isOpen, handleCommitOrder, handleCancelCheckout }) => {
  if (!isOpen) return null;

  return (
    <div className='modal-backdrop'>
      <div className='modal-wrapper'>
        <div className='modal-header'>
          <h3>Payment Information</h3>
        </div>
        <form className='payment-form'>
          <div className='form-group'>
            <StripeInput />
          </div>
          <div className='modal-footer'>
            <button onClick={handleCommitOrder} type='submit'>
              Submit Payment
            </button>
            <button onClick={handleCancelCheckout} type='button' id='cancel-payment-request'>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
