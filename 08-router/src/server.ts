import express from "express";
import {router} from "./routers.js";

const app = express();
const port: number = Number(process.env.PORT) || 3000;

app.use("/product",router);

app.listen(port, () => {
	console.log("working...");
});