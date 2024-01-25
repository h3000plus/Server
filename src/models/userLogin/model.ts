import { Schema, model, Types } from 'mongoose';
import { IUserLogin } from '../../interfaces/userLogin.interface.js';

const UserLoginSchema = new Schema<IUserLogin>({
    userId: {type: Number, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
});

const UserLogin = model<IUserLogin>('user', UserLoginSchema);

export default UserLogin;