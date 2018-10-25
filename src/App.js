import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter} from 'react-router-dom';
import NavBar from './components/NavBar'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import { connect } from 'react-redux';

class App extends Component {

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" render={() => <Profile />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId
  }
}

export default withRouter(connect(mapStateToProps)(App));
