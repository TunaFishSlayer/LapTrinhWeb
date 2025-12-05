const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/student_db') 
.then(() => console.log("Đã kết nối MongoDB thành công")) 
.catch(err => console.error("Lỗi kết nối MongoDB:", err));

// Định nghĩa routes
const Student = require('./src/model/Student'); 
app.get('/api/students', async (req, res) => { 
try { 
const students = await Student.find(); 
res.json(students); 
} catch (err) { 
res.status(500).json({ error: err.message }); 
} 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});