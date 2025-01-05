import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const protectRoute = async(req, res, next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({error: 'You are not logged in and dont have token'})

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return res.status(401).json({error:'Invalid token'})

        const user = await User.findById(decoded.userId).select('-password')

        if(!user) return res.status(401).json({msg: 'User not found'})

        req.user = user
        next()
    } catch (error) {
        console.error("Eerror in protect route",error.message)
    }
}

export default protectRoute;