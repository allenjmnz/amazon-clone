import React, { useState, useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import { getSubtotal, getQuantity } from '../reducer';
import '../styles/Subtotal.css';

function Subtotal() {
  const [formattedPrice, setFormattedPrice] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [{ cart }] = useStateValue();

  useEffect(() => {
    const newSubtotal = getSubtotal(cart);
    const newQuantity = getQuantity(cart);
    const options = { style: 'currency', currency: 'MXN' };
    const mexicanPesosFormat = new Intl.NumberFormat('es-MX', options);
    setQuantity(newQuantity);
    setFormattedPrice(mexicanPesosFormat.format(newSubtotal));
  }, [cart]);

  return (
    <div className="subtotal">
      <h2 className="subtotal__title">Subtotal</h2>
      <p>
        {quantity} items: <strong style={{ color: 'black' }}>{formattedPrice}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" name="isGift" id="isGift" />
        <label htmlFor="isGift">This order contains a gift</label>
      </small>
      <button className={`general__btn${cart.length ? '' : ' general__disabled'}`}>Proceed to checkout</button>
    </div>
  );
}

export default Subtotal;
