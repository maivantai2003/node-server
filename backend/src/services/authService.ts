import { UserSessionDto } from './../dtos/userSession.dto';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { authRepository } from "../repositories/authRepository"
import { RefreshToken } from '../entities/refreshToken';
import { sessionRepository } from '../repositories/sessionRepository';
dotenv.config()
export const authService={
    // async register(name: string, email: string, password: string): Promise<User> {
    // const hashed = await bcrypt.hash(password, 10);
    // const user = new User();
    // user.name = name;
    // user.email = email;
    // user.password = hashed;
    // return await this.repo.saveUser(user);
    // }
    login:async(email:string,password:string,deviceInfo?:string,ipAddress?:string)=>{
        const user= await authRepository.findByEmail(email)
        if(!user){
            throw new Error("Invalid email or password")
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Invalid password");
        const accessToken=jwt.sign({userId:user.id,role:user.role},process.env.JWT_ACCESS_SECRET!,{expiresIn:'15m'})
        const refreshToken=jwt.sign({userId:user.id},process.env.JWT_REFRESH_SECRET!,{expiresIn:'7d'})
        await authRepository.saveToken({
            accessToken,
            refreshToken,
            user,
            createAt:new Date(),
            expiresAt:new Date(Date.now()+7*24*60*60*1000)
        } as RefreshToken)
        const userSession:UserSessionDto={
            userId:user.id,
            refreshToken:refreshToken,
            deviceInfo:deviceInfo,
            ipAddress:ipAddress,
        }
        console.log(userSession)
        await sessionRepository.createSession(userSession);
        return {accessToken,refreshToken}
    },
    refreshToken:async(refreshToken:string)=>{
        const token=await authRepository.findToken(refreshToken)
        if (!token) throw new Error("Invalid refresh token");
        try{
            const decoded = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET!
            ) as any;

            const accessToken = jwt.sign(
                { id: decoded.id, role: decoded.role },
                process.env.JWT_ACCESS_SECRET!,
                { expiresIn: "15m" }
            );
            // const newRefreshToken = jwt.sign(
            // { id: decoded.id },
            // process.env.JWT_REFRESH_SECRET!,
            // { expiresIn: "7d" }
            // );
            // // xóa token cũ
            // await this.repo.deleteToken(oldRefreshToken);
            // token.accessToken = accessToken;
            await authRepository.saveToken(token)
            await sessionRepository.createSession({

            })
            return {accessToken,refreshToken}
        }catch(err){
            throw new Error("Invalid refresh token");
        }
    },
    logout:async(refreshToken:string)=>{
        await authRepository.deleteToken(refreshToken)
    }
}