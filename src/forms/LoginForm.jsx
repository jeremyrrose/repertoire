import React from 'react';
import { Input, Button } from '../shared';

export const LoginForm = (props) => {
    const { onSubmit, onChange, formData } = props;
    
	return (
		<form className='form' onSubmit={onSubmit} >

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