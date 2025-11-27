import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userStore";
import "../App.css";
import hauiLogo from "../assets/haui-logo.png";


export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const username = form.username.value.trim();
    const password = form.password.value.trim();
    const confirm = form.confirm.value.trim();

    if (password !== confirm) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    const ok = addUser({ username, password });

    if (!ok) {
      alert("Tên đăng nhập đã tồn tại!");
      return;
    }

    alert("Đăng ký thành công! Hãy đăng nhập.");
    navigate("/");
  };

  return (
    <div className="app-grid">
      <div className="login-column">
        <h2 className="login-title">Đăng ký tài khoản</h2>

        <form className="login-form" onSubmit={handleRegister}>
          <div className="form-row">
            <label>Tên đăng nhập:</label>
            <input name="username" required placeholder="Nhập username..." />
          </div>

          <div className="form-row">
            <label>Mật khẩu:</label>
            <input name="password" type="password" required placeholder="Nhập mật khẩu..." />
          </div>

          <div className="form-row">
            <label>Xác nhận mật khẩu:</label>
            <input name="confirm" type="password" required placeholder="Nhập lại mật khẩu..." />
          </div>

          <button type="submit">Đăng ký</button>
          <button type="button" className="register" onClick={() => navigate("/")}>
            Quay về đăng nhập
          </button>
        </form>
      </div>
      <div className="logo-column">
              <img src={hauiLogo} alt="Logo HaUI" className="haui-logo" />
            </div>
    </div>
  );
}
