import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'

// API to register

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid Email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Enter strong Password" })
        }

        // Validating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API TO LOGIN

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'user not found' })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }else{
            res.json({ success: false, message: 'Invalid Credintials' })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API to get User

const getUser = async(req, res) =>{
    try {
        
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({success:true, userData})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API to update user

const updateUser = async(req, res) =>{
    try {
        const {userId, name, phone, dob, address, gender} = req.body
        const imageFile = req.file
        
        if (!name || !phone || !dob || !gender) {
            return res.json({success:false, message:"Data Missing"})
        }

        await userModel.findByIdAndUpdate(userId, {name, phone, dob, gender, address:JSON.parse(address)})

        if (imageFile) {
            const uploadImage = cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
            const imgUrl = (await uploadImage).secure_url

            await userModel.findByIdAndUpdate(userId, {image:imgUrl})
        }

        res.json({success:true, message:"Profile Updated"})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, getUser, updateUser }