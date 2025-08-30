import bcrypt from 'bcrypt';
import { UserDto } from "../dtos/user.dto";
import { UserUpdateDto } from "../dtos/userUpdate.dto";
import { User } from "../entities/user";
import { userRepository } from "../repositories/userRepository";
import { ApiError } from "../utils/ApiError";

export const UserService = {
    getAllUsers: async ():Promise<User[]> => {
        return await userRepository.getAllUsers();
    },
    getUserById: async (id: string):Promise<User | null> => {
        // return await userRepository.getUserById(id);
        const user = await userRepository.getUserById(id);
        if (!user) throw ApiError.notFound("User not found");
        return user;
    },
    createUser: async (userData: Partial<UserDto>):Promise<User> => {
        if (!userData.email) throw ApiError.badRequest("Email is required");
        if (!userData.name) throw ApiError.badRequest("Name is required");
        if (!userData.password) throw ApiError.badRequest("Password is required");
        if (!userData.age || userData.age<=0) throw ApiError.badRequest("Age is required");
        const hashedPassword=await bcrypt.hash(userData.password,10)
        return await userRepository.createUser({...userData,password:hashedPassword});
    },
    updateUser: async (id: string, userData: Partial<UserUpdateDto>):Promise<User | null> => {
        //return await userRepository.updateUser(id, userData);
        const user = await userRepository.updateUser(id, userData);
        if (!user) throw ApiError.notFound("User not found or update failed");
        return user;
    },
    deleteUser: async (id: string):Promise<number> => {
        //return await userRepository.deleteUserCount(id);
        const deleted = await userRepository.deleteUserCount(id);
        if (!deleted) throw ApiError.notFound("User not found");
        return deleted;
    }
}