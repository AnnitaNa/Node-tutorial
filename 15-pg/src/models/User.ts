
import {DataTypes, Model} from "sequelize";
import { IUser, IUserInput } from "../interfaces/IUser";
import sequelize from "./index.js";


class User extends Model<IUser, IUserInput> implements IUser {
	public id!: number;
	public name!: string;
	public email!: string;
	public password_hash!:string;
	public provider!: boolean;
	// timestamps!
	public readonly created_at!: Date;
	public readonly updated_at!: Date;
}

User.init(
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: DataTypes.STRING,
		password_hash: DataTypes.STRING,
		email: DataTypes.STRING,
		provider: DataTypes.BOOLEAN,
	},
	{
		sequelize,
		modelName: "User"
	}
);



export default User;
