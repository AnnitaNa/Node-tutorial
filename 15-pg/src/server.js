import express from "express";
import * as dotenv from "dotenv";

import {db} from "./models/index.js"; 
import { router } from "./router.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use("/", router);



// db.sequelize.sync() //creates table if it doesn't already exists
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   })



app.listen(port, () => {
	console.log(`listening to PORT: ${port}`);
});



