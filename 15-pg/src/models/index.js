//centraliza todos as models

import { Sequelize } from "sequelize";
import * as config from "../config/config.js";
import { User } from "./User.js";

const sequelize = new Sequelize(config.default.development);

const db ={
	sequelize,
	Sequelize,
	User: User(sequelize, Sequelize)
};


export  {db};
