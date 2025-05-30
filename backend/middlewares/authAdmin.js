import jwt from 'jsonwebtoken'

//admin auithentication 

const authAdmin = async(req, res, next) =>{
    try {
        const admintoken = req.headers["admintoken"];
        if (!admintoken) {
            return res.json({success:false, message:"Not authorized, try again"})
        }

        const tokenDecode = jwt.verify(admintoken, process.env.JWT_SECRET)

        if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success:false, message:"Not authorized, try again"})
        }
        next()
    } catch (error) {
        console.log(error);
        return res.json({success:false, message:error.message})
    }
}

export default authAdmin