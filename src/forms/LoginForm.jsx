import React from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Button } from '../shared';

export const LoginForm = (props) => {
    const { onSubmit, onChange, formData } = props;
    
	return (
		<form className='form' onSubmit={onSubmit} >

			<NavLink to="/browse">Browse profiles</NavLink> &nbsp; || &nbsp; 

			<Input
                name='username'
                value={formData}
                required={true}
                placeholder='Username'
                onChange={onChange}
			/>

		    <Button title='Login' />

		</form>
	)
}