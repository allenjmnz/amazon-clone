import React, { useState, useEffect } from 'react';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import '../styles/CheckoutProduct.css';
import { useStateValue } from '../StateProvider';
import QuantityUpdater from './QuantityUpdater';

function CheckoutProduct({ id, title, image, rating, price, quantity }) {
  const [{ cart }, dispatch] = useStateValue();
  console.log(cart);

  const [formattedPrice, setFormattedPrice] = useState('');

  useEffect(() => {
    const options = { style: 'currency', currency: 'MXN' };
    const mexicanPesosFormat = new Intl.NumberFormat('es-MX', options);
    setFormattedPrice(mexicanPesosFormat.format(price));
  }, [price]);

  const removeFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_CART', item: { id } });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <strong>{formattedPrice}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarTwoToneIcon key={i} className="checkoutProduct__highlightedStar" fontSize="small" />
            ))}
          {Array(5 - rating)
            .fill()
            .map((_, i) => (
              <StarTwoToneIcon key={i} className="checkoutProduct__dimmedStar" fontSize="small" />
            ))}
        </div>
        <div className="checkoutProduct__qtyContainer">
          <QuantityUpdater id={id} quantity={quantity} />
          <button className="general__btn" onClick={removeFromCart}>
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProduct;
