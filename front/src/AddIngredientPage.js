import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class AddIngredientPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            date : moment(),
            name : ""
        }
    }

    render() {
        return <div>
            <img src="./back-arrow.svg" style={{ width : '30px'}} onClick={this.props.nav}/>
            <div style={{ display : 'flex', flexDirection : 'column', alignItems : 'center'}} className="addIngFlex" >
                <input placeholder="Ingredient Name" value={this.state.name} onChange={this.updateName}/>
                <DatePicker placeholderText="Click to select a date"
                            selected={this.state.date}
                            onChange={this.handleChange}
                            dateFormat="DD/MM/YYYY"/>
                <p style={{
                    borderStyle:'solid', padding : '5px'
                }}> Add </p>

            </div>

        </div>;
    }

    handleChange = (date) => {
        this.setState({date});
    }

    updateName = (e) => {
        this.setState({name: e.target.value});
    }
}
