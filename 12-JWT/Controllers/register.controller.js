import bcrypt from 'bcrypt'
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve();
const usersModelPath = path.join(__dirname, './model/usersModel.json')
const usersModel = fs.readFileSync(usersModelPath,{encoding: 'utf-8'})

const usersDB = {
    users: JSON.parse(usersModel),
    setUsers: function(data) {this.users = data}
}

export async function register(req, res) {

    const {user, pwd} = req.body;

    if (!user || !pwd) {
      return  res.status(400).json({message: 'please, put a valid user and password'})
    }

    const duplicate = usersDB.users.find(person => person.username == user)
    if (duplicate) {
      return res.status(409).json({message: 'There is already a user with this name on the database'})
    }

    try {
        //encrypt password
        const hashPwd = await bcrypt.hash(pwd, 10);
        const newUSer = {username: user, password: hashPwd};
        usersDB.setUsers([...usersDB.users, newUSer]);

        fs.promises.writeFile(usersModelPath, JSON.stringify(usersDB.users))
        res.status(201).json({message: `user ${newUSer.username} created`})
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
}