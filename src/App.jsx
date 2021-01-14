import React from "react";
import Router from "./Router";
import { Header } from "./components/header/";
import "./assets/reset.css";
import "./assets/style.css";

const App = () => {
  return (
    <>
      <Header />
      <main className="c-main">
        <Router />
      </main>
    </>
  );
};

export default App;
