import React, { Component } from 'react';
import './App.css';
import IngredientPage from './IngredientPage';

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
          { this.state.currentPage === ingredientPage ? < IngredientPage/> : < IngredientPage/> }
      </div>
    );
  }
}

export default App;
