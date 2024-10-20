import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import "dotenv/config";
import mongoose from "mongoose";
import { GoogleUser } from "../mongoose/schemas/google_user.mjs";

export default passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.REDIRECT_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      //console.log(profile);
      let findUser;

      try {
        findUser = await GoogleUser.findOne({ googleId: profile.id });
      } catch (err) {
        return done(err, null);
      }

      try {
        if (!findUser) {
          const newUser = new GoogleUser({
            googleId: profile.id,
            email: profile.email,
          });
          const newSavedUser = await newUser.save();
          return done(null, newSavedUser);
        }
        return done(null, findUser);
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
    }
  )
);
