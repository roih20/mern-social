import express from 'express'
import auth from '../middleware/auth.js';
import {createPost, getPost, getUsersPost} from '../controllers/post.js'

const router = express.Router()

router.get('/', getPost)
router.post('/', auth, createPost)
router.get('/:username', getUsersPost)



export default router;