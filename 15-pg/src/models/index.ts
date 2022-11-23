//centraliza todos as models

import { Sequelize } from "sequelize";
import {config} from "../config/config.js";

const sequelize = new Sequelize(config);

// const db ={
// 	sequelizeConnection,
// 	Sequelize,
// 	User: User
// };


export default sequelize;
