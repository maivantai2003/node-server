// // routes/oauth.routes.ts
// import express from "express";
// import passport from "passport";
// import { generateTokens } from "../services/token.util";
// import { authRepository } from "../repositories/authRepository";

// const router = express.Router();

// // Bắt đầu flow Google
// router.get("/google", passport.authenticate("google", { session: false }));

// // Callback Google
// router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/auth/oauth-failed", session: false }), async (req, res) => {
//   try {
//     const user = req.user as any; // từ passport
//     const { accessToken, refreshToken } = generateTokens(user);

//     // rotation lưu vào DB (nếu muốn lưu accessToken too)
//     await authRepository.saveToken({
//       accessToken,
//       refreshToken,
//       user,
//       createAt: new Date(),
//       expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//     } as any);

//     // set cookie (httpOnly)
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000
//     });

//     // Response: có thể redirect về frontend kèm accessToken
//     // Nếu redirect: đưa accessToken trong query fragment (hash) hoặc dùng state để match + fetch from client.
//     return res.redirect(`${process.env.FRONTEND_URL}/oauth-success?accessToken=${accessToken}`);
//   } catch (err) {
//     console.error("OAuth callback error", err);
//     return res.redirect(`${process.env.FRONTEND_URL}/oauth-failed`);
//   }
// });

// // Facebook
// router.get("/facebook", passport.authenticate("facebook", { session: false, scope: ['email'] }));

// router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/auth/oauth-failed", session: false }), async (req, res) => {
//   try {
//     const user = req.user as any;
//     const { accessToken, refreshToken } = generateTokens(user);

//     await authRepository.saveToken({
//       accessToken,
//       refreshToken,
//       user,
//       createAt: new Date(),
//       expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//     } as any);

//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000
//     });

//     return res.redirect(`${process.env.FRONTEND_URL}/oauth-success?accessToken=${accessToken}`);
//   } catch (err) {
//     console.error(err);
//     return res.redirect(`${process.env.FRONTEND_URL}/oauth-failed`);
//   }
// });

// // Optional endpoints
// router.get("/oauth-failed", (_req, res) => res.status(401).send("OAuth failed"));

// export default router;
