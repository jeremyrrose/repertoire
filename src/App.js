import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components';
import { Login, Profile } from './views';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      data: {}
    }
  }

  render() {

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/home" component={ Profile } />
          <Route exact path="/:user_id" component={ Profile } />
        </Switch>
      </div>
    );

  }
}

export default App;
