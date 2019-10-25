import React, { Component } from 'react';

class Products extends Component {
    render() {
        const productItems = this.props.products.map(product => {
            return (
                <div className="col-md-4" key={product.id}>
                    <div className="thumbnail text-center">
                        <a href={`#${product.id}`} onClick={e => this.props.handleAddToCart(e, product)}>
                            <img src={`./products/${product.sku}_2.JPG`} alt={product.title} />
                            <p>{product.title}</p>
                        </a>
                        <div>
                            <b>${product.price.toFixed(2)}</b>
                            <button 
                                className="btn btn-primary" 
                                onClick={e => this.props.handleAddToCart(e, product)}>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            )
          }
        )
        return (
            <div className="row">
                {productItems}
            </div>
        )
    }
}

export default Products;