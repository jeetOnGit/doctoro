import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async() =>{
    cloudinary.config({
        cloud_name: process.env.cloudinary_Name,
        Cloud_api: process.env.cloudinary_API,
        cloud_secret_key: process.env.cloudinary_Secret_key,

    })
}

export default connectCloudinary