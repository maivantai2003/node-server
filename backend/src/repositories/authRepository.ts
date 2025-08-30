import { AppDataSource } from "../data-source";
import { RefreshToken } from "../entities/refreshToken";
import { User } from "../entities/user";

const authRepo=AppDataSource.getRepository(RefreshToken)
const userRepo=AppDataSource.getRepository(User)
export const authRepository = {
    findByEmail: async (email: string):Promise<User | null> => {
        return await userRepo.findOne({ where: { email } });
    },
    saveToken: async(token:RefreshToken):Promise<RefreshToken | null>=> {
        return await authRepo.save(token)
    },
    findToken:async (refreshToken: string): Promise<RefreshToken | null> =>{
        return await authRepo.findOne({
        where: { refreshToken },
        relations: ["user"],
        });
    },
    deleteToken:async (refreshToken: string): Promise<void>=>{ 
        await authRepo.delete({ refreshToken });
    }
}