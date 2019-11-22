import React from 'react';
import { Input, Button } from '../shared';

export const ProjectForm = (props) => {
	const { onChange, onSubmit, projectKey } = props;
    const { name, avatar, spotify, yourInstrument, website } = props.formData;
    const label = projectKey ? `Update "${name}" ?` : `Add band >>`;

	return (
		<form className='form' onSubmit={onSubmit} >
			<Input
				name='name'
				value={name}
				required={true}
				placeholder='Project name'
				onChange={(e) => onChange(e)}
			/>

            <Input
                name='avatar'
                value={avatar}
                required={false}
                placeholder='Image URL'
                onChange={(e) => onChange(e)}
            />

            <Input
                name='spotify'
                value={spotify}
                required={false}
                placeholder='Spotify link'
                onChange={(e) => onChange(e)}
            />

			<Input
				name='website'
				value={website}
				required={false}
				placeholder='Website URL'
				onChange={(e) => onChange(e)}
			/>

            <Input
                name='yourInstrument'
                value={yourInstrument}
                required={false}
                placeholder='Your primary instrument in this project'
                onChange={(e) => onChange(e)}
            />

			<Button title={label} classname="manageForm" />

		</form>
	)
}