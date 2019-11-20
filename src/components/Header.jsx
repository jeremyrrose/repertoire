import React from 'react';
import '../styles/Header.css';
import { LoginForm } from '../forms';

export const Header = (props) => {

    return (
        <header>
            <h1>repertoire</h1>
            <LoginForm onChange={props.onChange} onSubmit={props.changeUser} formData={props.formData} />
        </header>
    )

}