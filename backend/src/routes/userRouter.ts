import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authentication } from "../middlewares/authentication";

export const userRouter=Router();

//userRouter.use(authentication)
userRouter.get("/",UserController.getAllUsers);
userRouter.get("/:id",UserController.getUserById);
userRouter.post("/",UserController.createUser);
userRouter.put("/:id",UserController.updateUser);  
userRouter.delete("/:id",UserController.deleteUser);
//userRouter.use(authentication)