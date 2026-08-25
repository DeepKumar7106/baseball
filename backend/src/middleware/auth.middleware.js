import jwt from 'jsonwebtoken'

export const requireAuth = (req, res, next) => {
    // extracting the token
    const authHeader = req.headers['authorization']
    // [1] contains the actual string
    const token = authHeader && authHeader.split(' ')[1]

    // if the token doesnt exist, immediate return
    if (!token) {
        return res.status(401).json({error: "Please log in to proceed!"})
    }
    
    try {
        const SECRET = process.env.JWT_SECRET

        // decrypt the token recieved and verify 
        const decoded = jwt.verify(token, SECRET)
        req.user = decoded
        next()
        
    } catch (error) {
        return res.status(403).json({error: "Session expired or invalid token!"})
    }
}