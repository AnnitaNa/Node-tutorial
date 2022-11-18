//--------------------------------------------------
//----------------- HELLO WORLD --------------------
//--------------------------------------------------

//imports modules
import { message } from "./exportedMessage.js";
import http from "http";

//defines address/url
const hostname: string = "127.0.0.1"; //localhost address
const port = 3000;

//implementação da regra de negócio
const server = http.createServer((req, res) => {
    //event emmiter
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>${message}</h1>`); // to see the message put on your browser -> localhost:3000

    // (method, url) = request
});

//execução
server.listen(port, hostname, () => {
    //when server beggins to listen it executes this function
    console.log(`Server running at http://${hostname}:${port}/`);
});
