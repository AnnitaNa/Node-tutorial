import http from 'http'

const hostname: string = '127.0.0.1'
const port: number = Number(process.env.PORT) || 3000;
const urlWithQuery: URL = new URL(`http://${hostname}:${port}?name=tati&age=28`)

const server = http.createServer( (req, res) => {

    const query: URLSearchParams = urlWithQuery.searchParams; //! searchParams

    res.statusCode = 200;
    //writeHead allows me to set more headers
    res.writeHead(200, {
        'Content-type': 'text/plain'
    })

    res.write(`${query.get('name')} is ${query.get('age')} years old`)
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at ${urlWithQuery}`);
})