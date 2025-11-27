import { useState } from "react";
import Papa from "papaparse";
import "./BulkImport.css";
import { getItems, addMany, updateItem, removeItem, clearItems } from "../utils/menuStore";

export default function BulkImport() {
  const [preview, setPreview] = useState([]);
  const [editing, setEditing] = useState(null);

  const downloadTemplate = () => {
    const csv = "name,price,category,description,imageUrl,available\n";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "template.csv";
    a.click();
  };

  const handleFile = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (res) => {
        setPreview(res.data.filter(r => r.name && r.price)); // lọc dòng rỗng
      }
    });
  };

  const commitImport = () => {
    const withId = preview.map((item) => ({
      id: crypto.randomUUID(),
      ...item,
      price: Number(item.price),
      available: item.available === "true"
    }));
    addMany(withId);
    alert("Đã thêm các món!");
    setPreview([]);
  };

  const resetMenu = () => {
    if (confirm("Xoá TẤT CẢ món?")) {
      clearItems();
      alert("Đã xoá sạch.");
    }
  };

  const saveEdit = () => {
    updateItem(editing.id, editing);
    setEditing(null);
  };

  return (
    <div className="bulk-import-container">

      <h2>Quản lý món (Import CSV + Sửa/Xoá)</h2>

      {/* ---- HÀNG NÚT ---- */}
      <div className="import-actions">
        <button className="import-btn" onClick={downloadTemplate}>📄 Tải file mẫu</button>

        <label className="import-btn">
          📂 Chọn file CSV
          <input type="file" accept=".csv" hidden onChange={(e) => handleFile(e.target.files[0])}/>
        </label>

        <button className="import-btn" onClick={resetMenu}>🗑 Reset menu</button>
      </div>

      {/* ---- PREVIEW ---- */}
      {preview.length > 0 && (
        <div>
          <h3>Dữ liệu sắp nhập:</h3>
          <button className="import-btn" onClick={commitImport}>✅ Thêm vào menu</button>
        </div>
      )}

      {/* ---- DANH SÁCH HIỆN CÓ ---- */}
<h3>Danh sách món hiện tại</h3>
<table className="import-table">
  <thead>
    <tr>
      <th>Tên</th>
      <th>Giá</th>
      <th>Danh mục</th>
      <th>Trạng thái</th>   {/* <-- THÊM CỘT MỚI */}
      <th>Ảnh</th>
      <th></th>
    </tr>
  </thead>

  <tbody>
    {getItems().map(item => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.category}</td>

        {/* === HIỂN THỊ AVAILABLE === */}
        <td style={{ fontWeight: "600", color: item.available ? "green" : "red" }}>
          {item.available ? "Còn hàng" : "Hết hàng"}
        </td>

        <td>{item.imageUrl ? "✅" : "⛔"}</td>

        <td className="table-actions">
          <button className="btn-edit" onClick={() => setEditing(item)}>Sửa</button>
          <button className="btn-delete" onClick={() => removeItem(item.id)}>Xoá</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

{/* ---- MODAL SỬA ---- */}
{editing && (
  <div className="modal">
    <div className="modal-content">
      <h3>Sửa món</h3>

      {/* Name */}
      <input 
        value={editing.name} 
        onChange={(e) => setEditing({ ...editing, name: e.target.value })} 
        placeholder="Tên món"
      />

      {/* Price */}
      <input 
        value={editing.price} 
        type="number" 
        onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} 
        placeholder="Giá"
      />

      {/* Category (select để sửa đẹp hơn) */}
      <select
        value={editing.category}
        onChange={(e) => setEditing({ ...editing, category: e.target.value })}
      >
        <option value="Đồ ăn">Đồ ăn</option>
        <option value="Đồ uống">Đồ uống</option>
        <option value="Tráng miệng">Tráng miệng</option>
        <option value="Pizza/Burger">Pizza/Burger</option>
        <option value="Món lẩu">Món lẩu</option>
        <option value="Sushi">Sushi</option>
        <option value="Mì phở">Mì phở</option>
        <option value="Cơm hộp">Cơm hộp</option>
      </select>

      {/* Description */}
      <textarea
        value={editing.description}
        onChange={(e) => setEditing({ ...editing, description: e.target.value })}
        placeholder="Mô tả món"
      />

      {/* imageUrl */}
      <input
        value={editing.imageUrl}
        onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
        placeholder="Link ảnh"
      />

      {/* === AVAILABLE === */}
      <select
        value={editing.available ? "true" : "false"}
        onChange={(e) =>
          setEditing({ ...editing, available: e.target.value === "true" })
        }
      >
        <option value="true">Còn hàng</option>
        <option value="false">Hết hàng</option>
      </select>

      <div className="modal-actions">
        <button className="btn-close" onClick={() => setEditing(null)}>Huỷ</button>
        <button className="btn-save" onClick={saveEdit}>Lưu</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
