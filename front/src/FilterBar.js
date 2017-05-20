import React, {Component} from 'react';

class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : ""
        };


    }
    render(){
        return <input type="text" value={this.state.value} onChange={ this.updateValue }
        placeholder="Filter by..." style={{'display':'inline-block',
        'width': '69%'}}/>;
    }

    updateValue = (e) =>  {
        this.setState({ value : e.target.value });
        this.props.updateFilter(e.target.value);
    }
}

export default FilterBar;