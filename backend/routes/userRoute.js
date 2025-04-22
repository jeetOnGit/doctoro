import express from 'express'
import { registerUser, loginUser, getUser, updateUser } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/get-user',authUser, getUser)
userRouter.post('/update-profile', upload.single('image'), authUser, updateUser)

export default userRouter