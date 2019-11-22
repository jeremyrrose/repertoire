import React from 'react';
import { Link } from 'react-router-dom';

export const UserBadge = (props) => {
    
    return (
        <Link to={`/users/${Number(props.user) + 1}`}>
            <div className="userBadge" onClick={props.onClick} >
                <div class="avatar">
                    <img src={props.avatar} alt={props.name} />
                </div>
                <div>
                    <h4>{props.name}</h4>
                    <p>{props.cityState}</p>
                </div>
            </div>
        </Link>
    )

}