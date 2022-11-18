import express from 'express'
import fs from 'fs'
import cookieParser from 'cookie-parser'

import { register } from './Controllers/register.controller.js'
import { login } from './Controllers/login.controller.js'
import { verifyJWT } from './middlewares/verifyJWT.js';
import { handleRefreshToken } from './Controllers/refreshToken.controller.js';
import { logout } from './Controllers/logout.controller.js';


const homePage = fs.readFileSync('../00-references/utils/homePage.html');

export const router = express.Router();

router.use(express.json()); 
router.use(express.urlencoded({extended: true})); 
router.use(cookieParser()) //to receive token with cookies

router.post('/register', register);

router.post('/login', login);

router.get('/refresh', handleRefreshToken);

router.get('/logout', logout);

router.get('/protected', verifyJWT, (req, res) => {
    res.writeHead(200, {'content-type': 'text/html'})
    res.write(homePage)
    res.end()
});