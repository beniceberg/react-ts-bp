import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from './Landing';

export default () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Redirect to="/" />
  </Switch>
);
