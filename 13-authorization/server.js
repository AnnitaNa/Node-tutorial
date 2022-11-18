
import express from 'express'
import { router } from './router.js';
import * as dotenv from 'dotenv'
import path from 'path'

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();
const envPath = path.join(__dirname,'../.env')

dotenv.config({path: envPath}); 

app.use('/', router)

app.listen(port);