import express from 'express'
import { router } from './router.js';


const app = express();
const port: number = Number(process.env.PORT) || 3000;

app.use('/', router)

app.listen(port, () => {console.log("started server")});