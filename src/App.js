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
    // fetch("http://localhost:8000/products")
    //     .then(response=> response.json())
    //     .then(data => this.setState({ 
    //       products: data,
    //       filteredProducts: data
    //     })
    //   );
    fetch("https://my-json-server.typicode.com/InnaMon/ecommerce-shopping-cart/products")
      .then(response=> response.json())
      .then(data => this.setState({ 
        products: data,
        filteredProducts: data
      })
    );
    if(localStorage.getItem('cartItems')) {
      this.setState({cartItems: JSON.parse(localStorage.getItem('cartItems'))}) 
      // returns valued saved under the 'cartItems' key
    } 
    // fetches from localStorage the saved basket and then parses string into JS object, now data does not dissapear upon every page refresh
  }

  listProducts = () => {
    this.setState(state => {
      if(state.sort) { //if a sort value is present
        state.products.sort((a,b) => //compare two items in product array at a time  
          (state.sort === 'lowest'
          ? ((a.price > b.price) ? 1 : -1) //if 'lowest' value selected, compare item prices in porduct array and if a > b then return that item first, otherwise return last 
          : ((a.price < b.price) ? 1 : -1))) //otherwise sort the 'highest' value filter
      } else {
        state.products.sort((a,b) => (a.id > b.id) ? 1 : -1); //sorting product array by id is default mode 
      }
      if(state.size) {
        return { filteredProducts: state.products.filter(a => 
          a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
        )} //filter array returns new array, a is each object item in products array, and what follow is the condition: return all products that have the state.size selected
      }
      return {filteredProducts: state.products}; //by default if no size is chosen then return all state.products
    });
  }

  handleChangeSort = e => {
    this.setState({sort: e.target.value}); //sort filter value options: lowerst, highest, or select(default)
    this.listProducts();
  }

  handleChangeSize = e => {
    this.setState({size: e.target.value}); //size will either be: XS, S, M, L, XL, or XXL
    this.listProducts();
  }

  handleAddToCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems; //initially an empty array
      let productAlreadyInCart = false;

      cartItems.forEach(item => {
        if(item.id === product.id){
          productAlreadyInCart = true;
          item.count++;
        }
      });

      if(!productAlreadyInCart) {
        cartItems.push({...product, count: 1}); //add the selected product object into the cartItems array along with the count property
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
      //saves cartItem value inside the key of "cardItems"(name of localStorage item), must be saved as a string
      return { cartItems: cartItems };
    });
    console.log('cartItems', this.state.cartItems);
  }

  handleRemoveFromCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems;
      if(product.count > 1) {
        cartItems.forEach(item => {
          if(item.id === product.id){
            item.count--;
          }
        });
      } else {
        return {cartItems: cartItems.filter(item => item.id !== product.id)}; //returns a new array of all cartItems that EXCLUDE the selected product
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {cartItems};
    })
    console.log('local sotrage cartItems', this.state.cartItems)
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
