import React, { useState } from 'react';
import '../styles/Login.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { useStateValue } from '../StateProvider';

function Login() {
  const history = useHistory();
  const location = useLocation();
  const [, dispatch] = useStateValue();
  const { from } = location.state || { from: { pathname: '/' } };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const login = e => {
    e.preventDefault();
    setProcessing(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch({ type: 'SET_USER', user: { ...user, firstName: user.displayName?.split(' ')[0] } });
        setProcessing(false);
        history.replace(from);
      })
      .catch(e => {
        setError(e.message);
        setProcessing(false);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h2>Sign-In</h2>
        <form className="login__form" onSubmit={login} onChange={() => setError('')}>
          <label htmlFor="email">E-mail</label>
          <input
            onChange={event => setEmail(event.target.value)}
            value={email}
            type="email"
            id="email"
            name="email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={event => setPassword(event.target.value)}
            value={password}
            type="password"
            id="password"
            name="password"
            required
          />
          {error && (
            <small style={{ color: 'red', fontWeight: '500', padding: '0.125rem 0.3rem' }}>
              The email and/or password is incorrect.
            </small>
          )}
          <button
            className={`general__btn${!processing ? '' : ' general__disabled'}`}
            type="submit"
            disabled={processing}
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to Amazon's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies
          Notice and our Interest-Based Ads Notice.
        </p>
      </div>
      <div className="login__container login__below">
        <div className="login__newUser">
          <div className="login__smallbar"></div>
          <p>New to Amazon?</p>
          <div className="login__smallbar"></div>
        </div>
        <Link to="/register">
          <button className="general__btn general__btn__gray">Create your Amazon Account</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
