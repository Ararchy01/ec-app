import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getUserId, getUsername} from '../reducks/users/selectors';
import { resetPassword, signOut } from '../reducks/users/operations';

const Home = () => {
  const dispatch = useDispatch();

  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);
  return (
    <>
      <h2>Home</h2>
      <h2>ID: {uid}</h2>
      <h1>Username: {username}</h1>
      <button onClick={() => dispatch(signOut())}>Signout</button>
      <button onClick={() => dispatch(resetPassword())}>ResetPassword</button>
    </>
  )
}

export default Home; 