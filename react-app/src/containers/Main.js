import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import GroupList from '../components/group/GroupList';
import GroupEdit from '../components/group/GroupEdit';

export default function Main(){
  return(
    <main className="ui-main-body">
      <div className="container-fluid">
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/groups' exact={true} component={GroupList}/>
          <Route path='/groups/:id' component={GroupEdit}/>
        </Switch>
      </div>
    </main>
  )
}
