import React from 'react';
import {Route} from 'react-router';
import {Switch} from 'react-router-dom';

import SearchUserComponent from './components/searchUser';
import DisplayUserDetails from './components/displayUserDetails';

const App = () => {
  return (
    <div>
      <Route component={SearchUserComponent}/>
      <Switch>
        <Route exact path="/:username" component={DisplayUserDetails} />
      </Switch>
    </div>  
  );
}

export default App;
