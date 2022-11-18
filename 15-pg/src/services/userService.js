import {db} from "../models/index.js";

const {User} = db;

export default class UserService {

	async  getAll() {
		const users = await User.findAll();
		return users;
	}

	async getById(id) {
		const user = await User.findAll({
			where: {
				id: id
			}
		});
		return user;
	}

	async create(name, password_hash, email, provider) {
		const user = await User.create({
			name,
			password_hash,
			email,
			provider
		});
		return user;
	}

	async update(name, password_hash, email, provider, id) {
		const user = await User.update(
			{
				name,
				password_hash,
				email,
				provider
			},
			{ where: {id: id}}
		);
		return user;
	}

	async remove(id) {
		const user = await User.destroy({
			where: {id: id}
		});
		return user;
	}

}

