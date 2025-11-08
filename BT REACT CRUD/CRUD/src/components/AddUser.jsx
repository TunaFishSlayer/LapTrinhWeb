import React from "react";
import Modal from "./Modal";
// Bước 5
// Tạo một form thêm người dùng mới 
/*
  Trước khi dùng Modal

  function AddUser_old({ onAdd }) {
    const [adding, setAdding] = React.useState(false);
    const [user, setUser] = React.useState({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: ""
    });

    const handleChange = (e) => {
      const { id, value } = e.target;
      if (["street", "suite", "city"].includes(id)) {
        setUser((prev) => ({ ...prev, address: { ...prev.address, [id]: value } }));
      } else {
        setUser((prev) => ({ ...prev, [id]: value }));
      }
    };

    const handleAdd = () => {
      if (user.name === "" || user.username === "") {
        alert("Vui lòng nhập Name và Username!");
        return;
      }
      onAdd(user);
      setUser({
        name: "",
        username: "",
        email: "",
        address: { street: "", suite: "", city: "" },
        phone: "",
        website: ""
      });
      setAdding(false);
    };

    return (
      <div>
        <button onClick={() => setAdding(true)}>Thêm</button>
        {adding && (
          <div>
            <h4>Thêm người dùng</h4>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" value={user.name} onChange={handleChange} />
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" value={user.username} onChange={handleChange} />
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" value={user.email} onChange={handleChange} />
            <fieldset>
              <legend>Address</legend>
              <label htmlFor="street">Street:</label>
              <input id="street" type="text" value={user.address.street} onChange={handleChange} />
              <label htmlFor="suite">Suite:</label>
              <input id="suite" type="text" value={user.address.suite} onChange={handleChange} />
              <label htmlFor="city">City:</label>
              <input id="city" type="text" value={user.address.city} onChange={handleChange} />
            </fieldset>
            <div style={{ marginTop: 10 }}>
              <button onClick={handleAdd}>Lưu</button>
              <button onClick={() => setAdding(false)}>Hủy</button>
            </div>
          </div>
        )}
      </div>
    );
  }

*/

function AddUser({ onAdd }) {
  const [adding, setAdding] = React.useState(false);
  const [user, setUser] = React.useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id)) {
      setUser((prev) => ({ ...prev, address: { ...prev.address, [id]: value } }));
    } else {
      setUser((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleAdd = () => {
    if (user.name === "" || user.username === "") {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    onAdd(user);
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
    });
    setAdding(false);
  };

  return (
    <div>
      <button onClick={() => setAdding(true)}>Thêm</button>
      <Modal open={adding} title="Thêm người dùng" onClose={() => setAdding(false)}>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" value={user.name} onChange={handleChange} />

        <label htmlFor="username">Username:</label>
        <input id="username" type="text" value={user.username} onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input id="email" type="email" value={user.email} onChange={handleChange} />

        <fieldset>
          <legend>Address</legend>

          <label htmlFor="street">Street:</label>
          <input id="street" type="text" value={user.address.street} onChange={handleChange} />

          <label htmlFor="suite">Suite:</label>
          <input id="suite" type="text" value={user.address.suite} onChange={handleChange} />

          <label htmlFor="city">City:</label>
          <input id="city" type="text" value={user.address.city} onChange={handleChange} />
        </fieldset>
        <div style={{ marginTop: 10 }}>
          <button onClick={handleAdd}>Lưu</button>
          <button onClick={() => setAdding(false)}>Hủy</button>
        </div>
      </Modal>
    </div>
  );
}

export default AddUser;
