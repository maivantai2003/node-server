import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";
import { UserUpdateDto } from "../dtos/userUpdate.dto";
import { UserDto } from "../dtos/user.dto";
const userRepo=AppDataSource.getRepository(User)
export const userRepository = {
    getAllUsers: async () => {
        const users=await userRepo.find({relations:{subjects:true}})
        return users
    },
    createUser: async (userData: Partial<UserDto>) => {
        const newUser=userRepo.create(userData)
        await userRepo.save(newUser)
        return newUser
    },
    getUserById: async (userId: string) => {
        const user=await userRepo.findOne({where:{id:userId},relations:{subjects:true}})
        
        return user
    },
    updateUser: async (userId: string, userData: Partial<UserUpdateDto>) => {
        await userRepo.update(userId, userData);
        return await userRepo.findOneBy({ id: userId });
    },
    deleteUserCount: async (userId: string):Promise<number> => {
        const result = await userRepo.delete(userId);
        return result.affected ?? 0;
    }
};