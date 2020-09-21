import React from 'react';
import { useStateValue } from '../StateProvider';
import '../styles/Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';

function Checkout() {
  const [{ cart }] = useStateValue();
  return (
    <div className="checkout">
      <img
        className="checkout__ad checkout__mobile"
        src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
        alt=""
      />
      <div className="checkout__wrapper">
        <div className="checkout__left">
          <img
            className="checkout__ad checkout__desktop"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt=""
          />
          {cart.length === 0 ? (
            <div className="">
              <h2 className="checkout__title">Your Shopping Cart is empty</h2>
              <p>
                You have no items in your cart. To buy one or more items, click the "Add to Cart" button next to the
                item.
              </p>
            </div>
          ) : (
            <div className="">
              <h2 className="checkout__title">Your Shopping Cart</h2>

              {cart.map(item => (
                <CheckoutProduct key={item.id} {...item} />
              ))}
            </div>
          )}
        </div>
        <div className="checkout__right">
          <Subtotal />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
