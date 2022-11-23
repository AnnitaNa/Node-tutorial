import * as dotenv from "dotenv"; //loads .env file (where are my env variables)
import http from "http";

dotenv.config();
//environment variables are in the .env file

//to access variables, use //! process.env

const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
	res.end("WORKING");
});

server.listen(port, () => {
	console.log("WORKING ON PORT: ", port);
});
