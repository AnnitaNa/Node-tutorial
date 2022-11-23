import express from "express";
import UserController from "./controllers/UserController.js";

export const router = express.Router();

const userController = new UserController();

router.use(express.json()); 
router.use(express.urlencoded({extended: true})); 

router.get("/", userController.getAll);
// router.get("/:id", userController.getById);
// router.post("/", userController.create);
// router.put("/:id", userController.update);
// router.delete("/:id", userController.remove);