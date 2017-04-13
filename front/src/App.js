import React, { Component } from 'react';
import './App.css';
import IngredientPage from './IngredientPage';
import AddIngredientPage from "./AddIngredientPage";

const ingredientPage = 'ingredientPage'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage : ingredientPage
        }
    }

    render() {
    return (
      <div className="App">
        <p style={ {fontSize : '24px', textAlign: 'center'} }>
          ON-BOARD FRIDGE
        </p>
          { this.state.currentPage === ingredientPage ? < IngredientPage nav={this.navigateToAddIngredient}/> : < AddIngredientPage nav={this.navigateToIngredientPage}/> }
      </div>
    );

  }

    navigateToAddIngredient = () => {
        this.setState({currentPage : 'AddIngredientPage'});
    }

    navigateToIngredientPage = () => {
        this.setState({currentPage : ingredientPage});
    }
}

export default App;
