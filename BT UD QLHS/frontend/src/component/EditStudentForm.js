import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

export default function EditStudentForm({ student, onUpdateSuccess, onCancel }) {
    const [formData, setFormData] = useState({ name: '', age: '', class: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState(''); 

    useEffect(() => {
        if (student) {
            setFormData({ name: student.name, age: student.age, class: student.class });
            setSuccessMsg('');
            setError('');
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAgeKeyDown = (e) => {
        if (["e", "E", "+", "-", "."].includes(e.key)) {
            e.preventDefault();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccessMsg('');

        try {
            await axios.put(`${API_URL}/${student._id}`, formData);
            setSuccessMsg('Cập nhật thông tin thành công!');
            setTimeout(() => { onUpdateSuccess(); }, 1000); 
        } catch (err) {
            console.error('Lỗi cập nhật:', err);
            setError('Có lỗi xảy ra khi cập nhật thông tin.');
            setIsSubmitting(false); 
        }
    };

    return (
        <div className="form-container edit-mode">
            <h3 className="form-title">Sửa Thông Tin Học Sinh</h3>
            {error && <p className="form-error">{error}</p>}
            {successMsg && <div className="form-success">{successMsg}</div>}
            
            <form onSubmit={handleSubmit} className="student-form">
                <div className="form-group">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="Họ tên" disabled={!!successMsg} />
                </div>
                <div className="form-group-row">
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        onKeyDown={handleAgeKeyDown} 
                        className="form-input"
                        placeholder="Tuổi"
                        disabled={!!successMsg}
                    />
                    <input type="text" name="class" value={formData.class} onChange={handleChange} className="form-input" placeholder="Lớp" disabled={!!successMsg} />
                </div>
                
                <div className="form-actions">
                    <button type="submit" className="submit-btn" disabled={isSubmitting || !!successMsg}>
                        {successMsg ? 'Đã Lưu Xong' : (isSubmitting ? 'Đang lưu...' : 'Lưu Thay Đổi')}
                    </button>
                    <button type="button" className="cancel-btn" onClick={onCancel} disabled={!!successMsg}>Hủy Bỏ</button>
                </div>
            </form>
        </div>
    );
}