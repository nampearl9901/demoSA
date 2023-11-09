import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, message } from 'antd';
import GioHang from './GioHang';

export default function GiohangPage() {
  const [gioHang, setGioHang] = useState([]);

  useEffect(() => {
    // Fetch shopping cart data from local storage on component mount
    const cartData = JSON.parse(localStorage.getItem('gioHang')) || [];
    setGioHang(cartData);
  }, []);  // Empty dependency array ensures it only runs on mount

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem('gioHang', JSON.stringify(cartData || []));
  };

  const calculateTotalPrice = () => {
    return gioHang.reduce((total, item) => total + item.soLuong * item.price, 0);
  };
  const handleClearCart = () => {
    setGioHang([]);
    saveCartToLocalStorage([]); // Clear and save the shopping cart in state
  
    // Additionally, clear the cart in local storage
    localStorage.removeItem('gioHang');
  };
  const handlePayment = () => {
    const paymentConfirmed = window.confirm("Bạn có muốn thực hiện thanh toán?");
  
    if (paymentConfirmed) {
      message.loading({ content: "Processing payment...", duration: 2 });
  
      setTimeout(() => {
        message.success("Thanh toán thành công. Cảm ơn bạn đã mua hàng!");
        handleClearCart();
      }, 2000);
    } else {
      message.info("Thanh toán bị hủy.");
    }
  };

  const handleChangeQuantity = (idShoe, quantityChange) => {
    setGioHang(prevGioHang => {
      const updatedGioHang = prevGioHang.map(shoe => {
        if (shoe.id === idShoe) {
          const newQuantity = shoe.soLuong + quantityChange;
  
          // Loại bỏ sản phẩm nếu số lượng trở thành 0 hoặc âm
          if (newQuantity <= 0) {
            return null; // Signal to filter out this item
          }
  
          return { ...shoe, soLuong: newQuantity };
        }
        return shoe;
      }).filter(Boolean); // Filter out null entries
  
      // Lưu vào local storage
      saveCartToLocalStorage(updatedGioHang);
  
      // Trả về state mới
      return updatedGioHang;
    });
  };

  return (
    <div className="container y-5">
      <h1 className="text-danger">Shoes Shop</h1>
      <h3>Giỏ Hàng Page</h3>
      <h5>
        <NavLink className="text" to="/home">
          Home Page
        </NavLink>{' '}
        Here!
      </h5>
      <div className="container">
        <div className="Cart">
          {gioHang.length > 0 ? (
            <div>
              <GioHang gioHang={gioHang} handleChangeQuantity={handleChangeQuantity} totalPrice={calculateTotalPrice()} />
              <Button onClick={handlePayment}>Thanh Toán</Button>
            </div>
          ) : (
            <p>
              Giỏ hàng không có sản phẩm.{' '}
              <NavLink className="text" to="/home">
                Quay Lại Mua Hàng
              </NavLink>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}