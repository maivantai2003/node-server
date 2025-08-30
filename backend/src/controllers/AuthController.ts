
import { Request,Response,NextFunction } from "express";
import { authService } from "../services/authService";
import UAParser from 'ua-parser-js';
export const authController={
    login:async (req:Request,res:Response,next:NextFunction)=>{
        const {email,password}=req.body
        const forwarded = req.headers['x-forwarded-for'];
        const ipAddress =
        typeof forwarded === 'string'
            ? forwarded
            : Array.isArray(forwarded)
            ? forwarded[0]
            : req.socket.remoteAddress || 'Unknown IP';
        const deviceInfo = req.headers['user-agent'] || 'Unknown device';
        const { accessToken, refreshToken }=await authService.login(email,password,deviceInfo,ipAddress)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({accessToken}) 
    },
    refresh:async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const refreshToken=req.cookies.refreshToken;
            if(!refreshToken){
                res.status(401).json({message:"No refresh token"})
                return
            }
            const { accessToken, refreshToken: newRefreshToken }=await authService.refreshToken(refreshToken);
            res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.json({ accessToken });
        }catch(err){
            res.json(err)
        }
    },
    logout:async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const refreshToken = req.cookies.refreshToken;
            if (refreshToken) {
             await authService.logout(refreshToken);
            }
            res.clearCookie("refreshToken");
            return res.json({ message: "Logged out" });
        }catch(err){
            res.status(500).json({message:err})
        }
    }
}