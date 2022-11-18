import bcrypt from 'bcrypt'
import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'

import {cookieConfig} from '../cookieConfig.js'

const __dirname = path.resolve();
const usersModelPath = path.join(__dirname, './model/usersModel.json');
const usersModel = fs.readFileSync(usersModelPath, {encoding:'utf-8'});

const usersDB = {
    users: JSON.parse(usersModel),
    setUsers: function(data) {this.users = data}
}


export async function login (req, res) {
    const {user, pwd} = req.body;

    if(!user || !pwd) {
        return res.status(400).json({message: 'please, put a valid user and password'});
    }

    const foundUser =  usersDB.users.find(us => us.username == user);

    if(!foundUser) {
        return res.sendStatus(401);
    }

    const comparePwd = await bcrypt.compare(pwd, foundUser.password);

    if(comparePwd) {
        const rolesCode = Object.values(foundUser.roles);

        const accessToken = jwt.sign(
            {userInfo: {
                username: foundUser.username,
                roles: rolesCode
            }},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '120s'}
        )

        const refreshToken = jwt.sign(
            {'username': foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )

        const otherUsers = usersDB.users.filter (person => person.username !== foundUser.username);
        const currentUser = {...foundUser, refreshToken};

        usersDB.setUsers([...otherUsers, currentUser]);
        await fs.promises.writeFile(usersModelPath, JSON.stringify(usersDB.users));

        res.cookie('jwt', refreshToken, cookieConfig);
        res.setHeader('credentials', 'include')

        res.json(accessToken) 
    } else {
        res.sendStatus(401);
    }
}