import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { Header } from './components';
import { Splash, Profile, Manage } from './views';
import Signup from './views/Signup';
import { getAllUsers } from './services/ApiCalls';

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
    const users = { ...this.state.data };
    console.log(users);
    const mapHelper = Object.keys(users);
    const userNum = mapHelper.filter(key => users[key].username === this.state.loginForm);
    console.log(userNum);
    const loginNum = userNum[0] || this.state.loginForm;
    this.setState(state => ({ 
      user: loginNum,
      loginForm: ''
     }));
  }

  render() {

    let home;
    if (this.state.user) {
      home = <Redirect to={`/users/${this.state.user}`} />
    } else {
      home = <Splash userId={this.state.user} onChange={this.handleChange} changeUser={this.login} formData={this.state.loginForm} />
    }

    let greeting = '';
    (this.state.user && this.state.data[this.state.user-1]) && (greeting = `hello, ${this.state.data[this.state.user-1].first}`);

    return (
      <div className="App">
        <Header userId={this.state.user} greeting={greeting} changeUser={this.login} onChange={this.handleChange} formData={this.state.loginForm} />
        <Switch>
          <Route exact path="/" render={() => home} />
          <Route exact path="/users/:profile_id" component={ Profile } />
          <Route exact path="/signup" render={() => <Signup changeUser={this.changeUser} fetchUsers={this.fetchUsers} /> } />
          <Route exact path="/manage" render={() => <Manage userId={this.state.user} /> } />
        </Switch>
      </div>
    );

  }
}

export default App;
