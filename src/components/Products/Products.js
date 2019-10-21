import React, { Component } from 'react';

class Products extends Component {
    render() {
        const productItems = this.props.products.map(product => {
            return (
                <div className="col-md-4">
                    <div className="thumbnail text-center">
                        <a href={`#${product.id}`} onClick={this.props.handleAddToCart}>
                            <img src={`/products/${product.sku}_2.jpg`} alt={product.title} />
                            <p>{product.title}</p>
                        </a>
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