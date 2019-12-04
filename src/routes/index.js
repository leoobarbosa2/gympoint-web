import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import AddStudents from '../pages/AddStudents';
import EditStudents from '../pages/EditStudent';
import Plans from '../pages/Plans';
import Registration from '../pages/Registration';
import HelpOrders from '../pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/students" component={Students} isPrivate />
      <Route path="/register" component={AddStudents} isPrivate />
      <Route path="/students/:id" component={EditStudents} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/registration" component={Registration} isPrivate />
      <Route path="/helporders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
