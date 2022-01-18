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

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostModel({...post, creator: req.name, creatorId: req.username, createdAt: new Date().toISOString()})

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
        const userPost = await PostModel.find({creatorId: username})

        res.status(200).json(userPost)

    } catch (error) {
        res.status(409).json({error})
    }
}
