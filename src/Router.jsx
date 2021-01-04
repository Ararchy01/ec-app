import React from 'react';
import {Route, Switch} from 'react-router';
import Auth from './Auth';
import {Home, SignUp, SignIn, ResetPassword, ProductRegistration} from './templates';

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/resetPassword"} component={ResetPassword} />
      <Auth>
        <Route exact path={"(/)?"} component={Home} />
        <Route exact path={"/product/register"} component={ProductRegistration} />
      </Auth>
    </Switch>
  )
}

export default Router