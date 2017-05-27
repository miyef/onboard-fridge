import React, { Component } from 'react';
import Fuse from 'fuse.js';
import moment from 'moment';
import FilterBar from './FilterBar';
import IngredientItem from './IngredientItem';
import AddButton from './AddButton';
import SortBar from './SortBar';

// For fuse
const options = {
    shouldSort: false,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['name', 'tags'],
};

const sort = (array, property, reverse) => {
    if (reverse) {
        array = array.sort((val1, val2) => val1[property] > val2[property]);
    } else {
        array = array.sort((val1, val2) => val1[property] < val2[property]);
    }
    return array;
};

class IngredientPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [
                {
                    name: 'Olives',
                    tags: ['Pizza', 'Snack'],
                    date: moment([2012, 4, 7]),
                },
                {
                    name: 'Apple',
                    tags: ['Fruit', 'Dessert'],
                    date: moment([2012, 0, 31]),
                },
                {
                    name: 'Banana',
                    tags: ['Fruit', 'Dessert'],
                    date: moment([2017, 11, 31]),
                },
                {
                    name: 'Pizza Crust',
                    tags: ['Pizza', 'Main'],
                    date: moment([2012, 0, 11]),
                },
            ],
            filter: '',
            sortBy: null,
        };
    }
    render() {
        return (
            <div>
                <div
                    style={{
                        margin: 'auto',
                        width: '70%',
                        textAlign: 'center',
                        marginTop: '30px',
                    }}
                    className="vertical-align"
                >
                    <FilterBar updateFilter={this.updateFilter} />
                    <AddButton nav={this.props.nav} />
                </div>
                <div className="ingredient-list">
                    <SortBar
                        toggleSort={this.toggleSort}
                        sortBy={this.state.sortBy}
                    />
                    {this.displayIngredients(this.state.filter)}
                </div>

            </div>
        );
    }

    displayIngredients = filter => {
        // do filtering with fuse based on state.filter

        const fuse = new Fuse(this.state.ingredients, options);
        // if no filter specified simply display the ingredients as in state.ingredients
        // we use .slice() to copy the array, copy which will be sorted (you don't want to modify the state).
        const result = filter !== ''
            ? fuse.search(this.state.filter)
            : this.state.ingredients.slice();

        switch (this.state.sortBy) {
            case 'nameup':
                sort(result, 'name', false);
                break;
            case 'namedown':
                sort(result, 'name', true);
                break;
            case 'dateup':
                sort(result, 'date', false);
                break;
            case 'datedown':
                sort(result, 'date', true);
                break;
            default:
                break;
        }

        if (result.length > 0) {
            return result.map(ingredient => (
                <IngredientItem ingredient={ingredient} key={ingredient.name} />
            ));
        }

        return (
            <p style={{ padding: '20px' }}> No ingredients found, sorry. </p>
        );
    };

    updateFilter = filter => {
        this.setState({ filter });
    };

    toggleSort = e => {
        const property = e.target.getAttribute('property');
        const className = e.target.className;
        const sortBy = property + className;
        if (this.state.sortBy === sortBy) {
            this.setState({ sortBy: null });
        } else {
            this.setState({ sortBy });
        }
    };
}

export default IngredientPage;
