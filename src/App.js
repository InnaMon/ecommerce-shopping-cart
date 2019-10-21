import React, { Component } from 'react';
import Products from './components/Products/Products';
import './App.css';

class App extends Component { 
  state = {
    products: [],
    filteredProducts: []
  };

  componentDidMount() {
    fetch("http://localhost:8000/products")
        .then(response=> response.json())
        .then(data => this.setState({ 
          products: data,
          filteredProducts: data
        })
      );
  }

  render() {
    console.log('products', this.state);
    return (
      <div className="container">
        <h1>Ecommerce Shopping Cart Application</h1>
        <hr/>
        <div className="row">
          <div className="col-md-8">
            <Products 
              products={this.state.filteredProducts} 
              handleAddToCart={this.handleAddToCart}/>
          </div>
          <div className="col-md-4">
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// Can now use http://localhost:3000/products with FETCH method to retriece the json data 
