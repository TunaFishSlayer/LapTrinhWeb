import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

export default function AddStudentForm({ onAddSuccess }) {
    const [formData, setFormData] = useState({ name: '', age: '', class: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

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

        if (!formData.name || !formData.age || !formData.class) {
            setError('Vui lòng điền đầy đủ thông tin.');
            setIsSubmitting(false);
            return;
        }

        try {
            await axios.post(API_URL, formData);
            setFormData({ name: '', age: '', class: '' });
            if (onAddSuccess) onAddSuccess();
            setSuccessMsg('Thêm học sinh thành công!');
            setTimeout(() => { setSuccessMsg(''); }, 2000);
        } catch (err) {
            console.error('Lỗi thêm học sinh:', err);
            setError('Có lỗi xảy ra khi thêm học sinh.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <h3 className="form-title">Thêm Học Sinh Mới</h3>
            {error && <p className="form-error">{error}</p>}
            {successMsg && <div className="form-success">{successMsg}</div>}
            
            <form onSubmit={handleSubmit} className="student-form">
                <div className="form-group">
                    <input type="text" name="name" placeholder="Họ và tên" value={formData.name} onChange={handleChange} className="form-input" />
                </div>
                <div className="form-group-row">
                    <input
                        type="number"
                        name="age"
                        placeholder="Tuổi"
                        value={formData.age}
                        onChange={handleChange}
                        onKeyDown={handleAgeKeyDown} 
                        className="form-input"
                        min="1"
                    />
                    <input type="text" name="class" placeholder="Lớp" value={formData.class} onChange={handleChange} className="form-input" />
                </div>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang xử lý...' : 'Thêm Học Sinh'}
                </button>
            </form>
        </div>
    );
}