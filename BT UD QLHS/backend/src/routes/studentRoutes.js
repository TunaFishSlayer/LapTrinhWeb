import express from 'express';
import Student from '../models/Student.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if(!student) {
            return res.status(404).json({ message: "Học sinh không tồn tại" });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedStu = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if(!updatedStu) {
            return res.status(404).json({ message: "Học sinh không tồn tại" });
        }
        res.json(updatedStu);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedStu = await Student.findByIdAndDelete(req.params.id);
        if(!deletedStu) {
            return res.status(404).json({ message: "Học sinh không tồn tại" });
        }
        res.json({ message: "Đã xóa học sinh" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;