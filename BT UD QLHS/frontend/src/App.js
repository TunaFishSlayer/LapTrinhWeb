import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/students';

/**
 * Main application component to fetch and display student data.
 * @returns {JSX.Element}
 */
export default function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(API_URL);
        setStudents(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load student data. Please ensure the backend server is running on http://localhost:5000.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">
        Student Management Dashboard
      </h1>
      <p className="app-subtitle">
        Data fetched from: <code>{API_URL}</code>
      </p>

      <div className="content-wrapper">
        <h2 className="section-title">
          Student List
        </h2>

        {/* Conditional Rendering based on state */}
        {isLoading && (
          <div className="loading-message">
            Loading student data...
          </div>
        )}

        {error && (
          <div className="error-message">
            <strong>Error</strong>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && students.length > 0 && (
          <ul className="student-list">
            {students.map((student, index) => (
              // Use a combined key for safety if _id might be missing or non-unique
              // (though _id is standard for MongoDB)
              <li key={student._id || index} className="student-item">
                <strong>{student.name}</strong>
                <span className="student-details">
                  {' '}Age: {student.age} {' | '} Class: {student.class}
                </span>
              </li>
            ))}
          </ul>
        )}

        {!isLoading && !error && students.length === 0 && (
          <p className="empty-message">
            No students found in the database.
          </p>
        )}
      </div>
    </div>
  );
}