import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import "dotenv/config";
import mongoose from "mongoose";
import { GoogleUser } from "../mongoose/schemas/google_user.mjs";

passport.serializeUser((user, done) => {
  console.log(`Inside Serialize User`);
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log(`Inside Deserialize User`);
  console.log(`Deserialized User Id: ${id}`);
  try {
    // const findUser = mockUsers.find((user) => user.id === id);
    const findUser = await GoogleUser.findById(id);
    if (!findUser) throw new Error("User Not Found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.REDIRECT_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      let findUser;

      try {
        findUser = await GoogleUser.findOne({ googleId: profile.id });
      } catch (err) {
        //  return done(err, null);
        console.log(err);
      }

      try {
        if (!findUser) {
          const newUser = new GoogleUser({
            googleId: profile.id,
            email: profile._json.email,
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
