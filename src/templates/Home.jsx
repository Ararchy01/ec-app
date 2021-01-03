import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {push} from 'connected-react-router';

import {getUserId, getUsername} from '../reducks/users/selectors';

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
      <button onClick={() => dispatch(push('/login'))}>Login</button>
    </>
  )
}

export default Home; 