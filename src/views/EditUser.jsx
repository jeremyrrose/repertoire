import React from 'react';
import { Redirect, BrowserRouter as Router } from 'react-router-dom';
import { UserInfoForm } from '../forms';
import { getSingleUser, userUpdate } from '../services/ApiCalls';

export default class EditUser extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			first: '',
			last: '',
			username: '',
			email: '',
			city: '',
			state: '',
			instruments: '',
			education: '',
			avatar: '',
			complete: false
		}
    }
    
    componentDidMount = async () => {
        const userData = await getSingleUser(this.props.userId);
        this.setState({ ...userData });
    }

	handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

	handleSubmit = async (e) => {
		e.preventDefault();
		await userUpdate(this.props.userId, this.state)
		.then(this.setState({complete: true}))
		.catch(() => this.setState({ errorMsg: 'There was an error!' }))
	}

	render() {

		if (this.state.complete) {
			return <Redirect to={`/users/${this.props.userId}`} />
		}

		const { first, last, username, email, city,	state, instruments, education, avatar } = this.state;

		return (

			<main className="signup">
				<h2>Update your repertoire...</h2>
				<UserInfoForm 
					formData={{ first, last, username, email, city,	state, instruments, education, avatar }}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
				/>
			</main>

		)
	}

}
