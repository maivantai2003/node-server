import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { User } from "../entities/user";
import { AppDataSource } from "../data-source";

export const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as { id: string; email: string };

    // Kiểm tra user có tồn tại không
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: decoded.id });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Cấp lại accessToken mới
    const newAccessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: process.env.JWT_ACCESS_EXPIRE || "15m" } as SignOptions
    );

    return res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error: any) {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};
