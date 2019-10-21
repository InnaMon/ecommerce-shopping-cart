import React, { Component } from 'react';

class Filter extends Component {
    render() {
        return(
            <div className="row">
                <div className="col-md-4"><p>{this.props.count} products found</p></div>
                <div className="col-md-4">
                    <label> 
                        Order By
                        <select className="form-control" value={this.props.sort}
                        onChange={this.props.handleChangeSort}>
                            <option value="">Select</option>
                            <option value="">Lowest To Highest</option>
                            <option value="">Highest To Lowest</option>
                        </select>
                    </label> 
                </div>
                <div className="col-md-4"></div>
            </div>
        )
    }
}

export default Filter; 