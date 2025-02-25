import jwt from 'jsonwebtoken'

const authenticateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '15d'
    })

    res.cookie('jwt', token, {
        maxAge: 15* 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax',
        
        
    })

    return token;
}

export default authenticateToken;