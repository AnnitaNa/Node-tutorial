import bcrypt from 'bcrypt'
import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

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

        // * create JWT

        const accessToken = jwt.sign(
            {username: foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '60s'}
        )

        const refreshToken = jwt.sign(
            {'username': foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )

        // * save refresh token with current user

        const otherUsers = usersDB.users.filter (person => person.username !== foundUser.username);
        const currentUser = {...foundUser, refreshToken};

        usersDB.setUsers([...otherUsers, currentUser]);
        await fs.promises.writeFile(usersModelPath, JSON.stringify(usersDB.users));

        res.cookie('jwt', refreshToken, cookieConfig);
        res.setHeader('credentials', 'include')

        res.json(accessToken) // this is the token i need to copy when i want to test if i can enter the page
    } else {
        res.sendStatus(401);
    }
}