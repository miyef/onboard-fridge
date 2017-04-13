import React, { Component } from 'react';


const ArrowSelector  = (props) =>{

    const arrowUpStyle = {  width : '25px', marginBottom : '-15px'};
    const arrowDownStyle = { width : '25px' };

    return <div style={ {  width : '25px', marginLeft : '5px'}} >
                <img src={ props.sortBy === `${props.property}up` ? "./arrow-expand-down-active.png": "./arrow-expand-down.png"}
                     style={arrowUpStyle}
                     className="up" onClick={ props.toggleSort }
                     property={ props.property }
                    />

                <img src={props.sortBy === `${props.property}down` ? "./arrow-expand-active.png": "./arrow-expand.png"}
                     style={arrowDownStyle}
                     className="down" onClick={ props.toggleSort }
                     property={ props.property }
                     />

            </div>;
}

export default (props) => {

        return <div style={{ borderStyle :'none',
            margin :'10px 13px 0px 13px', padding : '10px 10px 0px 10px', paddingLeft:'5%', display:'flex',
            justifyContent : 'space-between' }}>
            <div style={{
                display : 'flex',
                justifyContent : 'space-between',
                flexWrap : 'wrap',
                width : '90%'
            }}>
                <div style={{
                    width : '100px', display : 'flex', alignItems : 'center'
                }}><span>Name</span> <ArrowSelector property="name" toggleSort={props.toggleSort} sortBy={props.sortBy}/>
                </div>

                <div style={{
                    width : '73px', display : 'flex', alignItems : 'center'
                }}> <span>Date</span> <ArrowSelector property="date" toggleSort={props.toggleSort} sortBy={props.sortBy}/>
                </div>

                <span style={{
                    width : '150px'
                }} >  </span>
            </div>
            <span style={{
                width : '25px'
            }} > </span>
        </div>
}