import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import AddTopic from '../pages/AddTopic';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/addtopic" component={AddTopic} />
    </Switch>
  )
}
