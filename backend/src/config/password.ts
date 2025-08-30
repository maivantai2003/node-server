// // config/passport.ts
// import passport from "passport";
// import { Strategy as GoogleStrategy, Profile as GoogleProfile } from "passport-google-oauth20";
// import { Strategy as FacebookStrategy, Profile as FacebookProfile } from "passport-facebook";
// import { AppDataSource } from "../data-source";
// import { User } from "../entities/user";
// import { authRepository } from "../repositories/authRepository";

// export default function setupPassport() {
//   const userRepo = AppDataSource.getRepository(User);

//   // GOOGLE
//   passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL!,
//     scope: ['profile', 'email']
//   }, async (accessToken, refreshToken, profile: GoogleProfile, done) => {
//     try {
//       const email = profile.emails && profile.emails[0].value;
//       if (!email) return done(null, false, { message: "No email from Google" });

//       // find or create user
//       let user = await userRepo.findOne({ where: { email } });
//       if (!user) {
//         user = userRepo.create({
//           name: profile.displayName || email,
//           email,
//           password: "", // OAuth user - no local password
//           tokenVersion: 0
//         } as User);
//         await userRepo.save(user);
//       } else {
//         // optionally update name, avatar, etc.
//       }

//       return done(null, user);
//     } catch (err) {
//       return done(err as any);
//     }
//   }));

//   // FACEBOOK
//   passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_CLIENT_ID!,
//     clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
//     callbackURL: process.env.FACEBOOK_CALLBACK_URL!,
//     profileFields: ['id', 'displayName', 'emails'] // request email
//   }, async (accessToken, refreshToken, profile: FacebookProfile, done) => {
//     try {
//       const email = profile.emails && profile.emails[0].value;
//       if (!email) return done(null, false, { message: "No email from Facebook" });

//       let user = await userRepo.findOne({ where: { email } });
//       if (!user) {
//         user = userRepo.create({
//           name: profile.displayName || email,
//           email,
//           password: "",
//           tokenVersion: 0
//         } as User);
//         await userRepo.save(user);
//       }

//       return done(null, user);
//     } catch (err) {
//       return done(err as any);
//     }
//   }));
// }
