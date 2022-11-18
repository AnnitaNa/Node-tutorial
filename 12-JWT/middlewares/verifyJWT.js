import jwt from 'jsonwebtoken'

// I passa the token i received in login.controller RESPONSE as a bearer token at the request (auth => bearer)
export const verifyJWT = (req, res, next) => {

    const authHeader = req.headers['authorization'] 
    if (!authHeader) return res.sendStatus(401) //forbidden
    const token = authHeader.split(' ')[1]; //because it comes in the format => bearer token

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.username;
            next()
        }
    )
}