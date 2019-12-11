import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import AddStudents from '../pages/AddStudents';
import EditStudents from '../pages/EditStudent';
import Plans from '../pages/Plans';
import AddPlan from '../pages/AddPlan';
import EditPlan from '../pages/EditPlan';
import AddRegistration from '../pages/Registration/AddRegistration';
import Registration from '../pages/Registration';
import EditRegistration from '../pages/Registration/EditRegistration';
import HelpOrders from '../pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/students" component={Students} isPrivate />
      <Route path="/register/students" component={AddStudents} isPrivate />
      <Route path="/students/:id" component={EditStudents} isPrivate />
      <Route exact path="/plans" component={Plans} isPrivate />
      <Route path="/register/plan" component={AddPlan} isPrivate />
      <Route path="/plans/:id" component={EditPlan} isPrivate />
      <Route exact path="/registration" component={Registration} isPrivate />
      <Route
        path="/register/registration"
        component={AddRegistration}
        isPrivate
      />
      <Route path="/registration/:id" component={EditRegistration} isPrivate />
      <Route path="/helporders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
