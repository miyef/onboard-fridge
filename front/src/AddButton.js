import React from 'react';

export default props => {
    return (
        <img
            style={{
                cursor: 'pointer',
                width: '25px',
                display: 'inline-block',
                paddingLeft: '20px',
            }}
            src="./plus-button.png"
            alt="Add"
            onClick={props.nav}
        />
    );
};
