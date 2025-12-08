import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes/routeIndex.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect('mongodb://localhost:27017/student_db')
    .then(() => console.log("Đã kết nối MongoDB thành công"))
    .catch(err => console.error("Lỗi kết nối MongoDB:", err));

