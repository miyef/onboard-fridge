import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';


export default class AddIngredientPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            date : moment(),
            name : "",
            tags : []
        }
    }

    render() {
        return <div>
            <img src="./back-arrow.png" style={{ width : '30px'}} onClick={this.props.nav} alt="Back"/>
            <div style={{ display : 'flex', flexDirection : 'column', alignItems : 'center'}} className="addIngFlex" >
                <input placeholder="Ingredient Name" value={this.state.name} onChange={this.updateName}/>
                <DatePicker placeholderText="Click to select a date"
                            selected={this.state.date}
                            onChange={this.handleChange}
                            dateFormat="DD/MM/YYYY"
                            disabledKeyboardNavigation={true}/>
                <TagsInput value={this.state.tags} onChange={this.handleChangeTags} />
                <p style={{ padding : '5px 10px 5px 10px'}} className="button"> Add </p>

            </div>

        </div>;
    }

    handleChange = (date) => {
        this.setState({date});
    }

    handleChangeTags = (tags) => {
        this.setState({tags});
    }

    updateName = (e) => {
        this.setState({name: e.target.value});
    }
}
