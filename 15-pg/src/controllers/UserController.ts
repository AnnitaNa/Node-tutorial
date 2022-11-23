import { Request, Response} from "express";
import { IUserOutput } from "../interfaces/IUser.js";

import UserService from "../services/userService.js";

const userService = new UserService();


class UserController {

	async getAll(req: Request, res: Response) {
		const users: IUserOutput[] = await userService.getAll();
	
		res.json(users);
		return users;
	}


	async getById(req: Request, res: Response) {
		const {id} = (req.params);
		const user: IUserOutput | null = await userService.getById(Number(id));

		if(!user) {
			return res.status(404).json({error: "user not found"});
		}
	
		res.json(user);
		return user;
	}
	
	
	async create(req: Request, res: Response) {
		const user = await userService.create(req.body);
	
		res.json(user);
		return user;
	}
	

	async update(req: Request, res: Response) {
		const {id} = req.params;
		const user: [number, IUserOutput[]] = await userService.update(req.body, Number(id));

		if(user[0]===0) {
			return res.status(404).json({error: "user not found"});
		}

		res.json(user);
		return user;
	}
	

	async remove(req: Request, res: Response) {
		const {id} = req.params;
		const user = await userService.remove(Number(id));
		
		res.json(user);
		return user;
	}
	
}

export default  UserController;
