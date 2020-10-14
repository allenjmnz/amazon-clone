import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Payment from './components/Payment';
import Orders from './components/Orders';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_wzoGCHBoLeA6owfRhAkYcxmf00fbTBBTGd', { locale: 'en' });

function App() {
  const location = useLocation();

  const [{ cart, user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch({ type: 'INITIAL_CART_LOADING' });
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({ type: 'SET_USER', user: { ...authUser, firstName: authUser.displayName?.split(' ')[0] } });
      } else {
        dispatch({ type: 'SET_USER', user: null });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    !loading && (
      <div className="app">
        <HelmetProvider>
          <Elements stripe={stripePromise}>
            <Switch>
              <Route path="/orders">
                {user ? (
                  <>
                    <Helmet>
                      <title>Amazon Clone | Orders</title>
                    </Helmet>
                    <Header />
                    <Orders />
                  </>
                ) : (
                  <Redirect to={{ pathname: '/login', state: { from: location } }} />
                )}
              </Route>
              <Route path="/checkout">
                {user ? (
                  cart.length > 0 ? (
                    <>
                      <Helmet>
                        <title>Amazon Clone | Checkout</title>
                      </Helmet>
                      <Header />
                      <Payment />
                    </>
                  ) : (
                    <Redirect to="/cart" />
                  )
                ) : (
                  <Redirect to={{ pathname: '/login', state: { from: location } }} />
                )}
              </Route>
              <Route path="/cart">
                <Helmet>
                  <title>Amazon Clone | Cart</title>
                </Helmet>
                <Header />
                <Checkout />
              </Route>
              <Route path="/login">
                {user && !location.state?.from ? (
                  <Redirect to="/" />
                ) : (
                  <>
                    <Helmet>
                      <title>Amazon Clone | Log In</title>
                    </Helmet>
                    <Login />
                  </>
                )}
              </Route>
              <Route path="/register">
                {user ? (
                  <Redirect to="/" />
                ) : (
                  <>
                    <Helmet>
                      <title>Amazon Clone | Sign Up</title>
                    </Helmet>
                    <CreateAccount />
                  </>
                )}
              </Route>
              <Route path="/">
                <Helmet>
                  <title>Amazon Clone | Products for everyone</title>
                </Helmet>
                <Header />
                <Home />
              </Route>
            </Switch>
          </Elements>
        </HelmetProvider>
      </div>
    )
  );
}

export default App;
