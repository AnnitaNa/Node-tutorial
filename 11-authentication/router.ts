import express from 'express'
import { registerUser } from './Controllers/register.controller.js';
import { loginUser } from './Controllers/login.controller.js';

export const router = express.Router()

//router.use(readAndParse);
router.use(express.json()); 
router.use(express.urlencoded({extended: true})); 

router.post('/register', registerUser);
router.post('/login', loginUser);