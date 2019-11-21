import React from 'react';
import '../styles/Header.css';
import {NavLink} from 'react-router-dom';
import { LoginForm } from '../forms';

export const Header = (props) => {

    const Hello = (props) => {
        return (
            <p>hello, {props.name} ({props.userId}) || <NavLink to={`/users/${props.userId}`}>Your Profile</NavLink> || <NavLink to='/manage'>Manage</NavLink> || <button onClick={props.changeUser}>Logout</button></p>
        )
    }

    const greeting = props.userId ? <Hello name={props.name} userId={props.userId} changeUser={props.changeUser} /> : <LoginForm onChange={props.onChange} onSubmit={props.changeUser} formData={props.formData} />;

    return (
        <header>
            <h1>repertoire</h1>
            { greeting }
        </header>
    )

}