import express from 'express'
import { registerUser, loginUser, getUser, updateUser, bookAppointment, listAppointments, cancelAppointment } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/get-user',authUser, getUser)
userRouter.get('/appointments', authUser, listAppointments)

userRouter.post('/update-profile', upload.single('image'), authUser, updateUser)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)

export default userRouter