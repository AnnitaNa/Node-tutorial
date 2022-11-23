import dotenv from "dotenv";
import { Options } from "sequelize";

dotenv.config();

export const config: Options = {
	"dialect": "postgres",
	"host": "babar.db.elephantsql.com",
	"username": "ypwbbegs",
	"password": "tdgMd_Z0RQ2Z18BobDPCgztST76xttAm",
	"database": "ypwbbegs",
	"define": {
		"underscored": true,
	}
};
// url is on my .env file. Replace it by the link of your database