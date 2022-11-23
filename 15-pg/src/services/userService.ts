import { IUserInput, IUserOutput } from "../interfaces/IUser.js";
import IUserRepo from "../interfaces/IUserRepo.js";
import User from "../models/User.js";


class UserService implements IUserRepo {

	async  getAll(): Promise<IUserOutput[]> {
		const users: IUserOutput[] = await User.findAll();
		return users;
	}

	async getById(id: number): Promise<IUserOutput | null> {
		const user: IUserOutput | null = await User.findByPk(id);
		return user;
	}

	async create(data: IUserInput) {
		const {name, password_hash, email, provider} = data;
		const user = await User.create({
			name,
			password_hash,
			email,
			provider
		});
		return user;
	}

	async update(data: IUserInput, id: number):  Promise<[number, IUserOutput[]]> {
		const {name, password_hash, email, provider} = data;
		const user: [number, IUserOutput[]] = await User.update( //return obj affected and the number affected
			{
				name,
				password_hash,
				email,
				provider
			},
			{ 
				returning: true, 
				where: {id: id}
			}
		);
		return user;
	}

	async remove(id: number) {
		const user = await User.destroy({
			where: {id: id}
		});
		return user;
	}

}

export default UserService;
