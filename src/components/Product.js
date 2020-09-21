import React, { useState, useEffect } from 'react';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import { useStateValue } from '../StateProvider';
import '../styles/Product.css';
import QuantityUpdater from './QuantityUpdater';

function Product({ id, title, image, rating, price }) {
  const [formattedPrice, setFormattedPrice] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [{ cart }, dispatch] = useStateValue();

  useEffect(() => {
    const options = { style: 'currency', currency: 'MXN' };
    const mexicanPesosFormat = new Intl.NumberFormat('es-MX', options);
    setFormattedPrice(mexicanPesosFormat.format(price));
  }, [price]);

  useEffect(() => {
    const updatedProd = cart.filter(item => item.id === id)[0];
    if (updatedProd) {
      setQuantity(updatedProd.quantity);
    } else {
      setQuantity(0);
    }
  }, [cart, id]);

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', item: { id, title, image, rating, price } });
  };

  return (
    <div className="product">
      <p>{title}</p>
      <p className="product__price">
        <strong>{formattedPrice}</strong>
      </p>
      <div className="product__rating">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarTwoToneIcon key={i} className="product__highlightedStar" fontSize="small" />
          ))}
        {Array(5 - rating)
          .fill()
          .map((_, i) => (
            <StarTwoToneIcon key={i} className="product__dimmedStar" fontSize="small" />
          ))}
      </div>
      <img src={image} alt="" />
      {quantity ? (
        <div className="product__qtyUpdater">
          <QuantityUpdater id={id} quantity={quantity} />
        </div>
      ) : (
        <button className="general__btn" onClick={addToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default Product;
