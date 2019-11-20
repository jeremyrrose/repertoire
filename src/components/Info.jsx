import React from 'react';

export const Info = ({ first, last, city, state }) => {

    return (
        <div className="info">
            <h4>{first}<br/>{last}</h4>
            <p>{city}, {state}</p>
            <button>Connect</button> <button>Contact</button>
        </div>
    )

}