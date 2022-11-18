import path from 'path'
import fs from 'fs'
import jwt from 'jsonwebtoken'

const __dirname = path.resolve();
const usersModelPath = path.join(__dirname, './model/usersModel.json');
const usersModel = fs.readFileSync(usersModelPath, {encoding: 'utf-8'});

const usersDB = {
    users: JSON.parse(usersModel),
    setUsers: function(data) { this.users = data}
}

export const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt  // automatically pick the token that i Passed by cookie when i logged in
    
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            
            const accessToken = jwt.sign(
                {username: decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30S'}
            )
            res.json({accessToken})
        }
    )
}