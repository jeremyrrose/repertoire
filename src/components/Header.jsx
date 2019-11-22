import React from 'react';
import '../styles/Header.css';
import {NavLink} from 'react-router-dom';
import { LoginForm } from '../forms';

export const Header = (props) => {

    const Hello = (props) => {
        return (
            <p><NavLink to="/browse">Browse</NavLink> &nbsp; || &nbsp; <NavLink to={`/users/${props.userId}`}>Your Profile</NavLink> &nbsp; || &nbsp; <NavLink to='/manage'>Manage</NavLink> &nbsp; <button onClick={props.changeUser}>Logout</button></p>
        )
    }

    const greeting = props.userId ? <Hello name={props.name} userId={props.userId} changeUser={props.changeUser} /> : <LoginForm onChange={props.onChange} onSubmit={props.changeUser} formData={props.formData} />;

    return (
        <header>
            <NavLink to='/'><h1>repertoire</h1></NavLink>
            { greeting }
        </header>
    )

}