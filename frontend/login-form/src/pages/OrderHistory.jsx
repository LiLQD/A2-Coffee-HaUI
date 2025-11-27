import { getHistory } from "../utils/orderHistoryStore";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.css";

export default function OrderHistory() {
  const orders = getHistory();
  const navigate = useNavigate();

  return (
    <div className="oh-wrapper">
      <div className="oh-header">
        <button className="oh-back-btn" onClick={() => navigate("/home")}>← Quay lại</button>
        <h2>Lịch sử đơn hàng</h2>
      </div>

      {orders.length === 0 ? (
        <div className="oh-empty">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Empty"
          />
          <p>Chưa có đơn hàng nào.</p>
        </div>
      ) : (
        <div className="oh-list">
          {orders.map(order => (
            <div key={order.id} className="oh-card">
              <div className="oh-card-head">
                <div>
                  <h3 className="oh-order-id">📦 Mã đơn: {order.id}</h3>
                  <p className="oh-date">🕒 {order.date}</p>
                </div>
                <div className="oh-total">
                  {order.total.toLocaleString()} đ
                </div>
              </div>

              <div className="oh-info">
                <p><b>Khách hàng:</b> {order.info.name}</p>
                <p><b>Địa chỉ:</b> {order.info.address}</p>
                <p><b>SĐT:</b> {order.info.phone}</p>
                <p><b>Thời gian nhận:</b> {order.info.time || "Không ghi chú"}</p>
              </div>

              <div className="oh-items">
                {order.items.map((it) => (
                  <div key={it.id} className="oh-item-row">
                    <img src={it.imageUrl} className="oh-item-img" />
                    <div className="oh-item-info">
                      <p className="oh-item-name">{it.name}</p>
                      <p className="oh-item-qty">Số lượng: {it.qty}</p>
                    </div>
                    <div className="oh-item-price">
                      {(it.qty * it.price).toLocaleString()} đ
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
