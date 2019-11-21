import React from 'react';
import { LoginForm } from '../forms';

export const Login = (props) => {

    return (
        <main>
            <LoginForm onChange={props.onChange} onSubmit={props.changeUser} formData={props.formData} />
        </main>
    )

}