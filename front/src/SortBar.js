import React, { Component } from 'react';


const ArrowSelector  = (props) =>{

    const arrowUpStyle = {  width : '25px', marginBottom : '-15px'}
    const arrowDownStyle = { width : '25px' }

    return <div style={ {  width : '25px', marginLeft : '5px'}} >
                <img src={ props.state[props.property]["up"] === 1 ? "./arrow-expand-down-active.png": "./arrow-expand-down.png"}
                     style={arrowUpStyle}
                     className="up" onClick={ props.toggleSort }
                     property={ props.property }
                    />

                <img src={props.state[props.property]["down"] === 1 ? "./arrow-expand-active.png": "./arrow-expand.png"}
                     style={arrowDownStyle}
                     className="down" onClick={ props.toggleSort }
                     property={ props.property }
                     />

            </div>;
}

export default class SortBar extends Component {

    constructor(props){
        super(props);
        this.state = { name : { 'up' : 0, 'down' : 0 },
            date : { 'up' : 0, 'down' : 0 } }
    }

    render() {
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
                }}><span>Name</span> <ArrowSelector property="name" toggleSort={this.toggleSort} state={this.state}/>
                </div>

                <div style={{
                    width : '73px', display : 'flex', alignItems : 'center'
                }}> <span>Date</span> <ArrowSelector property="date" toggleSort={this.toggleSort} state={this.state}/>
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

    toggleSort = (e) => {
        console.log(e.target.className + " " + e.target.getAttribute("property"))
        const property = e.target.getAttribute("property");
        const className = e.target.className;
        const state = { name : { 'up' : 0, 'down' : 0 },
            date : { 'up' : 0, 'down' : 0 } };
        state[property][className] = this.state[property][className] ? 0 : 1;
        this.setState(state);
    }
}