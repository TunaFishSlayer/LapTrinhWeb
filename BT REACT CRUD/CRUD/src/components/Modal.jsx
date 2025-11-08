import React, { useEffect } from 'react';
// Bước 8
// Hiển thị modal để điền thông tin người dùng
export default function Modal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Đóng modal khi nhấn phím Escape
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    // không cho cuộn trang khi đang mở modal
    window.addEventListener('keydown', onKey);
    return () => {
    // khôi phục trạng thái cuộn trang ban đầu khi đóng modal
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onMouseDown={onClose} role="presentation">
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
