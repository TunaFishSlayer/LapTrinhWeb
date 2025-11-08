import React, { useState, useEffect } from 'react';
import Modal from './Modal';
// Bước 4
// Hiển thị bảng kết quả người dùng với chức năng tìm kiếm
function ResultTable({ keyword = '', user, onAdd }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Thêm người dùng mới khi có thuộc tính `user` thay đổi từ bước 5
  React.useEffect(() => {
    if (user) {
      setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
      if (typeof onAdd === 'function') onAdd();
    }
  }, [user, onAdd]);

  const lowKw = (keyword || '').toLowerCase();

  // Lọc người dùng theo từ khóa
  const filteredUsers = users.filter((u) =>
    (u.name || '').toLowerCase().includes(lowKw) ||
    (u.username || '').toLowerCase().includes(lowKw) ||
    (u.email || '').toLowerCase().includes(lowKw)
  );

  // Bước 6
  // sửa tài khoản người dùng
  const editUser = (u) => {
    setEditing({ ...u, address: { ...(u.address || {}) } });
  };

  // Update trường
  const handleEditChange = (key, value) => {
    if (!editing) return;
    if (['street', 'suite', 'city'].includes(key)) {
      setEditing((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
    } else {
      setEditing((prev) => ({ ...prev, [key]: value }));
    }
  };

  // Lưu sau khi chỉnh sửa
  const saveUser = () => {
    if (!editing) return;
    setUsers((prev) => prev.map((u) => (u.id === editing.id ? editing : u)));
    setEditing(null);
  };
// Hủy chỉnh sửa
  const cancelEdit = () => setEditing(null);

  // Bước 7
  // Xóa người dùng
  const removeUser = (id) => {
    // giữ lại tất cả người dùng có id khác với id cần xóa
    setUsers((prev) => prev.filter((u) => u.id !== id));
    // Nếu chúng ta đang chỉnh sửa người dùng bị xóa, hủy chỉnh sửa
    setEditing((prev) => (prev && prev.id === id ? null : prev));
  };

  /*
    Edit form cũ trong bảng

    {editing && (
      <div className="edit-form">
        <h3>Chỉnh sửa người dùng (ID: {editing.id})</h3>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={editing.name || ''} onChange={(e) => handleEditChange('name', e.target.value)} />

        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={editing.username || ''} onChange={(e) => handleEditChange('username', e.target.value)} />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={editing.email || ''} onChange={(e) => handleEditChange('email', e.target.value)} />

        <label htmlFor="city">City</label>
        <input id="city" type="text" value={editing.address?.city || ''} onChange={(e) => handleEditChange('city', e.target.value)} />

        <div style={{ marginTop: 10 }}>
          <button onClick={saveUser}>Lưu</button>
          <button onClick={cancelEdit}>Hủy</button>
        </div>
      </div>
    )}
  */

  if (loading) return <div style={{ textAlign: 'center' }}>Loading...</div>;

  return (
    <div>
      {/* Edit form now inside modal */}
      <Modal open={!!editing} title={editing ? `Chỉnh sửa người dùng (ID: ${editing.id})` : ''} onClose={cancelEdit}>
        {editing && (
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={editing.name || ''} onChange={(e) => handleEditChange('name', e.target.value)} />

            <label htmlFor="username">Username</label>
            <input id="username" type="text" value={editing.username || ''} onChange={(e) => handleEditChange('username', e.target.value)} />

            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={editing.email || ''} onChange={(e) => handleEditChange('email', e.target.value)} />

            <label htmlFor="city">City</label>
            <input id="city" type="text" value={editing.address?.city || ''} onChange={(e) => handleEditChange('city', e.target.value)} />

            <div style={{ marginTop: 10 }}>
              <button onClick={saveUser}>Lưu</button>
              <button onClick={cancelEdit}>Hủy</button>
            </div>
          </div>
        )}
      </Modal>

      <table className="result-table" aria-label="Users table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.name}</td>
            <td>{u.username}</td>
            <td>{u.email}</td>
            <td>{u.address?.city || ''}</td>
            <td>
              <div className="actions">
                <button onClick={() => editUser(u)}>Sửa</button>
                <button onClick={() => removeUser(u.id)}>Xóa</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default ResultTable;