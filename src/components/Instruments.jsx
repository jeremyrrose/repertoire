import React from 'react';

export const Instruments = (props) => {

    if (props.instruments) {

        // this has a long way to go; will eventually interpret an array of instruments but it's just a string for now
        const instruments = props.instruments;
        const axes = instruments;
    
        if (axes) {
            return (
                <div className="instruments">
                    <h4>instruments</h4>
                    { axes }
                </div>
            );
        } 
    }

    return null;

}