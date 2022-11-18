import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import fs from 'fs'
import path from 'path'
import { IuserDB } from '../iterfaces/IuserDB';
import { IuserModel } from '../iterfaces/IuserModel';

const __dirname: string = path.resolve();
const usersModelPath: string = path.join(__dirname, './11-authentication/model/usersModel.json');
const usersModel: string = fs.readFileSync(usersModelPath,{encoding: 'utf-8'});

const usersDB: IuserDB = {
    users: JSON.parse(usersModel),
    setUsers: function(data: IuserModel[]) {this.users = data}
}

export async function registerUser(req: Request, res: Response) {

    const {user, pwd} = req.body;

    if (!user || !pwd) {
      return  res.status(400).json({message: 'please, put a valid user and password'})
    }

    const duplicate: IuserModel | undefined = usersDB.users.find(person => person.username == user);
    if (duplicate) {
      return res.status(409).json({message: 'There is already a user with this name on the database'})
    }

    try {
        //encrypt password
        const hashPwd: string = await bcrypt.hash(pwd, 10);
        const newUSer: IuserModel = {username: user, password: hashPwd};
        usersDB.setUsers([...usersDB.users, newUSer]);

        fs.promises.writeFile(usersModelPath, JSON.stringify(usersDB.users))
        res.status(201).json({message: `user ${newUSer.username} created`})
    }
    catch(error: any) {
        res.status(500).json({message: error.message})
    }
}