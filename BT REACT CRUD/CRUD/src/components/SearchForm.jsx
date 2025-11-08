import React from 'react';
// Bước 3
// Tạo một form tìm kiếm với một ô nhập liệu
function SearchForm({ onChangeValue }) {
  return (
    <div className="search-form">
      <input
        type="text"
        placeholder="Tìm theo tên..."
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  );
}

export default SearchForm;