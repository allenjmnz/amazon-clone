export const initialState = {
  cart: [],
  user: null
};

export function getSubtotal(cart) {
  return cart.reduce((sum, item) => (sum += item.price * item.quantity), 0);
}

export function getQuantity(cart) {
  return cart.reduce((amount, item) => (amount += item.quantity), 0);
}

export default function reducer(state, action) {
  let newCart, index, updatedItem;

  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };
    case 'ADD_TO_CART':
      newCart = [...state.cart];
      index = state.cart.findIndex(item => item.id === action.item.id);
      if (index < 0) {
        return {
          ...state,
          cart: [...newCart, { ...action.item, quantity: 1 }]
        };
      } else {
        updatedItem = { ...state.cart[index], quantity: state.cart[index].quantity + 1 };
        newCart.splice(index, 1, updatedItem);
        return {
          ...state,
          cart: newCart
        };
      }
    case 'REMOVE_FROM_CART':
      newCart = [...state.cart];
      index = newCart.findIndex(item => item.id === action.item.id);
      newCart.splice(index, 1);
      return {
        ...state,
        cart: newCart
      };
    case 'UPDATE_ITEM_INCREASE':
      newCart = [...state.cart];
      index = newCart.findIndex(item => item.id === action.item.id);
      updatedItem = { ...state.cart[index], quantity: state.cart[index].quantity + 1 };
      newCart.splice(index, 1, updatedItem);
      return {
        ...state,
        cart: newCart
      };
    case 'UPDATE_ITEM_DECREASE':
      newCart = [...state.cart];
      index = newCart.findIndex(item => item.id === action.item.id);
      updatedItem = { ...state.cart[index], quantity: state.cart[index].quantity - 1 };
      if (updatedItem.quantity === 0) {
        newCart.splice(index, 1);
      } else {
        newCart.splice(index, 1, updatedItem);
      }
      return {
        ...state,
        cart: newCart
      };
    default:
      return state;
  }
}
