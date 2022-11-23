import { Request, Response} from "express";
import { IUserOutput } from "../interfaces/IUser.js";

import UserService from "../services/userService.js";

const userService = new UserService();


class UserController {

	constructor() {}

	async getAll(req: Request, res: Response) {

		const users: IUserOutput[] = await userService.getAll();
	
		res.json(users);
		return users;
	}

	// async getById(req: Request, res: Response) {
	// 	const {id} = (req.params);
	// 	const user = await userService.getById(Number(id));

	// 	if(!user) res.status(404).json({error: "user not found"});
	
	// 	res.json(user);
	// 	return user;
	// }
	
	async create(req: Request, res: Response) {
		const {data} = req.body;
		const user = await userService.create(data);
	
		res.json(user);
		return user;
	}
	
	// async update(req: Request, res: Response) {
	// 	const {id} = req.params;
	// 	const {data} = req.body;
	// 	const user = await userService.update(data, id);

	// 	if(!user) res.status(404).json({error: "user not found"});

	// 	res.json(user);
	// 	return user;
	// }
	
	// async remove(req: Request, res: Response) {
	// 	const {id} = req.params;
	// 	const user = await userService.destroy(id);
		
	// 	res.json(user);
	// 	return user;
	// }
	
}

export default  UserController; // instanciando a classe para poder acessar os métodos
