import React from 'react';

export default props => {
    return (
        <div
            className="menu-item"
            style={{
                borderStyle: 'solid',
                margin: '10px 13px 10px 13px',
                padding: '10px',
                paddingLeft: '5%',
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    width: '90%',
                }}
            >
                <span
                    style={{
                        width: '100px',
                    }}
                    className="ingredient-name"
                >
                    {props.ingredient.name}
                </span>
                <span
                    style={{
                        width: '80px',
                    }}
                >
                    {props.ingredient.date.format('D/M/YYYY')}
                </span>
                <span
                    style={{
                        width: '150px',
                    }}
                    className="tags"
                >
                    {props.ingredient.tags
                        .map((val, idx) => ` ${val}`)
                        .toString()}
                </span>
            </div>
            <img
                style={{
                    cursor: 'pointer',
                    width: '25px',
                    height: '25px',
                    alignSelf: 'center',
                }}
                src="./minus-button.png"
                alt="Delete"
            />
        </div>
    );
};
