import User from "../models/userModel.js"

export const getMe = async(req,res)=>{
    try {
        const { _id: logginUser } = req.user
        const users = await User.find({
            _id:{
                $ne: logginUser
            }
        }).select('-password')

        res.status(200).json(users)
    } catch (error) {
        console.error("error in getting users",error.message)
        res.status(500).send(error)
    }
}