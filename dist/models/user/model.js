import { Schema, model } from 'mongoose';
// import { getNextSequenceValue } from '../../utilities/nextSequence.js';
const UserSchema = new Schema({
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String, required: false }
});
// Middleware to auto-increment
// UserSchema.pre('save', async function (next) {
//     const doc = this;
//     if (!doc.userId) {
//         doc.userId = await getNextSequenceValue('userIdCounter');
//     }
//     next();
// });
const User = model('user', UserSchema);
export default User;
//# sourceMappingURL=model.js.map