import React from "react";
import { useSelector } from "react-redux";

import { getUserId, getUsername } from "../reducks/users/selectors";

const Home = () => {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);
  return (
    <>
      <h2>Home</h2>
      <h2>ID: {uid}</h2>
      <h1>Username: {username}</h1>
      <a href="/product/register">Product Registration</a>
    </>
  );
};

export default Home;
