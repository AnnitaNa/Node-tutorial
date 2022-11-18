//middlewares => pass between a request and its response

import express, { NextFunction, Request, Response } from 'express'

const app = express();
const port: number = Number(process.env.PORT) || 3000;


//**************** MIDDLEWARES *******************

const middleware1 = (req: Request, res: Response, next: NextFunction) => {
    req.query = {middleware1:'i am middleware 1'}
    next() //needs to tell the middleware to go to the next one
}

const middleware2 = (req: Request, res: Response, next: NextFunction) => {
    req.query.middleware2 = 'middleware2 executeed'
    next()
}

//*************************************************


//! 1) app.use()

//It will share info with all methods that use this route or its childs (/app/a/b/c)
app.use('/app', (req: Request, res: Response, next: NextFunction) => {
    req.query.using = 'I am using app.use()'
    next()
})


app.get('/app', (req: Request, res: Response) => {
    res.send(req.query.using)
})


//! 2) In the middle of the request

app.get('/', middleware1, (req: Request,res: Response) => {
    console.log(req.query);
    res.send('I changed info with the middleware')
})



//! 3) series of requests with same endpoint
app.get('/endpoint', (req: Request, res: Response, next: NextFunction) => {
    req.query.middleware1 = 'executed'
    next()
})

app.get('/endpoint', (req: Request, res: Response, next: NextFunction) => {
    req.query.middleware2 = 'executed'
    res.send(req.query)
})

// I will not be executed because the one before me SEND the message
app.get('/endpoint', (req: Request, res: Response, next: NextFunction) => {
    req.query.middleware3 = 'not executed';
})


//! 4) series of middlewares

app.get('/series', [middleware1, middleware2], (req: Request, res: Response) => {
    res.send(req.query)
})

//OR
//app.use([middleware1, middleware2]) -> lots of middleware for every route


app.listen(port, () => {})