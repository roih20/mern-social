import express from 'express'
import auth from '../middleware/auth.js';
import {createPost, getPost, getUsersPost, deletePost, getPostById, commentPost, deleteCommentPost} from '../controllers/post.js'

const router = express.Router()

router.get('/', getPost)
router.post('/', auth, createPost)
router.get('/:username', getUsersPost)
router.get('/view-post/:id', getPostById);
router.post('/:id/comment-post', auth, commentPost)
router.delete('/:id/delete-comment/:commentId', auth, deleteCommentPost )
router.delete('/:id', auth, deletePost)





export default router;