import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/_constants.mjs";
import { User } from "../mongoose/schemas/user.mjs";

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
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User Not Found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});
export default passport.use(
  new Strategy(
    { usernameField: "userName" },
    async (username, password, done) => {
      console.log(`Username ${username}`);
      console.log(`Password ${password}`);
      try {
        // const findUser = mockUsers.find((user) => user.userName === username);
        // if (!findUser) throw new Error("User not found");
        // if (findUser.password !== password)
        //   throw new Error("Invalid Credentials");
        // done(null, findUser);
        const findUser = await User.findOne({ userName: username });
        if (!findUser) throw new Error("User Not Found");
        if (findUser.password !== password)
          throw new Error("Password Is Incorrect");
        done(null, findUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
