import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'


const changeAvailablity = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({success:true, message:"Availablity changed"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

const doctorList = async(req, res) =>{
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({success:true, doctors})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

// API for doctor login

const doctorLogin = async(req, res) =>{
    try {
        const {email, password} = req.body
        const doctor = await doctorModel.findOne({email})

        if (!doctor) {
            return res.json({success:false, message:"Invalid Credentials"})
        }
        
        const isMatch = await bcrypt.compare(password, doctor.password)

        if(isMatch) {
            const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET)
            res.json({success:true, token})
        }else{
            res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}


// API to get all doctor appointments for doc Panel

const docAppointment = async(req, res) =>{
    try {
        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})

        res.json({success:true, appointments})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

// API to mark completed appointment

const markCompleted = async(req, res) =>{
    try {
        const {docId, appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await  appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted:true})
            return res.json({success:true, message:'Appointment completed'})
        }else{
            return res.json({success:false, message:'Mark Failed'})
        }
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}


// API to cancel completed appointment

const markCancel = async(req, res) =>{
    try {
        const {docId, appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await  appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
            return res.json({success:true, message:'Appointment cancelled'})
        }else{
            return res.json({success:false, message:'cancellation Failed'})
        }
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

// API to get dashboard data for docotor panel
const doctorDashboard = async(req,res) =>{
    try {
        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})

        let earnings = 0
        appointments.map((item)=>{
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []
        appointments.map((item)=>{
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true, dashData})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

// API to get doctor profile for panel

const doctorProfile = async(req, res)=>{
    try {
        const {docId} = req.body
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({success:true, profileData})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

// API to update doctor profile on panel

const updateDocProfile = async(req, res) =>{
    try {
        const {docId, fees, address, available} = req.body
        await doctorModel.findByIdAndUpdate(docId, {fees, available, address})

        res.json({success:true, message:"Profile Updated"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}
export { changeAvailablity, doctorList, doctorLogin, docAppointment, markCompleted, markCancel, doctorDashboard, doctorProfile, updateDocProfile }