import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { Header } from './components';
import { Login, Profile, Manage } from './views';
import Signup from './views/Signup';
import { getAllUsers, getSingleUser, getUserProjects } from './services/ApiCalls';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      data: {},
      loginForm: '',
      message: ''
    }
  }

  async componentDidMount() {
    await this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const allUsers = await getAllUsers();
    this.setState({
      data: { ...allUsers }
    })} catch (error) {
      console.error(error);
    }
  }

  changeUser = (user) => this.setState({ user });

  handleChange = (e) => this.setState({ loginForm: e.target.value });

  login = (e) => {
    e.preventDefault();
    console.log(e);
    this.setState({ 
      user: this.state.loginForm,
      loginForm: ''
     });
  }

  render() {

    let home;
    if (this.state.user) {
      home = <Redirect to='/manage' />
    } else {
      home = <Login changeUser={this.login} onChange={this.handleChange} formData={this.state.loginForm} />
    }

    let name = '';
    this.state.user && (name=this.state.data[this.state.user-1].first)

    return (
      <div className="App">
        <Header userId={this.state.user} name={name} changeUser={this.login} onChange={this.handleChange} formData={this.state.loginForm} />
        <Switch>
          <Route exact path="/" render={() => home} />
          <Route exact path="/home" component={ Profile } />
          <Route exact path="/users/:profile_id" component={ Profile } />
          <Route exact path="/signup" render={() => <Signup changeUser={this.changeUser} /> } />
          <Route exact path="/manage" render={() => <Manage userId={this.state.user} /> } />
        </Switch>
      </div>
    );

  }
}

export default App;
