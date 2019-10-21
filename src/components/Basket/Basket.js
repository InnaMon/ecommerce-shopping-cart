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
                                    <b>{item.title}</b> x {item.count}
                                    <button className="btn btn-danger"
                                    onClick={e => this.props.handleRemoveFromCart(e, item)}
                                    >
                                    X
                                    </button>
                                </li>)}
                        </ul>
                    </div>
                }
            </div>
        )
    }
}

export default Basket;