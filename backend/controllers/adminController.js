import validator from 'validator'
import bcrypt from 'bcryptjs'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

// API for add doctors

const addDoctor = async (req, res) => {

    try {
        const { name, email, password, speciality, experience, degree, about, fees, address } = req.body;
        const imageFile = req.file

        // check all details to be filled
        if (!name || !email || !password || !speciality || !experience || !degree || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        //validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" })
        }

        //validating password
        if (!validator.isStrongPassword(password)) {
            return res.json({ success: false, message: "Weak password" })
        }

        // hasing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to DB
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imgUrl = imageUpload.url

        // store the doctor data
        const doctorData = {
            name,
            email,
            image: imgUrl,
            password: hashedPassword,
            degree,
            speciality,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: "New doctor added" })

    } catch (error) {
        console.log(error);

    }
}

// API for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "invaild credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API for all doctors

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })
    } catch (error) {
        res.json({success:false, message:error.message})
    }

}


//API to get all appointments

const appointmentsAdmin = async(req,res) =>{
    try {
        
        const appointments = await appointmentModel.find({})
        res.json({success:true, appointments})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// API to cancel appointment

const appointmentCancel = async(req, res) =>{
    try {
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

        // releasing doctor slot
        const {docId, slotDate, slotTime} = appointmentData
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime)
         
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success:true, message:"Appointment Cancelled"})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data

const adminDashboard = async(req, res) =>{
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData ={
            doctors: doctors.length,
            patient: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true, dashData})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
export { addDoctor, adminLogin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard }