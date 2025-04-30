import express from 'express'
import {doctorList , doctorLogin, docAppointment, markCompleted, markCancel, doctorDashboard, doctorProfile, updateDocProfile } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'
const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.get('/appointments', authDoctor, docAppointment)
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)
doctorRouter.get('/profile', authDoctor, doctorProfile)

doctorRouter.post('/login', doctorLogin)
doctorRouter.post('/appointment-cancel', authDoctor, markCancel)
doctorRouter.post('/appointment-completed', authDoctor, markCompleted)
doctorRouter.post('/update-profile', authDoctor, updateDocProfile)


export default doctorRouter