import React, { Component } from "react";
import { data_shoes } from "./data_shoes";
import { Pagination, message } from "antd";
import { NavLink } from "react-router-dom";

import ItemShoe from "./ItemShoes";

export default class ExShoes extends Component {
  state = {
    shoes: data_shoes,
    gioHang: JSON.parse(localStorage.getItem("gioHang")) || [],
    currentPage: 1,
    pageSize: 3, // Set the number of items per page
  };

  // render ra màn h
  renderContent = () => {
    const { shoes, currentPage, pageSize } = this.state;
    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = currentPage * pageSize;
    const currentShoes = shoes.slice(startIdx, endIdx);

    return currentShoes.map((item, index) => (
      <div className="justify-content-center" key={index}>
        <ItemShoe
          handleAddToCart={this.handleAddToCart}
          data={item}
          key={`item-${index}`} // Use a unique key here
        />
      </div>
    ));
  };

  handleAddToCart = (shoe) => {
    let index = this.state.gioHang.findIndex((item) => item.id === shoe.id);
    let cloneGioHang = [...this.state.gioHang];

    if (index === -1) {
      let newSp = { ...shoe, soLuong: 1 };
      cloneGioHang.push(newSp);
      message.success("Thêm sản phẩm thành công");
    } else {
      message.success("Thêm sản phẩm thành công");
      cloneGioHang[index].soLuong++;
    }

    this.setState({ gioHang: cloneGioHang });
    localStorage.setItem("gioHang", JSON.stringify(cloneGioHang));
  };

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  render() {
    const { shoes, currentPage, pageSize } = this.state;
    const totalItems = shoes.length;

    return (
      <div className="container y-5">
        <h1 className="text-danger">Shoes Shop</h1>
        <h3>Home Page </h3>
        <h5>
          <NavLink className="text" to="/giohang">
            Shopping Cart
          </NavLink>{" "}
          Here!
        </h5>

        <div className="row">{this.renderContent()}</div>

        <div style={{ textAlign: "center" }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={this.handlePageChange}
            className="pagination"
          />
        </div>
      </div>
    );
  }
}