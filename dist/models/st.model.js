import mongoose from 'mongoose';
const student = new mongoose.Schema({
    name: String,
    grade: Number
});
const Student = mongoose.model('Student', student);
export { Student };
//# sourceMappingURL=st.model.js.map