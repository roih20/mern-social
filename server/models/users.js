import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;