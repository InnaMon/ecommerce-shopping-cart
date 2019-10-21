import React, { Component } from 'react';

class Basket extends Component {
    render() {
        const {cartItems} = this.props; //same as this.props.cartItems but use Object destructuring 
        return (
            <div className="alert alert-info">
                {!cartItems.length ? "Basket is empty" : <div>You have {cartItems.length} products in your cart</div>}
                {cartItems.length > 0 &&
                    <div>
                        <ul>
                            {cartItems.map(item => 
                                <li>
                                    <b>{item.title}</b> x {item.count} = ${(item.price * item.count).toFixed(2)}
                                    <button className="btn btn-danger"
                                    onClick={e => this.props.handleRemoveFromCart(e, item)}
                                    >
                                    X
                                    </button>
                                </li>)}
                        </ul>
                        Total: ${cartItems.reduce((total, item) => (total + item.price*item.count).toFixed(2), 0)}
                    </div>
                }
            </div>
        )
    }
}

export default Basket;