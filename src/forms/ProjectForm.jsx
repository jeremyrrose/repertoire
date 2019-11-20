import React from 'react';
import { Input, Button } from '../shared';

export const ProjectForm = (props) => {
	const { onChange, onSubmit } = props;
	const { first, last, city, state, image_url, username, email, instruments } = props.formData
	return (
		<form className='form' onSubmit={onSubmit} >
			<Input
				name='first'
				value={first}
				required={true}
				placeholder='First name'
				onChange={(e) => onChange(e)}
			/>

            <Input
                name='last'
                value={last}
                required={true}
                placeholder='Last name'
                onChange={(e) => onChange(e)}
            />

            <Input
                name='username'
                value={username}
                required={true}
                placeholder='Username'
                onChange={(e) => onChange(e)}
            />

            <Input
                name='email'
                value={email}
                required={true}
                placeholder='Your email'
                onChange={(e) => onChange(e)}
            />

			<Input
				name='city'
				value={city}
				required={true}
				placeholder='City'
				onChange={(e) => onChange(e)}
			/>

            <Input
				name='state'
				value={state}
				required={true}
				placeholder='State'
				onChange={(e) => onChange(e)}
			/>

			<Input
				name='image_url'
				value={image_url}
				required={false}
				placeholder='Profile photo optional'
				onChange={(e) => onChange(e)}
			/>
			<Input
				name='instruments'
				value={instruments}
				required={false}
				placeholder='Your primary instrument (optional)'
				onChange={(e) => onChange(e)}
			/>

			<Button title='Next >>' />

		</form>
	)
}