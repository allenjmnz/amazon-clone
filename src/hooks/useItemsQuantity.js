import { useEffect, useState } from 'react';
import { useStateValue } from '../StateProvider';

export default function useItemsQuantity() {
  const [{ cart }] = useStateValue();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(cart.reduce((amount, item) => (amount += item.quantity), 0));
  }, [cart]);

  return quantity;
}
