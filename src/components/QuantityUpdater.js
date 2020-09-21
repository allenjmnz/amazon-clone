import React from 'react';
import { useStateValue } from '../StateProvider';
import '../styles/QuantityUpdater.css';

function QuantityUpdater({ id, quantity }) {
  const [, dispatch] = useStateValue();

  const increase = () => {
    dispatch({ type: 'UPDATE_ITEM_INCREASE', item: { id } });
  };

  const decrease = () => {
    dispatch({ type: 'UPDATE_ITEM_DECREASE', item: { id } });
  };
  return (
    <div className="quantityUpdater">
      <button onClick={decrease}>-</button>
      <span>{quantity}</span>
      <button onClick={increase}>+</button>
    </div>
  );
}

export default QuantityUpdater;
