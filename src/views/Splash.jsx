import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../forms';
import '../styles/Splash.css';

export const Splash = (props) => {

    return (
        <main className="splash">
            <div className="splashPitch">
                <h2><span>repertoire</span></h2>
                <div>
                    <h2>helps performers and artists</h2>
                    <p>manage their portfolios<br />
                    and creative networks</p>
                    <p className="splashSignup"><Link to='/signup'>Sign up now...</Link></p>
                    <p>or log in below.</p>
                    <LoginForm onChange={props.onChange} onSubmit={props.changeUser} formData={props.formData} />
                </div>
            </div>
        </main>
    )

}