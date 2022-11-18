import express from "express";
import UserController from "./controllers/UserController.js";

export const router = express.Router();

router.use(express.json()); 
router.use(express.urlencoded({extended: true})); 

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.remove);