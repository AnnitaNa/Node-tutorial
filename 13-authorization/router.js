import express from 'express'
import fs from 'fs'
import cookieParser from 'cookie-parser'

import { register } from './Controllers/register.controller.js'
import { login } from './Controllers/login.controller.js'
import { verifyJWT } from './middlewares/verifyJWT.js';
import { handleRefreshToken } from './Controllers/refreshToken.controller.js';
import { logout } from './Controllers/logout.controller.js';
import { verifyRoles } from './middlewares/verifyRoles.js'
import { ROLES_LIST } from './config/ROLES_LIST.js'


const homePage = fs.readFileSync('../00-references/utils/homePage.html');

export const router = express.Router();

router.use(express.json()); 
router.use(express.urlencoded({extended: true})); 
router.use(cookieParser());

router.post('/register', register);

router.post('/login', login);

router.get('/refresh', handleRefreshToken);

router.get('/logout', logout);


//verifyJWT is that decode the token and pass the role information to the request. I need to call it before!

router.get('/user', verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User), (req, res) => {
    res.end('You are authorized to access this page!');
});

router.get('/admin', verifyJWT, verifyRoles(ROLES_LIST.Admin), (req, res) => {
    res.end('You are authorized to access this page!');
});

