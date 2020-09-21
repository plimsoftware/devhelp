import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import AddCategory from '../pages/AddCategory';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/addcategory" component={AddCategory} />
    </Switch>
  )
}
