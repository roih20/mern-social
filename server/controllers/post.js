import PostModel from "../models/post.js";
import mongoose from 'mongoose'


export const getPost =  async (req, res) => {
    try {
        const posts = await PostModel.find()
        res.status(200).json(posts)

    } catch (error) {
        res.status(500).json({error})
    }
}

export const getPostById = async (req, res) => {
    const { id } = req.params

    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({error})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostModel({...post, creatorId: req.userId, createdAt: new Date().toISOString()})

    try {
        await newPost.save();

        res.status(201).json(newPost)

    } catch (error) {
        res.status(409).json({error})
    }
}

export const getUsersPost = async(req, res) => {

    const { username } = req.params;

    try {
        const userPost = await PostModel.find({creatorUsername: username}).sort({createdAt: -1})

        res.status(200).json(userPost)

    } catch (error) {
        res.status(409).json({error})
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;


    if(!mongoose.isValidObjectId(id)) return res.status(404).json({message: `doesn't exits the id: ${id}`})

    await PostModel.findByIdAndRemove(id);

    res.json({
        message: "Post deleted succesfully"

    })
}


export const commentPost = async (req, res) => {
    const {id} = req.params;
    const comment  = req.body

    if(!mongoose.isValidObjectId(id)) return res.status(404).json({message: 'No post with this id'})
   
    await PostModel.findById(id);

    const updatedPost = await PostModel.findByIdAndUpdate(id, {$push: {comments: {...comment, date: new Date().toISOString() }}}, {new: true})

    res.json(updatedPost)
}


export const deleteCommentPost = async(req, res) => {
    const {id, commentId} = req.params
    
    if(!mongoose.isValidObjectId(id)) return res.status(404).json({message: 'No post with this id'})

    await PostModel.findById(id)

    const updateComment = await PostModel.findByIdAndUpdate(id, {$pull: {comments: {_id: commentId}}}, {new: true})

    res.json({message: 'Comment deleted', updateComment})
}