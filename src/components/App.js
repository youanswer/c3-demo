import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import UserList from './UserList';
import UserDetails from './UserDetails';
import CreateUser from './CreateUser';

class App extends Component {
  render() {
    return (
      <div className="center">
        <Header />
        <div className="main">
          <Switch>
            <Route exact path="/" component={UserList} />
            <Route exact path="/user/:id" component={UserDetails} />
            <Route exact path="/create" component={CreateUser} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
