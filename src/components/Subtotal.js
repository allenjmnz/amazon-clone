import React, { useState, useEffect } from 'react';
import useItemsQuantity from '../hooks/useItemsQuantity';
import { useStateValue } from '../StateProvider';
import { getSubtotal } from '../reducer';
import { useHistory } from 'react-router-dom';
import '../styles/Subtotal.css';

function Subtotal() {
  const history = useHistory();
  const itemsQuantity = useItemsQuantity();
  const [formattedPrice, setFormattedPrice] = useState('');
  const [{ cart }] = useStateValue();

  useEffect(() => {
    const options = { style: 'currency', currency: 'USD' };
    const usdFormat = new Intl.NumberFormat('en-US', options);
    setFormattedPrice(usdFormat.format(getSubtotal(cart)));
  }, [cart]);

  return (
    <div className="subtotal">
      <h2 className="subtotal__title">Subtotal</h2>
      <p>
        {itemsQuantity} items: <strong style={{ color: 'black' }}>{formattedPrice}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" name="isGift" id="isGift" />
        <label htmlFor="isGift">This order contains a gift</label>
      </small>
      <button
        onClick={e => history.push('/checkout')}
        className={`general__btn${cart.length ? '' : ' general__disabled'}`}
        disabled={cart.length === 0 ? true : false}
      >
        Proceed to checkout
      </button>
    </div>
  );
}

export default Subtotal;
