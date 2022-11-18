import http from 'http'
import fs from 'fs'

const hostname: string = '127.0.0.1'; //localhost address
const port: number = Number(process.env.PORT) || 3000;
const homePage = fs.readFileSync('./src/utils/homePage.html', 'utf-8')
const anotherPage = fs.readFileSync('./src/utils/anotherPage.txt', 'utf-8')
const cssStyle = fs.readFileSync('./src/utils/style.css', 'utf-8')

const server = http.createServer((req, res) => {
    const url = req.url;

    // ex.: localhost:3000/
    if (url == "/") {
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.write(homePage);
        res.end()
    }

    if(url == '/style.css') {   //all requests needs to be worked with, like css, .js, imgs...
        res.writeHead(200, {
            'content-type': 'text/css'
        })
        res.write(cssStyle)
        res.end()
    }

    // ex.: localhost:3000/anotherPage
    if (url == "/anotherPage") {
        res.writeHead(200, {
            'content-type': 'text/plain'
        })
        res.write(anotherPage);
        res.end()
    }
})

server.listen(port, hostname)