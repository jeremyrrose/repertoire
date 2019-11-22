import React from 'react';
import { Redirect, BrowserRouter as Router } from 'react-router-dom';
import { UserInfoForm } from '../forms';
import { userSignup } from '../services/ApiCalls';
import '../styles/Signup.css';

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
			instrument: '',
			education: '',
			avatar: '',
			complete: false
		}
	}

	handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

	handleSubmit = async (e) => {
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

		const { first, last, username, email, city,	state, instruments, education, avatar } = this.state;

		return (

			<main className="signup">
				<h2>Build your repertoire...</h2>
				<UserInfoForm 
					formData={{ first, last, username, email, city,	state, instruments, education, avatar }}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
				/>
			</main>

		)
	}

}
