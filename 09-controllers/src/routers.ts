import express, {Router} from "express";

import {getAll, getById, create, update, deleteById, readAndParse} from "./controllers.js";

export const router: Router = express.Router();

// middlewares
router.use(readAndParse);
router.use(express.json()); 
router.use(express.urlencoded({extended: true})); 


router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteById);

//OR

// router.route('/').get(getAll).post(create);
// router.route('/:id').get(getById).put(update).delete(deleteById);