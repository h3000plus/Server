import express from 'express';
const router = express.Router();
import { Student } from '../models/st.model.js';
// get all students
router.get('/getStudents', async (req, res) => {
    try {
        const data = await Student.find({});
        console.log('Students received!');
        res.status(200).json(data);
    }
    catch (e) {
        console.log('Error get students...:', e);
    }
});
// post a student
router.post('/addStudent', async (req, res) => {
    try {
        const data = await Student.create(req.body);
        console.log('Added student...');
        res.status(200).json(data);
    }
    catch (e) {
        console.log('Error add a student :', e);
    }
});
// get a student
router.get('/:id', async (req, res) => {
    try {
        const data = await Student.findById(req.params.id);
        console.log('A student found..');
        res.status(200).json(data);
    }
    catch (e) {
        console.log('Error found for a student:', e);
    }
});
export default router;
//# sourceMappingURL=st.router.js.map