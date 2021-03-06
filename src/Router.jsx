import React from "react";
import { Route, Switch } from "react-router";
import Auth from "./Auth";
import {
  SignUp,
  SignIn,
  ResetPassword,
  ProductRegistration,
  ProductList,
  ProductDetail,
} from "./templates";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/resetPassword"} component={ResetPassword} />
      <Auth>
        <Route exact path={"(/)?"} component={ProductList} />
        <Route exact path={"/product/:id"} component={ProductDetail} />
        <Route
          path={"/product/register(/:id)?"}
          component={ProductRegistration}
        />
      </Auth>
    </Switch>
  );
};

export default Router;
