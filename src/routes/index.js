import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import Plans from '../pages/Plans';
import Registration from '../pages/Registration';
import HelpOrders from '../pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/students" component={Students} />
      <Route path="/plans" component={Plans} />
      <Route path="/registration" component={Registration} />
      <Route path="/helporders" component={HelpOrders} />
    </Switch>
  );
}
