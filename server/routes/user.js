import express from 'express'

const router = express.Router()

import { signIn, signUp, deleteUser, updateUser} from '../controllers/user.js'
import auth from '../middleware/auth.js'


router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.patch('/updateUser/:id', auth, updateUser);
router.delete('/deleteUser/:id', auth, deleteUser);



export default router;