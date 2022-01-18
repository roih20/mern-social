import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    creator: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    creatorId: String

})

const PostModel = mongoose.model('Posts', postSchema)

export default PostModel;