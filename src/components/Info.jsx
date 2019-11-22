import React from 'react';

export const Info = ({ first, last, city, state, avatar }) => {

    const fullName = first + ' ' + last;

    return (
        <div className="info">
            <div className="avatar">
                <img src={avatar} alt={fullName} />
            </div>
            <div>
                <h4>{first}<br/>{last}</h4>
                <p>{city}, {state}</p>
                <button>Contact</button>
            </div>
        </div>
    )

}