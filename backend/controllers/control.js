import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import authenticateToken from "../utils/generateToken.js"

export const register = async (req, res)=>{
    try {
        const { username, fullname, password, confirmPassword, gender } = req.body

        if( password !== confirmPassword ) return res.status(400).json({error: 'Passwords do not match'})

        const user = await User.findOne({username})

        if( user ) return res.status(400).json({error: 'Username already exists'})

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username} `
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username} `

        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)

        const newUser = new User({
            username,
            fullname,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male'? boyProfilePic : girlProfilePic
        })

        if(newUser){
            authenticateToken(newUser._id, res)
            await newUser.save()
    
            res.status(200).json({
                _id: newUser._id,
                username: newUser.username,
                fullname: newUser.fullname,
                profilePic: newUser.profilePic
            })
        } else{
            res.status(400).json({error: 'Failed to create user'})
        }
    } catch (error) {
        console.error("Error in register user")
        res.status(500).json({error:error.message})
    }
}

export const login = async (req, res)=>{
    try {
        const { username, password } = req.body
        const user = await User.findOne({username})
        
        if(!user) return res.status(404).json({error: 'User not found'})
        
        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!isMatch) return res.status(400).json({error: 'Invalid password'})

        authenticateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.error("error in login ", error.message)
    }
}


export const logout = (req, res)=>{
    try {
        res.cookie('jwt', "", { maxAge: 0 })
        res.status(200).json({message: "Logout successfully"})
    } catch (error) {
        console.log("error in logout", error.message)
    }
}