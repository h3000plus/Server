import { Schema, model } from 'mongoose';
const UserLoginSchema = new Schema({
    userId: { type: Number, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
});
const UserLogin = model('user', UserLoginSchema);
export default UserLogin;
//# sourceMappingURL=model.js.map