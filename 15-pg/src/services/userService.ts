import { IUser, IUserOutput } from "../interfaces/IUser.js";
import IUserRepo from "../interfaces/IUserRepo.js";
import User from "../models/User.js";


class UserService implements IUserRepo {

	constructor(){}

	async  getAll(): Promise<IUserOutput[]> {
		const users: IUserOutput[] = await User.findAll();
		return users;
	}

	// async getById(id: number): Promise<IUserOutput> {
	// 	const user: IUserOutput = await User.findAll({
	// 		where: {
	// 			id: id
	// 		}
	// 	});

	// 	return user;
	// }

	async create(data: IUser) {
		const {name, password_hash, email, provider} = data;
		const user = await User.create({
			name,
			password_hash,
			email,
			provider
		});
		return user;
	}

	// async update(data: IUser, id: number) {
	// 	const {name, password_hash, email, provider} = data;
	// 	const user = await User.update(
	// 		{
	// 			name,
	// 			password_hash,
	// 			email,
	// 			provider
	// 		},
	// 		{ where: {id: id}}
	// 	);
	// 	return user;
	// }

	// async remove(id: number) {
	// 	const user = await User.destroy({
	// 		where: {id: id}
	// 	});
	// 	return user;
	// }

}

export default UserService;
