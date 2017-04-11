import React, {Component} from 'react';
import Fuse from 'fuse.js';

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
                {name: "Olives", tags:['Pizza', 'Snack']},
                {name: "Apple", tags:['Fruit', 'Dessert'] },
                {name: "Banana", tags:['Fruit', 'Dessert'] },
                {name: "Pizza Crust", tags:['Pizza', 'Main']}
            ],
            filter : ""
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
                <SortBar />
                { this.displayIngredients(this.state.filter) }
            </div>);
    }

    displayIngredients = (filter) =>{
        // do filtering with fuse based on state.filter
        const fuse = new Fuse(this.state.ingredients, options);
        // if no filter specified simply display the ingredients as in state.ingredients
        const result = filter!=="" ? fuse.search(this.state.filter) : this.state.ingredients;

        if (result.length > 0) {
            return result.map((ingredient)=><IngredientItem ingredient={ingredient} key={ingredient.name}/>);
        }

        return <p> No ingredients found, sorry. </p>

    }

    updateFilter = (filter) => {
        this.setState({filter});
    }

    
}


export default IngredientPage;