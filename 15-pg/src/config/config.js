import dotenv from "dotenv";

dotenv.config();

export default {
	"development": {
		"dialect": "postgres",
		"host": "babar.db.elephantsql.com",
		"username": "ypwbbegs",
		"password": "tdgMd_Z0RQ2Z18BobDPCgztST76xttAm",
		"database": "ypwbbegs",
		"url":process.env.DATABASE_ELEPHANT,
		"define": {
			"timestamp": true,
			"underscored": true,
			"underscoredAll": true
		}
	}
};
// url is on my .env file. Replace it by the link of your database