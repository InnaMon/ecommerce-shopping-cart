import React, { Component } from 'react';
import Products from './components/Products/Products';
import Filter from './components/Filter/Filter';
import Basket from './components/Basket/Basket';
import './App.css';

class App extends Component { 
  state = {
    products: [],
    filteredProducts: [],
    cartItems: [],
    size: '',
    sort: ''
  };

  componentDidMount() {
    fetch("http://localhost:8000/products")
        .then(response=> response.json())
        .then(data => this.setState({ 
          products: data,
          filteredProducts: data
        })
      );
    if(localStorage.getItem('cartItems')) {
      this.setState({cartItems: JSON.parse(localStorage.getItem('cartItems'))})
    } //fetches from localStorage the saved basket and then parses string into JS object, now data does not dissapear upon every page refresh
  }

  listProducts = () => {
    this.setState(state => {
      if(state.sort) {
        state.products.sort((a,b) => 
          (state.sort === 'lowest'
          ? ((a.price > b.price) ? 1 : -1) 
          : ((a.price < b.price) ? 1 : -1)))
      } else {
        state.products.sort((a,b) => (a.id > b.id) ? 1 : -1);
      }
      if(state.size) {
        return { filteredProducts: state.products.filter(a => 
          a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
        )}
      }
      return {filteredProducts: state.products};
    });
  }

  handleChangeSort = e => {
    this.setState({sort: e.target.value});
    this.listProducts();
  }

  handleChangeSize = e => {
    this.setState({size: e.target.value});
    this.listProducts();
  }

  handleAddToCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(item => {
        if(item.id === product.id){
          productAlreadyInCart = true;
          item.count++;
        }
      });

      if(!productAlreadyInCart) {
        cartItems.push({...product, count: 1});
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems)); //saves cartItems inside the key of "cardItems"
      return { cartItems: cartItems };
    });
  }

  handleRemoveFromCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter(item => item.id !== product.id);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {cartItems};
    })
  }

  render() {
    console.log('products', this.state);
    return (
      <div className="container">
        <h1>Ecommerce Shopping Cart Application</h1>
        <hr/>
        <div className="row">

          <div className="col-md-8">
            <Filter 
            size={this.state.size} 
            sort={this.state.sort} 
            handleChangeSize={this.handleChangeSize} 
            handleChangeSort={this.handleChangeSort}
            count={this.state.filteredProducts.length}/>
            <hr/>
            <Products 
              products={this.state.filteredProducts} 
              handleAddToCart={this.handleAddToCart}/>
          </div>

          <div className="col-md-4">
            <Basket 
              cartItems={this.state.cartItems}
              handleRemoveFromCart={this.handleRemoveFromCart}/>
          </div>

        </div>
      </div>
    );
  }
}

export default App;

// Can now use http://localhost:3000/products with FETCH method to retriece the json data 
