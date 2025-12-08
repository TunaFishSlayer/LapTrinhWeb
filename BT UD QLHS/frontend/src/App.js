import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import AddStudentForm from './component/AddStudentForm'; 
import EditStudentForm from './component/EditStudentForm'; 

const API_URL = 'http://localhost:5000/api/students';

export default function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [highlightId, setHighlightId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchStudents = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
      setError(null);
    } catch (err) {
      console.error('Lỗi khi lấy dữ liệu học sinh:', err);
      setError('Không thể tải dữ liệu. Vui lòng đảm bảo server backend đang chạy.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleEditClick = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateSuccess = () => {
    const idToHighlight = editingStudent._id;
    setEditingStudent(null); 
    fetchStudents();
    setHighlightId(idToHighlight);
    setTimeout(() => {setHighlightId(null);}, 3000);
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return; 
    try {
        await axios.delete(`${API_URL}/${deleteId}`);
        if (editingStudent && editingStudent._id === deleteId) {
            setEditingStudent(null);
        }
        fetchStudents();
        setDeleteId(null); 
    } catch (err) {
        console.error("Lỗi khi xóa:", err);
        alert("Có lỗi xảy ra khi xóa học sinh.");
        setDeleteId(null); 
    }
  };

  const getProcessedStudents = () => {
      let result = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      result.sort((a, b) => {
          if (sortOrder === 'asc') {
              return a.name.localeCompare(b.name);
          } else {
              return b.name.localeCompare(a.name);
          }
      });

      return result;
  };

  const finalStudents = getProcessedStudents();

  const toggleSort = () => {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Hệ Thống Quản Lý Học Sinh</h1>
      <div className="content-wrapper"> 
        <section className="add-section"> 
            {editingStudent ? (
                <EditStudentForm 
                    student={editingStudent} 
                    onUpdateSuccess={handleUpdateSuccess}
                    onCancel={() => setEditingStudent(null)}
                />
            ) : (
                <AddStudentForm onAddSuccess={fetchStudents} />
            )}
        </section>
        
        <h2 className="section-title">Danh Sách Học Sinh</h2>

        <div className="toolbar">
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Tìm kiếm theo tên..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div> 
            <button className="sort-btn" onClick={toggleSort}>
                {sortOrder === 'asc' ? 'Tên: A - Z' : 'Tên: Z - A'}
            </button>
        </div>

        {isLoading && <div className="loading-message">Đang tải dữ liệu học sinh...</div>}
        {error && <div className="error-message"><strong>Lỗi</strong><p>{error}</p></div>}

       {!isLoading && !error && finalStudents.length > 0 && (
          <ul className="student-list">
            {finalStudents.map((student, index) => {
              const isHighlighted = student._id === highlightId;
              return (
                <li key={student._id || index} className={`student-item ${isHighlighted ? 'highlight' : ''}`}>
                    <div className="student-info">
                        <strong>{student.name}</strong>
                        <span className="student-details">{' '}Tuổi: {student.age} {' | '} Lớp: {student.class}</span>
                    </div>
                    <div className="item-actions">
                        <button className="edit-btn" onClick={() => handleEditClick(student)}>Sửa</button>
                        <button className="delete-btn" onClick={() => openDeleteModal(student._id)}>Xóa</button>
                    </div>    
                </li>
              );
            })} 
          </ul>
        )}

        {!isLoading && !error && students.length > 0 && finalStudents.length === 0 && (
             <p className="empty-message">Không tìm thấy học sinh nào có tên "{searchTerm}".</p>
        )}

        {!isLoading && !error && students.length === 0 && (
          <p className="empty-message">Chưa có học sinh nào. Hãy thêm mới!</p>
        )}
      </div>

      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>            
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-title">Xác Nhận Xóa</h3>
                <p>Bạn có chắc chắn muốn xóa học sinh này không?</p>
                <div className="modal-actions">                                    
                  <button className="delete-btn" onClick={confirmDelete}>Đồng Ý Xóa</button>
                  <button className="cancel-btn" onClick={() => setDeleteId(null)}>Hủy Bỏ</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}