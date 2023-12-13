// models/User.js
import mongoose from 'mongoose';

let UserModel;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: String,
});

if (mongoose.models.UserModel) {
    UserModel = mongoose.model('UserModel');
} else {
    UserModel = mongoose.model('UserModel', userSchema);
}

export default UserModel;
