import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Thêm useNavigate
import "./Checkout.css";
import { getCart, clearCart } from "../utils/cartStore";
import { addOrder } from "../utils/orderHistoryStore";

export default function Checkout() {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    time: "",        
    note: "",
    payment: "cod"
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }

  const order = {
    id: "OD-" + Date.now(),
    items: cart,
    info,
    total: cart.reduce((t, it) => t + it.qty * it.price, 0),
    date: new Date().toLocaleString("vi-VN")
  };

  addOrder(order);    // Lưu vào lịch sử
  clearCart();        // Xóa giỏ hàng sau khi thanh toán

  alert("Đặt hàng thành công!");
  navigate("/order-history");
};

  return (
    <div className="checkout-container">
      <button className="back-btn" onClick={() => navigate("/cart")}>
        Quay lại giỏ hàng
      </button>

      <h2>Thông tin thanh toán</h2>

      <div className="checkout-form">
        <label>Họ và tên</label>
        <input name="name" value={info.name} onChange={handleChange} placeholder="Nguyễn Văn A" />

        <label>Email</label>
        <input name="email" type="email" value={info.email} onChange={handleChange} placeholder="example@gmail.com" />

        <label>Số điện thoại</label>
        <input name="phone" value={info.phone} onChange={handleChange} placeholder="0901234567" />

        <label>Địa chỉ giao hàng</label>
        <input name="address" value={info.address} onChange={handleChange} placeholder="Số nhà, đường, phường/xã..." />

        <label>Thời gian nhận hàng (ghi chú)</label>
        <input
          name="time"
          value={info.time}
          onChange={handleChange}
          placeholder="Ví dụ: Thứ 7 sau 14h, hoặc sáng Chủ nhật..."
        />

        <label>Ghi chú thêm</label>
        <textarea
          name="note"
          value={info.note}
          onChange={handleChange}
          rows="3"
          placeholder="Yêu cầu đặc biệt, chuông hỏng, gửi bưu điện..."
        ></textarea>

        <label>Phương thức thanh toán</label>
        <select name="payment" value={info.payment} onChange={handleChange}>
          <option value="cod">Thanh toán khi nhận hàng (COD)</option>
          <option value="bank">Chuyển khoản ngân hàng</option>
          <option value="momo">Momo</option>
          <option value="vnpay">VNPay</option>
        </select>

        <button className="confirm-btn" onClick={handleSubmit}>
          Xác nhận đặt hàng
        </button>
      </div>
    </div>
  );
}