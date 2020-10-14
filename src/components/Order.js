import React, { useState, useEffect } from 'react';
import '../styles/Order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';

function Order({ order }) {
  const [formattedPrice, setFormattedPrice] = useState('');

  useEffect(() => {
    const options = { style: 'currency', currency: 'USD' };
    const usdFormat = new Intl.NumberFormat('en-US', options);
    setFormattedPrice(usdFormat.format(order.data.amount / 100));
  }, [order.data.amount]);

  return (
    <div className="order">
      <div className="order__id">
        <h2>Order</h2>
        <small>{order.id}</small>
      </div>
      <p className="order__time">{moment.unix(order.data.created).format('MMMM Do YYYY, h:mm a')}</p>
      {order.data.cart.map(item => (
        <CheckoutProduct key={item.id} {...item} hideButton />
      ))}
      <h3 className="order__total">
        <span>Order total:</span> {formattedPrice}
      </h3>
    </div>
  );
}

export default Order;
