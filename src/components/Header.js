import React from 'react';
import '../styles/Header.css';
import { Link, useLocation, useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import useItemsQuantity from '../hooks/useItemsQuantity';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';

function Header() {
  const location = useLocation();
  const history = useHistory();
  const itemsQuantity = useItemsQuantity();
  const [{ user }] = useStateValue();

  const logout = () => {
    if (user) {
      auth.signOut();
      if (location.pathname !== '/') history.push('/');
    }
  };

  return (
    <nav className="header">
      <Link className="header__desktop" to="/">
        <img className="header__logo" src="https://pngimg.com/uploads/amazon/amazon_PNG25.png" alt="Amazon logo" />
      </Link>
      <div className="header__mobile">
        <Link to="/">
          <img className="header__logo" src="https://pngimg.com/uploads/amazon/amazon_PNG25.png" alt="Amazon logo" />
        </Link>

        {user ? (
          <div className="header__link">
            <div onClick={logout} className="header__option">
              <span className="header__optionLineOne">Hi, {user ? user.firstName : 'Guest'}</span>
              <span className="header__optionLineTwo">{user ? 'Sign out' : 'Sign In'}</span>
            </div>
          </div>
        ) : (
          <Link to={{ pathname: '/login', state: { from: location } }} className="header__link">
            <div onClick={logout} className="header__option">
              <span className="header__optionLineOne">Hello, {user ? user.firstName : 'Guest'}</span>
              <span className="header__optionLineTwo">{user ? 'Sign out' : 'Sign In'}</span>
            </div>
          </Link>
        )}

        <Link to="/orders" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">Return</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <Link to="/cart" className="header__link">
          <div className="header__optionBasket">
            <ShoppingCartOutlinedIcon className="header__optionShoppingIcon" />
            <span className="header__optionLineTwo header__basketCount">{itemsQuantity}</span>
          </div>
        </Link>
      </div>
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <button className="header__searchIconWrapper">
          <SearchIcon className="header__searchIcon" />
        </button>
      </div>
      <div className="header__nav header__desktop">
        {user ? (
          <div className="header__link">
            <div onClick={logout} className="header__option">
              <span className="header__optionLineOne">Hello, {user ? user.firstName : 'Guest'}</span>
              <span className="header__optionLineTwo">{user ? 'Sign out' : 'Sign In'}</span>
            </div>
          </div>
        ) : (
          <Link to={{ pathname: '/login', state: { from: location } }} className="header__link">
            <div onClick={logout} className="header__option">
              <span className="header__optionLineOne">Hello, {user ? user.firstName : 'Guest'}</span>
              <span className="header__optionLineTwo">{user ? 'Sign out' : 'Sign In'}</span>
            </div>
          </Link>
        )}

        <Link to="/orders" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">Return</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        {/* <Link to="/login" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>
        </Link> */}

        <Link to="/cart" className="header__link">
          <div className="header__optionBasket">
            <ShoppingCartOutlinedIcon className="header__optionShoppingIcon" />
            <span className="header__optionLineTwo header__basketCount">{itemsQuantity}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
