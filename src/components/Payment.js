import React, { useState, useEffect } from 'react';
import '../styles/Payment.css';
import CheckoutProduct from './CheckoutProduct';
import useItemsQuantity from '../hooks/useItemsQuantity';
import axios from '../axios';
import { db } from '../firebase';
import { getSubtotal } from '../reducer';
import { useStateValue } from '../StateProvider';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: 'black',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

function Payment() {
  const [{ cart, user }, dispatch] = useStateValue();

  const history = useHistory();
  const quantity = useItemsQuantity();

  const stripe = useStripe();
  const elements = useElements();

  const [formattedPrice, setFormattedPrice] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = { style: 'currency', currency: 'USD' };
    const usdFormat = new Intl.NumberFormat('en-US', options);
    setFormattedPrice(usdFormat.format(getSubtotal(cart)));
  }, [cart]);

  const handleChange = e => {
    setIsDisabled(!e.complete);
    setError(e.error ? e.error.message : null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const { data: clientSecret } = await axios({
        method: 'post',
        url: `/payments/create?total=${Math.floor(getSubtotal(cart) * 100)}`
      });

      // eslint-disable-next-line
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      // Add order to firebase database
      db.collection('users')
        .doc(user.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({ cart: cart, amount: paymentIntent.amount, created: paymentIntent.created });

      setHasSucceeded(true);
      setError(null);
      setIsProcessing(false);

      dispatch({ type: 'EMPTY_CART' });

      history.replace('/orders');
    } catch (err) {
      console.log(err);
      if (err.response) {
        const errorMessage = err.response.data;
        setError(errorMessage);
      } else {
        setError(err.message);
      }
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment">
      <div className="container">
        <h1>
          Checkout (<Link to="/cart">{quantity} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Street</p>
            <p>Mexico City</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {cart.map(item => (
              <CheckoutProduct key={item.id} {...item} />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement className="payment__cardElement" options={CARD_ELEMENT_OPTIONS} onChange={handleChange} />
              {error && <div className="payment__error">{error}</div>}
              <div className="payment__priceContainer">
                <h3>Your order: {formattedPrice}</h3>
              </div>
              <button
                type="submit"
                // prettier-ignore
                className={`general__btn${ isProcessing || isDisabled || hasSucceeded || error ? ' general__disabled' : '' }`}
                disabled={isProcessing || isDisabled || hasSucceeded || error}
              >
                {isProcessing ? 'Processing' : 'BUY NOW'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
