import express from 'express'
import * as dotenv from 'dotenv'
import path from 'path'
import mongoose from 'mongoose';

import { router } from './router.js';
import {connectDb} from './config/dbConn.js'


const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();
const envPath = path.join(__dirname,'../.env')

dotenv.config({path: envPath}); 

app.use('/', router)

// connect to mongoDB
connectDb();

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB')
    app.listen(port), () => {
        console.log(`listen to port: ${port}`)
    };
})

