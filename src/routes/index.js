import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import AddCategory from '../pages/AddCategory';
import DeleteCategory from '../pages/DeleteCategory';
import ModifyCategory from '../pages/ModifyCategory';
import AddTopic from '../pages/AddTopic';
import DeleteTopic from '../pages/DeleteTopic';
import ModifyTopic from '../pages/ModifyTopic';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/addcategory" component={AddCategory} />
      <Route exact path="/deletecategory" component={DeleteCategory} />
      <Route exact path="/modifycategory" component={ModifyCategory} />
      <Route exact path="/addtopic" component={AddTopic} />
      <Route exact path="/deletetopic" component={DeleteTopic} />
      <Route exact path="/modifytopic" component={ModifyTopic} />
    </Switch>
  );
}
