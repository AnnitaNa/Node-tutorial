import express, { Request, Response } from 'express'
import path from 'path'

const app = express();
const homePagePath = './src/utils/homePage.html'

//setup static and middleware
app.use(express.static('../src/utils')) // all files from this folder will respond in the request, we don't need to make one for each one of them

 // ex.: localhost:3000/
app.get('/', (req: Request, res: Response) => {
    res
    .status(200)
    .sendFile(path.join(path.resolve(), homePagePath)) // path needs to be absolute
})

// ex.: localhost:3000/about
app.get('/about', (req: Request, res: Response) => {
    res
    .status(200)
    .send('about page') //the hard code
    
})

app.all('*', (req: Request, res: Response) => {
    res.status(404).send('not found')
})

app.listen('3000', () => {
    console.log('listening...')
})
