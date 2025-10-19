import React from "react";
import "./App.css";
import hauiLogo from "./assets/haui-logo.png";

function App() {
  return (
    <div className="app-grid">
      <div className="login-column">
        <h2 className="login-title">A2-COFFEE-HAUI</h2>
        <form className="login-form">
          <div className="form-row">
            <label htmlFor="username">Tên đăng nhập:</label>
            <input type="text" id="username" placeholder="Nhập tên đăng nhập..." />
          </div>
          <div className="form-row">
            <label htmlFor="password">Mật khẩu:</label>
            <input type="password" id="password" placeholder="Nhập mật khẩu..." />
          </div>
          <button type="submit">Đăng nhập</button>
          <button className="register" type="button">Đăng ký</button>
        </form>
      </div>

      <div className="logo-column">
        <img src={hauiLogo} alt="Logo HaUI" className="haui-logo" />
      </div>
    </div>
  );
}

export default App;