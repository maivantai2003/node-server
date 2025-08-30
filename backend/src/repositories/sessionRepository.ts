import { AppDataSource } from "../data-source";
import { UserSessionDto } from "../dtos/userSession.dto";
import { UserSession } from "../entities/userSession";

const sessionRepo = AppDataSource.getRepository(UserSession);

export const sessionRepository = {
  createSession: async (sessionData: Partial<UserSessionDto>) => {
    const session = sessionRepo.create({
        ...sessionData,
        //user,
        user:{id:sessionData.userId} as any
        });
        
    return await sessionRepo.save(session);
  },
  findByRefreshToken: async (refreshToken: string) => {
    return await sessionRepo.findOne({ where: { refreshToken }, relations: ["user"] });
  },
  deleteSession: async (refreshToken: string) => {
    await sessionRepo.delete({ refreshToken });
  },
  getSessionsByUser: async (userId: string) => {
    return await sessionRepo.find({ where: { user: { id: userId } } });
  }
};
