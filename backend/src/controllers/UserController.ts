import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import { UserDto } from "../dtos/user.dto";
import { UserUpdateDto } from "../dtos/userUpdate.dto";
export const UserController = {
    getAllUsers:async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },
    getUserById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const user = await UserService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    createUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData:UserDto = req.body;
            const newUser = await UserService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const userData:Partial<UserUpdateDto> = req.body;
            const updatedUser = await UserService.updateUser(id, userData);
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    },

    deleteUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const deletedCount = await UserService.deleteUser(id);
            res.status(200).json({ deletedCount });
        } catch (error) {
            next(error);
        }
    }
    
}