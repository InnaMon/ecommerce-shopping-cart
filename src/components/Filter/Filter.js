import React, { Component } from 'react';

class Filter extends Component {
    render() {
        return(
            <div className="row">
            
                <div className="col-md-4">
                    <p>{this.props.count} products found.</p>
                </div>

                <div className="col-md-4">
                    <label> 
                        Order By
                        <select className="form-control" value={this.props.sort}
                            onChange={this.props.handleChangeSort}>
                            <option value="">Select</option>
                            <option value="lowest">Lowest To Highest</option>
                            <option value="highest">Highest To Lowest</option>
                        </select>
                    </label> 
                </div>

                <div className="col-md-4">
                    <label> 
                        Filter Size
                        <select className="form-control" value={this.props.size}
                            onChange={this.props.handleChangeSize}>
                            <option value="">ALL</option>
                            <option value="x">XS</option>
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                            <option value="xl">XL</option>
                            <option value="xxl">XXL</option>
                        </select>
                    </label>
                </div>

            </div>
        )
    }
}

export default Filter; 