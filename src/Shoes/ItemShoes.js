import React, { Component } from "react";

export default class ItemShoe extends Component {
  render() {
    let { image, name, price } = this.props.data;
    return (
      <div className="col-3 m-5 ">
        <div
          className="card  shadow-lg p-3 mb-5 bg-white rounded"
          style={{ width: "15rem" }}
        >
       <img
  className="card-img-top w-100 h-100 shadow-lg p-3 mb-5 bg-white rounded"
  src={image}
  alt={`${name} shoe`}
/>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{price}$</p>
            <button
  onClick={() => {
    this.props.handleAddToCart(this.props.data);
  }}
  className="btn btn-outline-dark shadow"
>
  Add to cart <i className="fa fa-cart-plus"></i>
</button>
          </div>
        </div>
      </div>
    );
  }
}