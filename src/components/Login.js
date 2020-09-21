import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { useStateValue } from '../StateProvider';

function Login() {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (user) {
      history.replace(from);
    }
  }, [user, from, history]);

  const login = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => history.replace(from))
      .catch(e => alert(e.message));
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
        <form className="login__form" onSubmit={login}>
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
          <button className="general__btn" type="submit">
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
