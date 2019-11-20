import React from 'react';
import { Redirect, withRouter, Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { UserInfoForm } from '../forms';
import { userSignup } from '../services/ApiCalls';

export default class Signup extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			first: '',
			last: '',
			username: '',
			email: '',
			city: '',
			state: '',
			instruments: [],
			education: [],
			complete: false
		}
	}

	handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

	handleSubmit = (e) => {
		console.log(e);
		console.log(this.state);
		e.preventDefault();
		userSignup(this.state)
		.then(result => this.props.changeUser(result.data.id))
		.then(this.setState({complete: true}))
		.catch(() => this.setState({ errorMsg: 'There was an error!' }))
	}

	render() {

		if (this.state.complete) {
			return <Redirect to='/manage' />
		}

		const { first, last, username, email, city,	state, instruments, education } = this.state;

		return (

			<main>
				<h2>Build your repertoire...</h2>
				<UserInfoForm 
					formData={{ first, last, username, email, city,	state, instruments, education }}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
				/>
			</main>

		)
	}

}
