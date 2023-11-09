import React, { Component } from "react";

export default class GioHang extends Component {
  rendertbody = () => {
    return this.props.gioHang.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.price}$</td>

          <td>
            <img style={{ width: 100 }} src={item.image} alt="" />
          </td>
          <td>
            <button
              onClick={() => {
                this.props.handleChangeQuantity(item.id, 1);
              }}
              className="btn btn-outline-warning"
            >
              +
            </button>
            <span className="px-5">{item.soLuong}</span>
            <button
              onClick={() => {
                this.props.handleChangeQuantity(item.id, -1);
              }}
              className="btn btn-outline-warning"
            >
              -
            </button>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Hình Ảnh</th>
              <th>Số Lượng</th>
            </tr>
          </thead>
          <tbody>{this.rendertbody()}</tbody>
        </table>
        <p>Total Price: {this.props.totalPrice}$</p>
      </div>
    );
  }
}