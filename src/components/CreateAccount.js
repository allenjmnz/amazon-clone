import React, { useState } from 'react';
import '../styles/Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { useStateValue } from '../StateProvider';

function CreateAccount() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, dispatch] = useStateValue();

  const register = e => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        const user = auth.currentUser;
        user.updateProfile({
          displayName: name
        });
        return authUser;
      })
      .then(authUser => {
        dispatch({ type: 'SET_USER', user: { ...authUser.user, firstName: name.split(' ')[0] } });
        history.push('/');
      })
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
        <h2>Create account</h2>
        <form className="login__form" onSubmit={register}>
          <label htmlFor="name">Name</label>
          <input
            onChange={event => setName(event.target.value)}
            value={name}
            type="text"
            id="name"
            name="name"
            required
          />
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
            Create your Amazon Account
          </button>
        </form>
        <p>
          By creating an account you agree to Amazon's Conditions of Use & Sale. Please see our Privacy Notice, our
          Cookies Notice and our Interest-Based Ads Notice.
        </p>
        <div className="general__divider"></div>
        <p>
          Already have an account? <Link to="/login">Sign-In</Link>
        </p>
      </div>
    </div>
  );
}

export default CreateAccount;
