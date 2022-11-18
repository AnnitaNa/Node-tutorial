import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import fs from 'fs'
import path from 'path'
import { IuserDB } from '../iterfaces/IuserDB';
import { IuserModel } from '../iterfaces/IuserModel';

const __dirname: string = path.resolve();
const usersModelPath: string = path.join(__dirname, './11-authentication/model/usersModel.json')
const usersModel: string = fs.readFileSync(usersModelPath, {encoding:'utf-8'});

const usersDB: IuserDB = {
    users: JSON.parse(usersModel),
    setUsers: function (data: IuserModel[]) { return this.users = data }
}

export async function loginUser(req: Request, res: Response){
    const {user, pwd} = req.body;

    if(!user || !pwd) {
        return res.status(400).json({message: 'please, put a valid user and password'});
    }

    const foundUser: IuserModel | undefined = await usersDB.users.find((users:IuserModel) => users.username = user);
    if(!foundUser) {
        return res.sendStatus(401);
    }

    const comparePwd: boolean = await bcrypt.compare(pwd, foundUser.password);
    comparePwd 
    ? res.json({ 'success': `User ${user} is logged in!` })
    : res.sendStatus(401)
}