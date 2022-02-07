import express from 'express'

const router = express.Router()

import { signIn, signUp, deleteUser, updateUser, changePassword, getOneUser} from '../controllers/user.js'
import auth from '../middleware/auth.js'


router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.patch('/updateUser/:id', auth, updateUser);
router.delete('/deleteUser/:id', auth, deleteUser);
router.patch('/changePassword/:id', auth, changePassword);
router.get('/:username', getOneUser)





export default router;