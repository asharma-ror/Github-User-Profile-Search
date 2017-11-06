import React from 'react';
import {Route} from 'react-router';
import {
  HashRouter as Router,
  Redirect,
  Switch,
  BrowserRouter,
} from 'react-router-dom';

import SearchUserComponent from './components/searchUser';
import DisplayUserDetails from './components/displayUserDetails';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={SearchUserComponent}/>
      <Route path="/:username" component={DisplayUserDetails} />
    </Switch>
  );
}

export default App;
