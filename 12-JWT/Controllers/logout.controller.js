import path from 'path'
import fs from 'fs'

import {cookieConfig} from '../cookieConfig.js';

const __dirname = path.resolve();
const usersModelPath = path.join(__dirname, './model/usersModel.json');
const usersModel = fs.readFileSync(usersModelPath, {encoding: 'utf-8'});

const usersDB = {
    users: JSON.parse(usersModel),
    setUsers: function(data) {return this.users = data}
}

export const logout  = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    //is there refreshToken on your user's database?
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (foundUser) {
       //delete refresh token on database
        const otherUsers = usersDB.users.filter(person => person.refreshToken !== refreshToken);
        const logoutUser = {...foundUser, refreshToken: ''};
        usersDB.setUsers([...otherUsers, logoutUser]);

        await fs.promises.writeFile(usersModelPath, JSON.stringify(usersDB.users));
    }

    //clear cookies
    res.clearCookie(
        'jwt', 
        cookieConfig //same of when I created the cookie
    ) 
    res.sendStatus(204);
}