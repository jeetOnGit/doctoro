import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'

// API for add doctors

const addDoctor = async(req, res) =>{

    try {
        const { name, email, password, speciality, experience, degree, about, fees, address } = req.body; 
        const imageFile = req.file
        
        // check all details to be filled
        if (!name || !email || !password || !speciality || !experience || !degree || !about || !fees || !address) {
            return res.json({success: false, message:"Missing Details"})
        }
        
        //validating email
        if (!validator.isEmail(email)) {
            return res.json({success: false, message:"Enter a valid email"})
        }

        //validating password
        if (!validator.isStrongPassword(password)) {
            return res.json({success: false, message:"Weak password"})
        }

        // hasing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to DB
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imgUrl = imageUpload.url

        // store the doctor data
        const doctorData ={
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

        res.json({success:true, message:"New doctor added"})

    } catch (error) {
        console.log(error);
        
    }
}

// API for admin login
const adminLogin = async(req,res) =>{
    try {
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export {addDoctor, adminLogin}