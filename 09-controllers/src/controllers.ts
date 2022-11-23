import path from "path";
import fs from "fs";
import {Request, Response, NextFunction} from "express";
import { Iproducts } from "./utils/Iproducts";


const __dirname = path.resolve();
const jsonPath = path.join(__dirname, "./src/utils/data.json");
let data: Array<Iproducts> = [];


function readAndParse(req: Request, res: Response, next: NextFunction) {
	const read = fs.readFileSync(jsonPath, {encoding: "utf-8"});
	data = JSON.parse(read);
	next();
}


function checkById (id: number) {
	return data.find((product: Iproducts) => product.id === id);
}


function getAll(req: Request, res: Response) {
	const productFiltered = data.map((product: Iproducts) => {
		const {title, body}: Iproducts = product;
		return {title, body};
	});
	res.status(200).json(productFiltered);
}


function getById(req: Request, res: Response) {

	const {id} = req.params;
	const productById = checkById(Number(id));

	if (!productById) {
		return res.status(404).send("this ID doesnt exists");
	}

	res.json(productById);
}


function create(req: Request, res: Response) {
	const idExists = checkById(Number(req.body.id));
	if (idExists) {
		return res.status(400).send("id already exists");
	}
   

	if (Object.entries(req.body).length === 0) {
		return res.status(400).send("request body invalid");
	}

	data.push(req.body);

	fs.writeFileSync(jsonPath, JSON.stringify(data), "utf-8");
	res.status(204). send(req.body);
}


function update(req: Request, res: Response) {
	const {id} = req.params;

	const idExists = checkById(Number(id));
	if(!idExists) {
		return res.status(404).send("id doesnt exists");
	}

	const newData = data.map((product: Iproducts) => {
		if (product.id === Number(id)) {
			product = req.body;
		}
		return product;
	});

	fs.writeFileSync(jsonPath, JSON.stringify(newData), "utf-8");
	res.status(204).send("complete");
}

function deleteById(req: Request, res: Response) {
	const {id} = req.params;

	const idExists = checkById(Number(id));
	if(!idExists) {
		return res.status(404).send("id doesnt exists");
	}

	const notDeleted = data.filter (product => {
		return product.id !== Number(id);
	});

	fs.writeFileSync(jsonPath, JSON.stringify(notDeleted), "utf-8");
	res.status(204).send("deleted");
}

export {getAll, getById, create, update, deleteById, readAndParse};