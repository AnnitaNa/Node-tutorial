import UserService from "../services/userService";

export default class UserController {

	async getAll(req, res) {
		const users = await UserService.findAll();
	
		res.json(users);
		return users;
	}
	async getById(req, res) {
		const {id} = req.params;
		const user = await UserService.findAll(id);
	
		res.json(user);
		return user;
	}
	
	async create(req, res) {
		const {name, password_hash, email, provider} = req.body;
		const user = await UserService.create(name, password_hash,email,provider);
	
		res.json(user);
		return user;
	}
	
	async update(req, res) {
		const {id} = req.params;
		const {name, password_hash, email, provider} = req.body;
		const user = await UserService.update(name, password_hash, email, provider, id);
	
		res.json(user);
		return user;
	}
	
	async remove(req, res) {
		const {id} = req.params;
		const user = await UserService.destroy(id);
		
		res.json(user);
		return user;
	}
	
}
