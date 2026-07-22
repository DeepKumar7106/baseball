import jwt from 'jsonwebtoken'

export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({error: "Please log in to proceed!"})
    }
    
    try {
        const SECRET = process.env.JWT_SECRET
        const decoded = jwt.verify(token, SECRET)
        req.user = decoded
        next()
        
    } catch (error) {
        return res.status(403).json({error: "Session expired or invalid token!"})
    }
}