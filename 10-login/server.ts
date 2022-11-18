import express from 'express'
import path from 'path'
import fs from 'fs'


const app = express()
const port: number = Number(process.env.PORT) || 3000;
const __dirname: string = path.resolve();
const loginPagePath: string = path.join(__dirname, './00-references/utils/form.html')
const loginPage = fs.readFileSync(loginPagePath)

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 

app.get('/login', (req,res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write(loginPage)
})

app.post('/submit-form', (req, res) => { // path from the action inside the form.html
    const {username, password} = req.body
    
    console.log(username, password)
    res.end(`your username is ${username} and password is ${password}`)
})


app.listen(port, () => {console.log('listening')})