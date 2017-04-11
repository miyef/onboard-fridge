import React, {Component} from 'react';
import Fuse from 'fuse.js';
import moment from 'moment'

const options = {
    shouldSort: false,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "name",
        "tags"
    ]
};


import FilterBar from './FilterBar';
import IngredientItem from './IngredientItem';
import AddButton from './AddButton';
import SortBar from './SortBar';

class IngredientPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients : [
                {name: "Olives", tags:['Pizza', 'Snack'], date : moment([2012, 4, 7])},
                {name: "Apple", tags:['Fruit', 'Dessert'],  date : moment([2012, 0, 31]) },
                {name: "Banana", tags:['Fruit', 'Dessert'],  date : moment([2017, 0, 31]) },
                {name: "Pizza Crust", tags:['Pizza', 'Main'],  date : moment([2012, 0, 11])}
            ],
            filter : "",
            name : { 'up' : 0, 'down' : 0 },
            date : { 'up' : 0, 'down' : 0 }
        }
    }
    render() {
        return (
            <div>
                <div style={{
                    'margin': 'auto',
                    'width': '70%',
                    'textAlign':'center'
                }} className="vertical-align">
                    <FilterBar updateFilter={ this.updateFilter } />
                    <AddButton/>
                </div>
                <SortBar toggleSort={ this.toggleSort } state={ this.state }/>
                { this.displayIngredients(this.state.filter) }
            </div>);
    }

    displayIngredients = (filter) =>{
        // do filtering with fuse based on state.filter
        
        const fuse = new Fuse(this.state.ingredients, options);
        // if no filter specified simply display the ingredients as in state.ingredients
        // we use .slice() to copy the array, copy which will be sorted (you don't want to modify the state).
        const result = filter!=="" ? fuse.search(this.state.filter) : this.state.ingredients.slice();

        if(this.state.name.up) {
            this.sort(result, "name", false)
        }
        if(this.state.name.down) {
            this.sort(result, "name", true)
        }
        if(this.state.date.up) {
            this.sort(result, "date", false)
        }
        if(this.state.date.down) {
            this.sort(result, "date", true)
        }

        if (result.length > 0) {
            return result.map((ingredient)=><IngredientItem ingredient={ingredient} key={ingredient.name}/>);
        }

        return <p> No ingredients found, sorry. </p>

    }

    sort = (array, property, reverse) => {
        if (reverse) {
            array = array.sort((val1, val2)=>val1[property] > val2[property]);
        } else {
            array = array.sort((val1, val2)=>val1[property] < val2[property]);
        }
        return array;
    }

    updateFilter = (filter) => {
        this.setState({filter});
    }

    toggleSort = (e) => {
        const property = e.target.getAttribute("property");
        const className = e.target.className;
        const state = {name : { 'up' : 0, 'down' : 0 },
            date : { 'up' : 0, 'down' : 0 }};
        state[property][className] = this.state[property][className] ? 0 : 1;
        this.setState(state);
    }


}


export default IngredientPage;