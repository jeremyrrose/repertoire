import React from 'react';

export const Instruments = (props) => {

    if (props.instruments) {

        const instruments = props.instruments;
        const axes = instruments;
        // const axes = instruments.join(', ');
    
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