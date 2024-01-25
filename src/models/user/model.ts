import { Schema, model, Types } from 'mongoose';
import { IUser } from '../../interfaces/user.interface.js';
// import { getNextSequenceValue } from '../../utilities/nextSequence.js';


const UserSchema = new Schema<IUser>({
    name: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    image: {type: String, required: false}
});


// Middleware to auto-increment
// UserSchema.pre('save', async function (next) {
//     const doc = this;
//     if (!doc.userId) {
//         doc.userId = await getNextSequenceValue('userIdCounter');
//     }
//     next();
// });

const User = model<IUser>('user', UserSchema);

export default User;